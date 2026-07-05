<script lang="ts">
	import { page } from '$app/stores';

	let { data } = $props<{
		data: { services: any[] };
	}>();
</script>

<svelte:head>
	<title>Our Services | Professional Web & Structural Capabilities</title>
	<meta
		name="description"
		content="Explore our specialized services including high-performance web engineering and structural design systems custom-fitted for enterprise growth."
	/>
	<meta property="og:title" content="Our Services | Professional Capabilities" />
	<meta
		property="og:description"
		content="Explore our specialized services including high-performance web engineering and structural design systems."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href={$page.url.href} />
</svelte:head>

<main class="py-20 bg-brand-dark px-6 selection:bg-zinc-800 selection:text-white">
	<div class="max-w-7xl mx-auto space-y-16 animate-fade-in-up">
		<!-- Header -->
		<div class="text-center space-y-4 max-w-xl mx-auto">
			<span class="text-[10px] font-bold text-brand-accent uppercase tracking-widest font-outfit"
				>Expertise</span
			>
			<h2 class="text-4xl font-extrabold text-white tracking-tight font-serif">Our Services</h2>
			<p class="text-zinc-400 text-sm leading-relaxed">
				Discover the range of services we specialize in. Each service is custom tailored to the
				client's specifications.
			</p>
		</div>

		<!-- Grid -->
		{#if data.services.length === 0}
			<div
				class="border border-dashed border-zinc-900 rounded-2xl p-12 text-center text-zinc-650 text-sm"
			>
				No services available at the moment.
			</div>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each data.services as service}
					<div
						id={service.slug}
						class="group bg-brand-card border border-zinc-900/50 rounded-3xl overflow-hidden flex flex-col justify-between h-full hover:border-brand-accent/20 transition-all duration-300"
					>
						<div
							class="aspect-video w-full bg-zinc-950 overflow-hidden border-b border-zinc-900/40"
						>
							<img
								src="/images/{service.imageUrl}"
								alt={service.title}
								class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
							/>
						</div>
						<div class="p-6 flex-1 flex flex-col justify-between gap-4">
							<div class="space-y-2">
								<h3
									class="font-bold text-lg text-white group-hover:text-brand-accent transition-colors font-outfit uppercase leading-tight"
								>
									{service.title}
								</h3>
								<p class="text-xs text-zinc-450 leading-relaxed font-light">
									{service.description}
								</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</main>
