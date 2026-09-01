# /config

Framework-agnostic configuration data, imported by the Next.js app once Phase 2 scaffolding exists. Kept separate from `app/`/`components/` because these are values someone (not necessarily an engineer) needs to find and edit without digging through application code.

- **`treatments.ts`** — the single source of truth mapping each of the 5 OnlyHuman treatments to its category, its Important Safety Information slug, and its external telehealth intake URL. All CTA buttons resolve their destination through this file — no component should ever hardcode a telehealth or portal URL. Currently ships with every `telehealthUrl` as a placeholder `null`; see `ONLYHUMAN-IMPLEMENTATION-PLAN.md` for when real URLs are required.
