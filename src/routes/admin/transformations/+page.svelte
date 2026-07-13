<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props<{
		data: { transformations: any[] };
		form: { success?: string; error?: string } | null;
	}>();

	let createDialog: HTMLDialogElement | undefined = $state();
	let editDialog: HTMLDialogElement | undefined = $state();
	let loading = $state(false);

	let editItem = $state<any>(null);

	// Preview state for create dialog
	let createBeforePreview = $state<string | null>(null);
	let createAfterPreview = $state<string | null>(null);

	// Preview state for edit dialog
	let editBeforePreview = $state<string | null>(null);
	let editAfterPreview = $state<string | null>(null);

	function openCreate() {
		createBeforePreview = null;
		createAfterPreview = null;
		createDialog?.showModal();
	}

	function openEdit(item: any) {
		editItem = { ...item };
		editBeforePreview = null;
		editAfterPreview = null;
		editDialog?.showModal();
	}

	function handleFilePreview(
		event: Event,
		setter: (v: string | null) => void
	) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => setter(reader.result as string);
			reader.readAsDataURL(file);
		} else {
			setter(null);
		}
	}
</script>

<svelte:head>
	<title>Manage Transformations | Admin Console</title>
</svelte:head>

<div>
	<!-- Header -->
	<div class="flex items-center justify-between mb-8">
		<div>
			<h2 class="text-2xl font-bold text-white tracking-tight">Transformations</h2>
			<p class="text-zinc-400 text-sm mt-1">
				Manage before & after showcase entries displayed on the homepage.
			</p>
		</div>
		<button
			onclick={openCreate}
			class="bg-white hover:bg-zinc-200 text-zinc-950 font-semibold px-4 py-2.5 rounded-xl transition-all shadow text-sm flex items-center gap-2 active:scale-[0.98]"
		>
			Add Transformation
		</button>
	</div>

	<!-- Messages -->
	{#if form?.success}
		<div class="mb-6 p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm">
			{form.success}
		</div>
	{:else if form?.error}
		<div
			class="mb-6 p-4 rounded-xl bg-red-950/20 border border-red-900/30 text-red-400 text-sm"
		>
			{form.error}
		</div>
	{/if}

	<!-- List -->
	{#if data.transformations.length === 0}
		<div
			class="border border-dashed border-zinc-900 rounded-2xl p-12 text-center text-zinc-500 text-sm"
		>
			No transformations added yet. Click "Add Transformation" to create one.
		</div>
	{:else}
		<div class="space-y-6">
			{#each data.transformations as item}
				<div
					class="bg-zinc-900/10 border border-zinc-900 rounded-2xl overflow-hidden backdrop-blur"
				>
					<div class="grid grid-cols-1 md:grid-cols-12 gap-0">
						<!-- Before/After image pair -->
						<div class="md:col-span-5 grid grid-cols-2 gap-0">
							<div class="relative aspect-[4/3] bg-zinc-950 overflow-hidden">
								<img
									src="/images/{item.beforeImageUrl}"
									alt="{item.title} - Before"
									class="w-full h-full object-cover"
								/>
								<span
									class="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-950/80 text-zinc-300 uppercase tracking-wider backdrop-blur"
								>
									Before
								</span>
							</div>
							<div class="relative aspect-[4/3] bg-zinc-950 overflow-hidden">
								<img
									src="/images/{item.afterImageUrl}"
									alt="{item.title} - After"
									class="w-full h-full object-cover"
								/>
								<span
									class="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-950/80 text-zinc-300 uppercase tracking-wider backdrop-blur"
								>
									After
								</span>
							</div>
						</div>

						<!-- Details -->
						<div class="md:col-span-7 p-5 flex flex-col justify-between gap-4">
							<div class="space-y-3">
								<div class="flex items-start justify-between gap-4">
									<h3 class="text-white font-bold text-base">{item.title}</h3>
									<span class="text-[10px] text-zinc-500 font-mono shrink-0"
										>Order: {item.sortOrder}</span
									>
								</div>
								<div class="space-y-1">
									<span
										class="text-[10px] font-bold text-zinc-500 uppercase tracking-wider"
										>Challenge</span
									>
									<p class="text-zinc-400 text-sm leading-relaxed line-clamp-2">
										{item.challenge}
									</p>
								</div>
								<div class="space-y-1">
									<span
										class="text-[10px] font-bold text-zinc-500 uppercase tracking-wider"
										>Result</span
									>
									<p class="text-zinc-400 text-sm leading-relaxed line-clamp-2">
										{item.result}
									</p>
								</div>
							</div>

							<!-- Actions -->
							<div
								class="flex items-center gap-4 border-t border-zinc-900/50 pt-3"
							>
								<button
									onclick={() => openEdit(item)}
									class="text-xs text-zinc-300 hover:text-white font-semibold transition-colors"
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
											if (
												!confirm(
													'Delete this transformation? Both images will be removed from storage.'
												)
											) {
												e.preventDefault();
											}
										}}
										class="text-xs text-red-500 hover:text-red-400 font-semibold transition-colors"
									>
										Delete
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<!-- Create Modal -->
	<dialog
		bind:this={createDialog}
		class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-zinc-100 backdrop:bg-black/60 backdrop:backdrop-blur-sm max-w-lg w-full m-auto"
	>
		<div class="flex items-center justify-between mb-6">
			<h3 class="font-bold text-lg text-white">Add Transformation</h3>
			<button onclick={() => createDialog?.close()} class="text-zinc-400 hover:text-white"
				>✕</button
			>
		</div>

		<form
			method="POST"
			action="?/create"
			enctype="multipart/form-data"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					loading = false;
					createDialog?.close();
					await update();
				};
			}}
			class="space-y-4"
		>
			<div>
				<label
					for="create-title"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Project Title *</label
				>
				<input
					type="text"
					id="create-title"
					name="title"
					required
					placeholder="e.g. Living Room Wall Coating"
					class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
				/>
			</div>

			<div>
				<label
					for="create-challenge"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Client's Challenge *</label
				>
				<textarea
					id="create-challenge"
					name="challenge"
					rows="2"
					required
					placeholder="Describe the problem the client faced"
					class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
				></textarea>
			</div>

			<div>
				<label
					for="create-result"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Result *</label
				>
				<textarea
					id="create-result"
					name="result"
					rows="2"
					required
					placeholder="Describe the outcome"
					class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
				></textarea>
			</div>

			<!-- Image uploads side by side -->
			<div class="grid grid-cols-2 gap-4">
				<div>
					<label
						for="create-before"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Before Image *</label
					>
					<input
						type="file"
						id="create-before"
						name="beforeImage"
						accept="image/*"
						required
						onchange={(e) => handleFilePreview(e, (v) => (createBeforePreview = v))}
						class="w-full text-sm text-zinc-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-zinc-800 file:text-zinc-200 file:hover:bg-zinc-750 file:cursor-pointer file:text-xs"
					/>
					{#if createBeforePreview}
						<img
							src={createBeforePreview}
							alt="Before preview"
							class="mt-2 w-full aspect-[4/3] object-cover rounded-lg border border-zinc-800"
						/>
					{/if}
				</div>
				<div>
					<label
						for="create-after"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>After Image *</label
					>
					<input
						type="file"
						id="create-after"
						name="afterImage"
						accept="image/*"
						required
						onchange={(e) => handleFilePreview(e, (v) => (createAfterPreview = v))}
						class="w-full text-sm text-zinc-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-zinc-800 file:text-zinc-200 file:hover:bg-zinc-750 file:cursor-pointer file:text-xs"
					/>
					{#if createAfterPreview}
						<img
							src={createAfterPreview}
							alt="After preview"
							class="mt-2 w-full aspect-[4/3] object-cover rounded-lg border border-zinc-800"
						/>
					{/if}
				</div>
			</div>

			<div>
				<label
					for="create-sortOrder"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Sort Order</label
				>
				<input
					type="number"
					id="create-sortOrder"
					name="sortOrder"
					value="0"
					required
					class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700 max-w-[120px]"
				/>
			</div>

			<div class="flex justify-end gap-3 pt-4 border-t border-zinc-800">
				<button
					type="button"
					onclick={() => createDialog?.close()}
					class="border border-zinc-800 hover:bg-zinc-800/40 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
					>Cancel</button
				>
				<button
					type="submit"
					disabled={loading}
					class="bg-white hover:bg-zinc-200 text-zinc-950 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
					>{loading ? 'Saving...' : 'Save'}</button
				>
			</div>
		</form>
	</dialog>

	<!-- Edit Modal -->
	<dialog
		bind:this={editDialog}
		class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-zinc-100 backdrop:bg-black/60 backdrop:backdrop-blur-sm max-w-lg w-full m-auto"
	>
		<div class="flex items-center justify-between mb-6">
			<h3 class="font-bold text-lg text-white">Edit Transformation</h3>
			<button onclick={() => editDialog?.close()} class="text-zinc-400 hover:text-white"
				>✕</button
			>
		</div>

		{#if editItem}
			<form
				method="POST"
				action="?/update"
				enctype="multipart/form-data"
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
				<input type="hidden" name="id" value={editItem.id} />

				<div>
					<label
						for="edit-title"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Project Title *</label
					>
					<input
						type="text"
						id="edit-title"
						name="title"
						required
						value={editItem.title}
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>

				<div>
					<label
						for="edit-challenge"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Client's Challenge *</label
					>
					<textarea
						id="edit-challenge"
						name="challenge"
						rows="2"
						required
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					>{editItem.challenge}</textarea>
				</div>

				<div>
					<label
						for="edit-result"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Result *</label
					>
					<textarea
						id="edit-result"
						name="result"
						rows="2"
						required
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					>{editItem.result}</textarea>
				</div>

				<!-- Current images + replace -->
				<div class="grid grid-cols-2 gap-4">
					<div>
						<label
							for="edit-before"
							class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
							>Before Image</label
						>
						<img
							src={editBeforePreview || `/images/${editItem.beforeImageUrl}`}
							alt="Current before"
							class="w-full aspect-[4/3] object-cover rounded-lg border border-zinc-800 mb-2"
						/>
						<input
							type="file"
							id="edit-before"
							name="beforeImage"
							accept="image/*"
							onchange={(e) =>
								handleFilePreview(e, (v) => (editBeforePreview = v))}
							class="w-full text-sm text-zinc-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-zinc-800 file:text-zinc-200 file:hover:bg-zinc-750 file:cursor-pointer file:text-xs"
						/>
						<p class="text-[10px] text-zinc-600 mt-1">Leave empty to keep current</p>
					</div>
					<div>
						<label
							for="edit-after"
							class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
							>After Image</label
						>
						<img
							src={editAfterPreview || `/images/${editItem.afterImageUrl}`}
							alt="Current after"
							class="w-full aspect-[4/3] object-cover rounded-lg border border-zinc-800 mb-2"
						/>
						<input
							type="file"
							id="edit-after"
							name="afterImage"
							accept="image/*"
							onchange={(e) =>
								handleFilePreview(e, (v) => (editAfterPreview = v))}
							class="w-full text-sm text-zinc-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-zinc-800 file:text-zinc-200 file:hover:bg-zinc-750 file:cursor-pointer file:text-xs"
						/>
						<p class="text-[10px] text-zinc-600 mt-1">Leave empty to keep current</p>
					</div>
				</div>

				<div>
					<label
						for="edit-sortOrder"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Sort Order</label
					>
					<input
						type="number"
						id="edit-sortOrder"
						name="sortOrder"
						value={editItem.sortOrder}
						required
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700 max-w-[120px]"
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
						>{loading ? 'Saving...' : 'Update'}</button
					>
				</div>
			</form>
		{/if}
	</dialog>
</div>
