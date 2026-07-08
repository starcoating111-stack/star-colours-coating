<script lang="ts">
	import { page } from '$app/stores';
	import { reveal } from '$lib/reveal';

	let { data } = $props<{
		data: {
			service: {
				id: number;
				title: string;
				slug: string;
				description: string;
				imageUrl: string;
				icon?: string | null;
			};
		};
	}>();

	const service = $derived(data.service);

	// Predefined specifications for dynamic services matching the main ones
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

	const highlights = $derived(serviceHighlights[service.slug] || [
		'Premium architectural formulation',
		'Meticulously applied by master artisans',
		'High weather ability and UV resilience',
		'Tailored color matches and gloss options'
	]);
</script>

<svelte:head>
	<title>{service.title} | Luxury Architectural Coatings | Star Colours Coating</title>
	<meta name="description" content={service.description} />
	<meta property="og:title" content="{service.title} | Luxury Architectural Coatings" />
	<meta property="og:description" content={service.description} />
	<meta property="og:type" content="website" />
	<link rel="canonical" href={$page.url.href} />
</svelte:head>

<main class="min-h-[85vh] flex items-center py-20 px-6 sm:px-10 lg:px-16 overflow-hidden relative bg-gradient-to-b from-zinc-950 via-[#1c120f] to-zinc-950 selection:bg-zinc-800 selection:text-white">
	<!-- Background graphic glows -->
	<div class="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none"></div>
	<div class="absolute bottom-1/4 right-1/10 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none"></div>

	<div class="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
		
		<!-- Left Column: Details & Headlines -->
		<div class="lg:col-span-7 flex flex-col justify-center space-y-8 reveal-fade-up" use:reveal>
			
			<!-- Breadcrumbs -->
			<nav aria-label="Breadcrumb" class="space-y-2">
				<div class="flex items-center gap-2 text-[10px] font-bold tracking-widest text-zinc-500 uppercase font-outfit">
					<a href="/" class="hover:text-brand-accent transition-colors">Home</a>
					<span>/</span>
					<a href="/services" class="hover:text-brand-accent transition-colors">Services</a>
					<span>/</span>
					<span class="text-brand-accent">{service.title}</span>
				</div>
			</nav>

			<!-- Service Title & Intro -->
			<div class="space-y-4">
				<span class="text-[10px] font-bold text-brand-accent uppercase tracking-widest block font-outfit">
					Signature Finish
				</span>
				<h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-outfit uppercase leading-[1.1] max-w-2xl">
					{service.title}
				</h1>
				<div class="w-20 h-1 bg-brand-accent mt-4"></div>
			</div>

			<!-- Description -->
			<p class="text-zinc-300 text-sm sm:text-base leading-relaxed font-light font-sans max-w-2xl">
				{service.description}
			</p>

			<!-- Highlights & Specifications -->
			<div class="space-y-4 border-t border-zinc-900/60 pt-6">
				<h3 class="text-xs font-bold text-white uppercase tracking-widest font-outfit opacity-80">
					Key Features & Specifications
				</h3>
				<ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{#each highlights as highlight}
						<li class="flex items-start gap-3 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
							<span class="text-brand-accent font-bold mt-0.5" aria-hidden="true">✓</span>
							<span>{highlight}</span>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Actions CTA -->
			<div class="pt-6 flex flex-wrap items-center gap-4 sm:gap-6">
				<a
					href="/contact?subject=Inquiry: {encodeURIComponent(service.title)}"
					class="inline-flex items-center gap-2.5 text-xs font-bold text-brand-dark bg-brand-accent hover:bg-brand-accent/90 transition-all uppercase tracking-widest font-outfit px-8 py-4 rounded-xl shadow-xl active:scale-95 group"
				>
					<span>Inquire About This Service</span>
					<span class="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
				</a>
				<a
					href="/services"
					class="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest font-outfit"
				>
					<span>&larr; Back to Services</span>
				</a>
			</div>
		</div>

		<!-- Right Column: Cropped Favicon Watermark & Service Image Layer -->
		<div class="lg:col-span-5 flex items-center justify-center relative min-h-[400px] lg:min-h-[550px] overflow-hidden rounded-[2.5rem] bg-zinc-950/30 border border-zinc-900/50 backdrop-blur-md reveal-fade-up" use:reveal>
			
			<!-- Giant Cropped Favicon (seen half only, translated off-screen on the right) -->
			<img 
				src="/favicon.png" 
				alt="" 
				class="absolute -right-1/4 w-[110%] sm:w-[120%] lg:w-[130%] max-w-[550px] aspect-square object-contain opacity-[0.05] filter grayscale contrast-125 select-none pointer-events-none translate-x-[15%] lg:translate-x-[20%] z-0"
				aria-hidden="true"
			/>
			
			<!-- Floating high-fidelity photo frame containing the service's main photo -->
			<div class="w-[85%] max-w-[340px] sm:max-w-[380px] aspect-[4/5] bg-zinc-900 border border-brand-accent/15 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative z-10 group hover:border-brand-accent/40 transition-colors duration-500">
				<img
					src="/images/{service.imageUrl}"
					alt={service.title}
					class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
				/>
				<div class="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent"></div>
				
				<!-- Subtle watermark-label on photo -->
				<div class="absolute bottom-6 left-6 right-6">
					<p class="text-[9px] font-bold text-brand-accent uppercase tracking-widest font-outfit">
						Coating Detail
					</p>
					<h3 class="text-white text-base font-extrabold uppercase font-outfit mt-1 tracking-wide truncate">
						{service.title}
					</h3>
				</div>
			</div>
		</div>
	</div>
</main>
