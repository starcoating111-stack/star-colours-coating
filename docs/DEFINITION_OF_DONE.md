# Definition of Done (DoD)

This is the checklist that must be fully completed and verified before any code change is considered complete and ready to merge.

## 1. Local Testing & Verification

- [ ] **Real Browser Verification**: Never trust a code trace or terminal output. Test the changes in a real browser (Chrome/Firefox/Safari).
- [ ] **Mobile Responsiveness**: Test components on different viewport sizes (mobile, tablet, desktop).
- [ ] **Console check**: Ensure there are no JavaScript errors, deprecation warnings, or hydration errors in the browser developer console.

## 2. Database & Migrations

- [ ] **Migration Check**: If schemas in `src/lib/server/db/schema.ts` changed, verify that `npm run db:generate` or `npm run db:push` was executed.
- [ ] **Production Check**: Ensure the migration files are generated and applied to the remote D1 database (`npx wrangler d1 execute DB --remote --file=...`).

## 3. Security & CSP

- [ ] **CSP Verification**: Ensure that the Content Security Policy (CSP) is not broken by new code. Check the console for CSP violation reports.
- [ ] **Visibility guardrail**: `is_active` filtering for team members (and any future toggle-based visibility) must happen at the D1 query level (`where(eq(...isActive, true))`), never in the component. Component-level filtering means inactive data still transfers over the wire.
- [ ] **Secrets leakage**: Ensure no secrets, tokens, or private credentials are hardcoded. All credentials must be read from environment variables or `.dev.vars`.

## 4. Code Quality & Formatting

- [ ] **Formatting**: Run `npm run format` to enforce Prettier rules.
- [ ] **Linting**: Run `npm run lint` and verify there are no ESLint errors or warnings.
- [ ] **Type Check**: Run `npm run check` to ensure Svelte and TypeScript types are fully consistent.

## 5. Deployment Readiness

- [ ] **Build Check**: Verify the application builds successfully using `npm run build`.
- [ ] **Wrangler preview**: Run `npm run preview` to verify that the app behaves correctly inside the Wrangler Pages emulator.
