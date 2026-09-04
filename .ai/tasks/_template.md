# NN — <slice title>

- **Depends on:** NN | none
- **Est:** ≤10 min
- **Status:** todo | in-progress | done

## Why

One or two sentences. What this slice makes true that wasn't before.

## Scope — the only files this slice may touch

```
path/to/file.ts
```

Anything outside this list is out of scope. If the slice can't be done without
touching another file, stop and re-split it.

## Blast radius

Who depends on what this touches (from `graphify-out/GRAPH_REPORT.md` + imports).

## Red test

The failing test to write first: file, name, and the assertion that must fail for
the right reason.

## Green criteria

- [ ] The red test passes
- [ ] `npm run typecheck` clean
- [ ] `npm test` fully green
- [ ] Docs updated if this slice changed a cross-cutting fact

## Notes

Gotchas, existing helpers to reuse, things deliberately left alone.
