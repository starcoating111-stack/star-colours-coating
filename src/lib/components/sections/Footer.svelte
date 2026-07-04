<script lang="ts">
  import starLogo from '$lib/assets/star-logo.png';

  let { settings } = $props<{
    settings: {
      companyName: string;
      logoUrl?: string | null;
      tagline?: string | null;
      phone?: string | null;
      email?: string | null;
      address?: string | null;
      workingHours?: string | null;
      socialLinks?: {
        facebook?: string;
        instagram?: string;
        linkedin?: string;
        twitter?: string;
        youtube?: string;
      } | null;
    };
  }>();

  let logoSrc = $derived.by(() => {
    if (!settings?.logoUrl) return starLogo;
    if (settings.logoUrl.startsWith('http://') || settings.logoUrl.startsWith('https://') || settings.logoUrl.startsWith('/')) {
      return settings.logoUrl;
    }
    return `/images/${settings.logoUrl}`;
  });

  const currentYear = new Date().getFullYear();
</script>

<footer class="bg-zinc-950 border-t border-zinc-900 text-zinc-400 py-16 selection:bg-zinc-800 selection:text-white">
  <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
    <!-- Branding -->
    <div class="space-y-4">
      <div class="flex items-center gap-3">
        <img
          src={logoSrc}
          alt={settings.companyName}
          class="h-9 w-auto max-w-[44px] object-contain"
        />
        <span class="font-bold text-white text-base tracking-tight">
          {settings.companyName}
        </span>
      </div>
      <p class="text-xs text-zinc-500 leading-relaxed">
        {settings.tagline ?? 'High-Performance Web Solutions.'}
      </p>
      <!-- Social links -->
      {#if settings.socialLinks && Object.keys(settings.socialLinks).length > 0}
        <div class="flex gap-4 pt-2">
          {#each Object.entries(settings.socialLinks) as [platform, url]}
            {#if url}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                class="text-xs text-zinc-500 hover:text-white capitalize transition-colors"
              >
                {platform}
              </a>
            {/if}
          {/each}
        </div>
      {/if}
    </div>

    <!-- Contact Info -->
    <div class="space-y-4">
      <h4 class="text-xs font-semibold text-white uppercase tracking-wider">Contact Us</h4>
      <ul class="space-y-2 text-xs text-zinc-500">
        {#if settings.phone}
          <li>Phone: <a href="tel:{settings.phone}" class="hover:text-zinc-300">{settings.phone}</a></li>
        {/if}
        {#if settings.email}
          <li>Email: <a href="mailto:{settings.email}" class="hover:text-zinc-300">{settings.email}</a></li>
        {/if}
        {#if settings.address}
          <li>Address: {settings.address}</li>
        {/if}
      </ul>
    </div>

    <!-- Working Hours -->
    <div class="space-y-4">
      <h4 class="text-xs font-semibold text-white uppercase tracking-wider">Business Hours</h4>
      <p class="text-xs text-zinc-500 leading-relaxed">
        {settings.workingHours ?? 'Monday - Friday: 9:00 AM - 6:00 PM'}
      </p>
    </div>

    <!-- Quick Links -->
    <div class="space-y-4">
      <h4 class="text-xs font-semibold text-white uppercase tracking-wider">Quick Links</h4>
      <ul class="space-y-2 text-xs text-zinc-500">
        <li><a href="/privacy" class="hover:text-zinc-300">Privacy Policy</a></li>
        <li><a href="/terms" class="hover:text-zinc-300">Terms & Conditions</a></li>
        <li><a href="/admin/login" class="hover:text-zinc-300">Staff Portal Login</a></li>
      </ul>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-6 border-t border-zinc-900 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-zinc-650">
    <span>&copy; {currentYear} {settings.companyName}. All rights reserved.</span>
    <span>Designed & Developed by <a href="https://codenxt.com" class="hover:text-zinc-500 underline transition-colors">CodeNXT Lab</a></span>
  </div>
</footer>
