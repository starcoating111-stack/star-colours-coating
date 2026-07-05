<script lang="ts">
	import { reveal } from '$lib/reveal';

	let { testimonials = [] } = $props<{
		testimonials?: Array<{
			id: number;
			name: string;
			designation?: string | null;
			review: string;
			rating: number;
			photoUrl?: string | null;
		}>;
	}>();

	// Fallback defaults if DB is empty
	const defaultTestimonials = [
		{
			id: 1,
			name: 'Nitesh Goyal',
			designation: 'Rourkela,Odisha',
			review:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			rating: 4,
			photoUrl: ''
		},
		{
			id: 2,
			name: 'Sahil Soni',
			designation: 'Bhubaneswar,Odisha',
			review:
				'The finishing work was exceptionally detailed and durable. Highly recommend their PU coating solutions for luxury homes.',
			rating: 5,
			photoUrl: ''
		}
	];

	const list = $derived(testimonials.length > 0 ? testimonials : defaultTestimonials);
	let currentIndex = $state(0);

	const active = $derived(list[currentIndex]);

	function handlePrev() {
		currentIndex = (currentIndex - 1 + list.length) % list.length;
	}

	function handleNext() {
		currentIndex = (currentIndex + 1) % list.length;
	}
</script>

<section
	id="testimonials"
	class="py-20 bg-[#c2bebe] px-6 text-zinc-900 border-t border-zinc-900/10 selection:bg-zinc-800 selection:text-white"
>
	<div class="max-w-4xl mx-auto relative flex flex-col items-center">
		{#if list.length === 0}
			<div class="text-zinc-600 text-sm py-12">
				Testimonials will appear here once added in the dashboard.
			</div>
		{:else}
			<!-- Carousel Content Outer -->
			<div
				class="w-full flex flex-col items-center text-center space-y-6 select-none relative reveal-fade-up"
				use:reveal
			>
				<!-- Large Double Quotes Icon -->
				<span class="text-6xl text-[#9ea2a2] leading-none font-serif select-none mt-2">“</span>

				<!-- Review Text -->
				<p
					class="text-base sm:text-lg md:text-xl text-zinc-800 italic max-w-2xl leading-relaxed font-sans px-4"
				>
					{active.review}
				</p>

				<!-- Profile Details + Navigation Arrows wrapper -->
				<div class="flex items-center justify-center gap-6 pt-4 w-full max-w-md mx-auto">
					<!-- Prev Button -->
					<button
						onclick={handlePrev}
						class="w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-zinc-700 shadow-md hover:shadow-lg active:scale-95 transition-all"
						aria-label="Previous review"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="w-4.5 h-4.5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 19.5L8.25 12l7.5-7.5"
							/>
						</svg>
					</button>

					<!-- User Avatar -->
					<div class="relative">
						{#if active.photoUrl}
							<img
								src={active.photoUrl.includes('/') || active.photoUrl.includes('.')
									? `/images/${active.photoUrl.split('/').pop()}`
									: `/images/${active.photoUrl}`}
								alt={active.name}
								class="w-16 h-16 rounded-full object-cover bg-white/50 border border-white shadow-md"
							/>
						{:else}
							<div
								class="w-16 h-16 rounded-full bg-zinc-400 text-zinc-900 border border-white shadow-md flex items-center justify-center font-bold text-lg font-outfit"
							>
								{active.name.substring(0, 2).toUpperCase()}
							</div>
						{/if}
					</div>

					<!-- Next Button -->
					<button
						onclick={handleNext}
						class="w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-zinc-700 shadow-md hover:shadow-lg active:scale-95 transition-all"
						aria-label="Next review"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="w-4.5 h-4.5"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
						</svg>
					</button>
				</div>

				<!-- Author Name, Location & Stars -->
				<div class="space-y-1">
					<h4 class="font-extrabold text-base text-zinc-950 font-serif">
						- {active.name}{#if active.designation}, {active.designation}{/if}
					</h4>

					<!-- Stars rating indicator -->
					<div class="flex items-center justify-center gap-1.5 pt-1.5">
						<div class="flex text-amber-500 text-sm gap-0.5">
							{#each Array(5) as _, i}
								<span class={i < active.rating ? 'text-amber-500' : 'text-zinc-400'}>★</span>
							{/each}
						</div>
						<span class="text-xs text-zinc-600 font-bold font-outfit">{active.rating} / 5</span>
					</div>
				</div>

				<!-- Slider dots indicator -->
				{#if list.length > 1}
					<div class="flex items-center gap-1.5 pt-4">
						{#each list as _, idx}
							<button
								onclick={() => (currentIndex = idx)}
								class="h-1.5 rounded-full transition-all {currentIndex === idx
									? 'w-6 bg-zinc-800'
									: 'w-1.5 bg-zinc-500 hover:bg-zinc-700'}"
								aria-label="Go to slide {idx + 1}"
							></button>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	</div>
</section>
