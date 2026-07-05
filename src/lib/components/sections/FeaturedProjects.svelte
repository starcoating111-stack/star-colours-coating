<script lang="ts">
  let { projects = [] } = $props<{
    projects?: Array<{ id: number; title: string; slug: string; category: string; location: string; coverImageUrl: string }>;
  }>();

  // Fallback defaults if DB is empty
  const defaultProjects = [
    { id: 1, title: "Modern Living Space", slug: "modern-living", category: "PU Coating", location: "Rourkela", coverImageUrl: "transform_after_1.jpg" },
    { id: 2, title: "Elevator Corridor", slug: "corridor-door", category: "Satin Metallic", location: "Bhubaneswar", coverImageUrl: "satin_metallic.png" },
    { id: 3, title: "Textured Plaster Wall", slug: "textured-wall", category: "Plaster Coating", location: "Cuttack", coverImageUrl: "placeholder_texture_1.png" },
    { id: 4, title: "Luxury Accent Door", slug: "luxury-door", category: "Metallic Paint", location: "Sambalpur", coverImageUrl: "transform_after_2.jpg" },
    { id: 5, title: "Wood Spray Finish", slug: "wood-finish", category: "PU Coating", location: "Puri", coverImageUrl: "placeholder_texture_4.png" }
  ];

  const list = $derived(projects.length > 0 ? projects : defaultProjects);
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
    {#if list.length === 0}
      <div class="border border-dashed border-zinc-900 rounded-2xl p-12 text-center text-zinc-650 text-sm font-sans animate-fade-in-up delay-100">
        Projects will appear here once added in the dashboard.
      </div>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up delay-100">
        {#each list as project}
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
