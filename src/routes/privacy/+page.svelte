<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Privacy Policy | Compliance & Data Protection</title>
	<meta
		name="description"
		content="Read our privacy policy regarding contact form submissions, data storage security, and external email routes."
	/>
	<meta property="og:title" content="Privacy Policy | Compliance" />
	<meta
		property="og:description"
		content="Read our privacy policy regarding contact form submissions, data storage security, and external email routes."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href={$page.url.href} />
</svelte:head>

<main class="py-20 bg-zinc-950 px-6 selection:bg-zinc-800 selection:text-white">
	<div class="max-w-3xl mx-auto space-y-10">
		<div class="border-b border-zinc-900 pb-8">
			<h2 class="text-3xl font-extrabold text-white tracking-tight">Privacy Policy</h2>
			<p class="text-zinc-500 text-xs mt-2">Last updated: June 30, 2026</p>
		</div>

		<div class="space-y-6 text-zinc-400 text-xs sm:text-sm leading-relaxed">
			<p>
				Your privacy is important to us. This policy outlines how we handle and protect the
				metadata, contact submissions, and credentials processed by our web applications.
			</p>

			<h3 class="font-bold text-white text-sm sm:text-base pt-2">1. Information Collection</h3>
			<p>
				We only collect information that you explicitly submit through our contact forms (such as
				name, email address, phone number, and message text). We do not run third-party tracking
				scripts, trackers, or cookies for marketing purposes.
			</p>

			<h3 class="font-bold text-white text-sm sm:text-base pt-2">2. Data Security & Storage</h3>
			<p>
				All submitted data is stored securely in our private relational database hosted by
				Cloudflare. Access is restricted exclusively to authorized administrators.
			</p>

			<h3 class="font-bold text-white text-sm sm:text-base pt-2">3. Third-Party Services</h3>
			<p>
				Inbound inquiry notifications are routed securely via Zoho ZeptoMail transactional email
				gateways. We do not sell, rent, or lease customer data to external data brokers.
			</p>
		</div>
	</div>
</main>
