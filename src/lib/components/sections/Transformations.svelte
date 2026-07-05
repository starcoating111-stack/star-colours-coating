<script lang="ts">
	import { reveal } from '$lib/reveal';

	const cases = [
		{
			id: 1,
			title: 'Living Room Wall Coating',
			challenge: 'Its become very difficult because of the time taken in material selection',
			result:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			beforeImage: '/images/transform_before_1.jpg',
			afterImage: '/images/transform_after_1.jpg'
		},
		{
			id: 2,
			title: 'Luxury Corridor Metallic Door',
			challenge:
				'Standard door frames lacked premium luster and look outdated in high-end projects.',
			result:
				'Finished with premium Satin Metallic coating to match high-grade aesthetic, boosting visual appeal instantly.',
			beforeImage: '/images/transform_before_2.jpg',
			afterImage: '/images/transform_after_2.jpg'
		}
	];

	let currentIndex = $state(0);
	let activeTab = $state<'before' | 'after'>('after');

	const currentCase = $derived(cases[currentIndex]);

	function handlePrev() {
		currentIndex = (currentIndex - 1 + cases.length) % cases.length;
		activeTab = 'after'; // reset to after view
	}

	function handleNext() {
		currentIndex = (currentIndex + 1) % cases.length;
		activeTab = 'after'; // reset to after view
	}
</script>

<section
	class="py-24 bg-gradient-to-b from-[#382621] to-[#140d0b] px-6 border-t border-zinc-900/10 selection:bg-zinc-800 selection:text-white"
>
	<div class="max-w-7xl mx-auto space-y-12">
		<!-- Header with nav arrows -->
		<div
			class="flex flex-col md:flex-row md:items-end justify-between gap-6 reveal-fade-up"
			use:reveal
		>
			<div class="space-y-4">
				<h2
					class="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight leading-tight max-w-xl"
				>
					Stunning transformations at a glance.
				</h2>
				<!-- Tab selector -->
				<div class="flex items-center gap-6 pt-2">
					<button
						onclick={() => (activeTab = 'before')}
						class="text-sm font-semibold tracking-wide pb-1 transition-all border-b-2 {activeTab ===
						'before'
							? 'border-brand-accent text-white font-bold'
							: 'border-transparent text-zinc-400 hover:text-white'}"
					>
						Before
					</button>
					<button
						onclick={() => (activeTab = 'after')}
						class="text-sm font-semibold tracking-wide pb-1 transition-all border-b-2 {activeTab ===
						'after'
							? 'border-brand-accent text-white font-bold'
							: 'border-transparent text-zinc-400 hover:text-white'}"
					>
						After
					</button>
				</div>
			</div>

			<!-- Nav arrows -->
			{#if cases.length > 1}
				<div class="flex items-center gap-3 self-end md:self-auto">
					<button
						onclick={handlePrev}
						class="w-10 h-10 rounded-full border border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 hover:bg-zinc-900/60 flex items-center justify-center text-zinc-450 hover:text-white transition-all active:scale-95"
						aria-label="Previous transformation"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="w-4 h-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 19.5L8.25 12l7.5-7.5"
							/>
						</svg>
					</button>
					<button
						onclick={handleNext}
						class="w-10 h-10 rounded-full border border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 hover:bg-zinc-900/60 flex items-center justify-center text-zinc-450 hover:text-white transition-all active:scale-95"
						aria-label="Next transformation"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="w-4 h-4"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
						</svg>
					</button>
				</div>
			{/if}
		</div>

		<!-- main view grid -->
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch reveal-fade-up" use:reveal>
			<!-- Left image area -->
			<div
				class="lg:col-span-7 bg-zinc-900/20 rounded-3xl overflow-hidden border border-zinc-850 aspect-[4/3] w-full relative"
			>
				<img
					src={activeTab === 'before' ? currentCase.beforeImage : currentCase.afterImage}
					alt="{currentCase.title} - {activeTab}"
					class="w-full h-full object-cover transition-opacity duration-300"
				/>
				<!-- Badge -->
				<span
					class="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-zinc-950/80 text-white uppercase tracking-wider backdrop-blur"
				>
					{activeTab}
				</span>
			</div>

			<!-- Right details area -->
			<div
				class="lg:col-span-5 flex flex-col justify-between gap-6 bg-brand-card border border-zinc-900 rounded-3xl p-8 md:p-10 relative overflow-hidden"
			>
				<!-- Gold vertical accent line on left -->
				<div class="absolute left-0 top-1/4 bottom-1/4 w-1 bg-brand-accent rounded-r-md"></div>

				<div class="space-y-8 pl-2">
					<!-- Title -->
					<span
						class="text-[10px] font-bold text-brand-accent uppercase tracking-widest block font-outfit"
						>Project: {currentCase.title}</span
					>

					<!-- Challenge -->
					<div class="space-y-2">
						<h3 class="text-white font-bold text-sm tracking-wide uppercase font-outfit opacity-80">
							Client's Challenge
						</h3>
						<p class="text-zinc-400 text-sm leading-relaxed font-light">
							{currentCase.challenge}
						</p>
					</div>

					<!-- Result -->
					<div class="space-y-2">
						<h3 class="text-white font-bold text-sm tracking-wide uppercase font-outfit opacity-80">
							Result
						</h3>
						<p class="text-zinc-400 text-sm leading-relaxed font-light">
							{currentCase.result}
						</p>
					</div>
				</div>

				<!-- Slider dots indicator -->
				{#if cases.length > 1}
					<div class="flex items-center gap-1.5 pt-4 pl-2">
						{#each cases as _, idx}
							<button
								onclick={() => {
									currentIndex = idx;
									activeTab = 'after';
								}}
								class="h-1.5 rounded-full transition-all {currentIndex === idx
									? 'w-6 bg-brand-accent'
									: 'w-1.5 bg-zinc-700 hover:bg-zinc-550'}"
								aria-label="Go to slide {idx + 1}"
							></button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
