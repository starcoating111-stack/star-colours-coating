<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props<{
		data: { teamMembers: any[] };
		form: { success?: string; error?: string } | null;
	}>();

	let addDialog: HTMLDialogElement | undefined = $state();
	let editDialog: HTMLDialogElement | undefined = $state();

	let current = $state<{
		id?: number;
		name: string;
		designation: string;
		bio: string;
		email: string;
		linkedinUrl: string;
		sortOrder: number;
		photoUrl: string;
		isActive: boolean;
	}>({
		name: '',
		designation: '',
		bio: '',
		email: '',
		linkedinUrl: '',
		sortOrder: 0,
		photoUrl: '',
		isActive: true
	});

	let loading = $state(false);

	function openAdd() {
		current = {
			name: '',
			designation: '',
			bio: '',
			email: '',
			linkedinUrl: '',
			sortOrder: (data.teamMembers.length + 1) * 10,
			photoUrl: '',
			isActive: true
		};
		addDialog?.showModal();
	}

	function openEdit(m: any) {
		current = {
			...m,
			bio: m.bio ?? '',
			email: m.email ?? '',
			linkedinUrl: m.linkedinUrl ?? '',
			photoUrl: m.photoUrl ?? ''
		};
		editDialog?.showModal();
	}
</script>

<svelte:head>
	<title>Manage Team | Admin Console</title>
</svelte:head>

