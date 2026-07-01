<script lang="ts">
  import { page } from '$app/stores';

  let { data } = $props<{
    data: { gallery: any[] };
  }>();

  let activeCategory = $state('All');

  // Compute unique categories from database items
  let categories = $derived.by(() => {
    const list = new Set(['All']);
    data.gallery.forEach(item => {
      if (item.category) list.add(item.category);
    });
    return Array.from(list);
  });

  // Filter gallery items reactively
  let filteredItems = $derived.by(() => {
    if (activeCategory === 'All') return data.gallery;
    return data.gallery.filter(item => item.category === activeCategory);
  });
</script>

<svelte:head>
  <title>Photo Gallery | Project Media & Visual Assets</title>
  <meta name="description" content="Explore our high-resolution image gallery showcasing modern designs, web developments, and structural works." />
  <meta property="og:title" content="Photo Gallery | Media Assets" />
  <meta property="og:description" content="Explore our high-resolution image gallery showcasing modern designs, web developments, and structural works." />
  <meta property="og:type" content="website" />
  <link rel="canonical" href={$page.url.href} />
</svelte:head>

<main class="py-20 bg-zinc-950 px-6 selection:bg-zinc-800 selection:text-white">
  <div class="max-w-7xl mx-auto space-y-16">
    <!-- Header -->
    <div class="text-center space-y-4 max-w-xl mx-auto">
      <span class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Media</span>
      <h2 class="text-4xl font-extrabold text-white tracking-tight">Our Gallery</h2>
      <p class="text-zinc-405 text-sm leading-relaxed">
        Visual records of our works, project locations, and structural benchmarks.
      </p>
    </div>

    <!-- Category Filter Controls -->
    {#if categories.length > 1}
      <div class="flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto">
        {#each categories as category}
          <button
            onclick={() => activeCategory = category}
            class="text-xs font-semibold px-4 py-2 rounded-xl border transition-colors {activeCategory === category ? 'bg-white border-white text-zinc-950' : 'bg-zinc-900/30 border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-800'}"
          >
            {category}
          </button>
        {/each}
      </div>
    {/if}

    <!-- Grid -->
    {#if filteredItems.length === 0}
      <div class="border border-dashed border-zinc-900 rounded-2xl p-12 text-center text-zinc-650 text-sm">
        No images found in this category.
      </div>
    {:else}
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {#each filteredItems as item}
          <div class="group bg-zinc-900/10 border border-zinc-900 rounded-2xl overflow-hidden backdrop-blur flex flex-col relative">
            <div class="aspect-[4/3] w-full bg-zinc-950 overflow-hidden relative border-b border-zinc-900">
              <img
                src="/images/{item.imageUrl}"
                alt={item.caption ?? ''}
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
              />
              {#if item.category}
                <span class="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[9px] font-bold bg-zinc-950/70 border border-zinc-850 text-zinc-300 backdrop-blur">
                  {item.category}
                </span>
              {/if}
            </div>
            {#if item.caption}
              <div class="p-4">
                <p class="text-xs text-zinc-450 leading-relaxed line-clamp-2">
                  {item.caption}
                </p>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</main>
