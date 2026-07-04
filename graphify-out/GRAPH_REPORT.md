# Graph Report - star-colours-coating  (2026-07-04)

## Corpus Check
- 102 files · ~97,244 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1357 nodes · 1618 edges · 61 communities (38 shown, 23 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `02cfbc71`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]

## God Nodes (most connected - your core abstractions)
1. `getDb()` - 39 edges
2. `Drizzle ORM (SQLite / D1 schema management)` - 30 edges
3. `Agent Context & Architecture Rules` - 17 edges
4. `README — Reusable Agency Landing Template` - 16 edges
5. `scripts` - 15 edges
6. `compilerOptions` - 12 edges
7. `StreamError` - 11 edges
8. `runTests()` - 9 edges
9. `hashPassword()` - 9 edges
10. `Cloudflare D1 (Edge SQLite Database)` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Svelte Logo Favicon (SVG)` --conceptually_related_to--> `SvelteKit (Svelte 5 Runes, adapter-cloudflare)`  [EXTRACTED]
  src/lib/assets/favicon.svg → AGENTS.md
- `Media Upload Safety (MIME, size cap, magic bytes)` --references--> `Cloudflare R2 (S3-Compatible Object Storage)`  [INFERRED]
  README.md → AGENTS.md
- `Database Schema (src/lib/server/db/schema.ts)` --implements--> `Drizzle ORM (SQLite / D1 schema management)`  [INFERRED]
  docs/DEFINITION_OF_DONE.md → AGENTS.md
- `CLAUDE.md Project Instructions` --references--> `Agent Context & Architecture Rules`  [EXTRACTED]
  CLAUDE.md → AGENTS.md
- `README — Reusable Agency Landing Template` --references--> `Drizzle ORM (SQLite / D1 schema management)`  [EXTRACTED]
  README.md → AGENTS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Cloudflare Backend Stack (D1 + R2 + Pages)** — cloudflare_d1, cloudflare_r2, cloudflare_pages, wrangler_toml, platform_proxy [INFERRED 0.90]
- **Security Layer (CSP + Sessions + Honeypot + Rate Limit)** — csp_nonces, hmac_sha256_sessions, scrypt_hashing, honeypot_spam, rate_limiting, hooks_server_ts [INFERRED 0.85]
- **Frontend Stack (SvelteKit + Svelte 5 Runes + Tailwind v4)** — sveltekit_framework, svelte_5_runes, tailwind_css_v4, app_html [EXTRACTED 0.95]
- **Agent Governance Documents** — agents_md, claude_md_project, definition_of_done_md, graphify_rules_md, graphify_workflow_md [INFERRED 0.85]

## Communities (61 total, 23 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.00
Nodes (947): AbortController, AgentMemoryGetSummaryOptions, AgentMemoryGetSummaryResponse, AgentMemoryIncomingMemory, AgentMemoryIngestOptions, AgentMemoryListMemoriesOptions, AgentMemoryListMemoriesResult, AgentMemoryMemory (+939 more)

### Community 1 - "Community 1"
Cohesion: 0.14
Nodes (15): load(), load(), load(), getDb(), messages, settings, actions, load() (+7 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (18): $lib/components/FloatingWhatsApp.svelte, waUrl, $app/forms, $lib/assets/star-logo.png, $lib/config/site.config, $lib/video, ./layout.css, $lib/components/sections/AboutPreview.svelte (+10 more)

### Community 3 - "Community 3"
Cohesion: 0.10
Nodes (34): Agent Context & Architecture Rules, SvelteKit HTML Shell (app.html), CLAUDE.md Project Instructions, Cloudflare D1 (Edge SQLite Database), Cloudflare Pages (Serverless Hosting), Cloudflare R2 (S3-Compatible Object Storage), CodeNXT Lab (Project Author), Content Security Policy with Script Nonces (+26 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (22): devDependencies, drizzle-kit, drizzle-orm, eslint, eslint-config-prettier, @eslint/js, eslint-plugin-svelte, globals (+14 more)

### Community 5 - "Community 5"
Cohesion: 0.13
Nodes (15): scripts, build, check, check:watch, db:generate, db:migrate, db:push, db:seed (+7 more)

### Community 6 - "Community 6"
Cohesion: 0.20
Nodes (18): benchmarkScrypt(), generateSalt(), hashPassword(), safeCompare(), scryptAsync, SessionPayload, signSession(), verifySession() (+10 more)

### Community 7 - "Community 7"
Cohesion: 0.17
Nodes (12): CloseEvent, CustomEvent, EmailEvent, ErrorEvent, Event, ExtendableEvent, FetchEvent, MessageEvent (+4 more)

### Community 8 - "Community 8"
Cohesion: 0.18
Nodes (11): AlreadyUploadedError, BadRequestError, ForbiddenError, InternalError, InvalidURLError, MaxFileSizeError, NotFoundError, QuotaReachedError (+3 more)

### Community 9 - "Community 9"
Cohesion: 0.44
Nodes (8): b64uToBuffer(), bufToB64u(), concat(), encrypt(), hkdf(), sendWebPush(), strBuf(), vapidJwt()

### Community 10 - "Community 10"
Cohesion: 0.29
Nodes (6): dependencies, zod, name, private, type, version

### Community 11 - "Community 11"
Cohesion: 0.29
Nodes (7): AbortSignal, EventSource, EventTarget, MessagePort, ServiceWorkerGlobalScope, WebSocket, WorkerGlobalScope

### Community 12 - "Community 12"
Cohesion: 0.29
Nodes (7): CompressionStream, DecompressionStream, FixedLengthStream, IdentityTransformStream, TextDecoderStream, TextEncoderStream, TransformStream

### Community 13 - "Community 13"
Cohesion: 0.40
Nodes (3): enablePush(), urlB64ToUint8Array(), svelte

### Community 14 - "Community 14"
Cohesion: 0.67
Nodes (3): Graphify Knowledge Graph Output (graphify-out/), Graphify Rules (always_on), Graphify Workflow Definition

### Community 16 - "Community 16"
Cohesion: 0.67
Nodes (3): BasicImageTransformations, RequestInitCfPropertiesImage, RequestInitCfPropertiesImageDraw

### Community 17 - "Community 17"
Cohesion: 0.67
Nodes (3): Body, Request, Response

### Community 18 - "Community 18"
Cohesion: 0.67
Nodes (3): ByteLengthQueuingStrategy, CountQueuingStrategy, QueuingStrategy

### Community 19 - "Community 19"
Cohesion: 0.67
Nodes (3): RequestInitCfPropertiesVaryAcceptHeader, RequestInitCfPropertiesVaryAcceptLanguageHeader, RequestInitCfPropertiesVaryHeader

### Community 50 - "Community 50"
Cohesion: 0.17
Nodes (8): SiteConfig, faq, rateLimits, services, teamMembers, testimonials, Drizzle ORM (SQLite / D1 schema management), load()

### Community 51 - "Community 51"
Cohesion: 0.16
Nodes (7): gallery, actions, deleteFromR2(), uploadToR2(), actions, actions, actions

### Community 52 - "Community 52"
Cohesion: 0.12
Nodes (15): 1. Install Dependencies, 2. Configure Local Environment Secrets, 3. Initialize D1 Local Emulator & Database, 4. Seed Default Admin & System Settings, 5. Launch Development Server, Local Development Quickstart, Production Provisioning Runbook, Reusable Agency Landing Template (SvelteKit + Cloudflare) (+7 more)

### Community 53 - "Community 53"
Cohesion: 0.14
Nodes (13): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, moduleResolution, resolveJsonModule, rewriteRelativeImportExtensions (+5 more)

### Community 54 - "Community 54"
Cohesion: 0.23
Nodes (6): projectImages, projects, ParsedVideo, parseVideoUrl(), actions, load()

### Community 55 - "Community 55"
Cohesion: 0.27
Nodes (7): actions, contactSchema, pushSubscriptions, getClientEmailTemplate(), getOwnerEmailTemplate(), sendEmailViaZeptoMail(), PushSub

### Community 56 - "Community 56"
Cohesion: 0.29
Nodes (6): 1. Local Testing & Verification, 2. Database & Migrations, 3. Security & CSP, 4. Code Quality & Formatting, 5. Deployment Readiness, Definition of Done (DoD)

### Community 57 - "Community 57"
Cohesion: 0.33
Nodes (5): 1. What Already Exists (Technical Stack), 2. Structural & Architectural Off-Limits, 3. Real Bugs & Hard-Earned Lessons, 4. Definition of Done, Agent Context (AGENTS.md)

### Community 58 - "Community 58"
Cohesion: 0.33
Nodes (5): 1. What Already Exists (Technical Stack), 2. Structural & Architectural Off-Limits, 3. Real Bugs & Hard-Earned Lessons, 4. Definition of Done, Agent Context (AGENTS.md)

## Knowledge Gaps
- **1066 isolated node(s):** `gitignorePath`, `name`, `private`, `version`, `type` (+1061 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Drizzle ORM (SQLite / D1 schema management)` connect `Community 50` to `Community 1`, `Community 3`, `Community 4`, `Community 6`, `Community 51`, `Community 54`, `Community 55`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Community 4` to `Community 10`, `Community 13`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Why does `drizzle-orm` connect `Community 4` to `Community 50`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Drizzle ORM (SQLite / D1 schema management)` (e.g. with `Database Schema (src/lib/server/db/schema.ts)` and `Cloudflare D1 (Edge SQLite Database)`) actually correct?**
  _`Drizzle ORM (SQLite / D1 schema management)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `gitignorePath`, `name`, `private` to the rest of the system?**
  _1066 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.002109704641350211 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._