<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props<{
		data: { services: any[] };
		form: { success?: string; error?: string } | null;
	}>();

	let addDialog: HTMLDialogElement | undefined = $state();
	let editDialog: HTMLDialogElement | undefined = $state();

	let currentService = $state<{
		id?: number;
		title: string;
		description: string;
		icon: string;
		sortOrder: number;
		imageUrl: string;
	}>({
		title: '',
		description: '',
		icon: 'Globe',
		sortOrder: 0,
		imageUrl: ''
	});

	let loading = $state(false);

	function openAdd() {
		currentService = {
			title: '',
			description: '',
			icon: 'Globe',
			sortOrder: (data.services.length + 1) * 10,
			imageUrl: ''
		};
		addDialog?.showModal();
	}

	function openEdit(service: any) {
		currentService = { ...service };
		editDialog?.showModal();
	}
</script>

<svelte:head>
	<title>Manage Services | Admin Console</title>
</svelte:head>

<div>
	<!-- Header -->
	<div class="flex items-center justify-between mb-8">
		<div>
			<h2 class="text-2xl font-bold text-white tracking-tight">Services Offered</h2>
			<p class="text-zinc-400 text-sm mt-1">
				Configure individual services listed on the public landing page.
			</p>
		</div>
		<button
			onclick={openAdd}
			class="bg-white hover:bg-zinc-200 text-zinc-950 font-semibold px-4 py-2.5 rounded-xl transition-all shadow text-sm flex items-center gap-2 active:scale-[0.98]"
		>
			Add Service
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
		{#if data.services.length === 0}
			<div class="p-12 text-center text-zinc-500 text-sm">
				No services created yet. Click "Add Service" to get started.
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-left border-collapse text-sm">
					<thead>
						<tr
							class="border-b border-zinc-900 bg-zinc-900/20 text-zinc-400 text-xs font-semibold uppercase tracking-wider"
						>
							<th class="p-4">Cover</th>
							<th class="p-4">Service Details</th>
							<th class="p-4">Icon Name</th>
							<th class="p-4 text-center">Order</th>
							<th class="p-4 text-right">Actions</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-zinc-900">
						{#each data.services as service}
							<tr class="hover:bg-zinc-900/10 transition-colors">
								<!-- Cover Image -->
								<td class="p-4">
									<img
										src="/images/{service.imageUrl}"
										alt={service.title}
										class="w-12 h-12 rounded-lg object-cover bg-zinc-950 border border-zinc-850"
									/>
								</td>

								<!-- Details -->
								<td class="p-4">
									<div class="font-bold text-white text-sm">{service.title}</div>
									<div class="text-zinc-500 text-xs truncate max-w-md mt-1">
										{service.description}
									</div>
								</td>

								<!-- Icon -->
								<td class="p-4 text-zinc-400 text-xs font-mono">{service.icon || 'Globe'}</td>

								<!-- Order -->
								<td class="p-4 text-center text-zinc-300 font-semibold">{service.sortOrder}</td>

								<!-- Actions -->
								<td class="p-4 text-right">
									<div class="inline-flex gap-2">
										<button
											onclick={() => openEdit(service)}
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
											<input type="hidden" name="id" value={service.id} />
											<button
												type="submit"
												onclick={(e) => {
													if (
														!confirm(
															'Are you sure you want to delete this service? All associated public references will be removed.'
														)
													) {
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
			<h3 class="font-bold text-lg text-white">Create New Service</h3>
			<button onclick={() => addDialog?.close()} class="text-zinc-400 hover:text-white">✕</button>
		</div>

		<form
			method="POST"
			action="?/create"
			enctype="multipart/form-data"
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
					for="add-title"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Service Title</label
				>
				<input
					type="text"
					id="add-title"
					name="title"
					required
					class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
				/>
			</div>

			<div>
				<label
					for="add-description"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Description</label
				>
				<textarea
					id="add-description"
					name="description"
					rows="3"
					required
					class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
				></textarea>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div>
					<label
						for="add-icon"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Lucide Icon Name</label
					>
					<input
						type="text"
						id="add-icon"
						name="icon"
						bind:value={currentService.icon}
						placeholder="Globe"
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
				<div>
					<label
						for="add-sortOrder"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Sort Order</label
					>
					<input
						type="number"
						id="add-sortOrder"
						name="sortOrder"
						bind:value={currentService.sortOrder}
						required
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
			</div>

			<div>
				<label
					for="add-image"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Cover Image File</label
				>
				<input
					type="file"
					id="add-image"
					name="imageFile"
					accept="image/*"
					required
					class="w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-zinc-800 file:text-zinc-200 file:hover:bg-zinc-750 file:cursor-pointer"
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
					>{loading ? 'Saving...' : 'Add Service'}</button
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
			<h3 class="font-bold text-lg text-white">Edit Service</h3>
			<button onclick={() => editDialog?.close()} class="text-zinc-400 hover:text-white">✕</button>
		</div>

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
			<input type="hidden" name="id" value={currentService.id} />
			<input type="hidden" name="currentImageUrl" value={currentService.imageUrl} />

			<div>
				<label
					for="edit-title"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Service Title</label
				>
				<input
					type="text"
					id="edit-title"
					name="title"
					bind:value={currentService.title}
					required
					class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
				/>
			</div>

			<div>
				<label
					for="edit-description"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Description</label
				>
				<textarea
					id="edit-description"
					name="description"
					rows="3"
					bind:value={currentService.description}
					required
					class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
				></textarea>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div>
					<label
						for="edit-icon"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Lucide Icon Name</label
					>
					<input
						type="text"
						id="edit-icon"
						name="icon"
						bind:value={currentService.icon}
						placeholder="Globe"
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
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
						bind:value={currentService.sortOrder}
						required
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
			</div>

			<div>
				<label
					for="edit-image"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Replace Cover Image (Optional)</label
				>
				<input
					type="file"
					id="edit-image"
					name="imageFile"
					accept="image/*"
					class="w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-zinc-800 file:text-zinc-200 file:hover:bg-zinc-750 file:cursor-pointer"
				/>
				<div class="mt-2 flex items-center gap-3">
					<span class="text-[10px] text-zinc-500">Current cover:</span>
					{#if currentService.imageUrl}
						<img
							src="/images/{currentService.imageUrl}"
							alt=""
							class="w-8 h-8 rounded object-cover border border-zinc-850"
						/>
					{/if}
				</div>
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
