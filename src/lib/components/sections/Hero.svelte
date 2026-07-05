<script lang="ts">
  let { settings } = $props<{
    settings: { companyName: string; tagline?: string | null };
  }>();

  const textureCards = [
    { id: 1, name: "Grooved Plaster", image: "/images/placeholder_texture_1.png", isTorn: false },
    { id: 2, name: "Stone Cladding", image: "/images/placeholder_texture_2.png", isTorn: true },
    { id: 3, name: "Textured Roller", image: "/images/placeholder_texture_3.png", isTorn: true },
    { id: 4, name: "Airless Spray", image: "/images/placeholder_texture_4.png", isTorn: false }
  ];
</script>

<section class="relative min-h-[90vh] flex flex-col justify-between bg-zinc-950 px-6 py-12 overflow-hidden selection:bg-zinc-800 selection:text-white">
  <!-- Smoky Nebula background -->
  <div class="absolute inset-0 bg-cover bg-center opacity-65 z-0" style="background-image: url('/images/hero_bg.png');"></div>
  <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-zinc-950/80 z-0"></div>

  <!-- Space filler/top spacer -->
  <div></div>

  <!-- Texture Cards Grid in center -->
  <div class="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center gap-12 my-auto">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full items-stretch justify-center max-w-6xl">
      {#each textureCards as card}
        <div class="relative overflow-hidden aspect-[9/16] md:aspect-[3/5] lg:aspect-[10/18] transition-all duration-500 hover:scale-[1.03] group shadow-2xl flex flex-col">
          <!-- Frame / torn edge simulation -->
          {#if card.isTorn}
            <!-- Simulate torn paper via CSS masks and custom class -->
            <div class="w-full h-full relative overflow-hidden bg-zinc-900 torn-paper">
              <img
                src={card.image}
                alt={card.name}
                class="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </div>
          {:else}
            <!-- Standard rounded card -->
            <div class="w-full h-full relative overflow-hidden bg-zinc-900 rounded-3xl border border-zinc-900/40">
              <img
                src={card.image}
                alt={card.name}
                class="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Centered bottom pill button overlaying the cards area -->
    <div class="relative z-20 -mt-6 sm:-mt-8 md:-mt-10">
      <a
        href="/contact"
        class="inline-flex items-center gap-3 bg-zinc-950/50 hover:bg-zinc-900/60 border border-zinc-700/50 text-zinc-350 hover:text-white px-8 py-3.5 rounded-full backdrop-blur-md transition-all text-sm font-semibold tracking-wider font-outfit shadow-2xl active:scale-95 group"
      >
        Let's Work Together
        <span class="inline-block transition-transform group-hover:translate-x-1.5 font-sans">&rarr;</span>
      </a>
    </div>
  </div>

  <!-- Bottom spacer -->
  <div class="w-full text-center text-zinc-750 text-[10px] tracking-widest font-outfit z-10 uppercase pt-8">
    SCROLL TO DISCOVER
  </div>
</section>
