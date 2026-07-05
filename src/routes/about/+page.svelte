<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>About Us | Professional Web & Edge Engineering</title>
	<meta
		name="description"
		content="Learn about our high-performance design philosophy, serverless runtime integrations, and client content management structures."
	/>
	<meta property="og:title" content="About Us | Methodology" />
	<meta
		property="og:description"
		content="Learn about our high-performance design philosophy, serverless runtime integrations, and client content management structures."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href={$page.url.href} />
</svelte:head>

<main class="py-20 bg-zinc-950 px-6 selection:bg-zinc-800 selection:text-white">
	<div class="max-w-4xl mx-auto space-y-12">
		<div class="text-center space-y-4">
			<span class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Methodology</span>
			<h2 class="text-4xl font-extrabold text-white tracking-tight">Our Development Philosophy</h2>
		</div>

		<div class="space-y-8 text-zinc-400 text-sm leading-relaxed max-w-2xl mx-auto">
			<p>
				We believe that modern web applications are often over-engineered with bloated client-side
				bundles and unnecessary database abstractions. Our mission is to deliver clean, fast, and
				robust developer templates that empower web agencies to deploy clients instantly onto
				Cloudflare's serverless edge networks.
			</p>

			<h3 class="font-bold text-white text-base pt-4">Speed is a Feature</h3>
			<p>
				By compiling views into minimal Svelte 5 components and eliminating visual page builders,
				our pages achieve perfect Lighthouse metrics, saving client server costs and improving
				search engine indexability out-of-the-box.
			</p>

			<h3 class="font-bold text-white text-base pt-4">Data Autonomy</h3>
			<p>
				Every template we build is self-contained. Clients retain complete ownership of their
				databases (Cloudflare D1), file buckets (R2), and email configurations (Zoho ZeptoMail). No
				middleman, no SaaS vendor lock-in.
			</p>
		</div>
	</div>
</main>
