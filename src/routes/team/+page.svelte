<script lang="ts">
	import { page } from '$app/stores';

	let { data } = $props<{
		data: { teamMembers: any[] };
	}>();

	function initials(name: string) {
		return name
			.split(' ')
			.map((n: string) => n[0])
			.join('')
			.substring(0, 2)
			.toUpperCase();
	}
</script>

<svelte:head>
	<title>Our Team | Meet the People Behind the Work</title>
	<meta
		name="description"
		content="Meet the dedicated professionals on our team — the people who bring expertise, passion, and craft to every project."
	/>
	<meta property="og:title" content="Our Team" />
	<meta property="og:description" content="Meet the dedicated professionals on our team." />
	<meta property="og:type" content="website" />
	<link rel="canonical" href={$page.url.href} />
</svelte:head>

<main class="py-20 bg-brand-dark px-6 selection:bg-zinc-800 selection:text-white">
	<div class="max-w-7xl mx-auto space-y-16 animate-fade-in-up">
		<!-- Header -->
		<div class="text-center space-y-4 max-w-xl mx-auto">
			<span class="text-[10px] font-bold text-brand-accent uppercase tracking-widest font-outfit"
				>Our People</span
			>
			<h1 class="text-4xl font-extrabold text-white tracking-tight font-serif">Meet the Team</h1>
			<p class="text-zinc-400 text-sm leading-relaxed">
				The skilled professionals who bring expertise and dedication to every project.
			</p>
		</div>

		{#if data.teamMembers.length === 0}
			<div
				class="border border-dashed border-zinc-900 rounded-2xl p-12 text-center text-zinc-500 text-sm font-sans"
			>
				Team information coming soon.
			</div>
		{:else}
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
				{#each data.teamMembers as member}
					<div
						class="bg-brand-card border border-zinc-900/50 rounded-3xl p-6 flex flex-col items-center text-center space-y-4 hover:border-brand-accent/20 transition-all duration-300"
					>
						<!-- Photo -->
						{#if member.photoUrl}
							<img
								src="/images/{member.photoUrl}"
								alt={member.name}
								class="w-20 h-20 rounded-full object-cover bg-zinc-900 border-2 border-zinc-800"
							/>
						{:else}
							<div
								class="w-20 h-20 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center font-bold text-zinc-400 text-xl"
							>
								{initials(member.name)}
							</div>
						{/if}

						<!-- Name & Role -->
						<div>
							<h2 class="font-bold text-brand-accent text-base font-serif">{member.name}</h2>
							<p class="text-zinc-400 text-xs mt-0.5 font-light">{member.designation}</p>
						</div>

						<!-- Bio -->
						{#if member.bio}
							<p class="text-zinc-400 text-xs leading-relaxed font-light">{member.bio}</p>
						{/if}

						<!-- Links -->
						{#if member.email || member.linkedinUrl}
							<div class="flex items-center gap-3 pt-2">
								{#if member.email}
									<a
										href="mailto:{member.email}"
										class="text-zinc-500 hover:text-brand-accent transition-colors text-xs underline underline-offset-2 font-outfit"
										aria-label="Email {member.name}"
									>
										Email
									</a>
								{/if}
								{#if member.linkedinUrl}
									<a
										href={member.linkedinUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="text-zinc-500 hover:text-brand-accent transition-colors text-xs underline underline-offset-2 font-outfit"
										aria-label="{member.name} on LinkedIn"
									>
										LinkedIn
									</a>
								{/if}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</main>
