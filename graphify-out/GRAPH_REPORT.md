# Graph Report - .  (2026-07-01)

## Corpus Check
- 102 files · ~93,842 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1309 nodes · 1566 edges · 50 communities (29 shown, 21 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Cloudflare Workers Types|Cloudflare Workers Types]]
- [[_COMMUNITY_SvelteKit Server Loaders|SvelteKit Server Loaders]]
- [[_COMMUNITY_Svelte Page Components|Svelte Page Components]]
- [[_COMMUNITY_Architecture & Config Docs|Architecture & Config Docs]]
- [[_COMMUNITY_Package Dependencies|Package Dependencies]]
- [[_COMMUNITY_Build & Dev Scripts|Build & Dev Scripts]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Worker Event System|Worker Event System]]
- [[_COMMUNITY_Worker Error Types|Worker Error Types]]
- [[_COMMUNITY_Web Push Utilities|Web Push Utilities]]
- [[_COMMUNITY_Root Package Manifest|Root Package Manifest]]
- [[_COMMUNITY_Worker Messaging APIs|Worker Messaging APIs]]
- [[_COMMUNITY_Stream Processing Types|Stream Processing Types]]
- [[_COMMUNITY_Admin Dashboard & Push|Admin Dashboard & Push]]
- [[_COMMUNITY_Graphify Knowledge Graph|Graphify Knowledge Graph]]
- [[_COMMUNITY_SvelteKit App Types|SvelteKit App Types]]
- [[_COMMUNITY_Image Transform Types|Image Transform Types]]
- [[_COMMUNITY_HTTP RequestResponse|HTTP Request/Response]]
- [[_COMMUNITY_Queuing Strategies|Queuing Strategies]]
- [[_COMMUNITY_Vary Header Types|Vary Header Types]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Svelte Config|Svelte Config]]
- [[_COMMUNITY_Artifacts Repo Types|Artifacts Repo Types]]
- [[_COMMUNITY_Worker Environment Types|Worker Environment Types]]
- [[_COMMUNITY_Blob & File Types|Blob & File Types]]
- [[_COMMUNITY_CoLo Actor Namespace|CoLo Actor Namespace]]
- [[_COMMUNITY_Digest & Writable Streams|Digest & Writable Streams]]
- [[_COMMUNITY_Durable Stub Types|Durable Stub Types]]
- [[_COMMUNITY_Durable Objects|Durable Objects]]
- [[_COMMUNITY_Durable Object Namespace|Durable Object Namespace]]
- [[_COMMUNITY_Email Message Types|Email Message Types]]
- [[_COMMUNITY_Bot Management Types|Bot Management Types]]
- [[_COMMUNITY_JSON Web Key Types|JSON Web Key Types]]
- [[_COMMUNITY_Worker Process Env|Worker Process Env]]
- [[_COMMUNITY_R2 Object Types|R2 Object Types]]
- [[_COMMUNITY_AI Tool Call Types|AI Tool Call Types]]
- [[_COMMUNITY_RPC Target Types|RPC Target Types]]
- [[_COMMUNITY_Worker Entrypoints|Worker Entrypoints]]
- [[_COMMUNITY_Workflow Entrypoints|Workflow Entrypoints]]
- [[_COMMUNITY_Robots.txt Static|Robots.txt Static]]

## God Nodes (most connected - your core abstractions)
1. `getDb()` - 39 edges
2. `Drizzle ORM (SQLite / D1 schema management)` - 29 edges
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

## Communities (50 total, 21 thin omitted)

### Community 0 - "Cloudflare Workers Types"
Cohesion: 0.00
Nodes (947): AbortController, AgentMemoryGetSummaryOptions, AgentMemoryGetSummaryResponse, AgentMemoryIncomingMemory, AgentMemoryIngestOptions, AgentMemoryListMemoriesOptions, AgentMemoryListMemoriesResult, AgentMemoryMemory (+939 more)

### Community 1 - "SvelteKit Server Loaders"
Cohesion: 0.05
Nodes (60): load(), load(), benchmarkScrypt(), generateSalt(), hashPassword(), safeCompare(), scryptAsync, SessionPayload (+52 more)

### Community 2 - "Svelte Page Components"
Cohesion: 0.05
Nodes (16): $lib/components/FloatingWhatsApp.svelte, waUrl, $app/forms, $lib/config/site.config, $lib/video, ./layout.css, $lib/components/sections/AboutPreview.svelte, $lib/components/sections/ContactCta.svelte (+8 more)

