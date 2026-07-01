<script lang="ts">
  import { page } from '$app/stores';

  let { data } = $props<{
    data: { testimonials: any[] };
  }>();
</script>

<svelte:head>
  <title>Client Testimonials | Reviews & Customer Feedback</title>
  <meta name="description" content="Read customer endorsements and client reviews describing our development speed, support quality, and design outcomes." />
  <meta property="og:title" content="Client Testimonials | Reviews" />
  <meta property="og:description" content="Read customer endorsements and client reviews describing our development speed, support quality, and design outcomes." />
  <meta property="og:type" content="website" />
  <link rel="canonical" href={$page.url.href} />
</svelte:head>

<main class="py-20 bg-zinc-950 px-6 selection:bg-zinc-800 selection:text-white">
  <div class="max-w-7xl mx-auto space-y-16">
    <!-- Header -->
    <div class="text-center space-y-4 max-w-xl mx-auto">
      <span class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Feedback</span>
      <h2 class="text-4xl font-extrabold text-white tracking-tight">Client Endorsements</h2>
      <p class="text-zinc-405 text-sm leading-relaxed">
        Don't just take our word for it. Read what our clients have to say about working with our team.
      </p>
    </div>

    <!-- Grid -->
    {#if data.testimonials.length === 0}
      <div class="border border-dashed border-zinc-900 rounded-2xl p-12 text-center text-zinc-650 text-sm">
        No testimonials recorded yet.
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each data.testimonials as item}
          <div class="bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-6 backdrop-blur flex flex-col justify-between h-full">
            <div class="space-y-4">
              <!-- Rating Stars -->
              <div class="flex text-amber-500 text-sm gap-0.5">
                {#each Array(item.rating) as _}
                  <span>★</span>
                {/each}
              </div>
              
              <!-- Review -->
              <p class="text-zinc-350 text-xs sm:text-sm leading-relaxed italic">
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
</main>
