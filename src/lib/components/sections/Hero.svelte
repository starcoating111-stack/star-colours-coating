<script lang="ts">
  let { settings } = $props<{
    settings: { companyName: string; tagline?: string | null };
  }>();
</script>

<section class="relative min-h-[85vh] flex items-center justify-center bg-zinc-950 px-6 overflow-hidden">
  <!-- Grid background decoration -->
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(24,24,27,0.8),rgba(9,9,11,1))] bg-cover z-0"></div>
  <div class="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 z-0"></div>

  <!-- Ambient light blobs -->
  <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-zinc-900/10 blur-[120px] -z-10 animate-pulse duration-10000"></div>

  <div class="relative z-10 max-w-4xl text-center space-y-8 select-none">
    <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-850 text-[10px] font-bold text-zinc-300 uppercase tracking-widest">
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
      Open for new engagements
    </div>

    <h1 class="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.05] max-w-3xl mx-auto">
      {settings.tagline ?? 'Crafting High-Performance Web Solutions'}
    </h1>

    <p class="text-zinc-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed font-medium">
      Bespoke digital design and serverless engineering for forward-thinking brands. Handcrafted by the developers at {settings.companyName}.
    </p>

    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
      <a
        href="/contact"
        class="w-full sm:w-auto bg-white hover:bg-zinc-200 text-zinc-950 font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg text-sm active:scale-[0.98]"
      >
        Start A Project
      </a>
      <a
        href="/projects"
        class="w-full sm:w-auto border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/60 text-zinc-300 hover:text-white font-bold px-8 py-3.5 rounded-xl transition-all text-sm"
      >
        View Case Studies
      </a>
    </div>
  </div>
</section>
