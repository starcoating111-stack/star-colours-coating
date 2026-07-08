<script lang="ts">
	import './layout.css';
	import Nav from '$lib/components/sections/Nav.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let { data, children } = $props<{
		data: { settings: any; services: any[] };
		children: any;
	}>();

	// Dynamically detect admin paths to bypass public Nav/Footer wrapping
	let isAdminRoute = $derived($page.url.pathname.startsWith('/admin'));

	// Splash screen state control
	let mounted = $state(false);
	let showLoader = $state(true);
	let fadeOut = $state(false);

	onMount(() => {
		// Only run splash screen on client load
		mounted = true;
		
		const loaderTimeout = setTimeout(() => {
			fadeOut = true;
			const removeTimeout = setTimeout(() => {
				showLoader = false;
			}, 700); // matches exit transition duration
			return () => clearTimeout(removeTimeout);
		}, 1800); // 1.8s progress bar transition

		return () => clearTimeout(loaderTimeout);
	});
</script>

{#if isAdminRoute}
	{@render children()}
{:else}
	<!-- Splash screen loader overlay -->
	{#if showLoader}
		<div
			class="fixed inset-0 bg-[#231713] z-[99999] flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none pointer-events-none
			{fadeOut ? 'opacity-0 scale-105' : 'opacity-100 pointer-events-auto'}
			motion-reduce:transition-none motion-reduce:opacity-0"
			aria-hidden="true"
		>
			<div class="relative flex flex-col items-center gap-7">
				<!-- Relative Wrapper for centered halo + logo -->
				<div class="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center">
					<!-- Ambient gold glow halo behind the logo -->
					<div
						class="absolute inset-0 bg-[#c5a880] rounded-full opacity-35 pointer-events-none animate-glow-pulse"
					></div>

					<!-- Logo Container -->
					<div
						class="w-full h-full relative z-10 flex items-center justify-center transition-all duration-1000 ease-out
						{mounted ? 'scale-100 blur-none opacity-100 animate-logo-float' : 'scale-90 blur-md opacity-0'}"
					>
						<img
							src="/favicon.png"
							alt="Star Colours Coating Logo"
							class="w-full h-full object-contain filter brightness-125 saturate-125 drop-shadow-[0_0_35px_rgba(197,168,128,0.45)] select-none"
						/>
					</div>
				</div>

				<!-- Brand Name -->
				<div class="text-center space-y-2 relative z-10">
					<h2
						class="text-[#f4f4f5] font-outfit font-extrabold text-sm sm:text-base tracking-[0.25em] uppercase"
					>
						Star Colours Coating
					</h2>
					<p class="text-zinc-550 font-outfit text-[9px] tracking-[0.2em] uppercase font-medium">
						Loading Excellence
					</p>
				</div>
			</div>
		</div>
	{/if}

	<div
		class="min-h-screen bg-brand-dark text-zinc-100 flex flex-col font-sans selection:bg-zinc-800 selection:text-white transition-opacity duration-700 ease-out
		{mounted && fadeOut ? 'opacity-100' : 'opacity-0 pointer-events-none'}"
	>
		<Nav settings={data.settings} services={data.services} />
		<div class="flex-grow">
			{@render children()}
		</div>
		<Footer settings={data.settings} services={data.services} />
	</div>
{/if}
