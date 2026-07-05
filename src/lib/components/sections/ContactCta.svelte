<script lang="ts">
  import { enhance } from '$app/forms';

  let { settings } = $props<{
    settings: { companyName: string };
  }>();

  let loading = $state(false);
  let success = $state(false);
  let errorMsg = $state('');

  let name = $state('');
  let email = $state('');
  let phone = $state('');
  let subject = $state('');
  let message = $state('');

  function handleEnhance() {
    loading = true;
    errorMsg = '';
    success = false;

    return async ({ result }: { result: any }) => {
      loading = false;
      if (result.type === 'success') {
        success = true;
        // Clear fields
        name = '';
        email = '';
        phone = '';
        subject = '';
        message = '';
      } else if (result.type === 'failure') {
        errorMsg = result.data?.error || 'Validation failed. Please check your entries.';
      } else {
        errorMsg = 'An unexpected server error occurred. Please try again.';
      }
    };
  }
</script>

<section id="contact" class="py-24 bg-brand-dark px-6 border-t border-zinc-900/60 selection:bg-zinc-800 selection:text-white relative overflow-hidden">
  <div class="max-w-4xl mx-auto space-y-12">
    <!-- Header -->
    <div class="text-center space-y-4 max-w-2xl mx-auto">
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase font-outfit">
        GET IN TOUCH
      </h2>
      <p class="text-zinc-400 text-sm leading-relaxed font-light font-sans max-w-xl mx-auto">
        Experience the art of flawless finishing. Reach out to Star Colours Coating — where precision meets perfection!
      </p>
      <div class="w-24 h-0.5 bg-brand-accent mx-auto mt-4"></div>
    </div>

    <!-- Form Container -->
    <div class="bg-brand-card border border-zinc-900 rounded-3xl p-8 sm:p-10 md:p-12 shadow-2xl relative">
      {#if success}
        <div class="text-center py-8 space-y-4">
          <div class="w-16 h-16 rounded-full bg-emerald-950/40 border border-emerald-900/40 text-emerald-400 flex items-center justify-center mx-auto text-3xl font-bold">✓</div>
          <h3 class="font-extrabold text-white text-xl font-outfit uppercase">Submission Received</h3>
          <p class="text-zinc-450 text-sm max-w-sm mx-auto font-sans leading-relaxed">
            Thank you! Your message has been sent successfully. We will review your inquiry and get back to you shortly.
          </p>
        </div>
      {:else}
        {#if errorMsg}
          <div class="mb-6 p-4 rounded-xl bg-red-950/20 border border-red-900/30 text-red-400 text-xs sm:text-sm font-sans">
            {errorMsg}
          </div>
        {/if}

        <form
          method="POST"
          action="/contact"
          use:enhance={handleEnhance}
          class="space-y-6"
        >
          <!-- Honeypot -->
          <div class="hidden" aria-hidden="true">
            <input type="text" name="website" tabindex="-1" autocomplete="off" />
          </div>

          <!-- Name & Email (2-Column) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label for="cta-name" class="block text-[10px] font-bold text-zinc-450 uppercase tracking-wider font-outfit">Your Name *</label>
              <input
                type="text"
                id="cta-name"
                name="name"
                bind:value={name}
                required
                class="w-full bg-zinc-950/40 border border-zinc-900 focus:border-brand-accent rounded-xl px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none transition-colors"
                placeholder="Full Name"
              />
            </div>
            <div class="space-y-2">
              <label for="cta-email" class="block text-[10px] font-bold text-zinc-450 uppercase tracking-wider font-outfit">Email Address *</label>
              <input
                type="email"
                id="cta-email"
                name="email"
                bind:value={email}
                required
                class="w-full bg-zinc-950/40 border border-zinc-900 focus:border-brand-accent rounded-xl px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none transition-colors"
                placeholder="you@email.com"
              />
            </div>
          </div>

          <!-- Phone & Topic (2-Column) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label for="cta-phone" class="block text-[10px] font-bold text-zinc-450 uppercase tracking-wider font-outfit">Phone Number</label>
              <input
                type="text"
                id="cta-phone"
                name="phone"
                bind:value={phone}
                class="w-full bg-zinc-950/40 border border-zinc-900 focus:border-brand-accent rounded-xl px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none transition-colors"
                placeholder="Optional"
              />
            </div>
            <div class="space-y-2">
              <label for="cta-subject" class="block text-[10px] font-bold text-zinc-450 uppercase tracking-wider font-outfit">Topic</label>
              <input
                type="text"
                id="cta-subject"
                name="subject"
                bind:value={subject}
                class="w-full bg-zinc-950/40 border border-zinc-900 focus:border-brand-accent rounded-xl px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none transition-colors"
                placeholder="e.g. PU Coating Inquiry"
              />
            </div>
          </div>

          <!-- Message -->
          <div class="space-y-2">
            <label for="cta-message" class="block text-[10px] font-bold text-zinc-450 uppercase tracking-wider font-outfit">Message * (Min 10 chars)</label>
            <textarea
              id="cta-message"
              name="message"
              bind:value={message}
              rows="5"
              required
              class="w-full bg-zinc-950/40 border border-zinc-900 focus:border-brand-accent rounded-xl px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none transition-colors resize-none"
              placeholder="Describe your project goals, texture choices, and timeline..."
            ></textarea>
          </div>

          <!-- Submit Button -->
          <div class="pt-2">
            <button
              type="submit"
              disabled={loading}
              class="w-full bg-brand-accent hover:bg-brand-accent/90 disabled:opacity-50 text-brand-dark font-extrabold uppercase py-4 px-6 rounded-xl transition-all shadow-xl active:scale-98 text-sm font-outfit tracking-widest cursor-pointer disabled:pointer-events-none"
            >
              {loading ? 'Sending Message...' : 'Send Message'}
            </button>
          </div>
        </form>
      {/if}
    </div>
  </div>
</section>
