# Reusable Agency Landing Template (SvelteKit + Cloudflare)

This repository is a self-contained, high-performance web agency landing template engineered by **CodeNXT Lab**. It is built with SvelteKit (Svelte 5, Runes mode), Tailwind CSS v4, Drizzle ORM, Cloudflare D1 (SQLite), Cloudflare R2 (Object Storage), and Zoho ZeptoMail (Transactional Emails).

---

## Technical Stack Overview

- **Framework**: SvelteKit (Svelte 5 Runes mode, adapter-cloudflare)
- **Styling**: Tailwind CSS v4 (vanilla CSS imports, zero post-processing steps)
- **Database**: Cloudflare D1 (edge SQLite) with Drizzle ORM
- **Storage**: Cloudflare R2 (S3-compatible bucket) for media uploads
- **Emails**: Zoho ZeptoMail HTTPS API for transactional form submissions
- **Security**: Scrypt-based password hashing, signed session cookies, strict Content Security Policy (CSP) with script nonces, IP-based rate limiting, and honeypot spam protection.

---

## Local Development Quickstart

Follow these steps to set up the project on your local machine:

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Local Environment Secrets

Create a `.dev.vars` file in the root of the project:

```env
SESSION_SECRET="your-32-character-random-session-secret"
ZEPTOMAIL_API_KEY="your_zepto_mail_send_mail_token"
ZEPTOMAIL_BOUNCE_EMAIL="bounce@your-verified-domain.com"
```

_Note: `.dev.vars` is ignored by Git and used exclusively for Wrangler local emulation._

### 3. Initialize D1 Local Emulator & Database

Run wrangler commands to create and migrate the local SQLite instance:

```bash
# Apply migrations to local emulation database
# Apply migrations to local emulation database
npx wrangler d1 execute DB --local --file=drizzle/0000_acoustic_richard_fisk.sql
```

### 4. Seed Default Admin & System Settings

Execute the seed script to benchmark password hashing and create the first administrator:

```bash
npm run db:seed
```

_Console output will display the generated admin credentials:_

- **Username**: `admin@codenxt.local`
- **Password**: _(Dynamic 16-character alphanumeric password logged to terminal)_

### 5. Launch Development Server

```bash
npm run dev
```

The `@sveltejs/adapter-cloudflare` adapter is configured with `platformProxy` in [svelte.config.js](./svelte.config.js), which uses Wrangler's `getPlatformProxy()` internally to inject **real Cloudflare platform bindings** (D1, R2, secrets from `.dev.vars`) into `platform.env` during the Vite dev server — no second Wrangler process required.

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Production Provisioning Runbook

When deploying this project for a new client engagement, use the following checklist to provision infrastructure from a **fresh Cloudflare account** and **fresh Zoho ZeptoMail account**.

### Step 1: Provision D1 Database

Create the production database via the Wrangler CLI or the Cloudflare Dashboard:

```bash
# Create D1 database
npx wrangler d1 create generalize-landing-db
```

Copy the output `database_id` and update your `wrangler.toml` file:

```toml
[[d1_databases]]
binding = "DB"
database_name = "generalize-landing-db"
database_id = "PASTE-YOUR-D1-DATABASE-ID-HERE"
```

Apply migrations to the production remote D1 instance:

```bash
npx wrangler d1 execute DB --remote --file=migrations/0000_schema.sql
```

### Step 2: Provision R2 Storage Bucket

Create a storage bucket to hold client uploads:

```bash
# Create R2 bucket
npx wrangler r2 bucket create generalize-landing-bucket
```

Update the binding configuration in your `wrangler.toml` file:

```toml
[[r2_buckets]]
binding = "R2"
bucket_name = "generalize-landing-bucket"
```

### Step 3: Configure Transactional Emails (Zoho ZeptoMail)

1.  Register a Zoho ZeptoMail account and verify the client's sending domain (add required SPF, DKIM, and CNAME verification records).
2.  Create a **Mail Agent** for the website in ZeptoMail.
3.  Go to **SMTP & API** -> **API**, and generate a **Send Mail Token** (starts with `zoho-enczapikey`).
4.  Configure the **Bounce Address** in ZeptoMail (e.g. `bounce@your-verified-domain.com`).

### Step 4: Create Cloudflare Pages Project & Bindings

1.  Push your codebase to a private GitHub repository.
2.  In the Cloudflare Dashboard, navigate to **Workers & Pages** -> **Create Application** -> **Pages** -> **Connect to Git**.
3.  Select your repository and configure build settings:
    - **Framework preset**: `SvelteKit`
    - **Build command**: `npm run build`
    - **Build output directory**: `.svelte-kit/cloudflare`
4.  Navigate to your Pages project settings -> **Functions** -> **Compatibility Flags**:
    - Add compatibility flag `nodejs_compat` to both production and preview environments.
5.  Scroll down to **D1 Database Bindings** and add a binding named `DB` linked to `generalize-landing-db`.
6.  Scroll down to **R2 Bucket Bindings** and add a binding named `R2` linked to `generalize-landing-bucket`.
7.  Go to **Environment Variables** (or use the Pages CLI) to set production secrets:
    - `SESSION_SECRET`: A 32-character random string.
    - `ZEPTOMAIL_API_KEY`: Your Send Mail Token.
    - `ZEPTOMAIL_BOUNCE_EMAIL`: Your verified Bounce Address.
    - `PUBLIC_SITE_URL`: The public canonical URL (e.g., `https://clientdomain.com`).

### Step 5: Seed Production Administrator

Once bindings are configured and the site is built on Pages, seed the production database:

```bash
npx wrangler d1 execute DB --remote --command="INSERT INTO users (email, password_hash, password_salt, password_changed_at) VALUES ('admin@clientdomain.com', '...', '...', ...)"
```

_(Tip: You can copy-paste the pre-salted/pre-hashed scrypt outputs logged during your local `npm run db:seed` run to seed the production database quickly)._

---

## Security Hardening Details

- **Signed Admin Sessions**: Sessions are verified using HMAC-SHA256 signatures with a rotatable `SESSION_SECRET`.
- **Session Invalidation**: Bumping the administrator's `password_changed_at` instantly invalidates all active session cookies.
- **Strict CSP with Nonces**: CSP restricts script execution to self-sources + SvelteKit generated nonces. Unsafe inline scripts are blocked.
- **D1 Database Pruning**: The rate-limiting system cleans up stale data from D1 inline on every write to maintain a lean database footprint.
- **Media Upload Safety**: Files are scanned for MIME types, size caps (10MB), and magic byte sequences (JPEG, PNG, WebP) on ingestion before storage to prevent script injection.
