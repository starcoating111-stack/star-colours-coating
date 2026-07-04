<script lang="ts">
  import { page } from '$app/stores';
  import starLogo from '$lib/assets/star-logo.png';

  let { data, children } = $props<{
    data: { isAdmin: boolean; companyName?: string; logoUrl?: string | null };
    children: any;
  }>();

  let logoSrc = $derived.by(() => {
    if (!data.logoUrl) return starLogo;
    if (data.logoUrl.startsWith('http://') || data.logoUrl.startsWith('https://') || data.logoUrl.startsWith('/')) {
      return data.logoUrl;
    }
    return `/images/${data.logoUrl}`;
  });

  const navigation = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: 'LayoutDashboard' },
    { name: 'Company Settings', path: '/admin/company', icon: 'Settings' },
    { name: 'Services Offered', path: '/admin/services', icon: 'Briefcase' },
    { name: 'Projects / Portfolio', path: '/admin/projects', icon: 'FolderGit' },
    { name: 'Media Gallery', path: '/admin/gallery', icon: 'Image' },
    { name: 'Team Members', path: '/admin/team', icon: 'Users' },
    { name: 'Testimonials', path: '/admin/testimonials', icon: 'MessageSquareStar' },
    { name: 'FAQs', path: '/admin/faq', icon: 'HelpCircle' },
    { name: 'Form Submissions', path: '/admin/messages', icon: 'Mail' }
  ];

  let currentPath = $derived($page.url.pathname);
</script>

{#if !data.isAdmin}
  {@render children()}
{:else}
  <div class="min-h-screen flex bg-zinc-950 text-zinc-100 selection:bg-zinc-800 selection:text-white font-sans">
    <!-- Sidebar -->
    <aside class="w-64 border-r border-zinc-900 bg-zinc-900/30 backdrop-blur flex flex-col flex-shrink-0">
      <!-- Sidebar Header -->
      <div class="p-6 border-b border-zinc-900 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img
            src={logoSrc}
            alt={data.companyName ?? 'Admin'}
            class="h-8 w-auto max-w-[40px] object-contain"
          />
          <div>
            <h2 class="font-bold text-sm text-white leading-none">Console</h2>
            <span class="text-[10px] text-zinc-500 uppercase tracking-wider">Administrator</span>
          </div>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 px-4 py-6 space-y-1">
        {#each navigation as item}
          {@const isActive = currentPath.startsWith(item.path)}
          <a
            href={item.path}
            class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors {isActive ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200'}"
          >
            <span>{item.name}</span>
          </a>
        {/each}
      </nav>

      <!-- Sidebar Footer / Logout -->
      <div class="p-4 border-t border-zinc-900 bg-zinc-950/20">
        <form method="POST" action="/admin/logout" class="w-full">
          <button
            type="submit"
            class="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-850 bg-zinc-900/20 hover:bg-red-950/20 hover:text-red-400 hover:border-red-900/30 text-sm font-medium transition-colors"
          >
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0 overflow-y-auto">
      <!-- Top Header -->
      <header class="h-16 border-b border-zinc-900 bg-zinc-900/10 backdrop-blur px-8 flex items-center justify-between">
        <div>
          <h1 class="text-sm font-semibold text-zinc-300">
            {data.companyName ?? 'Client Site'}
          </h1>
        </div>
        <div class="flex items-center gap-4 text-xs text-zinc-500">
          <span>Environment: Production (Cloudflare)</span>
        </div>
      </header>

      <!-- Page Viewport -->
      <main class="p-8 max-w-6xl w-full mx-auto">
        {@render children()}
      </main>
    </div>
  </div>
{/if}
