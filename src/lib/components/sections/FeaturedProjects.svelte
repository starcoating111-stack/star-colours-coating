<script lang="ts">
  let { projects } = $props<{
    projects: Array<{ id: number; title: string; slug: string; category: string; location: string; coverImageUrl: string }>;
  }>();
</script>

<section class="py-24 bg-zinc-950 px-6 border-t border-zinc-900 selection:bg-zinc-800 selection:text-white">
  <div class="max-w-7xl mx-auto space-y-16">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div class="space-y-4">
        <span class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Case Studies</span>
        <h2 class="text-3xl sm:text-4xl font-bold text-white tracking-tight">Featured Projects</h2>
      </div>
      <a href="/projects" class="text-xs font-semibold text-zinc-450 hover:text-white transition-colors">Browse Portfolio &rarr;</a>
    </div>

    <!-- Grid -->
    {#if projects.length === 0}
      <div class="border border-dashed border-zinc-900 rounded-2xl p-12 text-center text-zinc-600 text-sm">
        Case studies will appear here once added in the admin dashboard.
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        {#each projects.slice(0, 4) as project}
          <a
            href="/projects/{project.slug}"
            class="group bg-zinc-900/10 border border-zinc-900 rounded-3xl overflow-hidden backdrop-blur flex flex-col justify-between hover:border-zinc-800 transition-colors"
          >
            <div class="aspect-[16/10] w-full bg-zinc-950 overflow-hidden relative border-b border-zinc-900">
              <img
                src="/images/{project.coverImageUrl}"
                alt={project.title}
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <span class="absolute top-4 left-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zinc-950/70 border border-zinc-850 text-zinc-300 backdrop-blur">
                {project.category}
              </span>
            </div>
            <div class="p-6 md:p-8 flex items-center justify-between gap-4">
              <div>
                <h3 class="font-bold text-lg md:text-xl text-white group-hover:text-zinc-200 transition-colors">{project.title}</h3>
                <span class="text-xs text-zinc-500 mt-1 block">{project.location}</span>
              </div>
              <div class="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-zinc-700 transition-colors">
                &rarr;
              </div>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</section>
