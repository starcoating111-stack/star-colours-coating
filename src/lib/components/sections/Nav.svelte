<script lang="ts">
  let { settings } = $props<{
    settings: { companyName: string; logoUrl?: string | null };
  }>();

  let mobileOpen = $state(false);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/projects' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Contact', href: '/contact' }
  ];
</script>

<header class="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 transition-colors">
  <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
    <!-- Brand / Logo -->
    <a href="/" class="flex items-center gap-3 group">
      <div class="w-9 h-9 rounded-lg bg-white text-zinc-950 flex items-center justify-center font-bold text-base transition-transform group-hover:scale-105">
        C
      </div>
      <span class="font-bold text-white text-lg tracking-tight group-hover:text-zinc-200 transition-colors">
        {settings.companyName}
      </span>
    </a>

    <!-- Desktop Navigation -->
    <nav class="hidden md:flex items-center gap-8">
      {#each links as link}
        <a
          href={link.href}
          class="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
        >
          {link.name}
        </a>
      {/each}
      <a
        href="/contact"
        class="bg-white hover:bg-zinc-250 text-zinc-950 text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow shadow-white/5"
      >
        Inquire Now
      </a>
    </nav>

    <!-- Mobile Menu Button -->
    <button
      onclick={() => mobileOpen = !mobileOpen}
      class="md:hidden p-2 text-zinc-400 hover:text-white focus:outline-none"
      aria-label="Toggle Menu"
    >
      {#if mobileOpen}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      {/if}
    </button>
  </div>

  <!-- Mobile Dropdown Menu -->
  {#if mobileOpen}
    <div class="md:hidden bg-zinc-950 border-b border-zinc-900 px-6 py-6 space-y-4">
      {#each links as link}
        <a
          href={link.href}
          onclick={() => mobileOpen = false}
          class="block text-base font-medium text-zinc-400 hover:text-white transition-colors"
        >
          {link.name}
        </a>
      {/each}
      <div class="pt-4 border-t border-zinc-900">
        <a
          href="/contact"
          onclick={() => mobileOpen = false}
          class="w-full block text-center bg-white text-zinc-950 font-semibold py-2.5 rounded-lg text-sm"
        >
          Inquire Now
        </a>
      </div>
    </div>
  {/if}
</header>
