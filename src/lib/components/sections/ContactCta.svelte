<script lang="ts">
  let { settings } = $props<{
    settings: { companyName: string };
  }>();
</script>

<section class="py-24 bg-zinc-950 px-6 border-t border-zinc-900 selection:bg-zinc-800 selection:text-white relative overflow-hidden">
  <!-- Glowing visual elements -->
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-zinc-900/10 blur-[80px] -z-10"></div>

  <div class="max-w-4xl mx-auto text-center space-y-8 bg-zinc-900/10 border border-zinc-900 rounded-3xl p-8 sm:p-12 md:p-16 backdrop-blur">
    <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-xl mx-auto">
      Ready to build something exceptional?
    </h2>
    <p class="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
      Share details about your engagement, timeline, and expectations. Get a direct engineered scope evaluation from the {settings.companyName} team.
    </p>
    <div class="pt-4">
      <a
        href="/contact"
        class="bg-white hover:bg-zinc-200 text-zinc-950 font-bold px-8 py-3.5 rounded-xl transition-all shadow text-sm inline-block active:scale-[0.98]"
      >
        Inquire Now
      </a>
    </div>
  </div>
</section>
