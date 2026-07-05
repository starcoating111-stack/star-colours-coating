// Web Push (RFC 8291) using crypto.subtle + fetch only.
// web-push npm package is NOT used: it relies on node:https which Workers doesn't support.

export interface PushSub {
	endpoint: string;
	keys: { p256dh: string; auth: string };
}

function b64uToBuffer(s: string): ArrayBuffer {
	const b64 = s.replace(/-/g, '+').replace(/_/g, '/');
	const raw = atob(b64 + '='.repeat((4 - (b64.length % 4)) % 4));
	const buf = new ArrayBuffer(raw.length);
	const view = new Uint8Array(buf);
	for (let i = 0; i < raw.length; i++) view[i] = raw.charCodeAt(i);
	return buf;
}

function bufToB64u(buf: ArrayBuffer): string {
	return btoa(String.fromCharCode(...new Uint8Array(buf)))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=/g, '');
}

function concat(...parts: ArrayBuffer[]): ArrayBuffer {
	const total = parts.reduce((n, p) => n + p.byteLength, 0);
	const out = new Uint8Array(total);
	let off = 0;
	for (const p of parts) {
		out.set(new Uint8Array(p), off);
		off += p.byteLength;
	}
	return out.buffer as ArrayBuffer;
}

function strBuf(s: string): ArrayBuffer {
	return new TextEncoder().encode(s).buffer as ArrayBuffer;
}

async function hkdf(
	salt: ArrayBuffer,
	ikm: ArrayBuffer,
	info: ArrayBuffer,
	bits: number
): Promise<ArrayBuffer> {
	const key = await crypto.subtle.importKey('raw', ikm, 'HKDF', false, ['deriveBits']);
	return crypto.subtle.deriveBits({ name: 'HKDF', hash: 'SHA-256', salt, info }, key, bits);
}

// VAPID JWT signed with ES256 using the stored JWK private key.
async function vapidJwt(
	audience: string,
	subject: string,
	privateJwk: JsonWebKey
): Promise<string> {
	const key = await crypto.subtle.importKey(
		'jwk',
		privateJwk,
		{ name: 'ECDSA', namedCurve: 'P-256' },
		false,
		['sign']
	);
	const head = bufToB64u(strBuf(JSON.stringify({ typ: 'JWT', alg: 'ES256' })));
	const body = bufToB64u(
		strBuf(
			JSON.stringify({
				aud: audience,
				exp: Math.floor(Date.now() / 1000) + 43200, // 12 h
				sub: subject
			})
		)
	);
	const sig = await crypto.subtle.sign(
		{ name: 'ECDSA', hash: 'SHA-256' },
		key,
		strBuf(`${head}.${body}`)
	);
	return `${head}.${body}.${bufToB64u(sig)}`;
}

// RFC 8291 aes128gcm content encryption.
async function encrypt(sub: PushSub, plaintext: string): Promise<ArrayBuffer> {
	const recvPub = b64uToBuffer(sub.keys.p256dh); // 65-byte uncompressed P-256
	const auth = b64uToBuffer(sub.keys.auth); // 16-byte auth secret
	const salt = crypto.getRandomValues(new Uint8Array(16)).buffer as ArrayBuffer;

	// Ephemeral ECDH key pair
	const ephem = await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, [
		'deriveBits'
	]);
	const ephemPub = await crypto.subtle.exportKey('raw', ephem.publicKey); // 65 bytes

	// ECDH shared secret
	const recvKey = await crypto.subtle.importKey(
		'raw',
		recvPub,
		{ name: 'ECDH', namedCurve: 'P-256' },
		false,
		[]
	);
	const shared = await crypto.subtle.deriveBits(
		{ name: 'ECDH', public: recvKey },
		ephem.privateKey,
		256
	);

	// PRK = HKDF(salt=auth, ikm=shared, info="WebPush: info\0"+recvPub+ephemPub, 32 bytes)
	const keyInfo = concat(strBuf('WebPush: info\0'), recvPub, ephemPub);
	const prk = await hkdf(auth, shared, keyInfo, 256);

	// CEK and nonce from PRK (different info strings, same PRK)
	const [cekBits, nonceBits] = await Promise.all([
		hkdf(salt, prk, strBuf('Content-Encoding: aes128gcm\0'), 128),
		hkdf(salt, prk, strBuf('Content-Encoding: nonce\0'), 96)
	]);

	const cek = await crypto.subtle.importKey('raw', cekBits, 'AES-GCM', false, ['encrypt']);

	// Payload: plaintext + 0x02 delimiter (last-record marker per RFC 8291)
	const pt = strBuf(plaintext);
	const padded = concat(pt, new Uint8Array([0x02]).buffer as ArrayBuffer);

	const ciphertext = await crypto.subtle.encrypt(
		{ name: 'AES-GCM', iv: nonceBits, tagLength: 128 },
		cek,
		padded
	);

	// aes128gcm header: salt(16) + rs(4 BE=4096) + idlen(1=65) + ephemPub(65) = 86 bytes
	const header = new ArrayBuffer(86);
	new Uint8Array(header).set(new Uint8Array(salt), 0);
	new DataView(header).setUint32(16, 4096, false);
	new Uint8Array(header)[20] = 65;
	new Uint8Array(header).set(new Uint8Array(ephemPub), 21);

	return concat(header, ciphertext);
}

export async function sendWebPush(
	sub: PushSub,
	payload: { title: string; body: string; url: string },
	vapidPublicKey: string, // base64url of uncompressed P-256 pub key
	vapidPrivateJwkJson: string, // JSON-serialised JWK private key
	vapidSubject: string // mailto: or https: URI
): Promise<void> {
	const origin = new URL(sub.endpoint);
	const audience = `${origin.protocol}//${origin.hostname}`;

	const jwt = await vapidJwt(audience, vapidSubject, JSON.parse(vapidPrivateJwkJson) as JsonWebKey);
	const body = await encrypt(sub, JSON.stringify(payload));

	const res = await fetch(sub.endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/octet-stream',
			'Content-Encoding': 'aes128gcm',
			Authorization: `vapid t=${jwt},k=${vapidPublicKey}`,
			TTL: '86400'
		},
		body
	});

	if (!res.ok && res.status !== 201) {
		const err = new Error(`Push delivery failed: ${res.status}`);
		(err as any).status = res.status;
		throw err;
	}
}
