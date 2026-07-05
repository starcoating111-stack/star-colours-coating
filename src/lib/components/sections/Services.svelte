<script lang="ts">
  let { services = [] } = $props<{
    services?: Array<{ id: number; title: string; slug: string; description: string; imageUrl: string; icon?: string | null }>;
  }>();
</script>

<section id="services" class="py-24 bg-brand-dark px-6 border-t border-zinc-900/60 selection:bg-zinc-800 selection:text-white">
  <div class="max-w-7xl mx-auto space-y-16">
    <!-- Header -->
    <div class="text-center space-y-4 max-w-2xl mx-auto animate-fade-in-up">
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase font-outfit">
        DISCOVER OUR SIGNATURE SERVICES
      </h2>
      <p class="text-zinc-400 text-sm sm:text-base leading-relaxed font-light font-sans max-w-xl mx-auto">
        Experience craftsmanship and innovation — from immersive visuals to unforgettable moments.
      </p>
      <div class="w-24 h-0.5 bg-brand-accent mx-auto mt-6"></div>
    </div>

    <!-- Horizontal Scroll Track -->
    {#if services.length === 0}
      <div class="border border-dashed border-zinc-800/80 rounded-3xl p-16 text-center text-zinc-550 text-sm font-sans animate-fade-in-up delay-100 flex flex-col items-center justify-center space-y-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span class="max-w-md leading-relaxed">
          No services found in the database. Please add services via the admin dashboard to display them here.
        </span>
      </div>
    {:else}
      <div class="relative w-full animate-fade-in-up delay-100">
        <!-- Arrow guidance indicators on edges -->
        <div class="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-brand-dark to-transparent pointer-events-none z-10"></div>
        <div class="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-brand-dark to-transparent pointer-events-none z-10"></div>

        <!-- Horizontal Scrollable Container -->
        <div class="flex gap-6 overflow-x-auto pb-8 pt-4 px-4 no-scrollbar snap-x scroll-smooth">
          {#each services as service}
            <a
              href="/services#{service.slug}"
              class="flex-shrink-0 w-[280px] sm:w-[320px] aspect-[3/4] bg-brand-card hover:bg-brand-card/90 border border-zinc-900 rounded-3xl overflow-hidden relative shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-brand-accent/30 group snap-center"
            >
              <!-- Background Image overlay if available -->
              {#if service.imageUrl}
                <div class="absolute inset-0 z-0">
                  <img
                    src="/images/{service.imageUrl}"
                    alt={service.title}
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <!-- Gradient to read text at bottom -->
                  <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent"></div>
                </div>
              {:else}
                <!-- Plain Dark/Gradient background for text-only cards -->
                <div class="absolute inset-0 bg-gradient-to-b from-[#1c120f] to-[#0f0a08] z-0"></div>
              {/if}

              <!-- Content Container -->
              <div class="absolute inset-0 z-10 p-6 flex flex-col justify-end items-center text-center">
                <h3 class="text-brand-accent group-hover:text-white font-extrabold text-base sm:text-lg tracking-wide transition-colors font-outfit uppercase leading-snug">
                  {service.title}
                </h3>
                <span class="text-[9px] text-zinc-550 group-hover:text-brand-accent tracking-widest font-bold uppercase mt-2 font-outfit">
                  Explore Specs &rarr;
                </span>
              </div>
            </a>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>
