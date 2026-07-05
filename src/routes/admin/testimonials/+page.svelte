<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props<{
		data: { testimonials: any[] };
		form: { success?: string; error?: string } | null;
	}>();

	let addDialog: HTMLDialogElement | undefined = $state();
	let editDialog: HTMLDialogElement | undefined = $state();

	let currentTestimonial = $state<{
		id?: number;
		name: string;
		designation: string;
		review: string;
		rating: number;
		isFeatured: boolean;
		sortOrder: number;
		photoUrl: string;
	}>({
		name: '',
		designation: '',
		review: '',
		rating: 5,
		isFeatured: false,
		sortOrder: 0,
		photoUrl: ''
	});

	let loading = $state(false);

	function openAdd() {
		currentTestimonial = {
			name: '',
			designation: '',
			review: '',
			rating: 5,
			isFeatured: false,
			sortOrder: (data.testimonials.length + 1) * 10,
			photoUrl: ''
		};
		addDialog?.showModal();
	}

	function openEdit(testimonial: any) {
		currentTestimonial = { ...testimonial };
		editDialog?.showModal();
	}
</script>

<svelte:head>
	<title>Manage Testimonials | Admin Console</title>
</svelte:head>

<div>
	<!-- Header -->
	<div class="flex items-center justify-between mb-8">
		<div>
			<h2 class="text-2xl font-bold text-white tracking-tight">Testimonials</h2>
			<p class="text-zinc-400 text-sm mt-1">
				Manage customer testimonials and client feedback featured on the site.
			</p>
		</div>
		<button
			onclick={openAdd}
			class="bg-white hover:bg-zinc-200 text-zinc-950 font-semibold px-4 py-2.5 rounded-xl transition-all shadow text-sm flex items-center gap-2 active:scale-[0.98]"
		>
			Add Testimonial
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
		{#if data.testimonials.length === 0}
			<div class="p-12 text-center text-zinc-500 text-sm">
				No testimonials recorded yet. Click "Add Testimonial" to create one.
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-left border-collapse text-sm">
					<thead>
						<tr
							class="border-b border-zinc-900 bg-zinc-900/20 text-zinc-400 text-xs font-semibold uppercase tracking-wider"
						>
							<th class="p-4">Avatar</th>
							<th class="p-4">Customer Details</th>
							<th class="p-4">Review</th>
							<th class="p-4 text-center">Rating</th>
							<th class="p-4 text-center">Featured</th>
							<th class="p-4 text-right">Actions</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-zinc-900">
						{#each data.testimonials as t}
							<tr class="hover:bg-zinc-900/10 transition-colors">
								<!-- Avatar -->
								<td class="p-4">
									{#if t.photoUrl}
										<img
											src="/images/{t.photoUrl}"
											alt={t.name}
											class="w-10 h-10 rounded-full object-cover bg-zinc-950 border border-zinc-850"
										/>
									{:else}
										<div
											class="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-zinc-500 text-xs uppercase"
										>
											{t.name.substring(0, 2)}
										</div>
									{/if}
								</td>

								<!-- Customer Details -->
								<td class="p-4">
									<div class="font-bold text-white text-sm">{t.name}</div>
									<div class="text-zinc-500 text-xs mt-1">
										{t.designation ?? '(No Designation)'}
									</div>
								</td>

								<!-- Review Content -->
								<td class="p-4">
									<p class="text-zinc-300 text-xs line-clamp-2 leading-relaxed max-w-sm">
										{t.review}
									</p>
								</td>

								<!-- Rating -->
								<td class="p-4 text-center text-zinc-300 font-semibold">{t.rating} ★</td>

								<!-- Featured -->
								<td class="p-4 text-center">
									{#if t.isFeatured}
										<span
											class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950/40 border border-emerald-900/40 text-emerald-400"
										>
											Yes
										</span>
									{:else}
										<span
											class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-900 text-zinc-500"
										>
											No
										</span>
									{/if}
								</td>

								<!-- Actions -->
								<td class="p-4 text-right">
									<div class="inline-flex gap-2">
										<button
											onclick={() => openEdit(t)}
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
											<input type="hidden" name="id" value={t.id} />
											<button
												type="submit"
												onclick={(e) => {
													if (!confirm('Are you sure you want to delete this testimonial?')) {
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
			<h3 class="font-bold text-lg text-white">Add Testimonial</h3>
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
						for="add-t-name"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Customer Name</label
					>
					<input
						type="text"
						id="add-t-name"
						name="name"
						required
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
				<div>
					<label
						for="add-t-desig"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Designation / Company</label
					>
					<input
						type="text"
						id="add-t-desig"
						name="designation"
						placeholder="e.g. CEO, Homeowner"
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
			</div>

			<div>
				<label
					for="add-t-review"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Review / Feedback</label
				>
				<textarea
					id="add-t-review"
					name="review"
					rows="3"
					required
					class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
				></textarea>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div>
					<label
						for="add-t-rating"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Rating (1-5 Stars)</label
					>
					<select
						id="add-t-rating"
						name="rating"
						bind:value={currentTestimonial.rating}
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					>
						<option value={5}>5 Stars</option>
						<option value={4}>4 Stars</option>
						<option value={3}>3 Stars</option>
						<option value={2}>2 Stars</option>
						<option value={1}>1 Star</option>
					</select>
				</div>
				<div>
					<label
						for="add-t-sort"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Sort Order</label
					>
					<input
						type="number"
						id="add-t-sort"
						name="sortOrder"
						bind:value={currentTestimonial.sortOrder}
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
					Featured on Homepage
				</label>
			</div>

			<div>
				<label
					for="add-t-photo"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Customer Photo (Optional)</label
				>
				<input
					type="file"
					id="add-t-photo"
					name="photoFile"
					accept="image/*"
					class="w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-zinc-800 file:text-zinc-200 file:hover:bg-zinc-750 file:cursor-pointer"
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
					>{loading ? 'Saving...' : 'Add Testimonial'}</button
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
			<h3 class="font-bold text-lg text-white">Edit Testimonial</h3>
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
			<input type="hidden" name="id" value={currentTestimonial.id} />
			<input type="hidden" name="currentPhotoUrl" value={currentTestimonial.photoUrl} />

			<div class="grid grid-cols-2 gap-4">
				<div>
					<label
						for="edit-t-name"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Customer Name</label
					>
					<input
						type="text"
						id="edit-t-name"
						name="name"
						bind:value={currentTestimonial.name}
						required
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
				<div>
					<label
						for="edit-t-desig"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Designation</label
					>
					<input
						type="text"
						id="edit-t-desig"
						name="designation"
						bind:value={currentTestimonial.designation}
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					/>
				</div>
			</div>

			<div>
				<label
					for="edit-t-review"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Review / Feedback</label
				>
				<textarea
					id="edit-t-review"
					name="review"
					rows="3"
					bind:value={currentTestimonial.review}
					required
					class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
				></textarea>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div>
					<label
						for="edit-t-rating"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Rating</label
					>
					<select
						id="edit-t-rating"
						name="rating"
						bind:value={currentTestimonial.rating}
						class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
					>
						<option value={5}>5 Stars</option>
						<option value={4}>4 Stars</option>
						<option value={3}>3 Stars</option>
						<option value={2}>2 Stars</option>
						<option value={1}>1 Star</option>
					</select>
				</div>
				<div>
					<label
						for="edit-t-sort"
						class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
						>Sort Order</label
					>
					<input
						type="number"
						id="edit-t-sort"
						name="sortOrder"
						bind:value={currentTestimonial.sortOrder}
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
						checked={currentTestimonial.isFeatured}
						class="w-4 h-4 rounded bg-zinc-950 border-zinc-800 text-white focus:ring-0"
					/>
					Featured on Homepage
				</label>
			</div>

			<div>
				<label
					for="edit-t-photo"
					class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
					>Replace Photo (Optional)</label
				>
				<input
					type="file"
					id="edit-t-photo"
					name="photoFile"
					accept="image/*"
					class="w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-zinc-800 file:text-zinc-200 file:hover:bg-zinc-750 file:cursor-pointer"
				/>
				{#if currentTestimonial.photoUrl}
					<div class="mt-2 flex items-center gap-3">
						<span class="text-[10px] text-zinc-500">Current avatar:</span>
						<img
							src="/images/{currentTestimonial.photoUrl}"
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
