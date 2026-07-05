<script lang="ts">
	import { onMount } from 'svelte';

	let { settings } = $props<{
		settings: { companyName: string; tagline?: string | null };
	}>();

	let scrollY = $state(0);

	onMount(() => {
		const handleScroll = () => {
			scrollY = window.scrollY;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	const textureCards = [
		{ id: 1, name: 'Grooved Plaster', image: '/images/placeholder_texture_1.png', isTorn: false, delay: 0 },
		{ id: 2, name: 'Stone Cladding',  image: '/images/placeholder_texture_2.png', isTorn: true,  delay: 80 },
		{ id: 3, name: 'Textured Roller', image: '/images/placeholder_texture_3.png', isTorn: true,  delay: 160 },
		{ id: 4, name: 'Airless Spray',   image: '/images/placeholder_texture_4.png', isTorn: false, delay: 240 }
	];
</script>

<!--
  h-svh  = exactly one viewport height (accounts for mobile browser chrome).
  flex-col keeps all three zones (text / cards / cta) stacked and contained.
-->
<section
	class="relative h-svh flex flex-col bg-zinc-950 overflow-hidden selection:bg-zinc-800 selection:text-white"
>
	<!-- Parallax nebula background -->
	<div
		class="absolute inset-0 bg-cover bg-center opacity-55 z-0 will-change-transform"
		style="background-image: url('/images/hero_bg.png'); transform: translateY({scrollY * 0.3}px) scale(1.08);"
	></div>
	<div class="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/20 to-zinc-950/90 z-0"></div>


	<!-- ── Cards (fills entire viewport between top and CTA) ── -->
	<div class="relative z-10 flex-1 min-h-0 px-2.5 sm:px-4 pt-3 sm:pt-4">
		<!--
			On mobile : 2 × 2 grid, each cell fills the grid row's full height.
			On desktop: 4-col row, cards tall to fill viewport.
		-->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 h-full">
			{#each textureCards as card}
				<div
					class="relative overflow-hidden group shadow-2xl animate-fade-in-up h-full"
					style="animation-delay: {card.delay}ms;"
				>
					<div
						class="w-full h-full relative overflow-hidden {card.isTorn
							? 'bg-zinc-900'
							: 'rounded-2xl sm:rounded-3xl bg-zinc-900 border border-zinc-800/30'}"
					>
						<img
							src={card.image}
							alt={card.name}
							class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
							loading="eager"
						/>
						<!-- Label: always on mobile, hover on desktop -->
						<div
							class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent pt-8 pb-2.5 px-2.5 sm:pb-4 sm:px-4
							md:opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-300"
						>
							<p class="text-white text-[9px] sm:text-xs font-bold font-outfit uppercase tracking-widest drop-shadow">
								{card.name}
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ── Zone 3: CTA + scroll hint (shrinks to fit, never grows) ── -->
	<div class="relative z-10 flex-shrink-0 flex flex-col items-center gap-2 pt-3 pb-4 sm:pt-4 sm:pb-5 animate-fade-in-up" style="animation-delay: 320ms;">
		<a
			href="/contact"
			class="inline-flex items-center gap-3 bg-zinc-950/70 hover:bg-zinc-900/80 border border-zinc-700/60 hover:border-brand-accent/50 text-zinc-300 hover:text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full backdrop-blur-md transition-all text-xs sm:text-sm font-semibold tracking-wider font-outfit shadow-2xl active:scale-95 group"
		>
			Let's Work Together
			<span class="inline-block transition-transform group-hover:translate-x-1.5">&rarr;</span>
		</a>
		<p class="text-zinc-600 text-[8px] sm:text-[9px] tracking-[0.25em] font-outfit uppercase">
			SCROLL TO DISCOVER
		</p>
	</div>
</section>
