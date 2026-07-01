<script lang="ts">
  let { services } = $props<{
    services: Array<{ id: number; title: string; slug: string; description: string; imageUrl: string; icon?: string | null }>;
  }>();
</script>

<section class="py-24 bg-zinc-950 px-6 border-t border-zinc-900 selection:bg-zinc-800 selection:text-white">
  <div class="max-w-7xl mx-auto space-y-16">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div class="space-y-4">
        <span class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Capabilities</span>
        <h2 class="text-3xl sm:text-4xl font-bold text-white tracking-tight">Structured Services</h2>
      </div>
      <a href="/services" class="text-xs font-semibold text-zinc-450 hover:text-white transition-colors">View All Services &rarr;</a>
    </div>

    <!-- Grid -->
    {#if services.length === 0}
      <div class="border border-dashed border-zinc-900 rounded-2xl p-12 text-center text-zinc-600 text-sm">
        Services will appear here once populated in the admin dashboard.
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each services.slice(0, 6) as service}
          <div class="group bg-zinc-900/10 border border-zinc-900 rounded-2xl overflow-hidden backdrop-blur flex flex-col justify-between h-full">
            <div class="aspect-video w-full bg-zinc-950 overflow-hidden border-b border-zinc-900">
              <img
                src="/images/{service.imageUrl}"
                alt={service.title}
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div class="p-6 flex-1 flex flex-col justify-between gap-4">
              <div class="space-y-2">
                <h3 class="font-bold text-lg text-white group-hover:text-zinc-200 transition-colors">{service.title}</h3>
                <p class="text-xs text-zinc-400 leading-relaxed line-clamp-3">{service.description}</p>
              </div>
              <div class="pt-2">
                <a href="/services#{service.slug}" class="text-xs text-zinc-500 group-hover:text-white transition-colors flex items-center gap-1 font-semibold">
                  Read specifications &rarr;
                </a>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>
