<script lang="ts">
	import { enhance } from '$app/forms';
	import { reveal } from '$lib/reveal';

	let { settings } = $props<{
		settings: {
			companyName?: string;
			whatsappNumber?: string | null;
			whatsappDefaultMessage?: string | null;
		};
	}>();

	let loading = $state(false);
	let success = $state(false);
	let errorMsg = $state('');

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let subject = $state('');
	let message = $state('');

	const waNum = $derived(
		settings?.whatsappNumber ? settings.whatsappNumber.replace(/[^\d]/g, '') : ''
	);

	const waUrl = $derived(
		waNum
			? `https://wa.me/${waNum}?text=${encodeURIComponent(settings?.whatsappDefaultMessage?.trim() || "Hi, I'm interested in your services.")}`
			: ''
	);

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

<section
	id="contact"
	class="py-24 bg-brand-dark px-6 border-t border-zinc-900/60 selection:bg-zinc-800 selection:text-white relative overflow-hidden"
>
	<div class="max-w-4xl mx-auto space-y-12">
		<!-- Header -->
		<div class="text-center space-y-4 max-w-2xl mx-auto reveal-fade-up" use:reveal>
			<h2
				class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase font-outfit"
			>
				GET IN TOUCH
			</h2>
			<p class="text-zinc-400 text-sm leading-relaxed font-light font-sans max-w-xl mx-auto">
				Experience the art of flawless finishing. Reach out to Star Colours Coating — where
				precision meets perfection!
			</p>
			<div class="w-24 h-0.5 bg-brand-accent mx-auto mt-4"></div>
		</div>

		<!-- Optional WhatsApp Instant Chat Card -->
		{#if waUrl}
			<div
				class="bg-zinc-900/30 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl backdrop-blur-md reveal-fade-up"
				use:reveal
			>
				<div class="flex items-center gap-4 text-center sm:text-left">
					<div
						class="w-14 h-14 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center flex-shrink-0"
					>
						<svg class="w-7 h-7 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
							/>
						</svg>
					</div>
					<div>
						<h3 class="text-lg font-bold text-white font-outfit uppercase">Prefer instant chat?</h3>
						<p class="text-xs text-zinc-400 mt-1 font-sans">
							Connect directly with our team on WhatsApp for a quick response.
						</p>
					</div>
				</div>
				<a
					href={waUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-[0_4px_20px_rgba(37,211,102,0.3)] active:scale-95 text-xs uppercase font-outfit tracking-wider flex items-center justify-center gap-2 flex-shrink-0"
				>
					<span>Chat on WhatsApp</span>
					<span>&rarr;</span>
				</a>
			</div>
		{/if}

		<!-- Form Container -->
		<div
			class="bg-brand-card border border-zinc-900 rounded-3xl p-8 sm:p-10 md:p-12 shadow-2xl relative reveal-fade-up"
			use:reveal
		>
			{#if success}
				<div class="text-center py-8 space-y-4">
					<div
						class="w-16 h-16 rounded-full bg-emerald-950/40 border border-emerald-900/40 text-emerald-400 flex items-center justify-center mx-auto text-3xl font-bold"
					>
						✓
					</div>
					<h3 class="font-extrabold text-white text-xl font-outfit uppercase">
						Submission Received
					</h3>
					<p class="text-zinc-450 text-sm max-w-sm mx-auto font-sans leading-relaxed">
						Thank you! Your message has been sent successfully. We will review your inquiry and get
						back to you shortly.
					</p>
				</div>
			{:else}
				{#if errorMsg}
					<div
						class="mb-6 p-4 rounded-xl bg-red-950/20 border border-red-900/30 text-red-400 text-xs sm:text-sm font-sans"
					>
						{errorMsg}
					</div>
				{/if}

				<form method="POST" action="/contact" use:enhance={handleEnhance} class="space-y-6">
					<!-- Honeypot -->
					<div class="hidden" aria-hidden="true">
						<input type="text" name="website" tabindex="-1" autocomplete="off" />
					</div>

					<!-- Name & Email (2-Column) -->
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div class="space-y-2">
							<label
								for="cta-name"
								class="block text-[10px] font-bold text-zinc-450 uppercase tracking-wider font-outfit"
								>Your Name *</label
							>
							<input
								type="text"
								id="cta-name"
								name="name"
								bind:value={name}
								required
								class="w-full bg-zinc-950/40 border border-zinc-900 focus:border-brand-accent rounded-xl px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none transition-colors font-sans"
								placeholder="Full Name"
							/>
						</div>
						<div class="space-y-2">
							<label
								for="cta-email"
								class="block text-[10px] font-bold text-zinc-450 uppercase tracking-wider font-outfit"
								>Email Address *</label
							>
							<input
								type="email"
								id="cta-email"
								name="email"
								bind:value={email}
								required
								class="w-full bg-zinc-950/40 border border-zinc-900 focus:border-brand-accent rounded-xl px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none transition-colors font-sans"
								placeholder="you@email.com"
							/>
						</div>
					</div>

					<!-- Phone & Topic (2-Column) -->
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div class="space-y-2">
							<label
								for="cta-phone"
								class="block text-[10px] font-bold text-zinc-450 uppercase tracking-wider font-outfit"
								>Phone Number</label
							>
							<input
								type="text"
								id="cta-phone"
								name="phone"
								bind:value={phone}
								class="w-full bg-zinc-950/40 border border-zinc-900 focus:border-brand-accent rounded-xl px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none transition-colors font-sans"
								placeholder="Optional"
							/>
						</div>
						<div class="space-y-2">
							<label
								for="cta-subject"
								class="block text-[10px] font-bold text-zinc-450 uppercase tracking-wider font-outfit"
								>Topic</label
							>
							<input
								type="text"
								id="cta-subject"
								name="subject"
								bind:value={subject}
								class="w-full bg-zinc-950/40 border border-zinc-900 focus:border-brand-accent rounded-xl px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none transition-colors font-sans"
								placeholder="e.g. PU Coating Inquiry"
							/>
						</div>
					</div>

					<!-- Message -->
					<div class="space-y-2">
						<label
							for="cta-message"
							class="block text-[10px] font-bold text-zinc-450 uppercase tracking-wider font-outfit"
							>Message * (Min 10 chars)</label
						>
						<textarea
							id="cta-message"
							name="message"
							bind:value={message}
							rows="5"
							required
							class="w-full bg-zinc-950/40 border border-zinc-900 focus:border-brand-accent rounded-xl px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none transition-colors resize-none font-sans"
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
