<script lang="ts">
	import { enhance } from '$app/forms';

	// Svelte 5 syntax for page props
	let { form } = $props<{ form: { message?: string } | null }>();

	let username = $state('');
	let password = $state('');
	let loading = $state(false);
</script>

<svelte:head>
	<title>Admin Login | CodeNXT Lab</title>
</svelte:head>

<main
	class="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100 p-4 selection:bg-zinc-800 selection:text-white relative overflow-hidden"
>
	<!-- Decorative background elements -->
	<div
		class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-zinc-900/40 blur-3xl -z-10 animate-pulse duration-10000"
	></div>
	<div
		class="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-zinc-900/30 blur-3xl -z-10 animate-pulse duration-7000"
	></div>

	<div
		class="w-full max-w-md bg-zinc-900/60 border border-zinc-800 backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative"
	>
		<div class="flex flex-col items-center mb-8">
			<div
				class="w-12 h-12 rounded-xl bg-gradient-to-tr from-zinc-700 to-zinc-900 border border-zinc-700 flex items-center justify-center mb-4 shadow-lg"
			>
				<span class="text-xl font-bold text-white tracking-wider">C</span>
			</div>
			<h1 class="text-2xl font-bold text-white tracking-tight">Access Control Panel</h1>
			<p class="text-sm text-zinc-400 mt-1">Template by CodeNXT Lab</p>
		</div>

		{#if form?.message}
			<div
				class="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-900/50 text-red-400 text-sm flex items-start gap-3"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="w-5 h-5 flex-shrink-0 mt-0.5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					/>
				</svg>
				<span>{form.message}</span>
			</div>
		{/if}

		<form
			method="POST"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					loading = false;
					await update();
				};
			}}
			class="space-y-5"
		>
			<div>
				<label
					for="username"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Username</label
				>
				<input
					type="text"
					name="username"
					id="username"
					bind:value={username}
					required
					placeholder="admin"
					autocomplete="username"
					class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
				/>
			</div>

			<div>
				<label
					for="password"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Password</label
				>
				<input
					type="password"
					name="password"
					id="password"
					bind:value={password}
					required
					placeholder="••••••••••••"
					autocomplete="current-password"
					class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
				/>
			</div>

			<button
				type="submit"
				disabled={loading}
				class="w-full mt-2 bg-white hover:bg-zinc-200 text-zinc-950 font-semibold py-3 px-4 rounded-xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
			>
				{#if loading}
					<svg
						class="animate-spin h-5 w-5 text-zinc-950"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					Authenticating...
				{:else}
					Sign In
				{/if}
			</button>
		</form>
	</div>
</main>
