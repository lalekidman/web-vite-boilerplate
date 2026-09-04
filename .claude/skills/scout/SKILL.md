---
name: scout
description: Invoke at the START of any non-trivial task in this repo — before writing code — to orient fast and cheaply. A read-first recon procedure that locates the owning route/layer, the ADR or PRD slice driving the work, and the api-contracts rows in play, using docs/ and the route table instead of blindly reading source.
---

# Scout before building

Orient in the *fewest tokens*, then act. Do this in the main context — do **not**
spawn a sub-agent for it (a cold spawn re-reads everything and throws its reads
away). Only escalate to the built-in `Explore` agent for a genuinely large
fan-out (step 5).

This skill is **recon only**. It tells you *where the change lands*.
`/tdd` → `/implement` → `/refactor` → `/ship` own the red-first loop and the
scope fence.

## What this repo is

A Vite + React 19 client. React Router (`src/App.tsx`), Tailwind v4, Vitest.
Four layers, top to bottom:

| Layer | Path | What lives here |
|---|---|---|
| Route | `src/routes/<Name>Route.tsx` | One screen per URL. Owns page-level `useState` and orchestration. |
| Component | `src/components/<Name>.tsx` | Presentational + small interaction units. Reused across routes. |
| Headless logic | `src/lib/<thing>.ts` | Plain functions, no JSX. Testable without a DOM. |
| API seam | `src/lib/api/*.ts` | The *only* place `fetch` happens. |

Two conventions worth knowing before you open anything:

- **Every module has a colocated `*.test.ts(x)`.** Reading the test is usually
  cheaper and more informative than reading the implementation — start there.
- **`@/` maps to `src/`** (`vite.config.ts` + `tsconfig.app.json`).

## Procedure

1. **Start at the route table.** `src/App.tsx` is the whole map. Almost every
   task names a screen — find its `*Route.tsx` first, then walk *down* the layers
   via its imports. Follow imports, not folders.
2. **Read the graph report** — `graphify-out/GRAPH_REPORT.md` — for god nodes
   (most-connected modules) and community structure, so you know where to look
   before reading source. Skip it only if the corpus is tiny enough that
   `find src -type f` plus the route table beats it outright.
3. **Find the work unit that drives the task.** Check both:
   - **`.ai/tasks/NN_*.md`** — the current ADR's slices, in order. Completed sets
     move to `.ai/tasks/archive/<adr-slug>/`. Check `.ai/plan.md` too.
   - **`docs/prd/NN-*.md` Implementation Progress** — the coarser roadmap
     (`- [ ]` / `- [x]`).
   If the task maps to neither, say so before you write code.
4. **Docs are the source of truth for what/why.** Consult, in this order, only
   what the task needs:
   - `docs/prd/NN-*.md` — the PRD for the feature you're touching.
   - `docs/api-contracts.md` — the exact request / response / guard / error codes
     for any endpoint you touch (if the project keeps one).
   - `docs/adr/` — the ADRs that constrain the behaviour you're changing.
   - `docs/architecture.md` — cross-cutting system design.
   - `docs/CONTEXT.md` — glossary, guardrails, boundaries (if present).
5. **Escalate only on real fan-out.** If the task genuinely means sweeping many
   files or naming conventions, hand *that search* to the built-in `Explore`
   agent and keep its file-reading out of your context. Locating one route's
   dependency chain does not warrant a spawn.

## Output — a short orientation brief before any edit

State, in a few lines:

- **Route + layer(s)** the change lands in (`src/routes/…` → `src/components/…`
  → `src/lib/…`), and which colocated tests you'll be moving.
- **The driving work unit** — `.ai/tasks/NN_*.md` slice, or the PRD checkbox, or
  "neither, this is unplanned."
- **Contract rows** in `docs/api-contracts.md` the change touches, with their
  guards.
- **The governing ADR**, if one constrains the behaviour.
- **Any doc↔code drift** you noticed — fix it in the same PR, never code around it.
