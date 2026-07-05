<script lang="ts">
	import { enhance } from '$app/forms';
	import { parseVideoUrl } from '$lib/video';

	let { data, form } = $props<{
		data: { projects: any[] };
		form: { success?: string; error?: string } | null;
	}>();

	let addDialog: HTMLDialogElement | undefined = $state();
	let editDialog: HTMLDialogElement | undefined = $state();

	let currentProject = $state<{
		id?: number;
		title: string;
		description: string;
		category: string;
		location: string;
		completionDate: string;
		clientName: string;
		area: string;
		budget: string;
		isFeatured: boolean;
		sortOrder: number;
		coverImageUrl: string;
		media: Array<{
			id: number;
			mediaType: string;
			imageUrl: string | null;
			videoUrl: string | null;
		}>;
	}>({
		title: '',
		description: '',
		category: '',
		location: '',
		completionDate: '',
		clientName: '',
		area: '',
		budget: '',
		isFeatured: false,
		sortOrder: 0,
		coverImageUrl: '',
		media: []
	});

	let markedForDeletion = $state<number[]>([]);
	let loading = $state(false);

	function openAdd() {
		currentProject = {
			title: '',
			description: '',
			category: 'Commercial',
			location: '',
			completionDate: '',
			clientName: '',
			area: '',
			budget: '',
			isFeatured: false,
			sortOrder: (data.projects.length + 1) * 10,
			coverImageUrl: '',
			media: []
		};
		markedForDeletion = [];
		addDialog?.showModal();
	}

	function openEdit(project: any) {
		currentProject = { ...project };
		markedForDeletion = [];
		editDialog?.showModal();
	}

	function toggleDelete(id: number) {
		markedForDeletion = markedForDeletion.includes(id)
			? markedForDeletion.filter((x) => x !== id)
			: [...markedForDeletion, id];
	}

	// Derive YouTube thumbnail from a stored raw URL
	function videoThumb(videoUrl: string | null): string | null {
		if (!videoUrl) return null;
		const parsed = parseVideoUrl(videoUrl);
		return parsed?.thumbnailUrl ?? null;
	}
</script>

<svelte:head>
	<title>Manage Projects | Admin Console</title>
</svelte:head>

