<script lang="ts">
	import { page } from '$app/stores';

	let { data } = $props<{
		data: {
			project: {
				title: string;
				description: string;
				category: string;
				location: string;
				completionDate: string;
				coverImageUrl: string;
				clientName: string | null;
				area: string | null;
				budget: string | null;
			};
			media: Array<{
				id: number;
				mediaType: 'image' | 'video';
				imageUrl: string | null;
				embedUrl: string | null;
				thumbnailUrl: string | null;
				isVertical: boolean;
			}>;
		};
	}>();

	// Tracks which video facades have been clicked (lazy iframe injection)
	let activated = $state<Set<number>>(new Set());

	function activate(id: number) {
		activated = new Set([...activated, id]);
	}

	const hasVideo = $derived(data.media.some((m) => m.mediaType === 'video'));
</script>

<svelte:head>
	<title>{data.project.title} | Case Study</title>
	<meta
		name="description"
		content="Read our detailed case study on {data.project.title} ({data.project
			.category}) completed in {data.project.location}."
	/>
	<meta property="og:title" content="{data.project.title} | Case Study" />
	<meta
		property="og:description"
		content="Read our detailed case study on {data.project.title} ({data.project
			.category}) completed in {data.project.location}."
	/>
	<meta property="og:type" content="article" />
	<meta property="og:image" content="/images/{data.project.coverImageUrl}" />
	<link rel="canonical" href={$page.url.href} />

	<!-- CreativeWork structured data -->
	{@html `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": "${data.project.title}",
      "description": "${data.project.description.replace(/[\r\n\t"]/g, ' ')}",
      "genre": "${data.project.category}",
      "locationCreated": { "@type": "Place", "name": "${data.project.location}" },
      "dateCreated": "${data.project.completionDate}"
    }
  </` + `script>`}

	<!-- VideoObject structured data (only when videos present) -->
	{#if hasVideo}
		{@html `<script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": [${data.media
					.filter((m) => m.mediaType === 'video' && m.embedUrl)
					.map(
						(m, i) => `
          {
            "@type": "VideoObject",
            "position": ${i + 1},
            "name": "${data.project.title}",
            "contentUrl": "${m.embedUrl}",
            "thumbnailUrl": "${m.thumbnailUrl ?? ''}"
          }`
					)
					.join(',')}
        ]
      }
    </` + `script>`}
	{/if}
</svelte:head>

<main class="bg-zinc-950 text-zinc-100 selection:bg-zinc-800 selection:text-white py-16 px-6">
	<div class="max-w-6xl mx-auto space-y-16">
		<!-- Back Navigation -->
		<div>
			<a href="/projects" class="text-xs text-zinc-400 hover:text-white transition-colors"
				>&larr; Back to Portfolio</a
			>
		</div>

		<!-- Title and Meta Grid -->
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
			<div class="lg:col-span-8 space-y-6">
				<span
					class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-zinc-900 border border-zinc-800 text-zinc-300"
				>
					{data.project.category}
				</span>
				<h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
					{data.project.title}
				</h2>
				<p class="text-zinc-400 text-sm sm:text-base leading-relaxed whitespace-pre-line">
					{data.project.description}
				</p>
			</div>

			<div class="lg:col-span-4 bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 space-y-4">
				<h3
					class="font-bold text-white text-xs uppercase tracking-wider border-b border-zinc-900 pb-3"
				>
					Project Specifications
				</h3>
				<div class="space-y-3 text-xs">
					<div class="flex items-center justify-between">
						<span class="text-zinc-500">Location</span>
						<span class="text-zinc-300 font-medium">{data.project.location}</span>
					</div>
					<div class="flex items-center justify-between">
						<span class="text-zinc-500">Completed</span>
						<span class="text-zinc-300 font-medium">{data.project.completionDate}</span>
					</div>
					{#if data.project.clientName}
						<div class="flex items-center justify-between">
							<span class="text-zinc-500">Client</span>
							<span class="text-zinc-300 font-medium">{data.project.clientName}</span>
						</div>
					{/if}
					{#if data.project.area}
						<div class="flex items-center justify-between">
							<span class="text-zinc-500">Size / Area</span>
							<span class="text-zinc-300 font-medium">{data.project.area}</span>
						</div>
					{/if}
					{#if data.project.budget}
						<div class="flex items-center justify-between">
							<span class="text-zinc-500">Budget</span>
							<span class="text-zinc-300 font-medium">{data.project.budget}</span>
						</div>
					{/if}
				</div>
			</div>
		</div>

		<!-- Cover banner -->
		<div
			class="aspect-[21/9] w-full bg-zinc-950 overflow-hidden border border-zinc-900 rounded-3xl"
		>
			<img
				src="/images/{data.project.coverImageUrl}"
				alt={data.project.title}
				class="w-full h-full object-cover"
			/>
		</div>

		<!-- Mixed Media Gallery -->
		{#if data.media && data.media.length > 0}
			<div class="space-y-8 pt-6 border-t border-zinc-900">
				<h3 class="font-bold text-lg text-white">Project Gallery</h3>
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{#each data.media as item}
						{#if item.mediaType === 'image'}
							<!-- Image item: unchanged from original -->
							<div
								class="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-900"
							>
								<img
									src="/images/{item.imageUrl}"
									alt=""
									class="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
								/>
							</div>
						{:else if item.embedUrl}
							<!-- Video item: facade until clicked, correct aspect ratio per item -->
							<div
								class="{item.isVertical
									? 'aspect-[9/16]'
									: 'aspect-[16/9]'} w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-900"
							>
								{#if activated.has(item.id)}
									<iframe
										src="{item.embedUrl}?autoplay=1"
										class="w-full h-full"
										frameborder="0"
										allow="autoplay; fullscreen; picture-in-picture"
										allowfullscreen
										title="Project video"
									></iframe>
								{:else}
									<button
										onclick={() => activate(item.id)}
										class="relative w-full h-full group focus:outline-none"
										aria-label="Play video"
									>
										{#if item.thumbnailUrl}
											<img
												src={item.thumbnailUrl}
												alt="Video thumbnail"
												class="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
											/>
										{:else}
											<div class="w-full h-full bg-zinc-900"></div>
										{/if}
										<!-- Play overlay -->
										<div
											class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors"
										>
											<div
												class="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform"
											>
												<svg
													class="w-7 h-7 text-white ml-1"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path d="M8 5v14l11-7z" />
												</svg>
											</div>
										</div>
									</button>
								{/if}
							</div>
						{/if}
					{/each}
				</div>
			</div>
		{/if}
	</div>
</main>
