<script lang="ts">
  import { siteConfig } from '$lib/config/site.config';

  let { whatsappNumber, whatsappDefaultMessage } = $props<{
    whatsappNumber: string | null | undefined;
    whatsappDefaultMessage: string;
  }>();

  const waNum = $derived(
    siteConfig.showFloatingWhatsApp && whatsappNumber
      ? whatsappNumber.replace(/[^\d]/g, '')
      : ''
  );

  const waUrl = $derived(
    waNum
      ? `https://wa.me/${waNum}?text=${encodeURIComponent(whatsappDefaultMessage)}`
      : ''
  );
</script>

{#if waUrl}
  <a
    href={waUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp"
    class="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-brand-accent hover:bg-[#d5bf9f] text-zinc-950 rounded-full shadow-[0_4px_20px_rgba(197,168,128,0.35)] transition-all hover:scale-105 active:scale-95 border border-zinc-950/10"
  >
    <!-- Simple Speech Bubble SVG -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
      <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.378.202 2.348 1.424 2.348 2.812v6.623c0 1.388-.97 2.61-2.348 2.812a51.964 51.964 0 01-3.279.326c-.419.03-.847.166-1.159.479l-2.907 2.907a.75.75 0 01-1.282-.53V17.25H9.75c-1.378 0-2.348-1.222-2.348-2.61V5.583c0-1.388.97-2.61 2.348-2.812z" clip-rule="evenodd" />
    </svg>
  </a>
{/if}
