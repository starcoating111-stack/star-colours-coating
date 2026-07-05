<script lang="ts">
  import { page } from '$app/stores';

  let { data } = $props<{
    data: { projects: any[] };
  }>();
</script>

<svelte:head>
  <title>Our Portfolio | Client Case Studies & Projects</title>
  <meta name="description" content="Browse our complete portfolio of case studies detailing structural layouts, web engineering projects, and brand design systems." />
  <meta property="og:title" content="Our Portfolio | Case Studies & Projects" />
  <meta property="og:description" content="Browse our complete portfolio of case studies detailing structural layouts, web engineering projects, and brand design systems." />
  <meta property="og:type" content="website" />
  <link rel="canonical" href={$page.url.href} />
</svelte:head>

<main class="py-20 bg-brand-dark px-6 selection:bg-zinc-800 selection:text-white">
  <div class="max-w-7xl mx-auto space-y-16 animate-fade-in-up">
    <!-- Header -->
    <div class="text-center space-y-4 max-w-xl mx-auto">
      <span class="text-[10px] font-bold text-brand-accent uppercase tracking-widest font-outfit">Case Studies</span>
      <h2 class="text-4xl font-extrabold text-white tracking-tight font-serif">Our Portfolio</h2>
      <p class="text-zinc-400 text-sm leading-relaxed">
        Explore detailed summaries of client projects across various sectors.
      </p>
    </div>

    <!-- Grid -->
    {#if data.projects.length === 0}
      <div class="border border-dashed border-zinc-900 rounded-2xl p-12 text-center text-zinc-650 text-sm">
        No projects listed in our portfolio at the moment.
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        {#each data.projects as project}
          <a
            href="/projects/{project.slug}"
            class="group bg-brand-card border border-zinc-900/50 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-brand-accent/20 transition-all duration-300"
          >
            <div class="aspect-[16/10] w-full bg-zinc-950 overflow-hidden relative border-b border-zinc-900/40">
              <img
                src="/images/{project.coverImageUrl}"
                alt={project.title}
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <span class="absolute top-4 left-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zinc-950/80 border border-zinc-850 text-zinc-300 backdrop-blur font-outfit uppercase">
                {project.category}
              </span>
            </div>
            <div class="p-6 md:p-8 flex items-center justify-between gap-4">
              <div>
                <h3 class="font-bold text-lg md:text-xl text-white group-hover:text-brand-accent transition-colors font-outfit uppercase leading-tight">{project.title}</h3>
                <span class="text-xs text-zinc-550 mt-1 block">{project.location}</span>
              </div>
              <div class="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-brand-accent transition-colors">
                &rarr;
              </div>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</main>
