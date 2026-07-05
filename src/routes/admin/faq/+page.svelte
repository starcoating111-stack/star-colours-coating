<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props<{
		data: { faqs: any[] };
		form: { success?: string; error?: string } | null;
	}>();

	let addDialog: HTMLDialogElement | undefined = $state();
	let editDialog: HTMLDialogElement | undefined = $state();

	let currentFaq = $state<{
		id?: number;
		question: string;
		answer: string;
		sortOrder: number;
	}>({
		question: '',
		answer: '',
		sortOrder: 0
	});

	let loading = $state(false);

	function openAdd() {
		currentFaq = {
			question: '',
			answer: '',
			sortOrder: (data.faqs.length + 1) * 10
		};
		addDialog?.showModal();
	}

	function openEdit(faqItem: any) {
		currentFaq = { ...faqItem };
		editDialog?.showModal();
	}
</script>

<svelte:head>
	<title>Manage FAQs | Admin Console</title>
</svelte:head>

<div>
	<!-- Header -->
	<div class="flex items-center justify-between mb-8">
		<div>
			<h2 class="text-2xl font-bold text-white tracking-tight">Frequently Asked Questions</h2>
			<p class="text-zinc-400 text-sm mt-1">
				Configure individual Q&A items shown on the public landing page.
			</p>
		</div>
		<button
			onclick={openAdd}
			class="bg-white hover:bg-zinc-200 text-zinc-950 font-semibold px-4 py-2.5 rounded-xl transition-all shadow text-sm flex items-center gap-2 active:scale-[0.98]"
		>
			Add FAQ
		</button>
	</div>

	<!-- Messages -->
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

	<!-- List Table -->
	<div class="bg-zinc-900/10 border border-zinc-900 rounded-2xl overflow-hidden backdrop-blur">
		{#if data.faqs.length === 0}
			<div class="p-12 text-center text-zinc-500 text-sm">
				No FAQ items registered. Click "Add FAQ" to create one.
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-left border-collapse text-sm">
					<thead>
						<tr
							class="border-b border-zinc-900 bg-zinc-900/20 text-zinc-400 text-xs font-semibold uppercase tracking-wider"
						>
							<th class="p-4">Question</th>
							<th class="p-4">Answer Preview</th>
							<th class="p-4 text-center">Order</th>
							<th class="p-4 text-right">Actions</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-zinc-900">
						{#each data.faqs as item}
							<tr class="hover:bg-zinc-900/10 transition-colors">
								<!-- Question -->
								<td class="p-4 font-semibold text-white text-sm">
									{item.question}
								</td>

								<!-- Answer -->
								<td class="p-4">
									<p class="text-zinc-400 text-xs line-clamp-1 max-w-sm">{item.answer}</p>
								</td>

								<!-- Order -->
								<td class="p-4 text-center text-zinc-300 font-semibold">{item.sortOrder}</td>

								<!-- Actions -->
								<td class="p-4 text-right">
									<div class="inline-flex gap-2">
										<button
											onclick={() => openEdit(item)}
											class="text-xs border border-zinc-850 bg-zinc-900/30 hover:bg-zinc-800 px-3 py-1.5 rounded-lg text-zinc-300 hover:text-white transition-colors"
										>
											Edit
										</button>

										<form
											method="POST"
											action="?/delete"
											use:enhance={() => {
												return async ({ update }) => {
													await update();
												};
											}}
											class="inline"
										>
											<input type="hidden" name="id" value={item.id} />
											<button
												type="submit"
												onclick={(e) => {
													if (!confirm('Are you sure you want to delete this FAQ item?')) {
														e.preventDefault();
													}
												}}
												class="text-xs border border-red-950/40 bg-red-950/10 hover:bg-red-900/20 px-3 py-1.5 rounded-lg text-red-400 transition-colors"
											>
												Delete
											</button>
										</form>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>

	<!-- Add Modal -->
	<dialog
		bind:this={addDialog}
		class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-zinc-100 backdrop:bg-black/60 backdrop:backdrop-blur-sm max-w-lg w-full"
	>
		<div class="flex items-center justify-between mb-6">
			<h3 class="font-bold text-lg text-white">Create FAQ Item</h3>
			<button onclick={() => addDialog?.close()} class="text-zinc-400 hover:text-white">✕</button>
		</div>

		<form
			method="POST"
			action="?/create"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					loading = false;
					addDialog?.close();
					await update();
				};
			}}
			class="space-y-4"
		>
			<div>
				<label
					for="add-question"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Question</label
				>
				<input
					type="text"
					id="add-question"
					name="question"
					required
					class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
				/>
			</div>

			<div>
				<label
					for="add-answer"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Answer</label
				>
				<textarea
					id="add-answer"
					name="answer"
					rows="4"
					required
					class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
				></textarea>
			</div>

			<div>
				<label
					for="add-sort"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Sort Order</label
				>
				<input
					type="number"
					id="add-sort"
					name="sortOrder"
					bind:value={currentFaq.sortOrder}
					required
					class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
				/>
			</div>

			<div class="flex justify-end gap-3 pt-4 border-t border-zinc-800">
				<button
					type="button"
					onclick={() => addDialog?.close()}
					class="border border-zinc-800 hover:bg-zinc-800/40 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
					>Cancel</button
				>
				<button
					type="submit"
					disabled={loading}
					class="bg-white hover:bg-zinc-200 text-zinc-950 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
					>{loading ? 'Saving...' : 'Add FAQ'}</button
				>
			</div>
		</form>
	</dialog>

	<!-- Edit Modal -->
	<dialog
		bind:this={editDialog}
		class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-zinc-100 backdrop:bg-black/60 backdrop:backdrop-blur-sm max-w-lg w-full"
	>
		<div class="flex items-center justify-between mb-6">
			<h3 class="font-bold text-lg text-white">Edit FAQ Item</h3>
			<button onclick={() => editDialog?.close()} class="text-zinc-400 hover:text-white">✕</button>
		</div>

		<form
			method="POST"
			action="?/update"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					loading = false;
					editDialog?.close();
					await update();
				};
			}}
			class="space-y-4"
		>
			<input type="hidden" name="id" value={currentFaq.id} />

			<div>
				<label
					for="edit-question"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Question</label
				>
				<input
					type="text"
					id="edit-question"
					name="question"
					bind:value={currentFaq.question}
					required
					class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
				/>
			</div>

			<div>
				<label
					for="edit-answer"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Answer</label
				>
				<textarea
					id="edit-answer"
					name="answer"
					rows="4"
					bind:value={currentFaq.answer}
					required
					class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
				></textarea>
			</div>

			<div>
				<label
					for="edit-sort"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Sort Order</label
				>
				<input
					type="number"
					id="edit-sort"
					name="sortOrder"
					bind:value={currentFaq.sortOrder}
					required
					class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
				/>
			</div>

			<div class="flex justify-end gap-3 pt-4 border-t border-zinc-800">
				<button
					type="button"
					onclick={() => editDialog?.close()}
					class="border border-zinc-800 hover:bg-zinc-800/40 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
					>Cancel</button
				>
				<button
					type="submit"
					disabled={loading}
					class="bg-white hover:bg-zinc-200 text-zinc-950 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
					>{loading ? 'Saving...' : 'Save Changes'}</button
				>
			</div>
		</form>
	</dialog>
</div>
