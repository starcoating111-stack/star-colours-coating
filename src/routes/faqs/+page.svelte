<script lang="ts">
  import { page } from '$app/stores';

  let { data } = $props<{
    data: { faqs: any[] };
  }>();

  let openId = $state<number | null>(null);

  function toggle(id: number) {
    openId = openId === id ? null : id;
  }
</script>

<svelte:head>
  <title>Frequently Answered Questions | FAQ & Support</title>
  <meta name="description" content="Find quick answers to frequently asked questions about project design phases, deployment settings, and support timelines." />
  <meta property="og:title" content="Frequently Answered Questions | FAQ" />
  <meta property="og:description" content="Find quick answers to frequently asked questions about project design phases, deployment settings, and support timelines." />
  <meta property="og:type" content="website" />
  <link rel="canonical" href={$page.url.href} />
</svelte:head>

<main class="py-20 bg-zinc-950 px-6 selection:bg-zinc-800 selection:text-white">
  <div class="max-w-4xl mx-auto space-y-16">
    <!-- Header -->
    <div class="text-center space-y-4 max-w-xl mx-auto">
      <span class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Support</span>
      <h2 class="text-4xl font-extrabold text-white tracking-tight">Frequently Asked Questions</h2>
      <p class="text-zinc-405 text-sm leading-relaxed">
        Browse answers to common questions about timelines, scoping, and maintenance.
      </p>
    </div>

    <!-- Accordions -->
    {#if data.faqs.length === 0}
      <div class="border border-dashed border-zinc-900 rounded-2xl p-12 text-center text-zinc-650 text-sm">
        No questions recorded yet. Check back soon!
      </div>
    {:else}
      <div class="space-y-4">
        {#each data.faqs as item}
          {@const isOpen = openId === item.id}
          <div class="bg-zinc-900/10 border border-zinc-900 rounded-xl overflow-hidden transition-all backdrop-blur">
            <button
              onclick={() => toggle(item.id)}
              class="w-full p-5 flex items-center justify-between text-left focus:outline-none"
            >
              <span class="font-bold text-sm sm:text-base text-white">{item.question}</span>
              <span class="text-zinc-500 font-bold transition-transform duration-200 {isOpen ? 'rotate-45' : ''}">＋</span>
            </button>
            
            {#if isOpen}
              <div class="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-950/20">
                {item.answer}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</main>
