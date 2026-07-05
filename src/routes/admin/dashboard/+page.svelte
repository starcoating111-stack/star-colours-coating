<script lang="ts">
	import { onMount } from 'svelte';

	let { data } = $props<{
		data: {
			vapidPublicKey: string | null;
			stats: { totalProjects: number; totalGallery: number; totalMessages: number };
			recentMessages: Array<{
				id: number;
				name: string;
				email: string;
				subject: string | null;
				message: string;
				status: string;
				createdAt: string | null;
			}>;
			recentProjects: Array<{
				id: number;
				title: string;
				slug: string;
				category: string;
				location: string;
			}>;
		};
	}>();

	const newMessages = $derived(data.recentMessages.filter((m) => m.status === 'new').length);

	// Push notification state
	type PushStatus = 'loading' | 'unsupported' | 'denied' | 'idle' | 'subscribed' | 'working';
	let pushStatus = $state<PushStatus>('loading');
	let pushError = $state<string | null>(null);

	function urlB64ToUint8Array(b64u: string): Uint8Array {
		const b64 = b64u.replace(/-/g, '+').replace(/_/g, '/');
		const raw = atob(b64 + '='.repeat((4 - (b64.length % 4)) % 4));
		return Uint8Array.from(raw, (c) => c.charCodeAt(0));
	}

	onMount(async () => {
		if (!data.vapidPublicKey || !('serviceWorker' in navigator) || !('PushManager' in window)) {
			pushStatus = 'unsupported';
			return;
		}
		try {
			const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/admin/' });
			await navigator.serviceWorker.ready;
			const existing = await reg.pushManager.getSubscription();
			if (existing) {
				pushStatus = 'subscribed';
			} else {
				pushStatus = Notification.permission === 'denied' ? 'denied' : 'idle';
			}
		} catch {
			pushStatus = 'unsupported';
		}
	});

	async function enablePush() {
		if (!data.vapidPublicKey) return;
		pushStatus = 'working';
		pushError = null;
		try {
			const permission = await Notification.requestPermission();
			if (permission !== 'granted') {
				pushStatus = 'denied';
				return;
			}

			const reg = await navigator.serviceWorker.ready;
			const sub = await reg.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: urlB64ToUint8Array(data.vapidPublicKey)
			});
			const res = await fetch('/admin/push', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(sub.toJSON())
			});
			if (!res.ok) throw new Error('Server rejected subscription');
			pushStatus = 'subscribed';
		} catch (err: any) {
			pushError = err?.message ?? 'Failed to enable notifications';
			pushStatus = 'idle';
		}
	}

	async function disablePush() {
		pushStatus = 'working';
		try {
			const reg = await navigator.serviceWorker.ready;
			const sub = await reg.pushManager.getSubscription();
			if (sub) {
				await fetch('/admin/push', {
					method: 'DELETE',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ endpoint: sub.endpoint })
				});
				await sub.unsubscribe();
			}
			pushStatus = 'idle';
		} catch {
			pushStatus = 'subscribed'; // revert on failure
		}
	}
</script>

<svelte:head>
	<title>Dashboard | Admin Console</title>
</svelte:head>

