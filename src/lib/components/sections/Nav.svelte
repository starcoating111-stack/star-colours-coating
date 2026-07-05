<script lang="ts">
	import starLogo from '$lib/assets/star-logo.png';

	let { settings } = $props<{
		settings: { companyName: string; logoUrl?: string | null };
	}>();

	let mobileOpen = $state(false);

	let logoSrc = $derived.by(() => {
		if (!settings?.logoUrl) return starLogo;
		if (
			settings.logoUrl.startsWith('http://') ||
			settings.logoUrl.startsWith('https://') ||
			settings.logoUrl.startsWith('/')
		) {
			return settings.logoUrl;
		}
		return `/images/${settings.logoUrl}`;
	});

	// Desktop visible links (primary items)
	const desktopLinks = [
		{ name: 'OUR SERVICES', href: '/services' },
		{ name: 'EXPERIENCE', href: '/about' },
		{ name: 'PORTFOLIO', href: '/projects' }
	];

	// Full links for sidebar drawer (all pages)
	const allLinks = [
		{ name: 'Home', href: '/' },
		{ name: 'About Us', href: '/about' },
		{ name: 'Our Team', href: '/team' },
		{ name: 'Services', href: '/services' },
		{ name: 'Portfolio', href: '/projects' },
		{ name: 'Gallery', href: '/gallery' },
		{ name: 'Testimonials', href: '/testimonials' },
		{ name: 'FAQs', href: '/faqs' },
		{ name: 'Contact', href: '/contact' }
	];
</script>

<header
	class="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900/60 selection:bg-zinc-800 selection:text-white"
>
	<div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between animate-fade-in-up">
		<!-- Brand / Logo -->
		<a href="/" class="flex items-center group">
			<img
				src={logoSrc}
				alt={settings?.companyName || 'Star Colours Coating'}
				class="h-10 sm:h-12 w-auto max-w-[200px] object-contain transition-transform group-hover:scale-105"
			/>
		</a>

		<!-- Desktop Navigation (Centered Links) -->
		<nav class="hidden md:flex items-center gap-6">
			{#each desktopLinks as link, index}
				{#if index > 0}
					<span class="text-zinc-700 text-xs select-none">|</span>
				{/if}
				<a
					href={link.href}
					class="text-xs font-semibold text-zinc-300 hover:text-white transition-colors tracking-widest font-outfit"
				>
					{link.name}
				</a>
			{/each}
		</nav>

		<!-- Desktop CTA & Hamburger -->
		<div class="flex items-center gap-4">
			<a
				href="/contact"
				class="hidden sm:inline-block border border-brand-accent hover:bg-brand-accent/10 text-brand-accent hover:text-white text-xs font-bold px-5 py-2.5 rounded-lg tracking-widest transition-all uppercase font-outfit active:scale-95 shadow-[0_0_15px_rgba(197,168,128,0.1)] hover:shadow-[0_0_20px_rgba(197,168,128,0.25)]"
			>
				CONTACT US!
			</a>

			<!-- Menu Button (Visible on all screen sizes to open full sidebar drawer) -->
			<button
				onclick={() => (mobileOpen = !mobileOpen)}
				class="p-2 text-zinc-400 hover:text-white focus:outline-none transition-colors"
				aria-label="Toggle Navigation Drawer"
			>
				{#if mobileOpen}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				{/if}
			</button>
		</div>
	</div>

	<!-- Right Sidebar Drawer & Backdrop -->
	{#if mobileOpen}
		<!-- Backdrop Overlay -->
		<div
			class="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm transition-opacity"
			onclick={() => (mobileOpen = false)}
			role="presentation"
		></div>

		<!-- Right Sidebar Drawer (No md:hidden restriction so it works on desktop and mobile) -->
		<aside
			class="fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] bg-zinc-950/95 backdrop-blur-2xl border-l border-zinc-800/80 p-6 sm:p-8 shadow-2xl flex flex-col justify-between overflow-y-auto transition-transform duration-300 animate-fade-in"
			aria-label="Side Navigation"
		>
			<div class="space-y-8">
				<!-- Drawer Header with Logo and Close Button -->
				<div class="flex items-center justify-between border-b border-zinc-800/80 pb-6">
					<img
						src={logoSrc}
						alt={settings?.companyName || 'Star Colours Coating'}
						class="h-8 w-auto object-contain"
					/>
					<button
						onclick={() => (mobileOpen = false)}
						class="p-2 rounded-full bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors focus:outline-none"
						aria-label="Close Menu"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<!-- Navigation Links -->
				<nav class="space-y-3 pt-2">
					{#each allLinks as link}
						<a
							href={link.href}
							onclick={() => (mobileOpen = false)}
							class="flex items-center justify-between text-sm font-semibold text-zinc-300 hover:text-brand-accent tracking-widest font-outfit py-2.5 px-3 rounded-xl hover:bg-zinc-900/50 transition-all group"
						>
							<span>{link.name.toUpperCase()}</span>
							<span class="text-zinc-600 group-hover:text-brand-accent transition-colors"
								>&rarr;</span
							>
						</a>
					{/each}
				</nav>
			</div>

			<!-- Drawer Footer CTA -->
			<div class="pt-6 border-t border-zinc-800/80 mt-8">
				<a
					href="/contact"
					onclick={() => (mobileOpen = false)}
					class="w-full block text-center border border-brand-accent bg-brand-accent/10 hover:bg-brand-accent text-brand-accent hover:text-zinc-950 font-bold py-3.5 rounded-xl text-xs tracking-widest uppercase font-outfit transition-all shadow-[0_0_15px_rgba(197,168,128,0.15)]"
				>
					CONTACT US!
				</a>
			</div>
		</aside>
	{/if}
</header>
