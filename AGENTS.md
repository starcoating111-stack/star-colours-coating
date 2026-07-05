# Agent Context (AGENTS.md)

This file contains the context, architecture, boundaries, and rules for AI agents and developers building client implementations or modifying this repository.

> [!IMPORTANT]
> **READ THIS BEFORE TOUCHING THE CODEBASE.** Any AI agent modifying this project must adhere strictly to these principles.

## 1. What Already Exists (Technical Stack)

This project is a self-contained SvelteKit web application designed for Cloudflare Pages (Serverless) and Cloudflare D1 (SQLite) with Drizzle ORM.

- **Framework**: SvelteKit (Svelte 5, Runes mode) using the `@sveltejs/adapter-cloudflare`.
- **Styling**: Tailwind CSS v4 using pure CSS imports (`src/app.css` -> `@import "tailwindcss";`).
- **Database**: Cloudflare D1 (SQLite) with Drizzle ORM (`src/lib/server/db/`).
- **Storage**: Cloudflare R2 bucket for uploads/assets. Image proxy endpoint serves cached images from R2 (`src/routes/images/[...key]`).
- **Emails**: Zoho ZeptoMail API for transactional emails (e.g., contact form submissions).
- **Security**: Signed admin sessions, strict Content Security Policy (CSP) with script nonces (`src/hooks.server.ts`), Honeypot spam defense, and rate-limiting.
- **Team module**: `team_members` table (name, designation, bio, photo_url R2 key,
  email, linkedin_url, sort_order, is_active). Admin CRUD at `/admin/team` with inline
  active toggle. Public `/team` page (active-only filter at query level, initials
  fallback if no photo, email/LinkedIn only render if populated). `TeamPreview`
  homepage section — disabled by default in `homepageModules`, conditional D1 fetch
  (only queries if `'teamPreview'` is in the active module list). `/team` in sitemap
  at priority 0.7. LinkedIn URL validated server-side (must be linkedin.com/in/).

## 2. Structural & Architectural Off-Limits

- **No arbitrary page-builder abstractions**: Do not turn this template into a page-builder with dynamic complex layout JSONs. Keep sections flat, modular, and defined within `src/lib/components/sections/` and configured via `siteConfig.homepageModules` in `src/lib/config/site.config.ts`.
- **No unrequested dependencies**: Follow the `ponytail` mindset. Do not install external libraries (like slider libraries, date pickers, or animation libraries) if a native HTML5/CSS element or simple Svelte rune logic can do it.
- **Maintain Genericity**: The core of this template is reusable. Avoid baking client-specific hardcoded values into core components. Instead, read from the `settings` table in D1 or configure in `siteConfig`.
- **Strict CSP Guardrails**: Script nonces are enforced. Do not add raw `<script>` tags, inline handlers (`onclick="..."` as strings), or external domains without adding them to the CSP headers in [hooks.server.ts](file:///home/rakshitbhai/generalize-landing-template/src/hooks.server.ts).

## 3. Real Bugs & Hard-Earned Lessons

- **D1 Migration Desync**: Never trust that running a migration locally updates your remote D1 instance automatically. Remote databases must be manually updated with the schema using `npx wrangler d1 execute DB --remote --file=...`.
- **R2 Binding Mocking**: Local testing needs the `BUCKET` binding simulated. SvelteKit uses `platformProxy` in Vite to map local R2 to the emulator. Ensure the binding in `wrangler.toml` matches what's expected.
- **ZeptoMail HTTP Headers**: ZeptoMail expects a strict JSON body and Authorization key. Ensure email payloads strictly match ZeptoMail API specifications.
- **CSP Nonce Insertion**: SvelteKit's dynamic nonces must be injected correctly into `<script>` tags. Any third-party widget (like WhatsApp, CAPTCHA, or widgets) must respect the nonce injection or go through the SvelteKit loader.

## 4. Definition of Done

For every feature or customization, you must complete the steps outlined in the [DEFINITION_OF_DONE.md](file:///home/rakshitbhai/generalize-landing-template/docs/DEFINITION_OF_DONE.md).
