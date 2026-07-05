<script lang="ts">
	import { reveal } from '$lib/reveal';

	let { faqs } = $props<{
		faqs: Array<{ id: number; question: string; answer: string }>;
	}>();

	// Keep track of open question ID
	let openId = $state<number | null>(null);

	function toggle(id: number) {
		openId = openId === id ? null : id;
	}
</script>

<section
	class="py-16 sm:py-24 bg-gradient-to-b from-zinc-950 to-[#1c120f] px-4 sm:px-6 border-t border-zinc-900 selection:bg-zinc-800 selection:text-white"
>
	<div class="max-w-4xl mx-auto space-y-16">
		<!-- Header -->
		<div class="text-center space-y-4 reveal-fade-up" use:reveal>
			<span class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Support</span>
			<h2 class="text-3xl sm:text-4xl font-bold text-white tracking-tight">
				Frequently Asked Questions
			</h2>
		</div>

		<!-- Accordion List -->
		{#if faqs.length === 0}
			<div
				class="border border-dashed border-zinc-900 rounded-2xl p-12 text-center text-zinc-600 text-sm"
			>
				Questions will appear here once added in the admin dashboard.
			</div>
		{:else}
			<div class="space-y-4 reveal-fade-up" use:reveal>
				{#each faqs.slice(0, 4) as item}
					{@const isOpen = openId === item.id}
					<div
						class="bg-zinc-900/10 border border-zinc-900 rounded-xl overflow-hidden transition-all backdrop-blur"
					>
						<button
							onclick={() => toggle(item.id)}
							class="w-full p-5 flex items-center justify-between text-left focus:outline-none"
						>
							<span class="font-bold text-sm sm:text-base text-white">{item.question}</span>
							<span
								class="text-zinc-500 font-bold transition-transform duration-200 {isOpen
									? 'rotate-45'
									: ''}">＋</span
							>
						</button>

						{#if isOpen}
							<div
								class="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-950/20"
							>
								{item.answer}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}

		<div class="text-center">
			<a
				href="/faqs"
				class="text-xs font-semibold text-zinc-450 hover:text-white hover:underline transition-all"
			>
				See more answered questions &rarr;
			</a>
		</div>
	</div>
</section>
