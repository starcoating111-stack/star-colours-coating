<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props<{
		data: { messages: any[] };
		form: { success?: string; error?: string } | null;
	}>();

	let filter = $state<'all' | 'new' | 'read' | 'archived'>('all');
	let selectedMessage = $state<any | null>(null);

	let filteredMessages = $derived.by(() => {
		if (filter === 'all') return data.messages;
		return data.messages.filter((m) => m.status === filter);
	});

	function selectMessage(msg: any) {
		selectedMessage = msg;
	}
</script>

<svelte:head>
	<title>Inbound Submissions | Admin Console</title>
</svelte:head>

<div>
	<!-- Header -->
	<div class="mb-8">
		<h2 class="text-2xl font-bold text-white tracking-tight">Form Submissions</h2>
		<p class="text-zinc-400 text-sm mt-1">
			Review contact form submissions, inquiries, and spam logs.
		</p>
	</div>

	<!-- Messages notifications -->
	{#if form?.success}
		<div class="mb-6 p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm">
			{form.success}
		</div>
	{:else}
		{#if form?.error}
			<div class="mb-6 p-4 rounded-xl bg-red-950/20 border border-red-900/30 text-red-400 text-sm">
				{form.error}
			</div>
		{/if}
	{/if}

	<!-- Inbox Layout Split -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
		<!-- Left Column: Messages List & Filters -->
		<div class="lg:col-span-1 space-y-4">
			<!-- Status Filter Tabs -->
			<div
				class="flex bg-zinc-950 border border-zinc-900 p-1.5 rounded-xl text-xs gap-1 font-semibold text-zinc-400"
			>
				<button
					onclick={() => (filter = 'all')}
					class="flex-1 py-2 text-center rounded-lg transition-colors {filter === 'all'
						? 'bg-zinc-900 text-white'
						: 'hover:text-zinc-200'}"
				>
					All
				</button>
				<button
					onclick={() => (filter = 'new')}
					class="flex-1 py-2 text-center rounded-lg transition-colors {filter === 'new'
						? 'bg-zinc-900 text-white'
						: 'hover:text-zinc-200'}"
				>
					New
				</button>
				<button
					onclick={() => (filter = 'read')}
					class="flex-1 py-2 text-center rounded-lg transition-colors {filter === 'read'
						? 'bg-zinc-900 text-white'
						: 'hover:text-zinc-200'}"
				>
					Read
				</button>
				<button
					onclick={() => (filter = 'archived')}
					class="flex-1 py-2 text-center rounded-lg transition-colors {filter === 'archived'
						? 'bg-zinc-900 text-white'
						: 'hover:text-zinc-200'}"
				>
					Archived
				</button>
			</div>

			<!-- Messages List -->
			<div class="space-y-3 max-h-[500px] overflow-y-auto pr-1">
				{#if filteredMessages.length === 0}
					<div
						class="border border-dashed border-zinc-900 rounded-xl p-8 text-center text-zinc-600 text-xs"
					>
						No submissions in this folder.
					</div>
				{:else}
					{#each filteredMessages as msg}
						{@const isSelected = selectedMessage?.id === msg.id}
						<button
							onclick={() => selectMessage(msg)}
							class="w-full text-left p-4 rounded-xl border transition-all flex flex-col gap-2 relative bg-zinc-900/10 hover:bg-zinc-900/30 {isSelected
								? 'border-white'
								: 'border-zinc-900'}"
						>
							<div class="flex items-start justify-between gap-4 w-full">
								<span class="font-bold text-sm text-zinc-200 truncate">{msg.name}</span>
								<span class="text-[9px] text-zinc-500 whitespace-nowrap">
									{msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : ''}
								</span>
							</div>

							<div class="text-xs font-medium text-zinc-300 truncate w-full">
								{msg.subject || '(No Subject)'}
							</div>

							<div class="text-xs text-zinc-500 line-clamp-1 w-full">
								{msg.message}
							</div>

							<div class="flex items-center justify-between mt-1 w-full">
								<!-- Status indicator -->
								{#if msg.status === 'new'}
									<span
										class="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-950/40 border border-red-900/40 text-red-400"
									>
										New
									</span>
								{:else if msg.status === 'read'}
									<span
										class="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-zinc-900 text-zinc-400"
									>
										Read
									</span>
								{:else}
									<span
										class="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-zinc-900/50 border border-zinc-900 text-zinc-500"
									>
										Archived
									</span>
								{/if}
							</div>
						</button>
					{/each}
				{/if}
			</div>
		</div>

		<!-- Right Column: Selected Message Detail View -->
		<div class="lg:col-span-2">
			{#if !selectedMessage}
				<div
					class="border border-dashed border-zinc-900 rounded-2xl h-[420px] flex flex-col items-center justify-center text-zinc-500 p-8"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-8 h-8 text-zinc-600 mb-3"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0l-3.586-3.586a2 2 0 00-2.828 0L16 14m-8.657 0l-3-3m0 0l3-3m-3 3h12.75"
						/>
					</svg>
					<span class="text-sm">Select a submission from the inbox to read details.</span>
				</div>
			{:else}
				<div class="bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 space-y-6 backdrop-blur">
					<!-- Detail Header -->
					<div class="flex items-start justify-between border-b border-zinc-900 pb-5 gap-4">
						<div>
							<h3 class="font-bold text-lg text-white mb-2">
								{selectedMessage.subject || '(No Subject)'}
							</h3>
							<div class="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
								<span class="font-semibold text-zinc-200">From: {selectedMessage.name}</span>
								<span>•</span>
								<span>{selectedMessage.email}</span>
								{#if selectedMessage.phone}
									<span>•</span>
									<span>{selectedMessage.phone}</span>
								{/if}
							</div>
						</div>
						<span class="text-xs text-zinc-500 whitespace-nowrap">
							{selectedMessage.createdAt
								? new Date(selectedMessage.createdAt).toLocaleString()
								: ''}
						</span>
					</div>

					<!-- Message Body -->
					<div
						class="text-zinc-200 text-sm leading-relaxed whitespace-pre-wrap min-h-[150px] bg-zinc-950 p-4 rounded-xl border border-zinc-900"
					>
						{selectedMessage.message}
					</div>

					<!-- Actions Footer -->
					<div class="flex items-center justify-between border-t border-zinc-900 pt-5">
						<div class="inline-flex gap-2">
							{#if selectedMessage.status !== 'read'}
								<form
									method="POST"
									action="?/updateStatus"
									use:enhance={() => {
										return async ({ update }) => {
											await update();
											selectedMessage.status = 'read';
										};
									}}
								>
									<input type="hidden" name="id" value={selectedMessage.id} />
									<input type="hidden" name="status" value="read" />
									<button
										type="submit"
										class="text-xs border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 px-4 py-2 rounded-lg text-zinc-300 hover:text-white transition-colors"
									>
										Mark as Read
									</button>
								</form>
							{/if}

							{#if selectedMessage.status !== 'archived'}
								<form
									method="POST"
									action="?/updateStatus"
									use:enhance={() => {
										return async ({ update }) => {
											await update();
											selectedMessage.status = 'archived';
										};
									}}
								>
									<input type="hidden" name="id" value={selectedMessage.id} />
									<input type="hidden" name="status" value="archived" />
									<button
										type="submit"
										class="text-xs border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 px-4 py-2 rounded-lg text-zinc-400 hover:text-white transition-colors"
									>
										Archive
									</button>
								</form>
							{/if}
						</div>

						<form
							method="POST"
							action="?/delete"
							use:enhance={() => {
								return async ({ update }) => {
									selectedMessage = null;
									await update();
								};
							}}
						>
							<input type="hidden" name="id" value={selectedMessage.id} />
							<button
								type="submit"
								onclick={(e) => {
									if (!confirm('Are you sure you want to permanently delete this submission?')) {
										e.preventDefault();
									}
								}}
								class="text-xs border border-red-950/40 bg-red-950/10 hover:bg-red-900/20 px-4 py-2 rounded-lg text-red-400 transition-colors"
							>
								Delete Message
							</button>
						</form>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
