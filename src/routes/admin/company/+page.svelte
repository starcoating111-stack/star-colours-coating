<script lang="ts">
  import { enhance } from '$app/forms';

  let { data, form } = $props<{
    data: { settings: any };
    form: {
      settingsSuccess?: string;
      settingsError?: string;
      passwordSuccess?: string;
      passwordError?: string;
    } | null;
  }>();

  let activeTab = $state('profile'); // 'profile' or 'security'
  let loadingSettings = $state(false);
  let loadingSecurity = $state(false);
</script>

<svelte:head>
  <title>Company & Security Settings | Admin Console</title>
</svelte:head>

<div>
  <!-- Header -->
  <div class="mb-8">
    <h2 class="text-2xl font-bold text-white tracking-tight">Configuration</h2>
    <p class="text-zinc-400 text-sm mt-1">Configure company profiles, contacts, and security settings.</p>
  </div>

  <!-- Tabs Navigation -->
  <div class="flex border-b border-zinc-900 mb-8">
    <button
      onclick={() => activeTab = 'profile'}
      class="px-5 py-3 text-sm font-semibold border-b-2 transition-colors {activeTab === 'profile' ? 'border-white text-white' : 'border-transparent text-zinc-400 hover:text-zinc-200'}"
    >
      Company Profile
    </button>
    <button
      onclick={() => activeTab = 'security'}
      class="px-5 py-3 text-sm font-semibold border-b-2 transition-colors {activeTab === 'security' ? 'border-white text-white' : 'border-transparent text-zinc-400 hover:text-zinc-200'}"
    >
      Security & Password
    </button>
  </div>

  {#if activeTab === 'profile'}
    <!-- Profile Settings Form -->
    <form
      method="POST"
      action="?/updateSettings"
      use:enhance={() => {
        loadingSettings = true;
        return async ({ update }) => {
          loadingSettings = false;
          await update();
        };
      }}
      class="space-y-8"
    >
      {#if form?.settingsSuccess}
        <div class="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm">
          {form.settingsSuccess}
        </div>
      {:else}
        {#if form?.settingsError}
          <div class="p-4 rounded-xl bg-red-950/20 border border-red-900/30 text-red-400 text-sm">
            {form.settingsError}
          </div>
        {/if}
      {/if}

      <div class="bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 space-y-6">
        <h3 class="font-semibold text-white text-base">Branding & Details</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="companyName" class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Company Name *</label>
            <input
              type="text"
              name="companyName"
              id="companyName"
              value={data.settings?.companyName ?? ''}
              required
              class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors"
            />
          </div>

          <div>
            <label for="tagline" class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Tagline</label>
            <input
              type="text"
              name="tagline"
              id="tagline"
              value={data.settings?.tagline ?? ''}
              class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="logoUrl" class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Logo URL (R2 Key)</label>
            <input
              type="text"
              name="logoUrl"
              id="logoUrl"
              value={data.settings?.logoUrl ?? ''}
              class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors"
            />
            <span class="text-[10px] text-zinc-500 mt-1 block">Specify the media key from the gallery upload or direct reference.</span>
          </div>

          <div>
            <label for="workingHours" class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Working Hours</label>
            <input
              type="text"
              name="workingHours"
              id="workingHours"
              value={data.settings?.workingHours ?? ''}
              placeholder="e.g. Mon-Sat 9am-6pm"
              class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors"
            />
          </div>
        </div>
      </div>

      <div class="bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 space-y-6">
        <h3 class="font-semibold text-white text-base">Contact & Location</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="phone" class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={data.settings?.phone ?? ''}
              class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors"
            />
          </div>

          <div>
            <label for="email" class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={data.settings?.email ?? ''}
              class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="address" class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Physical Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={data.settings?.address ?? ''}
              class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors"
            />
          </div>

          <div>
            <label for="whatsappNumber" class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">WhatsApp Number</label>
            <input
              type="text"
              name="whatsappNumber"
              id="whatsappNumber"
              value={data.settings?.whatsappNumber ?? ''}
              placeholder="e.g. 447911123456"
              class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors"
            />
            <span class="text-[10px] text-zinc-500 mt-1 block">Country code + number, digits only — no +, spaces, or dashes. Do not start with 0. Example: <span class="text-zinc-400 font-mono">447911123456</span> for +44 7911 123456.</span>
          </div>
        </div>

        <div>
          <label for="whatsappDefaultMessage" class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Default WhatsApp Message</label>
          <input
            type="text"
            name="whatsappDefaultMessage"
            id="whatsappDefaultMessage"
            value={data.settings?.whatsappDefaultMessage ?? ''}
            maxlength="200"
            placeholder="Hi, I'm interested in your services."
            class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors"
          />
          <span class="text-[10px] text-zinc-500 mt-1 block">Shown when a visitor opens WhatsApp without filling out the form first. Max 200 characters. Leave blank to use the built-in default.</span>
        </div>

        <div>
          <label for="googleMapsLink" class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Google Maps Embed Link</label>
          <input
            type="text"
            name="googleMapsLink"
            id="googleMapsLink"
            value={data.settings?.googleMapsLink ?? ''}
            placeholder="https://www.google.com/maps/embed?..."
            class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors"
          />
        </div>
      </div>

      <div class="bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 space-y-6">
        <h3 class="font-semibold text-white text-base">Social Links</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="facebook" class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Facebook URL</label>
            <input
              type="url"
              name="facebook"
              id="facebook"
              value={data.settings?.socialLinks?.facebook ?? ''}
              class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors"
            />
          </div>

          <div>
            <label for="instagram" class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Instagram URL</label>
            <input
              type="url"
              name="instagram"
              id="instagram"
              value={data.settings?.socialLinks?.instagram ?? ''}
              class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="linkedin" class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">LinkedIn URL</label>
            <input
              type="url"
              name="linkedin"
              id="linkedin"
              value={data.settings?.socialLinks?.linkedin ?? ''}
              class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors"
            />
          </div>

          <div>
            <label for="twitter" class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Twitter/X URL</label>
            <input
              type="url"
              name="twitter"
              id="twitter"
              value={data.settings?.socialLinks?.twitter ?? ''}
              class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors"
            />
          </div>
        </div>

        <div>
          <label for="youtube" class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">YouTube Channel URL</label>
          <input
            type="url"
            name="youtube"
            id="youtube"
            value={data.settings?.socialLinks?.youtube ?? ''}
            class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors"
          />
        </div>
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          disabled={loadingSettings}
          class="bg-white hover:bg-zinc-200 text-zinc-950 font-semibold px-6 py-3 rounded-xl transition-all shadow active:scale-[0.98] disabled:opacity-50"
        >
          {loadingSettings ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </form>
  {:else}
    <!-- Security Form (Password Rotation) -->
    <form
      method="POST"
      action="?/updatePassword"
      use:enhance={() => {
        loadingSecurity = true;
        return async ({ update }) => {
          loadingSecurity = false;
          await update();
        };
      }}
      class="max-w-xl space-y-6"
    >
      {#if form?.passwordSuccess}
        <div class="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm">
          {form.passwordSuccess}
        </div>
      {:else}
        {#if form?.passwordError}
          <div class="p-4 rounded-xl bg-red-950/20 border border-red-900/30 text-red-400 text-sm">
            {form.passwordError}
          </div>
        {/if}
      {/if}

      <div class="bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 space-y-5">
        <h3 class="font-semibold text-white text-base">Rotate Credentials</h3>
        <p class="text-xs text-zinc-500 leading-relaxed">
          Rotating your admin credentials invalidates all other active session cookies. You will remain logged in on this browser.
        </p>

        <div>
          <label for="currentPassword" class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            required
            placeholder="••••••••••••"
            class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors"
          />
        </div>

        <div>
          <label for="newPassword" class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">New Password (Min 12 chars)</label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            required
            placeholder="••••••••••••"
            class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors"
          />
        </div>

        <div>
          <label for="confirmPassword" class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
            placeholder="••••••••••••"
            class="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-800 transition-colors"
          />
        </div>
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          disabled={loadingSecurity}
          class="bg-white hover:bg-zinc-200 text-zinc-950 font-semibold px-6 py-3 rounded-xl transition-all shadow active:scale-[0.98] disabled:opacity-50"
        >
          {loadingSecurity ? 'Processing...' : 'Change Password'}
        </button>
      </div>
    </form>
  {/if}
</div>
