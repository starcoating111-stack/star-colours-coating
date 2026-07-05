<script lang="ts">
  import './layout.css';
  import Nav from '$lib/components/sections/Nav.svelte';
  import Footer from '$lib/components/sections/Footer.svelte';
  import FloatingWhatsApp from '$lib/components/FloatingWhatsApp.svelte';
  import { page } from '$app/stores';

  let { data, children } = $props<{
    data: { settings: any };
    children: any;
  }>();

  // Dynamically detect admin paths to bypass public Nav/Footer wrapping
  let isAdminRoute = $derived($page.url.pathname.startsWith('/admin'));
</script>

{#if isAdminRoute}
  {@render children()}
{:else}
  <div class="min-h-screen bg-brand-dark text-zinc-100 flex flex-col font-sans selection:bg-zinc-800 selection:text-white">
    <Nav settings={data.settings} />
    <div class="flex-grow">
      {@render children()}
    </div>
    <Footer settings={data.settings} />
    <FloatingWhatsApp
      whatsappNumber={data.settings?.whatsappNumber}
      whatsappDefaultMessage={data.settings?.whatsappDefaultMessage?.trim() || "Hi, I'm interested in your services."}
    />
  </div>
{/if}
