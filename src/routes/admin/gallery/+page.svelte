<script lang="ts">
  import { enhance } from '$app/forms';

  let { data, form } = $props<{
    data: { gallery: any[] };
    form: { success?: string; error?: string } | null;
  }>();

  let uploadDialog: HTMLDialogElement | undefined = $state();
  let loading = $state(false);

  function openUpload() {
    uploadDialog?.showModal();
  }
</script>

<svelte:head>
  <title>Manage Gallery | Admin Console</title>
</svelte:head>

<div>
  <!-- Header -->
  <div class="flex items-center justify-between mb-8">
    <div>
      <h2 class="text-2xl font-bold text-white tracking-tight">Media Gallery</h2>
      <p class="text-zinc-400 text-sm mt-1">Upload and manage standalone gallery assets, categorized for the public site.</p>
    </div>
    <button
      onclick={openUpload}
      class="bg-white hover:bg-zinc-200 text-zinc-950 font-semibold px-4 py-2.5 rounded-xl transition-all shadow text-sm flex items-center gap-2 active:scale-[0.98]"
    >
      Upload Image
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

  <!-- Gallery Grid -->
  {#if data.gallery.length === 0}
    <div class="border border-dashed border-zinc-900 rounded-2xl p-12 text-center text-zinc-500 text-sm">
      No gallery assets uploaded yet. Click "Upload Image" to add media.
    </div>
  {:else}
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {#each data.gallery as item}
        <div class="group bg-zinc-900/10 border border-zinc-900 rounded-2xl overflow-hidden backdrop-blur flex flex-col relative">
          <!-- Image Container -->
          <div class="aspect-[4/3] w-full bg-zinc-950 relative overflow-hidden">
            <img
              src="/images/{item.imageUrl}"
              alt={item.caption ?? ''}
              class="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
            />
            
            <!-- Category Badge -->
            {#if item.category}
              <span class="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-950/70 border border-zinc-800 text-zinc-300 backdrop-blur">
                {item.category}
              </span>
            {/if}
          </div>

          <!-- Description and Actions -->
          <div class="p-4 flex-1 flex flex-col justify-between gap-3">
            <p class="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
              {item.caption ?? '(No Caption)'}
            </p>

            <div class="flex items-center justify-between border-t border-zinc-900/50 pt-3">
              <span class="text-[10px] text-zinc-500 font-mono">Order: {item.sortOrder}</span>
              
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
                    if (!confirm('Are you sure you want to delete this image from the gallery?')) {
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
      {/each}
    </div>
  {/if}

  <!-- Upload Modal -->
  <dialog bind:this={uploadDialog} class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-zinc-100 backdrop:bg-black/60 backdrop:backdrop-blur-sm max-w-lg w-full">
    <div class="flex items-center justify-between mb-6">
      <h3 class="font-bold text-lg text-white">Upload Media Asset</h3>
      <button onclick={() => uploadDialog?.close()} class="text-zinc-400 hover:text-white">✕</button>
    </div>

    <form
      method="POST"
      action="?/upload"
      enctype="multipart/form-data"
      use:enhance={() => {
        loading = true;
        return async ({ update }) => {
          loading = false;
          uploadDialog?.close();
          await update();
        };
      }}
      class="space-y-4"
    >
      <div>
        <label for="upload-image" class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Select Image *</label>
        <input
          type="file"
          id="upload-image"
          name="imageFile"
          accept="image/*"
          required
          class="w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-zinc-800 file:text-zinc-200 file:hover:bg-zinc-750 file:cursor-pointer"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="upload-category" class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Category</label>
          <input
            type="text"
            id="upload-category"
            name="category"
            placeholder="e.g. Interior, Salon"
            class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
          />
        </div>
        <div>
          <label for="upload-sortOrder" class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Sort Order</label>
          <input
            type="number"
            id="upload-sortOrder"
            name="sortOrder"
            value="0"
            required
            class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
          />
        </div>
      </div>

      <div>
        <label for="upload-caption" class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Caption</label>
        <textarea
          id="upload-caption"
          name="caption"
          rows="2"
          placeholder="Enter a brief image description"
          class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
        ></textarea>
      </div>

      <div class="flex justify-end gap-3 pt-4 border-t border-zinc-800">
        <button type="button" onclick={() => uploadDialog?.close()} class="border border-zinc-800 hover:bg-zinc-800/40 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all">Cancel</button>
        <button type="submit" disabled={loading} class="bg-white hover:bg-zinc-200 text-zinc-950 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all">{loading ? 'Uploading...' : 'Upload'}</button>
      </div>
    </form>
  </dialog>
</div>
