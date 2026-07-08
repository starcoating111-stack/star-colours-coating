<script lang="ts">
	import { reveal } from '$lib/reveal';
	import { onMount } from 'svelte';

	let { projects = [] } = $props<{
		projects?: Array<{
			id: number;
			title: string;
			slug: string;
			category: string;
			location: string;
			coverImageUrl: string;
		}>;
	}>();

	let gridRef = $state<HTMLElement | null>(null);
	let parallaxOffset = $state(0);

	onMount(() => {
		const handleScroll = () => {
			if (!gridRef) return;
			const rect = gridRef.getBoundingClientRect();
			const viewportHeight = window.innerHeight;
			if (rect.top < viewportHeight && rect.bottom > 0) {
				const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
				// Max translate 24px (ranges from -12px to +12px) for subtle card parallax
				parallaxOffset = (progress - 0.5) * 24;
			}
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<section
	id="portfolio"
	class="py-24 bg-gradient-to-b from-[#140d0b] to-[#0c0807] px-6 border-t border-zinc-900/10 selection:bg-zinc-800 selection:text-white relative overflow-hidden"
>
	<div class="max-w-7xl mx-auto space-y-16">
		<!-- Header -->
		<div class="text-center space-y-4 max-w-2xl mx-auto reveal-fade-up" use:reveal>
			<h2
				class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase font-outfit"
			>
				OUR PORTFOLIO
			</h2>
			<p
				class="text-zinc-400 text-sm sm:text-base leading-relaxed font-light font-sans max-w-xl mx-auto"
			>
				Experience craftsmanship and innovation — from immersive visuals to unforgettable moments.
			</p>
			<div class="w-24 h-0.5 bg-brand-accent mx-auto mt-6"></div>
		</div>

		<!-- Portfolio Grid -->
		{#if projects.length === 0}
			<div
				class="border border-dashed border-zinc-800/80 rounded-3xl p-16 text-center text-zinc-550 text-sm font-sans animate-fade-in-up delay-100 flex flex-col items-center justify-center space-y-4"
			>
				<div
					class="w-12 h-12 rounded-full bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-zinc-600"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
						/>
					</svg>
				</div>
				<span class="max-w-md leading-relaxed">
					No featured projects found in the database. Please add projects via the admin dashboard
					and check the <strong>"Featured"</strong> option.
				</span>
			</div>
		{:else}
			<div
				bind:this={gridRef}
				class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 reveal-fade-up"
				use:reveal
			>
				{#each projects as project}
					<a
						href="/projects/{project.slug}"
						class="group bg-brand-card border border-zinc-900/80 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-500 hover:scale-[1.02] hover:border-brand-accent/30 hover:shadow-[0_10px_30px_rgba(197,168,128,0.1)]"
					>
						<!-- Project Image -->
						<div
							class="aspect-[16/10] w-full bg-zinc-950 overflow-hidden relative border-b border-zinc-900/60"
						>
							<img
								src="/images/{project.coverImageUrl}"
								alt={project.title}
								class="w-full h-[115%] absolute left-0 top-[-7.5%] object-cover transition-transform duration-700 group-hover:scale-[1.08] will-change-transform motion-reduce:transform-none"
								style="transform: translateY({parallaxOffset}px);"
							/>
							<span
								class="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold bg-zinc-950/80 border border-zinc-800 text-brand-accent uppercase tracking-wider font-outfit backdrop-blur-md shadow-lg"
							>
								{project.category}
							</span>
						</div>

						<!-- Always-visible details -->
						<div class="p-6 sm:p-7 flex flex-col justify-between flex-1 gap-4">
							<div class="space-y-1.5">
								<h3
									class="text-white font-extrabold text-lg font-outfit uppercase group-hover:text-brand-accent transition-colors leading-snug"
								>
									{project.title}
								</h3>
								<span class="text-xs text-zinc-400 font-sans block flex items-center gap-1.5">
									<svg
										class="w-3.5 h-3.5 text-zinc-500 flex-shrink-0"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
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
									<span>{project.location}</span>
								</span>
							</div>

							<div
								class="pt-3 border-t border-zinc-900/60 flex items-center justify-between text-xs font-bold text-brand-accent uppercase tracking-widest font-outfit group-hover:translate-x-1 transition-transform"
							>
								<span>View Case Study</span>
								<span class="text-base leading-none">&rarr;</span>
							</div>
						</div>
					</a>
				{/each}
			</div>
		{/if}

		{#if projects.length > 0}
			<div class="text-center pt-8 reveal-fade-up" use:reveal>
				<a
					href="/projects"
					class="inline-flex items-center gap-2 text-xs font-bold text-brand-accent hover:text-white transition-colors uppercase tracking-widest font-outfit bg-zinc-900/50 hover:bg-zinc-900 px-6 py-3.5 rounded-xl border border-zinc-850 hover:border-brand-accent/40 shadow-lg"
				>
					<span>Browse Full Portfolio</span>
					<span>&rarr;</span>
				</a>
			</div>
		{/if}
	</div>
</section>
