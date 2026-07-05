export interface ParsedVideo {
	embedUrl: string;
	thumbnailUrl: string | null;
	isVertical: boolean;
}

/**
 * Validates a video URL and returns embed info, or null if unrecognized.
 * Supported: YouTube (watch, youtu.be, Shorts), Vimeo, Loom.
 */
export function parseVideoUrl(raw: string): ParsedVideo | null {
	try {
		const u = new URL(raw.trim());
		const host = u.hostname.replace('www.', '');

		// YouTube
		if (host === 'youtube.com' || host === 'youtu.be') {
			let id: string | null = null;
			let isShort = false;

			if (host === 'youtu.be') {
				id = u.pathname.slice(1).split('?')[0] || null;
			} else if (u.pathname.startsWith('/shorts/')) {
				id = u.pathname.slice('/shorts/'.length).split('?')[0] || null;
				isShort = true;
			} else if (u.pathname === '/watch') {
				id = u.searchParams.get('v');
			}

			if (!id) return null;
			return {
				embedUrl: `https://www.youtube.com/embed/${id}`,
				thumbnailUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
				isVertical: isShort
			};
		}

		// Vimeo: vimeo.com/{numericId}
		if (host === 'vimeo.com') {
			const id = u.pathname.slice(1).split('/')[0];
			if (!id || !/^\d+$/.test(id)) return null;
			return {
				embedUrl: `https://player.vimeo.com/video/${id}`,
				thumbnailUrl: null,
				isVertical: false
			};
		}

		// Loom: loom.com/share/{id}
		if (host === 'loom.com') {
			const match = u.pathname.match(/\/share\/([a-f0-9]+)/);
			if (!match) return null;
			return {
				embedUrl: `https://www.loom.com/embed/${match[1]}`,
				thumbnailUrl: null,
				isVertical: false
			};
		}

		return null;
	} catch {
		return null;
	}
}
