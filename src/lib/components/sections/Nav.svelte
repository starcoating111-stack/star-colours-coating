<script lang="ts">
  import starLogo from '$lib/assets/star-logo.png';

  let { settings } = $props<{
    settings: { companyName: string; logoUrl?: string | null };
  }>();

  let mobileOpen = $state(false);

  let logoSrc = $derived.by(() => {
    if (!settings?.logoUrl) return starLogo;
    if (settings.logoUrl.startsWith('http://') || settings.logoUrl.startsWith('https://') || settings.logoUrl.startsWith('/')) {
      return settings.logoUrl;
    }
    return `/images/${settings.logoUrl}`;
  });

  // Desktop visible links
  const desktopLinks = [
    { name: 'OUR SERVICES', href: '/services' },
    { name: 'EXPERIENCE', href: '/about' },
    { name: 'PORTFOLIO', href: '/projects' }
  ];

  // Full links for mobile dropdown
  const mobileLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/team' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/projects' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Contact', href: '/contact' }
  ];
</script>

<header class="sticky top-0 z-45 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900/60 selection:bg-zinc-800 selection:text-white">
  <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between animate-fade-in-up">
    <!-- Brand / Logo -->
    <a href="/" class="flex items-center group">
      <img
        src={logoSrc}
        alt={settings.companyName}
        class="h-10 sm:h-12 w-auto max-w-[200px] object-contain transition-transform group-hover:scale-105"
      />
    </a>

    <!-- Desktop Navigation (Centered Links) -->
    <nav class="hidden md:flex items-center gap-6">
      {#each desktopLinks as link, index}
        {#if index > 0}
          <span class="text-zinc-700 text-xs select-none">|</span>
        {/if}
        <a
          href={link.href}
          class="text-xs font-semibold text-zinc-300 hover:text-white transition-colors tracking-widest font-outfit"
        >
          {link.name}
        </a>
      {/each}
    </nav>

    <!-- Desktop CTA & Hamburger -->
    <div class="flex items-center gap-4">
      <a
        href="/contact"
        class="hidden sm:inline-block border border-brand-accent hover:bg-brand-accent/10 text-brand-accent hover:text-white text-xs font-bold px-5 py-2.5 rounded-lg tracking-widest transition-all uppercase font-outfit active:scale-95 shadow-[0_0_15px_rgba(197,168,128,0.1)] hover:shadow-[0_0_20px_rgba(197,168,128,0.25)]"
      >
        CONTACT US!
      </a>

      <!-- Mobile Menu Button -->
      <button
        onclick={() => mobileOpen = !mobileOpen}
        class="p-2 text-zinc-400 hover:text-white focus:outline-none"
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
  </div>

  <!-- Mobile Right Side Drawer -->
  {#if mobileOpen}
    <!-- Backdrop overlay -->
    <div
      class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300 animate-fade-in"
      onclick={() => mobileOpen = false}
      aria-hidden="true"
    ></div>

    <!-- Slide-in Menu -->
    <div class="fixed top-0 right-0 bottom-0 w-[300px] z-55 bg-brand-dark border-l border-zinc-900/80 shadow-2xl p-8 flex flex-col justify-between md:hidden transform transition-transform duration-300 ease-out">
      <div class="space-y-8">
        <!-- Close button & Logo -->
        <div class="flex items-center justify-between">
          <img
            src={logoSrc}
            alt={settings.companyName}
            class="h-10 w-auto max-w-[140px] object-contain"
          />
          <button
            onclick={() => mobileOpen = false}
            class="p-2 text-zinc-450 hover:text-white focus:outline-none"
            aria-label="Close Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Navigation Links -->
        <nav class="flex flex-col gap-4 pt-4">
          {#each mobileLinks as link}
            <a
              href={link.href}
              onclick={() => mobileOpen = false}
              class="text-sm font-semibold text-zinc-400 hover:text-white tracking-widest font-outfit transition-colors py-2 border-b border-zinc-900/30 uppercase"
            >
              {link.name}
            </a>
          {/each}
        </nav>
      </div>

      <!-- Action CTA -->
      <div class="pt-6 border-t border-zinc-900/60">
        <a
          href="/contact"
          onclick={() => mobileOpen = false}
          class="w-full block text-center border border-brand-accent hover:bg-brand-accent/10 text-brand-accent hover:text-white font-bold py-3.5 rounded-xl text-xs tracking-widest font-outfit uppercase shadow-[0_0_15px_rgba(197,168,128,0.1)] active:scale-95 transition-all"
        >
          CONTACT US!
        </a>
      </div>
    </div>
  {/if}
</header>
