# pos-portal

Vite + React 19 + TypeScript + Tailwind v4 starter, with an SDD/TDD agent
workflow (`.claude/`) and a graphify knowledge graph.

## Use it

```bash
gh repo create my-app --template <you>/pos-portal
cd my-app
npm install
npm run setup my-app   # renames pos-portal -> my-app across the repo
```

`npm run setup` with no argument uses the current directory name.

## Commands

| Command | What |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | typecheck + production build to `dist/` |
| `npm run typecheck` | `tsc -b` |
| `npm run lint` | oxlint |
| `npm test` | vitest |
| `npm run setup <name>` | rename the boilerplate |

## Layout

- `src/routes/` → `src/components/` → `src/lib/` → `src/lib/api/` (the only
  place `fetch` happens). `@/` maps to `src/`.
- `docs/` — CONTEXT, ADRs, PRDs, architecture, api-contracts. Source of truth
  for *what & why*.
- `.claude/` — the `/grill-with-docs → /adr → /to-tasks → /tdd → /implement →
  /refactor → /handoff` command loop and the `scout` recon skill.
- `graphify-out/GRAPH_REPORT.md` — structural map; rebuilt by a git post-commit
  hook (`graphify hook install`).

## Deploy

Cloudflare Pages: build `npm run build`, output `dist`. `wrangler.json` carries
the project name and build output dir.
