<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';

  let { data, form } = $props<{
    data: { whatsappNumber: string | null; whatsappDefaultMessage: string };
    form: { success?: boolean; message?: string; error?: string } | null;
  }>();

  let loading = $state(false);
  let name = $state('');
  let email = $state('');
  let phone = $state('');
  let subject = $state('');
  let message = $state('');

  // Normalized number is already digits-only from the server load
  const waNum = $derived(data.whatsappNumber ?? '');

  // Build wa.me URL dynamically from current form state
  const waUrl = $derived((() => {
    if (!waNum) return '';
    let text: string;
    if (name.trim() || message.trim()) {
      const greeting = name.trim() ? `Hi, I'm ${name.trim()}.` : '';
      const body = [subject.trim(), message.trim()].filter(Boolean).join(' — ');
      text = [greeting, body].filter(Boolean).join(' ');
    } else {
      text = data.whatsappDefaultMessage;
    }
    return `https://wa.me/${waNum}?text=${encodeURIComponent(text)}`;
  })());
</script>

<svelte:head>
  <title>Contact Us | Get in Touch</title>
  <meta name="description" content="Reach out via WhatsApp for a quick reply, or fill out the inquiry form." />
  <meta property="og:title" content="Contact Us | Inquiry" />
  <meta property="og:description" content="Reach out via WhatsApp for a quick reply, or fill out the inquiry form." />
  <meta property="og:type" content="website" />
  <link rel="canonical" href={$page.url.href} />
</svelte:head>

