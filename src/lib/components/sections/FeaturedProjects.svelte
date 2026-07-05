<script lang="ts">
  let { projects = [] } = $props<{
    projects?: Array<{ id: number; title: string; slug: string; category: string; location: string; coverImageUrl: string }>;
  }>();
</script>

<section id="portfolio" class="py-24 bg-brand-dark px-6 border-t border-zinc-900/60 selection:bg-zinc-800 selection:text-white">
  <div class="max-w-7xl mx-auto space-y-16">
    <!-- Header -->
    <div class="text-center space-y-4 max-w-2xl mx-auto animate-fade-in-up">
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase font-outfit">
        OUR PORTFOLIO
      </h2>
      <p class="text-zinc-400 text-sm sm:text-base leading-relaxed font-light font-sans max-w-xl mx-auto">
        Experience craftsmanship and innovation — from immersive visuals to unforgettable moments.
      </p>
      <div class="w-24 h-0.5 bg-brand-accent mx-auto mt-6"></div>
    </div>

    <!-- Portfolio Grid -->
    {#if projects.length === 0}
      <div class="border border-dashed border-zinc-800/80 rounded-3xl p-16 text-center text-zinc-550 text-sm font-sans animate-fade-in-up delay-100 flex flex-col items-center justify-center space-y-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <span class="max-w-md leading-relaxed">
          No featured projects found in the database. Please add projects via the admin dashboard and check the <strong>"Featured"</strong> option.
        </span>
      </div>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up delay-100">
        {#each projects as project}
          <a
            href="/projects/{project.slug}"
            class="group bg-zinc-950/20 border border-zinc-900/40 rounded-3xl overflow-hidden shadow-xl aspect-square relative block transition-all duration-500 hover:scale-[1.02] hover:border-brand-accent/20"
          >
            <!-- Project Image -->
            <img
              src="/images/{project.coverImageUrl}"
              alt={project.title}
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            <!-- Hover details overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <span class="text-[9px] font-bold text-brand-accent uppercase tracking-widest font-outfit mb-1">
                {project.category}
              </span>
              <h3 class="text-white font-extrabold text-base font-outfit uppercase">
                {project.title}
              </h3>
              <span class="text-[10px] text-zinc-400 font-sans mt-0.5 block">
                {project.location}
              </span>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</section>
