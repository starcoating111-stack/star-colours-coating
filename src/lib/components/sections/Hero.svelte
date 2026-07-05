<script lang="ts">
	let { settings } = $props<{
		settings: { companyName: string; tagline?: string | null };
	}>();

	// Stagger delays (ms) per card so they reveal one-by-one on page load
	const textureCards = [
		{
			id: 1,
			name: 'Grooved Plaster',
			image: '/images/placeholder_texture_1.png',
			isTorn: false,
			delay: 0
		},
		{
			id: 2,
			name: 'Stone Cladding',
			image: '/images/placeholder_texture_2.png',
			isTorn: true,
			delay: 150
		},
		{
			id: 3,
			name: 'Textured Roller',
			image: '/images/placeholder_texture_3.png',
			isTorn: true,
			delay: 300
		},
		{
			id: 4,
			name: 'Airless Spray',
			image: '/images/placeholder_texture_4.png',
			isTorn: false,
			delay: 450
		}
	];
</script>

<section
	class="relative min-h-screen flex flex-col justify-between bg-zinc-950 px-4 sm:px-6 pt-8 pb-10 overflow-hidden selection:bg-zinc-800 selection:text-white"
>
	<!-- Smoky Nebula background -->
	<div
		class="absolute inset-0 bg-cover bg-center opacity-65 z-0"
		style="background-image: url('/images/hero_bg.png');"
	></div>
	<div
		class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-zinc-950/80 z-0"
	></div>

	<!-- Texture Cards + CTA — centred in the section -->
	<div
		class="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center gap-8 sm:gap-10 flex-1 py-10"
	>
		<!-- 4 Texture cards, appearing one by one -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 w-full max-w-5xl items-stretch">
			{#each textureCards as card}
				<!-- Each card has its own fadeInUp with staggered delay -->
				<div
					class="relative overflow-hidden aspect-[9/16] md:aspect-[3/5] transition-all duration-500 hover:scale-[1.03] group shadow-2xl animate-fade-in-up"
					style="animation-delay: {card.delay}ms;"
				>
					{#if card.isTorn}
						<div class="w-full h-full relative overflow-hidden bg-zinc-900 torn-paper">
							<img
								src={card.image}
								alt={card.name}
								class="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
							/>
						</div>
					{:else}
						<div
							class="w-full h-full relative overflow-hidden bg-zinc-900 rounded-3xl border border-zinc-900/40"
						>
							<img
								src={card.image}
								alt={card.name}
								class="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
							/>
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Let's Work Together CTA — sits cleanly BELOW the cards -->
		<div class="animate-fade-in-up" style="animation-delay: 600ms;">
			<a
				href="/contact"
				class="inline-flex items-center gap-3 bg-zinc-950/60 hover:bg-zinc-900/80 border border-zinc-700/60 hover:border-brand-accent/50 text-zinc-300 hover:text-white px-8 py-3.5 rounded-full backdrop-blur-md transition-all text-sm font-semibold tracking-wider font-outfit shadow-2xl active:scale-95 group"
			>
				Let's Work Together
				<span class="inline-block transition-transform group-hover:translate-x-1.5">&rarr;</span>
			</a>
		</div>
	</div>

	<!-- Scroll hint at bottom -->
	<div
		class="w-full text-center text-zinc-600 text-[10px] tracking-[0.25em] font-outfit z-10 uppercase pb-2 animate-fade-in-up"
		style="animation-delay: 800ms;"
	>
		SCROLL TO DISCOVER
	</div>
</section>
