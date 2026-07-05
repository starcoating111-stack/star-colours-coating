<script lang="ts">
  let { teamMembers = [], count = 4 } = $props<{
    teamMembers: any[];
    count?: number;
  }>();

  function initials(name: string) {
    return name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
  }

  // Pre-fill defaults if D1 is empty
  const defaultMembers = [
    {
      id: 1,
      name: "Mr. Mohd Kamruddin khan",
      designation: "Founder/Proprietor",
      photoUrl: ""
    },
    {
      id: 2,
      name: "Mr. Sahil Khan",
      designation: "Co- Founder",
      photoUrl: ""
    }
  ];

  const visible = $derived(teamMembers.length > 0 ? teamMembers.slice(0, count) : defaultMembers);
</script>

<section id="team" class="py-24 bg-brand-dark px-6 border-t border-zinc-900/60 selection:bg-zinc-800 selection:text-white">
  <div class="max-w-7xl mx-auto space-y-12">
    <!-- Header -->
    <div class="text-center space-y-3 max-w-xl mx-auto animate-fade-in-up">
      <span class="text-[10px] font-bold text-brand-accent uppercase tracking-widest block font-outfit">
        OUR LEADERSHIP
      </span>
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-serif">
        Meet Our Founders!
      </h2>
      <p class="text-zinc-455 text-xs sm:text-sm font-sans tracking-wide italic max-w-md mx-auto">
        Crafting Luxury and Elegance with star colours coating
      </p>
      <div class="w-16 h-0.5 bg-brand-accent mx-auto mt-4"></div>
    </div>

    <!-- Founders Grid -->
    <div class="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-20 pt-6 animate-fade-in-up delay-100">
      {#each visible as member}
        <div class="flex flex-col items-center text-center space-y-4 max-w-xs transition-transform duration-500 hover:scale-[1.03]">
          
          <!-- Image Wrapper with Gold Ring -->
          <div class="w-40 h-40 rounded-full border border-brand-accent p-1.5 shadow-2xl relative bg-zinc-950/20">
            {#if member.photoUrl}
              <img
                src="/images/{member.photoUrl}"
                alt={member.name}
                class="w-full h-full rounded-full object-cover bg-zinc-950"
              />
            {:else}
              <div class="w-full h-full rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-zinc-400 text-3xl font-serif">
                {initials(member.name)}
              </div>
            {/if}
          </div>

          <!-- Name & Title -->
          <div class="space-y-1">
            <h3 class="font-bold text-brand-accent text-lg font-serif">
              {member.name}
            </h3>
            <p class="text-zinc-400 text-xs tracking-wider italic font-sans font-light">
              {member.designation}
            </p>
          </div>
        </div>
      {/each}
    </div>

    {#if teamMembers.length > count}
      <div class="text-center pt-8 animate-fade-in-up delay-200">
        <a href="/team" class="text-xs text-zinc-450 hover:text-white uppercase tracking-widest font-outfit font-bold border-b border-zinc-700/60 pb-1 hover:border-white transition-all">
          Meet all {teamMembers.length} team members &rarr;
        </a>
      </div>
    {/if}
  </div>
</section>
