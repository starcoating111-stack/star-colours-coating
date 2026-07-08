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
		{ id: 1, name: 'Grooved Plaster', image: '/images/placeholder_texture_1.jpeg', isTorn: false, delay: 0 },
		{ id: 2, name: 'Stone Cladding',  image: '/images/placeholder_texture_2.jpeg', isTorn: true,  delay: 800 },
		{ id: 3, name: 'Textured Roller', image: '/images/placeholder_texture_3.jpeg', isTorn: true,  delay: 1600 },
		{ id: 4, name: 'Airless Spray',   image: '/images/placeholder_texture_4.jpeg', isTorn: false, delay: 2400 }
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
			On desktop: 4-column horizontal flex accordion.
		-->
		<div class="grid grid-cols-2 md:flex md:flex-row gap-2 sm:gap-3 md:gap-4 h-full">
			{#each textureCards as card}
				<div
					class="relative overflow-hidden group shadow-2xl animate-fade-in-up h-full
					transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
					md:flex-1 md:hover:flex-[1.8] rounded-2xl sm:rounded-3xl md:rounded-[2.5rem]
					motion-reduce:transition-none motion-reduce:hover:flex-1"
					style="animation-delay: {card.delay}ms;"
				>
					<div
						class="w-full h-full relative overflow-hidden bg-zinc-950/20 border border-white/10 border-t-white/20 border-l-white/20 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:border-brand-accent/40 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem]"
					>
						<img
							src={card.image}
							alt={card.name}
							class="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:transform-none"
							loading="eager"
						/>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ── Zone 3: CTA + scroll hint (shrinks to fit, never grows) ── -->
	<div class="relative z-10 flex-shrink-0 flex flex-col items-center gap-2 pt-3 pb-4 sm:pt-4 sm:pb-5 animate-fade-in-up" style="animation-delay: 320ms;">
		<a
			href="/contact"
			class="inline-flex items-center gap-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-brand-accent/40 border-t-white/20 border-l-white/20 text-zinc-200 hover:text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full backdrop-blur-xl transition-all duration-300 text-xs sm:text-sm font-bold tracking-wider font-outfit shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] active:scale-95 group"
		>
			Let's Work Together
			<span class="inline-block transition-transform group-hover:translate-x-1.5 text-brand-accent">&rarr;</span>
		</a>
		<p class="text-zinc-600 text-[8px] sm:text-[9px] tracking-[0.25em] font-outfit uppercase">
			SCROLL TO DISCOVER
		</p>
	</div>
</section>
