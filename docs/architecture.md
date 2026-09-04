# Architecture

Cross-cutting system design. Update when a new route, a shared `src/lib/` module,
a service-worker change, or an auth/session path changes.

## Layers

| Layer | Path | Responsibility |
|---|---|---|
| Route | `src/routes/` | One screen per URL; page-level state + orchestration. |
| Component | `src/components/` | Presentational + small interaction units. |
| Headless logic | `src/lib/` | Plain functions, no JSX. |
| API seam | `src/lib/api/` | The only place `fetch` happens. |

## Routes

See `src/App.tsx`.

## Auth / session

<!-- Token/cookie names, the 401 path, refresh policy. -->
