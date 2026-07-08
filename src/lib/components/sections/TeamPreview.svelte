<script lang="ts">
	import { reveal } from '$lib/reveal';

	let { teamMembers = [], count = 4 } = $props<{
		teamMembers?: Array<{
			id: number;
			name: string;
			designation: string;
			bio?: string | null;
			photoUrl: string | null;
			email?: string | null;
			linkedinUrl?: string | null;
		}>;
		count?: number;
	}>();

	const visible = $derived(teamMembers.slice(0, count));

	function getInitials(name: string) {
		return name
			.split(' ')
			.filter(Boolean)
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	}

	const signatures: Record<string, string> = {
		'kamruddin': '/images/kamruddin.svg',
		'sahil': '/images/sahil.svg'
	};

	function getSignature(name: string) {
		const normalized = name.toLowerCase();
		if (normalized.includes('kamruddin')) return signatures.kamruddin;
		if (normalized.includes('sahil')) return signatures.sahil;
		return null;
	}
</script>

<section
	id="team"
	class="py-16 sm:py-24 bg-zinc-950 px-4 sm:px-6 border-t border-zinc-900/60 selection:bg-zinc-800 selection:text-white relative overflow-hidden"
>
	<div class="max-w-7xl mx-auto space-y-16">
		<!-- Header -->
		<div
			class="flex flex-col md:flex-row md:items-end justify-between gap-6 reveal-fade-up"
			use:reveal
		>
			<div class="space-y-3">
				<div class="inline-flex items-center gap-2">
					<span class="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
					<span
						class="text-[10px] font-bold text-brand-accent uppercase tracking-widest font-outfit"
					>
						LEADERSHIP & EXPERTISE
					</span>
				</div>
				<h2
					class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase font-outfit"
				>
					MEET OUR FOUNDERS
				</h2>
				<p class="text-zinc-450 text-sm font-light font-sans max-w-xl">
					The visionaries and coating specialists driving perfection in every project. Committed to
					quality, precision, and durability.
				</p>
			</div>
		</div>

		<!-- Team Grid -->
		{#if visible.length === 0}
			<div
				class="border border-dashed border-zinc-800/80 rounded-3xl p-16 text-center text-zinc-550 text-sm font-sans flex flex-col items-center justify-center space-y-4"
			>
				<div
					class="w-12 h-12 rounded-full bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-zinc-600"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
						/>
					</svg>
				</div>
				<span class="max-w-md leading-relaxed">
					No active team members found in the database. Please add members via the admin dashboard.
				</span>
			</div>
		{:else}
			<div class="flex flex-wrap justify-center gap-5 sm:gap-6 sm:gap-8 reveal-fade-up" use:reveal>
				{#each visible as member}
					<div
						class="w-full sm:w-64 md:w-72 bg-zinc-900/40 border border-brand-accent/15 rounded-3xl p-6 sm:p-8 text-center space-y-5 sm:space-y-6 shadow-2xl relative overflow-hidden group hover:border-brand-accent/40 transition-all duration-300 backdrop-blur-md"
					>
						<!-- Subtle glow on hover -->
						<div
							class="absolute -top-24 -left-24 w-48 h-48 bg-brand-accent/5 rounded-full blur-2xl group-hover:bg-brand-accent/10 transition-all"
						></div>

						<!-- Avatar -->
						<div
							class="relative w-28 h-28 mx-auto rounded-full overflow-hidden bg-zinc-950 border-2 border-brand-accent/30 shadow-inner flex items-center justify-center group-hover:border-brand-accent transition-colors"
						>
							{#if member.photoUrl}
								<img
									src="/images/{member.photoUrl}"
									alt={member.name}
									class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							{:else}
								<span class="text-2xl font-extrabold text-brand-accent font-outfit tracking-wider">
									{getInitials(member.name)}
								</span>
							{/if}
						</div>

						<!-- Name & Designation -->
						<div class="space-y-1.5 relative z-10">
							<h3
								class="text-lg font-extrabold text-white font-outfit uppercase tracking-wide group-hover:text-brand-accent transition-colors"
							>
								{member.name}
							</h3>
							<p class="text-xs font-bold text-brand-accent uppercase tracking-widest font-outfit">
								{member.designation}
							</p>

							{#if getSignature(member.name)}
								<div class="pt-3 flex justify-center">
									<img
										src={getSignature(member.name)}
										alt="{member.name}'s signature"
										class="h-10 sm:h-12 w-auto object-contain brightness-200 opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
									/>
								</div>
							{/if}
						</div>

						<!-- Optional Email / LinkedIn links if populated -->
						{#if member.email || member.linkedinUrl}
							<div
								class="pt-4 border-t border-zinc-900/60 flex items-center justify-center gap-4 relative z-10"
							>
								{#if member.email}
									<a
										href="mailto:{member.email}"
										class="p-2 rounded-lg bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
										aria-label="Email {member.name}"
									>
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="1.5"
												d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
											/></svg
										>
									</a>
								{/if}
								{#if member.linkedinUrl}
									<a
										href={member.linkedinUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="p-2 rounded-lg bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
										aria-label="{member.name} LinkedIn"
									>
										<svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"
											><path
												d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2v-8.37H6.46M7.83 6.7a1.68 1.68 0 0 0-1.68 1.68 1.69 1.69 0 0 0 1.68 1.69 1.69 1.69 0 0 0 1.69-1.69 A1.68 1.68 0 0 0 7.83 6.7Z"
											/></svg
										>
									</a>
								{/if}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>
