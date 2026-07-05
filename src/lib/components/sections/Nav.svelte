<script lang="ts">
	import starLogo from '$lib/assets/star-logo.png';

	let { settings } = $props<{
		settings: { companyName: string; logoUrl?: string | null };
	}>();

	let drawerOpen = $state(false);

	function openDrawer() {
		drawerOpen = true;
		// Prevent body scroll while drawer is open
		document.body.style.overflow = 'hidden';
	}

	function closeDrawer() {
		drawerOpen = false;
		document.body.style.overflow = '';
	}

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

	// Desktop visible links
	const desktopLinks = [
		{ name: 'OUR SERVICES', href: '/services' },
		{ name: 'EXPERIENCE', href: '/about' },
		{ name: 'PORTFOLIO', href: '/projects' }
	];

	// All links for the sidebar drawer
	const allLinks = [
		{ name: 'Home', href: '/' },
		{ name: 'About Us', href: '/about' },
		{ name: 'Our Team', href: '/team' },
		{ name: 'Services', href: '/services' },
		{ name: 'Portfolio', href: '/projects' },
		{ name: 'Gallery', href: '/gallery' },
		{ name: 'Testimonials', href: '/testimonials' },
		{ name: 'FAQs', href: '/faqs' },
		{ name: 'Contact Us', href: '/contact' }
	];
</script>

<!-- Sticky navbar -->
<header class="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900/60">
	<div class="max-w-7xl mx-auto px-5 sm:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
		<!-- Logo -->
		<a href="/" class="flex-shrink-0 flex items-center group">
			<img
				src={logoSrc}
				alt={settings?.companyName || 'Star Colours Coating'}
				class="h-10 sm:h-12 w-auto max-w-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
			/>
		</a>

		<!-- Desktop centre links (hidden on mobile) -->
		<nav class="hidden md:flex items-center gap-6" aria-label="Primary navigation">
			{#each desktopLinks as link, i}
				{#if i > 0}<span class="text-zinc-700 text-xs select-none" aria-hidden="true">|</span>{/if}
				<a
					href={link.href}
					class="text-xs font-semibold text-zinc-300 hover:text-white transition-colors tracking-widest font-outfit"
					>{link.name}</a
				>
			{/each}
		</nav>

		<!-- Right side: CTA + hamburger -->
		<div class="flex items-center gap-3">
			<a
				href="/contact"
				class="hidden sm:inline-block border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-zinc-950 text-xs font-bold px-5 py-2.5 rounded-lg tracking-widest transition-all uppercase font-outfit active:scale-95 shadow-[0_0_15px_rgba(197,168,128,0.1)]"
			>
				CONTACT US
			</a>

			<!-- Hamburger button — always visible -->
			<button
				onclick={openDrawer}
				aria-label="Open navigation menu"
				aria-expanded={drawerOpen}
				aria-controls="nav-drawer"
				class="flex flex-col justify-center items-center w-10 h-10 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
			>
				<span class="block w-5 h-0.5 bg-current mb-1.5 rounded-full transition-all"></span>
				<span class="block w-5 h-0.5 bg-current mb-1.5 rounded-full transition-all"></span>
				<span class="block w-3.5 h-0.5 bg-current rounded-full transition-all self-start ml-0.5"
				></span>
			</button>
		</div>
	</div>
</header>

<!--
  Right-sidebar drawer — always in the DOM so CSS transitions work.
  Visibility is toggled via translate-x and pointer-events classes.
-->

<!-- Backdrop (click to close) -->
<div
	role="presentation"
	onclick={closeDrawer}
	class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 {drawerOpen
		? 'opacity-100 pointer-events-auto'
		: 'opacity-0 pointer-events-none'}"
></div>

<!-- Drawer panel -->
<aside
	id="nav-drawer"
	aria-label="Site navigation"
	aria-hidden={!drawerOpen}
	class="fixed inset-y-0 right-0 z-50 flex flex-col w-72 sm:w-80 max-w-[85vw] bg-brand-dark border-l border-zinc-800/80 shadow-2xl drawer-enter
	       {drawerOpen ? 'translate-x-0' : 'translate-x-full'}"
>
	<!-- Drawer header -->
	<div
		class="flex items-center justify-between px-6 py-5 border-b border-zinc-800/80 flex-shrink-0"
	>
		<img
			src={logoSrc}
			alt={settings?.companyName || 'Star Colours Coating'}
			class="h-8 w-auto object-contain"
		/>
		<button
			onclick={closeDrawer}
			aria-label="Close navigation menu"
			class="flex items-center justify-center w-9 h-9 rounded-full bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
		>
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	</div>

	<!-- Nav links — scrollable if needed -->
	<nav class="flex-1 overflow-y-auto px-4 py-5 space-y-1" aria-label="Drawer navigation">
		{#each allLinks as link}
			<a
				href={link.href}
				onclick={closeDrawer}
				class="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold text-zinc-300 hover:text-brand-accent hover:bg-zinc-900/60 tracking-widest font-outfit transition-all group"
			>
				<span>{link.name.toUpperCase()}</span>
				<svg
					class="w-4 h-4 text-zinc-600 group-hover:text-brand-accent -translate-x-1 group-hover:translate-x-0 transition-all"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
				</svg>
			</a>
		{/each}
	</nav>

	<!-- Drawer footer CTA -->
	<div class="px-6 py-5 border-t border-zinc-800/80 flex-shrink-0">
		<a
			href="/contact"
			onclick={closeDrawer}
			class="block w-full text-center bg-brand-accent hover:bg-brand-accent/90 text-zinc-950 font-extrabold py-3.5 rounded-xl text-xs tracking-widest uppercase font-outfit transition-all active:scale-95 shadow-[0_4px_20px_rgba(197,168,128,0.2)]"
		>
			CONTACT US
		</a>
	</div>
</aside>
