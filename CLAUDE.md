# web-boilerplate

Vite + React 19 + TypeScript + Tailwind v4 client. Package manager: npm.

## Orient before building

At the start of any non-trivial task, **invoke the `scout` skill** — it is the
read-first recon procedure for this repo (route table → graph report → the ADR/PRD
slice driving the work). Don't blind-grep the tree.

```bash
cat graphify-out/GRAPH_REPORT.md   # god nodes + community structure
```

## Commands

- `npm run dev` — dev server
- `npm run build` — typecheck + production build
- `npm run typecheck` / `npm run lint` / `npm test`

## Layering contract

`routes/ → components/ → lib/ → lib/api/`. `src/lib/api/` is the only place
`fetch` happens. `@/` maps to `src/`. Every module has a colocated `*.test.ts(x)`;
DOM tests run in jsdom, everything else in node.

## Working style

- Smallest change that solves the problem. No speculative abstractions,
  no configurability that wasn't asked for.
- Every changed line traces to the request. Match existing style.
- Non-trivial logic ships with a test.

## Spec-driven workflow

Feature work runs through the command loop:
`/grill-with-docs → /adr → /to-tasks → /tdd → /implement → /refactor → /handoff`
(or `/ship` to drive slices end to end).

- `docs/` is the source of truth for *what & why*; code is the source of truth
  for *how*. When they disagree, fix one in the same change.
- `docs/adr/` — architecture decisions. `docs/prd/NN-*.md` — one PRD per feature,
  with a vertical-slice checklist that is the task backlog.
- `.ai/tasks/NN_*.md` — the active ADR's slices; `.ai/plan.md` — the cycle plan.
  Only `.ai/tasks/_template.md` is git-tracked.

## Keep docs in sync — in the same PR

Never speculatively ahead (the spec rots), never in a follow-up (the doc lies).
The PRD is the one doc written *ahead* of code.

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- After modifying code files in this session, run `python3 -c "from graphify.watch import _rebuild_code; from pathlib import Path; _rebuild_code(Path('.'))"` to keep the graph current