<main class="py-20 bg-zinc-950 px-6 selection:bg-zinc-800 selection:text-white">
  <div class="max-w-6xl mx-auto space-y-12">
    <!-- Header -->
    <div class="text-center space-y-4">
      <span class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Connect</span>
      <h2 class="text-4xl font-extrabold text-white tracking-tight">Let's Work Together</h2>
      <p class="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
        {#if waNum}
          Chat with us instantly on WhatsApp, or leave a written note below — whatever works best for you.
        {:else}
          Fill out the inquiry form and we'll get back to you with a detailed scope assessment.
        {/if}
      </p>
    </div>

    {#if form?.success}
      <!-- Full-width success state -->
      <div class="max-w-xl mx-auto bg-zinc-900/10 border border-zinc-900 rounded-3xl p-8 text-center space-y-4">
        <div class="w-12 h-12 rounded-full bg-emerald-950/40 border border-emerald-900/40 text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
        <h3 class="font-bold text-white text-lg">Submission Received</h3>
        <p class="text-xs text-zinc-400 leading-relaxed">{form.message} We have dispatched a confirmation email to your address.</p>
      </div>
    {:else if waNum}
      <!-- 2-column layout: WhatsApp (primary) | Form (secondary) -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

        <!-- LEFT: WhatsApp — primary channel -->
        <div class="bg-zinc-900/20 border border-zinc-900 rounded-3xl p-8 flex flex-col gap-8 backdrop-blur">
          <!-- Icon + heading -->
          <div class="space-y-4">
            <div class="w-14 h-14 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center">
              <svg class="w-7 h-7 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">Chat with us on WhatsApp</h3>
              <p class="text-zinc-400 text-sm mt-2 leading-relaxed">
                Get a reply in minutes. No forms, no waiting — just a direct conversation with our team.
              </p>
            </div>
          </div>

          <!-- Perks list -->
          <ul class="space-y-3">
            {#each ['Instant responses during business hours', 'Share photos, documents, or voice notes', 'Pick up the conversation anytime'] as perk}
              <li class="flex items-center gap-3 text-sm text-zinc-300">
                <span class="w-5 h-5 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center flex-shrink-0">
                  <svg class="w-2.5 h-2.5 text-[#25D366]" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                {perk}
              </li>
            {/each}
          </ul>

          <!-- CTA button -->
          <div class="mt-auto">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#1fba59] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg active:scale-[0.98] text-sm"
            >
              <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Start WhatsApp Chat
            </a>
            {#if name.trim() || message.trim()}
              <p class="text-[10px] text-zinc-500 text-center mt-3">Your message will be pre-filled when WhatsApp opens.</p>
            {/if}
          </div>
        </div>

        <!-- RIGHT: Form — secondary channel -->
        <div class="bg-zinc-900/10 border border-zinc-900 rounded-3xl p-8 backdrop-blur">
          <div class="mb-6">
            <p class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Or send us a message</p>
            <p class="text-xs text-zinc-500 mt-1">We'll reply to your email within one business day.</p>
          </div>

          {#if form?.error}
            <div class="mb-6 p-4 rounded-xl bg-red-950/20 border border-red-900/30 text-red-400 text-xs">
              {form.error}
            </div>
          {/if}

          <form
            method="POST"
            use:enhance={() => {
              loading = true;
              return async ({ update }) => {
                loading = false;
                await update();
              };
            }}
            class="space-y-5"
          >
            <div class="hidden" aria-hidden="true">
              <input type="text" name="website" tabindex="-1" autocomplete="off" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label for="name" class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Your Name *</label>
                <input type="text" id="name" name="name" bind:value={name} required
                  class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors" />
              </div>
              <div>
                <label for="email" class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Email Address *</label>
                <input type="email" id="email" name="email" bind:value={email} required
                  class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label for="phone" class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Phone Number</label>
                <input type="text" id="phone" name="phone" bind:value={phone} placeholder="Optional"
                  class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors" />
              </div>
              <div>
                <label for="subject" class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Subject</label>
                <input type="text" id="subject" name="subject" bind:value={subject} placeholder="e.g. Website Overhaul"
                  class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors" />
              </div>
            </div>

            <div>
              <label for="message" class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Message * (Min 10 chars)</label>
              <textarea id="message" name="message" rows="5" bind:value={message} required
                placeholder="Describe your goals, desired timeline, and core requirements."
                class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors"
              ></textarea>
            </div>

            <button type="submit" disabled={loading}
              class="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none text-sm">
              {loading ? 'Submitting...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

    {:else}
      <!-- No WhatsApp: form is the sole option, centred -->
      <div class="max-w-xl mx-auto bg-zinc-900/10 border border-zinc-900 rounded-3xl p-8 backdrop-blur">
        {#if form?.error}
          <div class="mb-6 p-4 rounded-xl bg-red-950/20 border border-red-900/30 text-red-400 text-xs sm:text-sm">
            {form.error}
          </div>
        {/if}

        <form
          method="POST"
          use:enhance={() => {
            loading = true;
            return async ({ update }) => {
              loading = false;
              await update();
            };
          }}
          class="space-y-5"
        >
          <div class="hidden" aria-hidden="true">
            <input type="text" name="website" tabindex="-1" autocomplete="off" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label for="name-f" class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Your Name *</label>
              <input type="text" id="name-f" name="name" bind:value={name} required
                class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors" />
            </div>
            <div>
              <label for="email-f" class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Email Address *</label>
              <input type="email" id="email-f" name="email" bind:value={email} required
                class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label for="phone-f" class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Phone Number</label>
              <input type="text" id="phone-f" name="phone" bind:value={phone} placeholder="Optional"
                class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors" />
            </div>
            <div>
              <label for="subject-f" class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Subject</label>
              <input type="text" id="subject-f" name="subject" bind:value={subject} placeholder="e.g. Website Overhaul"
                class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors" />
            </div>
          </div>

          <div>
            <label for="message-f" class="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Brief Project Scope * (Min 10 chars)</label>
            <textarea id="message-f" name="message" rows="5" bind:value={message} required
              placeholder="Describe your goals, desired timeline, and core requirements."
              class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors"
            ></textarea>
          </div>

          <div class="pt-2">
            <button type="submit" disabled={loading}
              class="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none">
              {loading ? 'Submitting Inquiry...' : 'Submit Inquiry'}
            </button>
          </div>
        </form>
      </div>
    {/if}
  </div>
</main>