<div>
	<!-- Header -->
	<div class="flex items-center justify-between mb-8">
		<div>
			<h2 class="text-2xl font-bold text-white tracking-tight">Projects & Portfolio</h2>
			<p class="text-zinc-400 text-sm mt-1">
				Manage project details, specifications, covers, and nested galleries.
			</p>
		</div>
		<button
			onclick={openAdd}
			class="bg-white hover:bg-zinc-200 text-zinc-950 font-semibold px-4 py-2.5 rounded-xl transition-all shadow text-sm flex items-center gap-2 active:scale-[0.98]"
		>
			Add Project
		</button>
	</div>

	<!-- Notifications -->
	{#if form?.success}
		<div class="mb-6 p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm">
			{form.success}
		</div>
	{:else if form?.error}
		<div class="mb-6 p-4 rounded-xl bg-red-950/20 border border-red-900/30 text-red-400 text-sm">
			{form.error}
		</div>
	{/if}

	<!-- List Table -->
	<div class="bg-zinc-900/10 border border-zinc-900 rounded-2xl overflow-hidden backdrop-blur">
		{#if data.projects.length === 0}
			<div class="p-12 text-center text-zinc-500 text-sm">
				No projects added yet. Click "Add Project" to populate your portfolio.
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-left border-collapse text-sm">
					<thead>
						<tr
							class="border-b border-zinc-900 bg-zinc-900/20 text-zinc-400 text-xs font-semibold uppercase tracking-wider"
						>
							<th class="p-4">Cover</th>
							<th class="p-4">Project Details</th>
							<th class="p-4">Category</th>
							<th class="p-4">Location</th>
							<th class="p-4 text-center">Featured</th>
							<th class="p-4 text-center">Media</th>
							<th class="p-4 text-right">Actions</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-zinc-900">
						{#each data.projects as project}
							<tr class="hover:bg-zinc-900/10 transition-colors">
								<td class="p-4">
									<img
										src="/images/{project.coverImageUrl}"
										alt={project.title}
										class="w-16 h-12 rounded-lg object-cover bg-zinc-950 border border-zinc-850"
									/>
								</td>
								<td class="p-4">
									<div class="font-bold text-white text-sm">{project.title}</div>
									<div class="text-zinc-500 text-xs mt-1">Slug: {project.slug}</div>
								</td>
								<td class="p-4 text-zinc-300">{project.category}</td>
								<td class="p-4 text-zinc-400 text-xs">{project.location}</td>
								<td class="p-4 text-center">
									{#if project.isFeatured}
										<span
											class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950/40 border border-emerald-900/40 text-emerald-400"
											>Yes</span
										>
									{:else}
										<span
											class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-900 text-zinc-500"
											>No</span
										>
									{/if}
								</td>
								<td class="p-4 text-center text-zinc-400 font-semibold"
									>{project.media?.length ?? 0}</td
								>
								<td class="p-4 text-right">
									<div class="inline-flex gap-2">
										<button
											onclick={() => openEdit(project)}
											class="text-xs border border-zinc-850 bg-zinc-900/30 hover:bg-zinc-800 px-3 py-1.5 rounded-lg text-zinc-300 hover:text-white transition-colors"
											>Edit</button
										>
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
											<input type="hidden" name="id" value={project.id} />
											<button
												type="submit"
												onclick={(e) => {
													if (
														!confirm(
															'Delete this project? Cover and all gallery assets will be removed.'
														)
													)
														e.preventDefault();
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
		class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-zinc-100 backdrop:bg-black/60 backdrop:backdrop-blur-sm max-w-2xl w-full"
	>
		<div class="flex items-center justify-between mb-6">
			<h3 class="font-bold text-lg text-white">Create Portfolio Project</h3>
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
						for="add-p-title"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Project Title</label
					>
					<input
						type="text"
						id="add-p-title"
						name="title"
						required
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
				<div>
					<label
						for="add-p-category"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Category</label
					>
					<input
						type="text"
						id="add-p-category"
						name="category"
						required
						placeholder="e.g. Interior, Architecture"
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
			</div>

			<div>
				<label
					for="add-p-description"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Description</label
				>
				<textarea
					id="add-p-description"
					name="description"
					rows="3"
					required
					class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
				></textarea>
			</div>

			<div class="grid grid-cols-3 gap-4">
				<div>
					<label
						for="add-p-location"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Location</label
					>
					<input
						type="text"
						id="add-p-location"
						name="location"
						required
						placeholder="New York, NY"
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
				<div>
					<label
						for="add-p-completionDate"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Completion Date</label
					>
					<input
						type="text"
						id="add-p-completionDate"
						name="completionDate"
						required
						placeholder="e.g. June 2026"
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
				<div>
					<label
						for="add-p-clientName"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Client Name</label
					>
					<input
						type="text"
						id="add-p-clientName"
						name="clientName"
						placeholder="Optional"
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
			</div>

			<div class="grid grid-cols-3 gap-4">
				<div>
					<label
						for="add-p-area"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Area / Size</label
					>
					<input
						type="text"
						id="add-p-area"
						name="area"
						placeholder="e.g. 2,400 sqft"
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
				<div>
					<label
						for="add-p-budget"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Budget</label
					>
					<input
						type="text"
						id="add-p-budget"
						name="budget"
						placeholder="e.g. $150,000"
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
				<div>
					<label
						for="add-p-sortOrder"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Sort Order</label
					>
					<input
						type="number"
						id="add-p-sortOrder"
						name="sortOrder"
						bind:value={currentProject.sortOrder}
						required
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
			</div>

			<div class="flex items-center gap-6 py-2">
				<label class="flex items-center gap-2 text-sm text-zinc-300 font-semibold cursor-pointer">
					<input
						type="checkbox"
						name="isFeatured"
						value="true"
						class="w-4 h-4 rounded bg-zinc-950 border-zinc-800 text-white focus:ring-0"
					/>
					Featured Project on Homepage
				</label>
			</div>

			<div>
				<label
					for="add-p-cover"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Cover Image File *</label
				>
				<input
					type="file"
					id="add-p-cover"
					name="coverFile"
					accept="image/*"
					required
					class="w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-zinc-800 file:text-zinc-200 file:hover:bg-zinc-750 file:cursor-pointer"
				/>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div>
					<label
						for="add-p-gallery"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Gallery Images (Multiple)</label
					>
					<input
						type="file"
						id="add-p-gallery"
						name="galleryFiles"
						accept="image/*"
						multiple
						class="w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-zinc-800 file:text-zinc-200 file:hover:bg-zinc-750 file:cursor-pointer"
					/>
				</div>
				<div>
					<label
						for="add-p-videos"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Video Links (One per line)</label
					>
					<textarea
						id="add-p-videos"
						name="galleryVideoUrls"
						rows="3"
						placeholder="https://youtube.com/watch?v=...&#10;https://vimeo.com/12345&#10;https://loom.com/share/..."
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700 placeholder-zinc-600"
					></textarea>
					<span class="text-[10px] text-zinc-500 mt-1 block"
						>YouTube, Vimeo, or Loom. Videos load only when a visitor clicks play, so this has
						minimal impact on page speed.</span
					>
				</div>
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
					>{loading ? 'Creating...' : 'Create Project'}</button
				>
			</div>
		</form>
	</dialog>

	<!-- Edit Modal -->
	<dialog
		bind:this={editDialog}
		class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-zinc-100 backdrop:bg-black/60 backdrop:backdrop-blur-sm max-w-2xl w-full"
	>
		<div class="flex items-center justify-between mb-6">
			<h3 class="font-bold text-lg text-white">Edit Portfolio Project</h3>
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
			<input type="hidden" name="id" value={currentProject.id} />
			<input type="hidden" name="currentCoverImageUrl" value={currentProject.coverImageUrl} />
			<input type="hidden" name="deleteMediaIds" value={markedForDeletion.join(',')} />

			<div class="grid grid-cols-2 gap-4">
				<div>
					<label
						for="edit-p-title"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Project Title</label
					>
					<input
						type="text"
						id="edit-p-title"
						name="title"
						bind:value={currentProject.title}
						required
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
				<div>
					<label
						for="edit-p-category"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Category</label
					>
					<input
						type="text"
						id="edit-p-category"
						name="category"
						bind:value={currentProject.category}
						required
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
			</div>

			<div>
				<label
					for="edit-p-description"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Description</label
				>
				<textarea
					id="edit-p-description"
					name="description"
					rows="3"
					bind:value={currentProject.description}
					required
					class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
				></textarea>
			</div>

			<div class="grid grid-cols-3 gap-4">
				<div>
					<label
						for="edit-p-location"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Location</label
					>
					<input
						type="text"
						id="edit-p-location"
						name="location"
						bind:value={currentProject.location}
						required
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
				<div>
					<label
						for="edit-p-completionDate"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Completion Date</label
					>
					<input
						type="text"
						id="edit-p-completionDate"
						name="completionDate"
						bind:value={currentProject.completionDate}
						required
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
				<div>
					<label
						for="edit-p-clientName"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Client Name</label
					>
					<input
						type="text"
						id="edit-p-clientName"
						name="clientName"
						bind:value={currentProject.clientName}
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
			</div>

			<div class="grid grid-cols-3 gap-4">
				<div>
					<label
						for="edit-p-area"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Area / Size</label
					>
					<input
						type="text"
						id="edit-p-area"
						name="area"
						bind:value={currentProject.area}
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
				<div>
					<label
						for="edit-p-budget"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Budget</label
					>
					<input
						type="text"
						id="edit-p-budget"
						name="budget"
						bind:value={currentProject.budget}
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
				<div>
					<label
						for="edit-p-sortOrder"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Sort Order</label
					>
					<input
						type="number"
						id="edit-p-sortOrder"
						name="sortOrder"
						bind:value={currentProject.sortOrder}
						required
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
			</div>

			<div class="flex items-center gap-6 py-2">
				<label class="flex items-center gap-2 text-sm text-zinc-300 font-semibold cursor-pointer">
					<input
						type="checkbox"
						name="isFeatured"
						value="true"
						checked={currentProject.isFeatured}
						class="w-4 h-4 rounded bg-zinc-950 border-zinc-800 text-white focus:ring-0"
					/>
					Featured Project on Homepage
				</label>
			</div>

			<div>
				<label
					for="edit-p-cover"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Replace Cover Image (Optional)</label
				>
				<input
					type="file"
					id="edit-p-cover"
					name="coverFile"
					accept="image/*"
					class="w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-zinc-800 file:text-zinc-200 file:hover:bg-zinc-750 file:cursor-pointer"
				/>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div>
					<label
						for="edit-p-gallery"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Upload More Gallery Images</label
					>
					<input
						type="file"
						id="edit-p-gallery"
						name="galleryFiles"
						accept="image/*"
						multiple
						class="w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-zinc-800 file:text-zinc-200 file:hover:bg-zinc-750 file:cursor-pointer"
					/>
				</div>
				<div>
					<label
						for="edit-p-videos"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Add Video Links (One per line)</label
					>
					<textarea
						id="edit-p-videos"
						name="galleryVideoUrls"
						rows="3"
						placeholder="https://youtube.com/watch?v=...&#10;https://vimeo.com/12345"
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700 placeholder-zinc-600"
					></textarea>
					<span class="text-[10px] text-zinc-500 mt-1 block"
						>YouTube, Vimeo, or Loom. Videos load only when a visitor clicks play, so this has
						minimal impact on page speed. Applies only to this project.</span
					>
				</div>
			</div>

			<!-- Media Manager -->
			{#if currentProject.media && currentProject.media.length > 0}
				<div>
					<span class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Gallery Manager — click to toggle removal</span
					>
					<div class="grid grid-cols-4 gap-3 bg-zinc-950 p-3 rounded-xl border border-zinc-850">
						{#each currentProject.media as item}
							{@const isMarked = markedForDeletion.includes(item.id)}
							{@const thumb =
								item.mediaType === 'image' ? `/images/${item.imageUrl}` : videoThumb(item.videoUrl)}
							<button
								type="button"
								onclick={() => toggleDelete(item.id)}
								class="relative rounded-lg overflow-hidden group aspect-[4/3] border {isMarked
									? 'border-red-900 bg-red-950/20'
									: 'border-zinc-800 bg-zinc-900'}"
							>
								{#if thumb}
									<img
										src={thumb}
										alt=""
										class="w-full h-full object-cover transition-opacity {isMarked
											? 'opacity-30'
											: 'group-hover:opacity-60'}"
									/>
								{:else}
									<!-- Vimeo/Loom: no thumbnail API, show generic bg -->
									<div class="w-full h-full bg-zinc-800 flex items-center justify-center">
										<svg class="w-6 h-6 text-zinc-500" fill="currentColor" viewBox="0 0 24 24"
											><path d="M8 5v14l11-7z" /></svg
										>
									</div>
								{/if}

								<!-- Video badge -->
								{#if item.mediaType === 'video'}
									<div
										class="absolute top-1 left-1 bg-black/70 rounded px-1 py-0.5 flex items-center gap-0.5"
									>
										<svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24"
											><path d="M8 5v14l11-7z" /></svg
										>
										<span class="text-[8px] text-white font-bold">VIDEO</span>
									</div>
								{/if}

								{#if isMarked}
									<div
										class="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-red-400 bg-red-950/40"
									>
										DELETING
									</div>
								{:else}
									<div
										class="absolute inset-0 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 font-semibold text-white bg-black/40 transition-opacity"
									>
										REMOVE
									</div>
								{/if}
							</button>
						{/each}
					</div>
				</div>
			{/if}

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
