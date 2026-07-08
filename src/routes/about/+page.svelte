<script lang="ts">
	import { page } from '$app/stores';
	import { reveal } from '$lib/reveal';
	import { onMount } from 'svelte';

	let { data } = $props<{
		data: {
			teamMembers: Array<{
				id: number;
				name: string;
				designation: string;
				bio?: string | null;
				photoUrl: string | null;
				email?: string | null;
				linkedinUrl?: string | null;
			}>;
		};
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

	const stats = [
		{ value: '21+', label: 'YEARS' },
		{ value: '250+', label: 'PROJECTS' },
		{ value: '350,000+', label: 'SQFT IN EXECUTION' },
		{ value: '50+', label: 'TEAM' }
	];

	const keyValues = [
		{
			title: 'Mastery in Finish',
			desc: 'Every brushstroke and coating is executed with precision—delivering surfaces that exude refinement, elegance, and lasting perfection!'
		},
		{
			title: 'Luxury in Materials',
			desc: 'We work with the finest paints, textures, and finishes—chosen for durability, richness, and timeless appeal, far beyond passing trends!'
		},
		{
			title: 'Trusted Partnerships',
			desc: 'From consultation to the final coat, we collaborate closely with clients—offering a seamless, transparent, and personalized experience!'
		}
	];

	const signatures: Record<string, string> = {
		'kamruddin': '/images/kamruddin.svg',
		'sahil': '/images/sahil.svg'
	};

	function getSignature(name: string) {
		const normalized = name.toLowerCase();
		if (normalized.includes('kamruddin')) return signatures.kamruddin;
		if (normalized.includes('sahil')) return signatures.sahil;
		return null;
	}
</script>

<svelte:head>
	<title>Our Experience | Premium Architectural Finishes | Star Colours Coating</title>
	<meta
		name="description"
		content="Learn about Star Colours Coating's 21+ years of experience in luxury painting, textured finishes, and master surface craftsmanship."
	/>
	<meta property="og:title" content="Our Experience | Star Colours Coating" />
	<meta
		property="og:description"
		content="Learn about Star Colours Coating's 21+ years of experience in luxury painting, textured finishes, and master surface craftsmanship."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href={$page.url.href} />
</svelte:head>

<main class="py-24 bg-gradient-to-b from-zinc-950 via-[#1c120f] to-zinc-950 px-6 sm:px-10 selection:bg-zinc-800 selection:text-white overflow-hidden relative">
	<!-- Background graphic glows -->
	<div class="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none"></div>
	<div class="absolute bottom-1/4 right-1/10 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none"></div>

	<div class="max-w-7xl mx-auto space-y-24 relative z-10">
		
		<!-- Breadcrumbs & Breadcrumb container -->
		<div class="flex items-center gap-2 text-[10px] font-bold tracking-widest text-zinc-500 uppercase font-outfit reveal-fade-up" use:reveal>
			<a href="/" class="hover:text-brand-accent transition-colors">Home</a>
			<span>/</span>
			<span class="text-brand-accent">Our Experience</span>
		</div>

		<!-- Section 1: Hero split text + image -->
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center reveal-fade-up" use:reveal>
			<!-- Text Side -->
			<div class="lg:col-span-7 space-y-6">
				<div class="inline-flex items-center gap-2">
					<span class="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
					<span class="text-[10px] font-bold text-brand-accent uppercase tracking-widest font-outfit">
						OUR IDENTITY
					</span>
				</div>
				<h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-outfit uppercase tracking-tight leading-tight">
					ESTABLISHED EXCELLENCE
				</h1>
				<p class="text-zinc-300 text-sm sm:text-base leading-relaxed font-light font-sans text-justify">
					At Star Colours Coating, our identity is defined by elegance, innovation, and precision. We believe every surface holds the potential to be transformed into a work of art. By blending luxury aesthetics with professional craftsmanship, we create finishes that are both timeless and durable, making Star Colours Coating a trusted name for clients who seek excellence without compromise!
				</p>
				<p class="text-zinc-300 text-sm sm:text-base leading-relaxed font-light font-sans text-justify">
					Our brand reflects a commitment to premium quality, trust, and perfection — values that resonate with discerning clients, interior designers, and industry leaders alike. Every project we take on is more than just a service; it's a promise to elevate spaces, inspire confidence, and leave a lasting impression. With Star Colours Coating, surfaces don't just look finished — they look flawlessly perfected!
				</p>
			</div>

			<!-- Image Side: Certificate Image with Parallax -->
			<div class="lg:col-span-5 flex justify-center">
				<div 
					class="w-full max-w-[450px] aspect-square rounded-[2rem] overflow-hidden border border-zinc-900/60 shadow-2xl bg-zinc-900/30 backdrop-blur-sm p-3 will-change-transform"
					style="transform: translateY({scrollY * -0.25}px);"
				>
					<img
						src="/images/certificate.jpg"
						alt="Congratulations certificate plaque to Star Colours Coating for successfully achieving ICA Blue Stars club"
						class="w-full h-full object-cover rounded-[1.5rem]"
					/>
				</div>
			</div>
		</div>

		<!-- Section 2: Stats Grid -->
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 reveal-fade-up" use:reveal>
			{#each stats as stat}
				<div class="bg-brand-card border border-zinc-900/80 rounded-2xl p-6 text-center shadow-lg hover:border-brand-accent/25 transition-all duration-300 group">
					<span class="text-3xl sm:text-4xl font-extrabold text-brand-accent font-outfit tracking-wide block transition-transform group-hover:scale-[1.03]">
						{stat.value}
					</span>
					<span class="text-[9px] sm:text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-outfit mt-2 block group-hover:text-zinc-400 transition-colors">
						{stat.label}
					</span>
				</div>
			{/each}
		</div>

		<!-- Section 3: Key Values Cards -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 reveal-fade-up" use:reveal>
			{#each keyValues as kv}
				<div class="bg-brand-card border border-zinc-900/80 rounded-3xl p-8 space-y-4 shadow-xl hover:border-brand-accent/20 transition-all duration-300 group relative overflow-hidden">
					<!-- Subtle top gold light -->
					<div class="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent group-hover:via-brand-accent/50 transition-all"></div>
					<h3 class="font-extrabold text-white text-base sm:text-lg font-outfit uppercase tracking-wide group-hover:text-brand-accent transition-colors">
						{kv.title}
					</h3>
					<div class="w-12 h-0.5 bg-brand-accent/40 group-hover:w-20 transition-all"></div>
					<p class="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans font-light">
						{kv.desc}
					</p>
				</div>
			{/each}
		</div>

		<!-- Section 4: Founders Grid (Dynamic using teamMembers data) -->
		{#if data.teamMembers.length > 0}
			<div class="space-y-20 border-t border-zinc-900/60 pt-20">
				<!-- Founders Section Header -->
				<div class="text-center space-y-3 max-w-2xl mx-auto reveal-fade-up" use:reveal>
					<span class="text-[10px] font-bold text-brand-accent uppercase tracking-widest font-outfit block">
						OUR LEADERSHIP
					</span>
					<h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase font-outfit">
						MEET THE FOUNDERS
					</h2>
					<div class="w-24 h-0.5 bg-brand-accent mx-auto mt-4"></div>
				</div>

				<!-- Dynamic Founders Alternating Grid -->
				<div class="space-y-20 sm:space-y-24">
					{#each data.teamMembers as member, index}
						{@const isEven = index % 2 === 0}
						<div class="flex flex-col lg:flex-row {isEven ? '' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center reveal-fade-up" use:reveal>
							<!-- Image frame -->
							<div class="w-full lg:w-5/12 flex justify-center">
								<div class="w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] bg-zinc-900 border border-brand-accent/15 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] group hover:border-brand-accent/40 transition-colors duration-500 p-2">
									{#if member.photoUrl}
										<img
											src="/images/{member.photoUrl}"
											alt={member.name}
											class="w-full h-full object-cover rounded-[1.5rem] transition-transform duration-700 group-hover:scale-105"
										/>
									{:else}
										<div class="w-full h-full rounded-[1.5rem] bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center text-zinc-700 font-outfit text-xs uppercase">
											No Image
										</div>
									{/if}
								</div>
							</div>

							<!-- Details copy -->
							<div class="w-full lg:w-7/12 flex flex-col justify-center space-y-4 sm:space-y-5 text-left">
								<div class="space-y-1">
									<h3 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-outfit uppercase tracking-wide">
										{member.name}
									</h3>
									<p class="text-xs font-bold text-brand-accent uppercase tracking-widest font-outfit">
										{member.designation}
									</p>
									<div class="w-16 h-0.5 bg-brand-accent mt-3"></div>
								</div>
								{#if member.bio}
									<p class="text-zinc-300 text-sm sm:text-base leading-relaxed font-light font-sans text-justify">
										"{member.bio}"
									</p>
								{/if}

								{#if getSignature(member.name)}
									<div class="pt-2 self-start">
										<img
											src={getSignature(member.name)}
											alt="{member.name}'s signature"
											class="h-12 sm:h-14 w-auto object-contain brightness-200 opacity-85 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
										/>
									</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

	</div>
</main>
