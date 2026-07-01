<script lang="ts">
  let { teamMembers, count = 4 } = $props<{
    teamMembers: any[];
    count?: number;
  }>();

  function initials(name: string) {
    return name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
  }

  const visible = $derived(teamMembers.slice(0, count));
</script>

<section class="py-20 bg-zinc-950 px-6">
  <div class="max-w-7xl mx-auto space-y-12">
    <div class="text-center space-y-4 max-w-xl mx-auto">
      <span class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Our People</span>
      <h2 class="text-3xl font-extrabold text-white tracking-tight">Meet the Team</h2>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each visible as member}
        <div class="bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 flex flex-col items-center text-center space-y-3 backdrop-blur">
          {#if member.photoUrl}
            <img src="/images/{member.photoUrl}" alt={member.name} class="w-16 h-16 rounded-full object-cover bg-zinc-900 border-2 border-zinc-800" />
          {:else}
            <div class="w-16 h-16 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center font-bold text-zinc-400 text-lg">
              {initials(member.name)}
            </div>
          {/if}
          <div>
            <h3 class="font-bold text-white text-sm">{member.name}</h3>
            <p class="text-zinc-500 text-xs mt-0.5">{member.designation}</p>
          </div>
        </div>
      {/each}
    </div>

    {#if teamMembers.length > count}
      <div class="text-center">
        <a href="/team" class="text-sm text-zinc-400 hover:text-white underline underline-offset-4 transition-colors">
          Meet all {teamMembers.length} team members →
        </a>
      </div>
    {/if}
  </div>
</section>
