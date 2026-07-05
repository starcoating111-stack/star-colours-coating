<script lang="ts">
	let { settings } = $props<{
		settings: { companyName: string };
	}>();

	const values = [
		{
			title: 'Zero Dependency Bleed',
			desc: 'Minimalist architecture designed to withstand dependencies aging out or getting deprecated.'
		},
		{
			title: 'Serverless-First Runtime',
			desc: 'Hosted on Cloudflare Pages and Workers for ultra-low millisecond loading profiles globally.'
		},
		{
			title: 'Total Content Ownership',
			desc: 'Simple content management panels for clients with zero hardcoded platform bindings or cloud lock-in.'
		}
	];
</script>

<section
	class="py-24 bg-zinc-950 px-6 border-t border-zinc-900 selection:bg-zinc-800 selection:text-white"
>
	<div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
		<!-- Left Column: Copy -->
		<div class="lg:col-span-5 space-y-6">
			<div class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Our DNA</div>
			<h2 class="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
				Engineered for speed, built for longevity.
			</h2>
			<p class="text-zinc-400 text-sm leading-relaxed">
				At {settings.companyName}, we skip page builder bloat. We write clean, semantic code that
				compiles into ultra-lightweight Svelte components. The result is instant paint times, top
				SEO scores, and security that scales naturally.
			</p>
			<div class="pt-2">
				<a href="/about" class="text-xs text-white font-semibold hover:underline"
					>Learn more about our methodology &rarr;</a
				>
			</div>
		</div>

		<!-- Right Column: Values grid -->
		<div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
			{#each values as value}
				<div class="bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 space-y-3 backdrop-blur">
					<h3 class="font-bold text-white text-base">{value.title}</h3>
					<p class="text-xs text-zinc-500 leading-relaxed">{value.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