### Community 3 - "Architecture & Config Docs"
Cohesion: 0.10
Nodes (34): Agent Context & Architecture Rules, SvelteKit HTML Shell (app.html), CLAUDE.md Project Instructions, Cloudflare D1 (Edge SQLite Database), Cloudflare Pages (Serverless Hosting), Cloudflare R2 (S3-Compatible Object Storage), CodeNXT Lab (Project Author), Content Security Policy with Script Nonces (+26 more)

### Community 4 - "Package Dependencies"
Cohesion: 0.09
Nodes (22): devDependencies, drizzle-kit, drizzle-orm, eslint, eslint-config-prettier, @eslint/js, eslint-plugin-svelte, globals (+14 more)

### Community 5 - "Build & Dev Scripts"
Cohesion: 0.13
Nodes (15): scripts, build, check, check:watch, db:generate, db:migrate, db:push, db:seed (+7 more)

### Community 6 - "TypeScript Config"
Cohesion: 0.14
Nodes (13): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, moduleResolution, resolveJsonModule, rewriteRelativeImportExtensions (+5 more)

### Community 7 - "Worker Event System"
Cohesion: 0.17
Nodes (12): CloseEvent, CustomEvent, EmailEvent, ErrorEvent, Event, ExtendableEvent, FetchEvent, MessageEvent (+4 more)

### Community 8 - "Worker Error Types"
Cohesion: 0.18
Nodes (11): AlreadyUploadedError, BadRequestError, ForbiddenError, InternalError, InvalidURLError, MaxFileSizeError, NotFoundError, QuotaReachedError (+3 more)

### Community 9 - "Web Push Utilities"
Cohesion: 0.44
Nodes (8): b64uToBuffer(), bufToB64u(), concat(), encrypt(), hkdf(), sendWebPush(), strBuf(), vapidJwt()

### Community 10 - "Root Package Manifest"
Cohesion: 0.29
Nodes (6): dependencies, zod, name, private, type, version

### Community 11 - "Worker Messaging APIs"
Cohesion: 0.29
Nodes (7): AbortSignal, EventSource, EventTarget, MessagePort, ServiceWorkerGlobalScope, WebSocket, WorkerGlobalScope

### Community 12 - "Stream Processing Types"
Cohesion: 0.29
Nodes (7): CompressionStream, DecompressionStream, FixedLengthStream, IdentityTransformStream, TextDecoderStream, TextEncoderStream, TransformStream

### Community 13 - "Admin Dashboard & Push"
Cohesion: 0.40
Nodes (3): enablePush(), urlB64ToUint8Array(), svelte

### Community 14 - "Graphify Knowledge Graph"
Cohesion: 0.67
Nodes (3): Graphify Knowledge Graph Output (graphify-out/), Graphify Rules (always_on), Graphify Workflow Definition

### Community 16 - "Image Transform Types"
Cohesion: 0.67
Nodes (3): BasicImageTransformations, RequestInitCfPropertiesImage, RequestInitCfPropertiesImageDraw

### Community 17 - "HTTP Request/Response"
Cohesion: 0.67
Nodes (3): Body, Request, Response

### Community 18 - "Queuing Strategies"
Cohesion: 0.67
Nodes (3): ByteLengthQueuingStrategy, CountQueuingStrategy, QueuingStrategy

### Community 19 - "Vary Header Types"
Cohesion: 0.67
Nodes (3): RequestInitCfPropertiesVaryAcceptHeader, RequestInitCfPropertiesVaryAcceptLanguageHeader, RequestInitCfPropertiesVaryHeader

## Knowledge Gaps
- **1039 isolated node(s):** `gitignorePath`, `name`, `private`, `version`, `type` (+1034 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Drizzle ORM (SQLite / D1 schema management)` connect `SvelteKit Server Loaders` to `Architecture & Config Docs`, `Package Dependencies`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Package Dependencies` to `Root Package Manifest`, `Admin Dashboard & Push`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Why does `drizzle-orm` connect `Package Dependencies` to `SvelteKit Server Loaders`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Drizzle ORM (SQLite / D1 schema management)` (e.g. with `Database Schema (src/lib/server/db/schema.ts)` and `Cloudflare D1 (Edge SQLite Database)`) actually correct?**
  _`Drizzle ORM (SQLite / D1 schema management)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `gitignorePath`, `name`, `private` to the rest of the system?**
  _1039 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Cloudflare Workers Types` be split into smaller, more focused modules?**
  _Cohesion score 0.002109704641350211 - nodes in this community are weakly interconnected._
- **Should `SvelteKit Server Loaders` be split into smaller, more focused modules?**
  _Cohesion score 0.0521978021978022 - nodes in this community are weakly interconnected._