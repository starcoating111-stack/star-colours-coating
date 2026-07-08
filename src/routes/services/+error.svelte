<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title
		>{$page.status === 404 ? 'Service Not Found' : 'Something Went Wrong'} | Star Colours Coating</title
	>
</svelte:head>

<main
	class="min-h-[70vh] bg-brand-dark flex items-center justify-center px-6 py-20 selection:bg-zinc-800 selection:text-white"
>
	<div class="max-w-lg w-full text-center space-y-8 animate-fade-in-up">
		<!-- Error code -->
		<p class="text-8xl font-black text-zinc-800 font-outfit select-none">{$page.status}</p>

		<!-- Heading -->
		<div class="space-y-3">
			<h1
				class="text-2xl sm:text-3xl font-extrabold text-white font-outfit uppercase tracking-tight"
			>
				{$page.status === 404 ? 'Service Not Found' : 'Something Went Wrong'}
			</h1>
			<p class="text-zinc-400 text-sm font-sans leading-relaxed max-w-sm mx-auto">
				{#if $page.status === 404}
					This coating service may have been updated, removed, or the link is no longer valid. Browse our full services capabilities list below.
				{:else}
					An unexpected error occurred. Please try again or explore our signature services.
				{/if}
			</p>
		</div>

		<!-- Divider -->
		<div class="w-16 h-0.5 bg-brand-accent mx-auto"></div>

		<!-- CTA links -->
		<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
			<a
				href="/services"
				class="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent/90 text-zinc-950 font-extrabold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all font-outfit active:scale-95 shadow-[0_4px_20px_rgba(197,168,128,0.25)]"
			>
				Browse Services
			</a>
			<a
				href="/"
				class="inline-flex items-center gap-2 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white font-semibold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all font-outfit active:scale-95"
			>
				Go Home
			</a>
		</div>
	</div>
</main>
