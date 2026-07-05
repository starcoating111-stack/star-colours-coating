<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Terms & Conditions | Service Agreement & Usage</title>
	<meta
		name="description"
		content="Read our terms and conditions outlining acceptable usage, visual intellectual property, and network system disclaimers."
	/>
	<meta property="og:title" content="Terms & Conditions | Usage" />
	<meta
		property="og:description"
		content="Read our terms and conditions outlining acceptable usage, visual intellectual property, and network system disclaimers."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href={$page.url.href} />
</svelte:head>

<main class="py-20 bg-zinc-950 px-6 selection:bg-zinc-800 selection:text-white">
	<div class="max-w-3xl mx-auto space-y-10">
		<div class="border-b border-zinc-900 pb-8">
			<h2 class="text-3xl font-extrabold text-white tracking-tight">Terms & Conditions</h2>
			<p class="text-zinc-500 text-xs mt-2">Last updated: June 30, 2026</p>
		</div>

		<div class="space-y-6 text-zinc-400 text-xs sm:text-sm leading-relaxed">
			<p>Please review the terms of service governing the use of this website.</p>

			<h3 class="font-bold text-white text-sm sm:text-base pt-2">1. Terms of Use</h3>
			<p>
				By accessing this site, you agree to comply with standard acceptable use guidelines. You may
				not use this website to submit spam, execute malicious attacks, or harvest contact
				endpoints.
			</p>

			<h3 class="font-bold text-white text-sm sm:text-base pt-2">2. Intellectual Property</h3>
			<p>
				All media assets, cover designs, brand marks, and code representations displayed on this
				site are owned by the client or licensed to CodeNXT Lab. Replication is prohibited.
			</p>

			<h3 class="font-bold text-white text-sm sm:text-base pt-2">3. Disclaimers</h3>
			<p>
				This site is provided "as is" without warranty of any kind. We do not guarantee
				uninterrupted uptime or transactional email deliverability during transient cloud network
				issues.
			</p>
		</div>
	</div>
</main>
