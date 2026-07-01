<script lang="ts">
  let { testimonials } = $props<{
    testimonials: Array<{ id: number; name: string; designation?: string | null; review: string; rating: number; photoUrl?: string | null }>;
  }>();
</script>

<section class="py-24 bg-zinc-950 px-6 border-t border-zinc-900 selection:bg-zinc-800 selection:text-white">
  <div class="max-w-7xl mx-auto space-y-16">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div class="space-y-4">
        <span class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Reviews</span>
        <h2 class="text-3xl sm:text-4xl font-bold text-white tracking-tight">Client Endorsements</h2>
      </div>
      <a href="/testimonials" class="text-xs font-semibold text-zinc-450 hover:text-white transition-colors">Read All Reviews &rarr;</a>
    </div>

    <!-- Grid -->
    {#if testimonials.length === 0}
      <div class="border border-dashed border-zinc-900 rounded-2xl p-12 text-center text-zinc-600 text-sm">
        Client endorsements will appear here once added in the admin dashboard.
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each testimonials.slice(0, 3) as item}
          <div class="bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-6 backdrop-blur flex flex-col justify-between h-full">
            <div class="space-y-4">
              <!-- Rating Stars -->
              <div class="flex text-amber-500 text-sm gap-0.5">
                {#each Array(item.rating) as _}
                  <span>★</span>
                {/each}
              </div>
              
              <!-- Review -->
              <p class="text-zinc-300 text-xs sm:text-sm leading-relaxed italic">
                "{item.review}"
              </p>
            </div>

            <!-- Profile Info -->
            <div class="flex items-center gap-4 border-t border-zinc-900/50 pt-6">
              {#if item.photoUrl}
                <img
                  src="/images/{item.photoUrl}"
                  alt={item.name}
                  class="w-10 h-10 rounded-full object-cover bg-zinc-950 border border-zinc-800"
                />
              {:else}
                <div class="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-zinc-500 text-xs uppercase">
                  {item.name.substring(0, 2)}
                </div>
              {/if}
              <div>
                <h4 class="font-bold text-white text-xs sm:text-sm">{item.name}</h4>
                {#if item.designation}
                  <span class="text-[10px] text-zinc-500">{item.designation}</span>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>
