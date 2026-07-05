import { randomUUID } from 'node:crypto';

// Validate file content using standard magic bytes
export function validateImageMagicBytes(buffer: Uint8Array): string | null {
	if (buffer.length < 12) return null;

	// PNG: 89 50 4E 47
	if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
		return 'image/png';
	}

	// JPEG: FF D8 FF
	if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
		return 'image/jpeg';
	}

	// WebP: RIFF (bytes 0-3: 52 49 46 46) + WEBP (bytes 8-11: 57 45 42 50)
	if (
		buffer[0] === 0x52 &&
		buffer[1] === 0x49 &&
		buffer[2] === 0x46 &&
		buffer[3] === 0x46 &&
		buffer[8] === 0x57 &&
		buffer[9] === 0x45 &&
		buffer[10] === 0x42 &&
		buffer[11] === 0x50
	) {
		return 'image/webp';
	}

	return null;
}

/**
 * Handles validation and direct streaming upload of an image to Cloudflare R2.
 */
export async function uploadToR2(
	env: { BUCKET: R2Bucket },
	fileArrayBuffer: ArrayBuffer
): Promise<string> {
	const buffer = new Uint8Array(fileArrayBuffer);

	// 1. Enforce file size limit (10MB)
	if (buffer.length > 10 * 1024 * 1024) {
		throw new Error('File exceeds maximum size limit of 10MB.');
	}

	// 2. Enforce magic bytes verification (WebP, JPEG, PNG only)
	const detectedMime = validateImageMagicBytes(buffer);
	if (!detectedMime) {
		throw new Error('Invalid image file. Only WebP, JPEG, and PNG images are allowed.');
	}

	// 3. Generate key using UUID to prevent path traversal or object collisions
	const extension = detectedMime === 'image/jpeg' ? 'jpg' : detectedMime.split('/')[1];
	const key = `${randomUUID()}.${extension}`;

	// 4. Stream upload directly to the R2 bucket
	await env.BUCKET.put(key, buffer, {
		httpMetadata: { contentType: detectedMime }
	});

	return key;
}

/**
 * Deletes a file from the bound R2 bucket.
 */
export async function deleteFromR2(env: { BUCKET: R2Bucket }, key: string): Promise<void> {
	if (!key || key.startsWith('placeholder') || key.includes('/') || key.includes('\\')) {
		// Safety check: do not try to delete invalid keys or common placeholders
		return;
	}
	try {
		await env.BUCKET.delete(key);
	} catch (err) {
		console.error(`Failed to delete object "${key}" from R2:`, err);
	}
}