<div>
	<!-- Header -->
	<div class="mb-8">
		<h2 class="text-2xl font-bold text-white tracking-tight">System Overview</h2>
		<p class="text-zinc-400 text-sm mt-1">
			Real-time statistics and recent client engagement activity.
		</p>
	</div>

	<!-- Stats Grid -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
		<!-- Total Projects -->
		<div class="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6 backdrop-blur">
			<div class="flex items-center justify-between mb-4">
				<span class="text-xs font-semibold text-zinc-400 uppercase tracking-wider"
					>Total Projects</span
				>
				<span class="text-xs px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300">Portfolio</span>
			</div>
			<div class="flex items-baseline gap-2">
				<span class="text-4xl font-extrabold text-white">{data.stats.totalProjects}</span>
			</div>
		</div>

		<!-- Gallery Images -->
		<div class="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6 backdrop-blur">
			<div class="flex items-center justify-between mb-4">
				<span class="text-xs font-semibold text-zinc-400 uppercase tracking-wider"
					>Gallery Assets</span
				>
				<span class="text-xs px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300">Media</span>
			</div>
			<div class="flex items-baseline gap-2">
				<span class="text-4xl font-extrabold text-white">{data.stats.totalGallery}</span>
			</div>
		</div>

		<!-- Contact Submissions -->
		<div class="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6 backdrop-blur">
			<div class="flex items-center justify-between mb-4">
				<span class="text-xs font-semibold text-zinc-400 uppercase tracking-wider"
					>Inbound Messages</span
				>
				{#if newMessages > 0}
					<span
						class="text-xs px-2.5 py-0.5 rounded-full bg-red-950/40 border border-red-900/40 text-red-400 font-medium"
						>{newMessages} unread</span
					>
				{:else}
					<span class="text-xs px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300">No unread</span
					>
				{/if}
			</div>
			<div class="flex items-baseline gap-2">
				<span class="text-4xl font-extrabold text-white">{data.stats.totalMessages}</span>
			</div>
		</div>
	</div>

	<!-- Push Notification Opt-in -->
	{#if pushStatus !== 'unsupported'}
		<div
			class="mb-10 bg-zinc-900/20 border border-zinc-900 rounded-2xl p-5 flex items-center justify-between gap-6"
		>
			<div>
				<p class="text-sm font-semibold text-white">Push Notifications</p>
				<p class="text-xs text-zinc-400 mt-0.5">
					{#if pushStatus === 'loading'}
						Checking notification status…
					{:else if pushStatus === 'denied'}
						Notifications blocked — enable them in your browser settings, then reload.
					{:else if pushStatus === 'subscribed'}
						Active on this device. You'll receive a push when a new inquiry arrives.
					{:else}
						Get a system notification the moment a new inquiry is submitted.
					{/if}
				</p>
				{#if pushError}
					<p class="text-xs text-red-400 mt-1">{pushError}</p>
				{/if}
			</div>
			<div class="shrink-0">
				{#if pushStatus === 'idle' || pushStatus === 'working'}
					<button
						onclick={enablePush}
						disabled={pushStatus === 'working'}
						class="text-xs bg-white hover:bg-zinc-200 text-zinc-950 font-semibold px-4 py-2 rounded-xl transition-all disabled:opacity-50"
					>
						{pushStatus === 'working' ? 'Enabling…' : 'Enable Notifications'}
					</button>
				{:else if pushStatus === 'subscribed'}
					<button
						onclick={disablePush}
						class="text-xs border border-zinc-800 hover:bg-zinc-800/40 text-zinc-400 hover:text-white font-semibold px-4 py-2 rounded-xl transition-all"
					>
						Disable
					</button>
				{:else if pushStatus === 'loading'}
					<span class="text-xs text-zinc-600">…</span>
				{/if}
			</div>
		</div>
	{/if}

	<!-- Recent Activity Split -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
		<!-- Recent Messages -->
		<div class="bg-zinc-900/20 border border-zinc-900 rounded-2xl p-6">
			<div class="flex items-center justify-between mb-6">
				<h3 class="font-bold text-white text-base">Latest Contact Submissions</h3>
				<a href="/admin/messages" class="text-xs text-zinc-400 hover:text-white transition-colors"
					>View All</a
				>
			</div>

			{#if data.recentMessages.length === 0}
				<div
					class="h-48 border border-dashed border-zinc-850 rounded-xl flex items-center justify-center text-zinc-500 text-sm"
				>
					No message submissions yet
				</div>
			{:else}
				<div class="space-y-4">
					{#each data.recentMessages as msg}
						<div
							class="p-4 rounded-xl bg-zinc-900/40 border border-zinc-850 flex items-start justify-between gap-4"
						>
							<div class="min-w-0">
								<div class="flex items-center gap-2 mb-1">
									<span class="font-semibold text-sm text-zinc-200 truncate">{msg.name}</span>
									{#if msg.status === 'new'}
										<span class="w-1.5 h-1.5 rounded-full bg-red-500"></span>
									{/if}
								</div>
								<p class="text-xs text-zinc-400 truncate mb-2">{msg.subject ?? '(No Subject)'}</p>
								<p class="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{msg.message}</p>
							</div>
							<span class="text-[10px] text-zinc-500 whitespace-nowrap">
								{msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : ''}
							</span>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Recent Projects -->
		<div class="bg-zinc-900/20 border border-zinc-900 rounded-2xl p-6">
			<div class="flex items-center justify-between mb-6">
				<h3 class="font-bold text-white text-base">Recently Updated Projects</h3>
				<a href="/admin/projects" class="text-xs text-zinc-400 hover:text-white transition-colors"
					>Manage Portfolio</a
				>
			</div>

			{#if data.recentProjects.length === 0}
				<div
					class="h-48 border border-dashed border-zinc-850 rounded-xl flex items-center justify-center text-zinc-500 text-sm"
				>
					No projects listed
				</div>
			{:else}
				<div class="space-y-4">
					{#each data.recentProjects as proj}
						<div
							class="p-4 rounded-xl bg-zinc-900/40 border border-zinc-850 flex items-center justify-between"
						>
							<div>
								<h4 class="font-semibold text-sm text-zinc-200 mb-1">{proj.title}</h4>
								<div class="flex items-center gap-2 text-xs text-zinc-500">
									<span>{proj.category}</span>
									<span>•</span>
									<span>{proj.location}</span>
								</div>
							</div>
							<a
								href="/admin/projects"
								class="text-xs border border-zinc-800 bg-zinc-950 px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
							>
								Edit
							</a>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
