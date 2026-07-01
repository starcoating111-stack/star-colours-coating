# Graph Report - generalize-landing-template  (2026-07-01)

## Corpus Check
- 99 files · ~93,842 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1309 nodes · 1512 edges · 58 communities (36 shown, 22 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `def99680`
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
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
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
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]

## God Nodes (most connected - your core abstractions)
1. `getDb()` - 39 edges
2. `scripts` - 15 edges
3. `compilerOptions` - 12 edges
4. `StreamError` - 11 edges
5. `runTests()` - 9 edges
6. `hashPassword()` - 9 edges
7. `projects` - 8 edges
8. `Event` - 7 edges
9. `ExtendableEvent` - 7 edges
10. `generateSalt()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `runTests()` --calls--> `checkRateLimit()`  [EXTRACTED]
  scripts/test-security.ts → src/lib/server/db/rateLimit.ts
- `runTests()` --calls--> `validateImageMagicBytes()`  [EXTRACTED]
  scripts/test-security.ts → src/lib/server/r2/upload.ts
- `main()` --calls--> `benchmarkScrypt()`  [EXTRACTED]
  scripts/seed.ts → src/lib/server/auth/auth.ts
- `main()` --calls--> `generateSalt()`  [EXTRACTED]
  scripts/seed.ts → src/lib/server/auth/auth.ts
- `main()` --calls--> `hashPassword()`  [EXTRACTED]
  scripts/seed.ts → src/lib/server/auth/auth.ts

## Import Cycles
- None detected.

## Communities (58 total, 22 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.00
Nodes (947): AbortController, AgentMemoryGetSummaryOptions, AgentMemoryGetSummaryResponse, AgentMemoryIncomingMemory, AgentMemoryIngestOptions, AgentMemoryListMemoriesOptions, AgentMemoryListMemoriesResult, AgentMemoryMemory (+939 more)

### Community 1 - "Community 1"
Cohesion: 0.19
Nodes (17): benchmarkScrypt(), generateSalt(), hashPassword(), safeCompare(), scryptAsync, SessionPayload, signSession(), verifySession() (+9 more)

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (22): devDependencies, drizzle-kit, drizzle-orm, eslint, eslint-config-prettier, @eslint/js, eslint-plugin-svelte, globals (+14 more)

### Community 3 - "Community 3"
Cohesion: 0.05
Nodes (16): $lib/components/FloatingWhatsApp.svelte, waUrl, $app/forms, $lib/config/site.config, $lib/video, ./layout.css, $lib/components/sections/AboutPreview.svelte, $lib/components/sections/ContactCta.svelte (+8 more)

### Community 4 - "Community 4"
Cohesion: 0.12
Nodes (15): 1. Install Dependencies, 2. Configure Local Environment Secrets, 3. Initialize D1 Local Emulator & Database, 4. Seed Default Admin & System Settings, 5. Launch Development Server, Local Development Quickstart, Production Provisioning Runbook, Reusable Agency Landing Template (SvelteKit + Cloudflare) (+7 more)

### Community 5 - "Community 5"
Cohesion: 0.14
Nodes (13): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, moduleResolution, resolveJsonModule, rewriteRelativeImportExtensions (+5 more)

### Community 6 - "Community 6"
Cohesion: 0.17
Nodes (12): CloseEvent, CustomEvent, EmailEvent, ErrorEvent, Event, ExtendableEvent, FetchEvent, MessageEvent (+4 more)

### Community 7 - "Community 7"
Cohesion: 0.18
Nodes (11): AlreadyUploadedError, BadRequestError, ForbiddenError, InternalError, InvalidURLError, MaxFileSizeError, NotFoundError, QuotaReachedError (+3 more)

### Community 8 - "Community 8"
Cohesion: 0.17
Nodes (7): load(), faq, gallery, messages, projects, services, testimonials

### Community 9 - "Community 9"
Cohesion: 0.29
Nodes (7): AbortSignal, EventSource, EventTarget, MessagePort, ServiceWorkerGlobalScope, WebSocket, WorkerGlobalScope

### Community 10 - "Community 10"
Cohesion: 0.29
Nodes (7): CompressionStream, DecompressionStream, FixedLengthStream, IdentityTransformStream, TextDecoderStream, TextEncoderStream, TransformStream

### Community 12 - "Community 12"
Cohesion: 0.67
Nodes (3): BasicImageTransformations, RequestInitCfPropertiesImage, RequestInitCfPropertiesImageDraw

### Community 13 - "Community 13"
Cohesion: 0.67
Nodes (3): Body, Request, Response

### Community 14 - "Community 14"
Cohesion: 0.67
Nodes (3): ByteLengthQueuingStrategy, CountQueuingStrategy, QueuingStrategy

### Community 15 - "Community 15"
Cohesion: 0.67
Nodes (3): RequestInitCfPropertiesVaryAcceptHeader, RequestInitCfPropertiesVaryAcceptLanguageHeader, RequestInitCfPropertiesVaryHeader

### Community 43 - "Community 43"
Cohesion: 0.40
Nodes (3): enablePush(), urlB64ToUint8Array(), svelte

### Community 46 - "Community 46"
Cohesion: 0.14
Nodes (15): load(), load(), getDb(), pushSubscriptions, settings, actions, load(), load() (+7 more)

### Community 48 - "Community 48"
Cohesion: 0.13
Nodes (15): scripts, build, check, check:watch, db:generate, db:migrate, db:push, db:seed (+7 more)

### Community 49 - "Community 49"
Cohesion: 0.24
Nodes (6): actions, deleteFromR2(), uploadToR2(), validateImageMagicBytes(), actions, actions

### Community 50 - "Community 50"
Cohesion: 0.24
Nodes (6): load(), projectImages, ParsedVideo, parseVideoUrl(), actions, load()

### Community 51 - "Community 51"
Cohesion: 0.25
Nodes (7): actions, contactSchema, checkRateLimit(), rateLimits, getClientEmailTemplate(), getOwnerEmailTemplate(), sendEmailViaZeptoMail()

### Community 52 - "Community 52"
Cohesion: 0.38
Nodes (9): b64uToBuffer(), bufToB64u(), concat(), encrypt(), hkdf(), PushSub, sendWebPush(), strBuf() (+1 more)

### Community 53 - "Community 53"
Cohesion: 0.29
Nodes (6): 1. Local Testing & Verification, 2. Database & Migrations, 3. Security & CSP, 4. Code Quality & Formatting, 5. Deployment Readiness, Definition of Done (DoD)

### Community 54 - "Community 54"
Cohesion: 0.29
Nodes (6): dependencies, zod, name, private, type, version

### Community 55 - "Community 55"
Cohesion: 0.33
Nodes (5): 1. What Already Exists (Technical Stack), 2. Structural & Architectural Off-Limits, 3. Real Bugs & Hard-Earned Lessons, 4. Definition of Done, Agent Context (AGENTS.md)

### Community 56 - "Community 56"
Cohesion: 0.33
Nodes (5): 1. What Already Exists (Technical Stack), 2. Structural & Architectural Off-Limits, 3. Real Bugs & Hard-Earned Lessons, 4. Definition of Done, Agent Context (AGENTS.md)

## Knowledge Gaps
- **1053 isolated node(s):** `gitignorePath`, `name`, `private`, `version`, `type` (+1048 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getDb()` connect `Community 46` to `Community 1`, `Community 8`, `Community 49`, `Community 50`, `Community 51`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **Why does `checkRateLimit()` connect `Community 51` to `Community 1`, `Community 46`?**
  _High betweenness centrality (0.001) - this node is a cross-community bridge._
- **What connects `gitignorePath`, `name`, `private` to the rest of the system?**
  _1053 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.002109704641350211 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._