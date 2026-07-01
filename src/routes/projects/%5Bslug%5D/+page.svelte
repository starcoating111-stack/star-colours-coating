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
      images: Array<{ id: number; imageUrl: string }>;
    };
  }>();
</script>

<svelte:head>
  <title>{data.project.title} | Case Study</title>
  <meta name="description" content="Read our detailed case study on {data.project.title} ({data.project.category}) completed in {data.project.location}." />
  <meta property="og:title" content="{data.project.title} | Case Study" />
  <meta property="og:description" content="Read our detailed case study on {data.project.title} ({data.project.category}) completed in {data.project.location}." />
  <meta property="og:type" content="article" />
  <meta property="og:image" content="/images/{data.project.coverImageUrl}" />
  <link rel="canonical" href={$page.url.href} />
  
  <!-- Dynamic CreativeWork Schema -->
  {@html `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": "${data.project.title}",
      "description": "${data.project.description.replace(/[\r\n\t]/g, ' ')}",
      "genre": "${data.project.category}",
      "locationCreated": {
        "@type": "Place",
        "name": "${data.project.location}"
      },
      "dateCreated": "${data.project.completionDate}"
    }
  </script>`}
</svelte:head>

<main class="bg-zinc-950 text-zinc-100 selection:bg-zinc-800 selection:text-white py-16 px-6">
  <div class="max-w-6xl mx-auto space-y-16">
    <!-- Back Navigation -->
    <div>
      <a href="/projects" class="text-xs text-zinc-400 hover:text-white transition-colors">&larr; Back to Portfolio</a>
    </div>

    <!-- Title and Meta Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      <!-- Title & Description -->
      <div class="lg:col-span-8 space-y-6">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-zinc-900 border border-zinc-800 text-zinc-300">
          {data.project.category}
        </span>
        <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">{data.project.title}</h2>
        <p class="text-zinc-400 text-sm sm:text-base leading-relaxed whitespace-pre-line">{data.project.description}</p>
      </div>

      <!-- Specs Sidebar -->
      <div class="lg:col-span-4 bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 space-y-4">
        <h3 class="font-bold text-white text-xs uppercase tracking-wider border-b border-zinc-900 pb-3">Project Specifications</h3>
        
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
    <div class="aspect-[21/9] w-full bg-zinc-950 overflow-hidden border border-zinc-900 rounded-3xl">
      <img
        src="/images/{data.project.coverImageUrl}"
        alt={data.project.title}
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Gallery Grid -->
    {#if data.images && data.images.length > 0}
      <div class="space-y-8 pt-6 border-t border-zinc-900">
        <h3 class="font-bold text-lg text-white">Project Gallery</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {#each data.images as img}
            <div class="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-900">
              <img
                src="/images/{img.imageUrl}"
                alt=""
                class="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
              />
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</main>
