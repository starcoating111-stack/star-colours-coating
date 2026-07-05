<script lang="ts">
	import starLogo from '$lib/assets/star-logo.png';

	let { settings, services = [] } = $props<{
		settings: {
			companyName: string;
			logoUrl?: string | null;
			tagline?: string | null;
			phone?: string | null;
			email?: string | null;
			address?: string | null;
			workingHours?: string | null;
			socialLinks?: {
				facebook?: string;
				instagram?: string;
				linkedin?: string;
				twitter?: string;
				youtube?: string;
			} | null;
		};
		services?: Array<{ id: number; title: string; slug: string }>;
	}>();

	let logoSrc = $derived.by(() => {
		if (!settings?.logoUrl) return starLogo;
		if (
			settings.logoUrl.startsWith('http://') ||
			settings.logoUrl.startsWith('https://') ||
			settings.logoUrl.startsWith('/')
		) {
			return settings.logoUrl;
		}
		return `/images/${settings.logoUrl}`;
	});

	const currentYear = new Date().getFullYear();
</script>

<footer
	class="bg-[#180f0c] border-t border-zinc-900/60 text-zinc-400 py-16 selection:bg-zinc-800 selection:text-white font-sans"
>
	<div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
		<!-- Column 1: Branding -->
		<div class="space-y-6">
			<div class="flex items-center">
				<img
					src={logoSrc}
					alt={settings.companyName || 'Star Colours Coating'}
					class="h-10 sm:h-12 w-auto max-w-[180px] object-contain"
				/>
			</div>
			<p class="text-xs text-zinc-300 font-sans leading-relaxed">
				"{settings.tagline ||
					'Crafting premium coatings that inspire elegance and perfection in every detail!'}"
			</p>
			<!-- Social links with SVG icons -->
			{#if settings.socialLinks && Object.keys(settings.socialLinks).length > 0}
				<div class="flex gap-4 pt-2">
					{#each Object.entries(settings.socialLinks) as [platform, url]}
						{#if url}
							<a
								href={url as string}
								target="_blank"
								rel="noopener noreferrer"
								class="text-zinc-400 hover:text-white transition-colors"
								aria-label={platform}
							>
								{#if platform.toLowerCase() === 'facebook'}
									<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
										<path
											d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"
										/>
									</svg>
								{:else if platform.toLowerCase() === 'instagram'}
									<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
										<path
											d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
										/>
									</svg>
								{:else if platform.toLowerCase() === 'linkedin'}
									<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
										<path
											d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
										/>
									</svg>
								{:else}
									<span class="text-xs uppercase hover:underline">{platform}</span>
								{/if}
							</a>
						{/if}
					{/each}
				</div>
			{/if}
		</div>

		<!-- Column 2: About Us! -->
		<div class="space-y-4">
			<h4 class="text-sm font-semibold text-white uppercase tracking-wider font-outfit">
				About Us!
			</h4>
			<p class="text-xs text-zinc-400 leading-relaxed font-sans font-light">
				{settings.companyName || 'Star Colours Coating'} is dedicated to redefining the art of finishing.
				From wood to surface coatings, we bring together innovative techniques, premium materials, and
				skilled expertise to create finishes that are both timeless and durable. Our commitment is simple
				— to inspire trust, add value, and deliver perfection in every project. We take pride in transforming
				every surface into a statement of elegance and perfection!
			</p>
		</div>

		<!-- Column 3: Our Services! -->
		<div class="space-y-4">
			<h4 class="text-sm font-semibold text-white uppercase tracking-wider font-outfit">
				Our Services!
			</h4>
			{#if services && services.length > 0}
				<div class="flex flex-wrap gap-2 pt-2">
					{#each services as service}
						<a
							href="/services#{service.slug}"
							class="text-[10px] text-zinc-300 border border-zinc-850 hover:border-brand-accent/40 bg-zinc-900/30 px-3 py-1.5 rounded-full transition-all duration-300 font-sans tracking-wide hover:text-white"
						>
							{service.title}
						</a>
					{/each}
				</div>
			{:else}
				<p class="text-xs text-zinc-500 italic">No services listed.</p>
			{/if}
		</div>

		<!-- Column 4: Let's Talk! -->
		<div class="space-y-4">
			<h4 class="text-sm font-semibold text-white uppercase tracking-wider font-outfit">
				Let's Talk!
			</h4>
			<ul class="space-y-4 text-xs text-zinc-400 font-sans">
				<li class="flex items-start gap-3">
					<svg
						class="w-4.5 h-4.5 text-brand-accent flex-shrink-0 mt-0.5"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
					<span>{settings.address || 'S.V Road, Santacruz West, Mumbai-400055'}</span>
				</li>
				<li class="flex items-center gap-3">
					<svg
						class="w-4.5 h-4.5 text-brand-accent flex-shrink-0"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
						/>
					</svg>
					{#if settings.phone}
						<a href="tel:{settings.phone}" class="hover:text-zinc-200 transition-colors"
							>{settings.phone}</a
						>
					{:else}
						<a href="tel:9930457555" class="hover:text-zinc-200 transition-colors"
							>99304 57555 / 98923 71686</a
						>
					{/if}
				</li>
				<li class="flex items-center gap-3">
					<svg
						class="w-4.5 h-4.5 text-brand-accent flex-shrink-0"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						/>
					</svg>
					{#if settings.email}
						<a href="mailto:{settings.email}" class="hover:text-zinc-200 transition-colors"
							>{settings.email}</a
						>
					{:else}
						<a href="mailto:starcoating111@gmail.com" class="hover:text-zinc-200 transition-colors"
							>starcoating111@gmail.com</a
						>
					{/if}
				</li>
			</ul>
		</div>
	</div>

	<!-- Bottom Bar -->
	<div
		class="max-w-7xl mx-auto px-6 border-t border-zinc-900/40 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-zinc-500 font-sans"
	>
		<span>
			&copy; {currentYear}
			{settings.companyName || 'Star Colours Coating'} • Finishing with Perfection! All rights reserved.
		</span>
		<span>
			Designed & Developed by <a
				href="https://codenxtlab.tech/"
				target="_blank"
				rel="noopener noreferrer"
				class="hover:text-zinc-300 underline transition-colors">CodeNXT Lab</a
			>
		</span>
	</div>
</footer>
