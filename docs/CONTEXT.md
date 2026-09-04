# CONTEXT

Root authority for this repo: glossary, structural guardrails, boundaries, and
the SDD/TDD loop. Read first.

## Ubiquitous language

<!-- Define the domain terms the code and docs must both use. One term per line. -->

## Structural guardrails

- Layering: `routes/ → components/ → lib/ → lib/api/`. Never call up.
- `src/lib/api/` is the only place `fetch` happens.
- `@/` maps to `src/`.
- Every module has a colocated `*.test.ts(x)`.

## System boundaries

<!-- What this app may and may not talk to. Auth/session rules. External surfaces. -->

## The SDD/TDD loop

`/grill-with-docs → /adr → /to-tasks → /tdd → /implement → /refactor → /handoff`.
One vertical slice = one PR, ≤ ~300 changed lines, ships with its own test.
Docs change in the same PR as the code that makes them true.
