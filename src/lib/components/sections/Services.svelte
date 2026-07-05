<script lang="ts">
	let { services = [] } = $props<{
		services?: Array<{
			id: number;
			title: string;
			slug: string;
			description: string;
			imageUrl: string;
			icon?: string | null;
		}>;
	}>();
</script>

<section
	id="services"
	class="py-24 bg-brand-dark px-6 border-t border-zinc-900/60 selection:bg-zinc-800 selection:text-white relative overflow-hidden"
>
	<div class="max-w-7xl mx-auto space-y-16 animate-fade-in-up">
		<!-- Header -->
		<div class="text-center space-y-4 max-w-2xl mx-auto">
			<div class="inline-flex items-center gap-2">
				<span class="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
				<span class="text-[10px] font-bold text-brand-accent uppercase tracking-widest font-outfit">
					OUR EXPERTISE
				</span>
			</div>
			<h2
				class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase font-outfit"
			>
				SIGNATURE SERVICES
			</h2>
			<p
				class="text-zinc-400 text-sm sm:text-base leading-relaxed font-light font-sans max-w-xl mx-auto"
			>
				Experience craftsmanship and innovation — from immersive luxury coatings to flawless
				protective finishes.
			</p>
			<div class="w-24 h-0.5 bg-brand-accent mx-auto mt-6"></div>
		</div>

		<!-- Services Grid -->
		{#if services.length === 0}
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
							d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						/>
					</svg>
				</div>
				<span class="max-w-md leading-relaxed">
					No services found in the database. Please add services via the admin dashboard to display
					them here.
				</span>
			</div>
		{:else}
			<div
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up delay-100"
			>
				{#each services as service}
					<a
						href="/services#{service.slug}"
						class="group bg-brand-card border border-zinc-900/80 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-500 hover:scale-[1.02] hover:border-brand-accent/30 hover:shadow-[0_10px_30px_rgba(197,168,128,0.1)]"
					>
						<!-- Image Header -->
						<div
							class="aspect-video w-full bg-zinc-950 overflow-hidden relative border-b border-zinc-900/60"
						>
							{#if service.imageUrl}
								<img
									src="/images/{service.imageUrl}"
									alt={service.title}
									class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
								/>
							{:else}
								<div
									class="w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center text-zinc-700 font-outfit text-xs uppercase"
								>
									No Image
								</div>
							{/if}
							<div
								class="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
							></div>
						</div>

						<!-- Content -->
						<div class="p-7 flex flex-col justify-between flex-1 gap-6">
							<div class="space-y-3">
								<h3
									class="text-white font-extrabold text-xl font-outfit uppercase group-hover:text-brand-accent transition-colors leading-snug"
								>
									{service.title}
								</h3>
								<p class="text-xs text-zinc-400 font-sans leading-relaxed line-clamp-3">
									{service.description}
								</p>
							</div>

							<div
								class="pt-4 border-t border-zinc-900/60 flex items-center justify-between text-xs font-bold text-brand-accent uppercase tracking-widest font-outfit group-hover:translate-x-1 transition-transform"
							>
								<span>Read specifications</span>
								<span class="text-base leading-none">&rarr;</span>
							</div>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</section>
