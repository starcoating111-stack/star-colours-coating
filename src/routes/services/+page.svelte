<script lang="ts">
	import { page } from '$app/stores';
	import { reveal } from '$lib/reveal';

	let { data } = $props<{
		data: { services: any[] };
	}>();

	// High-fidelity specifications matching the service slugs
	const serviceHighlights: Record<string, string[]> = {
		'textured-designs': [
			'Artisan trowel & sponge-based custom patterns',
			'Luxury metallic accents & tactile stone-like textures',
			'Highly durable, crack-resistant, & washable finishes',
			'Ideal for focal walls, lobbies, & premium residential spaces'
		],
		'premium-color-pu-coating': [
			'Flawless mirror-like high-gloss & elegant matte finishes',
			'Advanced polyurethane barrier against scratches & moisture',
			'Non-yellowing & UV-stable formulation for long-lasting color',
			'Premium protection for high-end furniture, cabinetry, & metal accents'
		]
	};
</script>

<svelte:head>
	<title>Our Services | Luxury Architectural Coatings | Star Colours Coating</title>
	<meta
		name="description"
		content="Explore our specialized coating services including high-end textured designs and premium color PU coatings, custom-fitted for luxury residential and commercial projects."
	/>
	<meta property="og:title" content="Our Services | Luxury Architectural Coatings" />
	<meta
		property="og:description"
		content="Explore our specialized coating services including high-end textured designs and premium color PU coatings."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href={$page.url.href} />
</svelte:head>

<main
	class="py-24 bg-gradient-to-b from-zinc-950 via-[#1c120f] to-zinc-950 px-6 selection:bg-zinc-800 selection:text-white"
>
	<div class="max-w-7xl mx-auto space-y-24">
		<!-- Header -->
		<div class="text-center space-y-5 max-w-2xl mx-auto reveal-fade-up" use:reveal>
			<span
				class="text-[10px] font-bold text-brand-accent uppercase tracking-widest font-outfit block"
				>Craftsmanship</span
			>
			<h1
				class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight font-outfit uppercase"
			>
				OUR CAPABILITIES
			</h1>
			<p class="text-zinc-400 text-sm sm:text-base leading-relaxed font-light font-sans">
				Discover the range of services we specialize in. Each service is custom tailored to the
				client's specifications and executed with absolute precision.
			</p>
			<div class="w-24 h-0.5 bg-brand-accent mx-auto mt-6"></div>
		</div>

		<!-- Grid / Stack -->
		{#if data.services.length === 0}
			<div
				class="border border-dashed border-zinc-900 rounded-3xl p-16 text-center text-zinc-550 text-sm font-sans flex flex-col items-center justify-center space-y-4"
			>
				No services available at the moment.
			</div>
		{:else}
			<div class="space-y-24">
				{#each data.services as service, index}
					{@const isEven = index % 2 === 0}
					{@const highlights = serviceHighlights[service.slug] || []}
					<div
						id={service.slug}
						class="flex flex-col lg:flex-row {isEven
							? ''
							: 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-stretch reveal-fade-up"
						use:reveal
					>
						<!-- Image side -->
						<div
							class="w-full lg:w-1/2 relative group rounded-[2.5rem] overflow-hidden border border-zinc-900 shadow-2xl bg-zinc-900 aspect-[16/10]"
						>
							<img
								src="/images/{service.imageUrl}"
								alt={service.title}
								class="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
							/>
							<div
								class="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-transparent to-transparent"
							></div>
						</div>

						<!-- Details side -->
						<div class="w-full lg:w-1/2 flex flex-col justify-center space-y-6">
							<div class="space-y-3">
								<span
									class="text-[10px] font-bold text-brand-accent uppercase tracking-widest block font-outfit"
								>
									Capability 0{index + 1}
								</span>
								<h2
									class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-outfit uppercase tracking-wide"
								>
									{service.title}
								</h2>
								<div class="w-16 h-0.5 bg-brand-accent"></div>
							</div>

							<p class="text-zinc-400 text-sm sm:text-base leading-relaxed font-light font-sans">
								{service.description}
							</p>

							<!-- Dynamic Highlights -->
							{#if highlights.length > 0}
								<div class="space-y-3 pt-2">
									<h4
										class="text-xs font-bold text-white uppercase tracking-widest font-outfit opacity-80"
									>
										Key Features & Specifications
									</h4>
									<ul class="grid grid-cols-1 sm:grid-cols-2 gap-3">
										{#each highlights as spec}
											<li
												class="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed"
											>
												<span class="text-brand-accent font-bold mt-0.5" aria-hidden="true">✓</span>
												<span>{spec}</span>
											</li>
										{/each}
									</ul>
								</div>
							{/if}

							<!-- CTA Action Button -->
							<div class="pt-4">
								<a
									href="/contact?subject=Inquiry: {encodeURIComponent(service.title)}"
									class="inline-flex items-center gap-2.5 text-xs font-bold text-brand-accent hover:text-white transition-colors uppercase tracking-widest font-outfit bg-zinc-900/50 hover:bg-zinc-900 px-6 py-3.5 rounded-xl border border-zinc-850 hover:border-brand-accent/40 shadow-lg group"
								>
									<span>Inquire About This Service</span>
									<span class="inline-block transition-transform group-hover:translate-x-1"
										>&rarr;</span
									>
								</a>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</main>
