import { scrypt, timingSafeEqual, createHmac, randomBytes } from 'node:crypto';
import { promisify } from 'node:util';

const scryptAsync = promisify(scrypt);

// Benchmark scrypt hashing performance
export async function benchmarkScrypt(): Promise<number> {
	const start = Date.now();
	const testSalt = randomBytes(16).toString('hex');
	await hashPassword('test-password-performance', testSalt);
	return Date.now() - start;
}

// Hash a password using scrypt (N=16384, r=8, p=1)
export async function hashPassword(password: string, salt: string): Promise<string> {
	// Use recommended parameters (N=16384, r=8, p=1)
	const keyLen = 64;
	const derivedKey = await scryptAsync(password, salt, keyLen, {
		N: 16384,
		r: 8,
		p: 1
	});
	return derivedKey.toString('hex');
}

// Generate a random salt (hex)
export function generateSalt(length = 16): string {
	return randomBytes(length).toString('hex');
}

// Timing-safe comparison of strings
export function safeCompare(a: string, b: string): boolean {
	const aBuf = Buffer.from(a);
	const bBuf = Buffer.from(b);
	if (aBuf.length !== bBuf.length) {
		return false;
	}
	return timingSafeEqual(aBuf, bBuf);
}

export interface SessionPayload {
	issuedAt: number;
	expiresAt: number;
}

// Sign a session payload
export function signSession(payload: SessionPayload, secret: string): string {
	const data = JSON.stringify(payload);
	const hmac = createHmac('sha256', secret);
	hmac.update(data);
	const signature = hmac.digest('hex');
	return `${Buffer.from(data).toString('base64')}.${signature}`;
}

// Verify a signed session cookie
export function verifySession(signedCookie: string, secret: string): SessionPayload | null {
	try {
		const parts = signedCookie.split('.');
		if (parts.length !== 2) return null;
		const [base64Data, signature] = parts;
		const data = Buffer.from(base64Data, 'base64').toString('utf-8');
		const hmac = createHmac('sha256', secret);
		hmac.update(data);
		const expectedSignature = hmac.digest('hex');

		if (!safeCompare(signature, expectedSignature)) {
			return null;
		}

		const payload = JSON.parse(data) as SessionPayload;
		if (Date.now() > payload.expiresAt) {
			return null;
		}

		return payload;
	} catch {
		return null;
	}
}