<div>
	<div class="flex items-center justify-between mb-8">
		<div>
			<h2 class="text-2xl font-bold text-white tracking-tight">Team Members</h2>
			<p class="text-zinc-400 text-sm mt-1">Manage the team members shown on the public site.</p>
		</div>
		<button
			onclick={openAdd}
			class="bg-white hover:bg-zinc-200 text-zinc-950 font-semibold px-4 py-2.5 rounded-xl transition-all shadow text-sm flex items-center gap-2 active:scale-[0.98]"
		>
			Add Member
		</button>
	</div>

	{#if form?.success}
		<div class="mb-6 p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm">
			{form.success}
		</div>
	{:else if form?.error}
		<div class="mb-6 p-4 rounded-xl bg-red-950/20 border border-red-900/30 text-red-400 text-sm">
			{form.error}
		</div>
	{/if}

	<div class="bg-zinc-900/10 border border-zinc-900 rounded-2xl overflow-hidden backdrop-blur">
		{#if data.teamMembers.length === 0}
			<div class="p-12 text-center text-zinc-500 text-sm">
				No team members yet. Click "Add Member" to create one.
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-left border-collapse text-sm">
					<thead>
						<tr
							class="border-b border-zinc-900 bg-zinc-900/20 text-zinc-400 text-xs font-semibold uppercase tracking-wider"
						>
							<th class="p-4">Photo</th>
							<th class="p-4">Name & Role</th>
							<th class="p-4">Contact</th>
							<th class="p-4 text-center">Sort</th>
							<th class="p-4 text-center">Active</th>
							<th class="p-4 text-right">Actions</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-zinc-900">
						{#each data.teamMembers as m}
							<tr class="hover:bg-zinc-900/10 transition-colors">
								<td class="p-4">
									{#if m.photoUrl}
										<img
											src="/images/{m.photoUrl}"
											alt={m.name}
											class="w-10 h-10 rounded-full object-cover bg-zinc-950 border border-zinc-850"
										/>
									{:else}
										<div
											class="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-zinc-500 text-xs uppercase"
										>
											{m.name.substring(0, 2)}
										</div>
									{/if}
								</td>
								<td class="p-4">
									<div class="font-bold text-white text-sm">{m.name}</div>
									<div class="text-zinc-500 text-xs mt-0.5">{m.designation}</div>
								</td>
								<td class="p-4 text-xs text-zinc-400 space-y-0.5">
									{#if m.email}<div>{m.email}</div>{/if}
									{#if m.linkedinUrl}<div class="text-zinc-600 truncate max-w-[160px]">
											{m.linkedinUrl}
										</div>{/if}
								</td>
								<td class="p-4 text-center text-zinc-400 text-xs">{m.sortOrder}</td>
								<td class="p-4 text-center">
									<form
										method="POST"
										action="?/toggleActive"
										use:enhance={() =>
											async ({ update }) =>
												update()}
									>
										<input type="hidden" name="id" value={m.id} />
										<input type="hidden" name="isActive" value={m.isActive} />
										<button
											type="submit"
											class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors {m.isActive
												? 'bg-emerald-950/40 border border-emerald-900/40 text-emerald-400 hover:bg-emerald-950/60'
												: 'bg-zinc-900 text-zinc-500 hover:bg-zinc-800'}"
										>
											{m.isActive ? 'Active' : 'Inactive'}
										</button>
									</form>
								</td>
								<td class="p-4 text-right">
									<div class="inline-flex gap-2">
										<button
											onclick={() => openEdit(m)}
											class="text-xs border border-zinc-850 bg-zinc-900/30 hover:bg-zinc-800 px-3 py-1.5 rounded-lg text-zinc-300 hover:text-white transition-colors"
											>Edit</button
										>
										<form
											method="POST"
											action="?/delete"
											use:enhance={() =>
												async ({ update }) =>
													update()}
											class="inline"
										>
											<input type="hidden" name="id" value={m.id} />
											<button
												type="submit"
												onclick={(e) => {
													if (!confirm('Delete this team member?')) e.preventDefault();
												}}
												class="text-xs border border-red-950/40 bg-red-950/10 hover:bg-red-900/20 px-3 py-1.5 rounded-lg text-red-400 transition-colors"
												>Delete</button
											>
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
			<h3 class="font-bold text-lg text-white">Add Team Member</h3>
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
			<div class="grid grid-cols-2 gap-4">
				<div>
					<label
						for="add-name"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Name *</label
					>
					<input
						type="text"
						id="add-name"
						name="name"
						required
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
				<div>
					<label
						for="add-desig"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Designation *</label
					>
					<input
						type="text"
						id="add-desig"
						name="designation"
						required
						placeholder="e.g. Senior Stylist"
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
			</div>
			<div>
				<label
					for="add-bio"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Bio (Optional)</label
				>
				<textarea
					id="add-bio"
					name="bio"
					rows="2"
					class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
				></textarea>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div>
					<label
						for="add-email"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Email (Optional)</label
					>
					<input
						type="email"
						id="add-email"
						name="email"
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
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
						bind:value={current.sortOrder}
						required
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
			</div>
			<div>
				<label
					for="add-linkedin"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>LinkedIn URL (Optional)</label
				>
				<input
					type="url"
					id="add-linkedin"
					name="linkedinUrl"
					placeholder="https://linkedin.com/in/username"
					class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
				/>
			</div>
			<div>
				<label
					for="add-photo"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Photo (Optional)</label
				>
				<input
					type="file"
					id="add-photo"
					name="photoFile"
					accept="image/*"
					class="w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-zinc-800 file:text-zinc-200 file:cursor-pointer"
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
					>{loading ? 'Saving...' : 'Add Member'}</button
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
			<h3 class="font-bold text-lg text-white">Edit Team Member</h3>
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
			<input type="hidden" name="id" value={current.id} />
			<input type="hidden" name="currentPhotoUrl" value={current.photoUrl} />
			<div class="grid grid-cols-2 gap-4">
				<div>
					<label
						for="edit-name"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Name *</label
					>
					<input
						type="text"
						id="edit-name"
						name="name"
						bind:value={current.name}
						required
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
				<div>
					<label
						for="edit-desig"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Designation *</label
					>
					<input
						type="text"
						id="edit-desig"
						name="designation"
						bind:value={current.designation}
						required
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
			</div>
			<div>
				<label
					for="edit-bio"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Bio (Optional)</label
				>
				<textarea
					id="edit-bio"
					name="bio"
					rows="2"
					bind:value={current.bio}
					class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
				></textarea>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div>
					<label
						for="edit-email"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Email (Optional)</label
					>
					<input
						type="email"
						id="edit-email"
						name="email"
						bind:value={current.email}
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
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
						bind:value={current.sortOrder}
						required
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
			</div>
			<div>
				<label
					for="edit-linkedin"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>LinkedIn URL (Optional)</label
				>
				<input
					type="url"
					id="edit-linkedin"
					name="linkedinUrl"
					bind:value={current.linkedinUrl}
					placeholder="https://linkedin.com/in/username"
					class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
				/>
			</div>
			<div>
				<label
					for="edit-photo"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Replace Photo (Optional)</label
				>
				<input
					type="file"
					id="edit-photo"
					name="photoFile"
					accept="image/*"
					class="w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-zinc-800 file:text-zinc-200 file:cursor-pointer"
				/>
				{#if current.photoUrl}
					<div class="mt-2 flex items-center gap-3">
						<span class="text-[10px] text-zinc-500">Current:</span>
						<img
							src="/images/{current.photoUrl}"
							alt=""
							class="w-8 h-8 rounded-full object-cover border border-zinc-850"
						/>
					</div>
				{/if}
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
