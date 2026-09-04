---
description: Step 2 — Record the agreed decision as an ADR in docs/adr/.
---

You are running **Step 2 (Lock the Architecture)**. Only execute this after reaching alignment during the interrogation/grilling step.

Subject / Decision context:
$ARGUMENTS

---

### Execution Protocol

1. **Find the Next ADR Number:**
   - Inspect `docs/adr/` to find the highest existing zero-padded number (`NNNN`).
   - Increment `NNNN` by 1 to form the new filename prefix (e.g., `0004`).

2. **Create the ADR File:**
   - Read the template structure in `docs/adr/_template.md`.
   - Write the new file to `docs/adr/NNNN-<kebab-slug>.md`.

3. **Fill Out the Record:**
   - **Status:** Set to `Accepted`.
   - **Date:** Today's date (YYYY-MM-DD).
   - **Context:** Explicitly capture the forces, trade-offs, and blast radius discussed during grilling.
   - **Decision:** State in active voice; must be specific enough to serve as a binding behavioral contract.
   - **Consequences:** List both positive and negative implications.
   - **Alternatives Considered:** What was rejected during the interrogation phase and why.

4. **Cross-Link Dependencies:**
   - Add a direct relative link to the relevant feature PRD under `docs/prd/`.
   - If this ADR supersedes a prior record, update the old ADR file's status line to `Superseded by docs/adr/NNNN-<kebab-slug>.md`.

5. **Write a preview alongside it:**
   - Write `.ai/adr-preview/NNNN-<kebab-slug>.md` — plain markdown, gitignored, regenerated on demand. Never publish it anywhere; it is read in the editor.
   - Purpose: let a human see **what changes, where, and in what order** without reading the full prose contract first. Skip this step only if the ADR introduces no schema, endpoint, route-boundary, or cross-project change (a pure policy/process ADR).
   - Sections, in order, **only include ones that apply** — most ADRs won't have all of these:
     - `# Preview — NNNN <title>` + one-line status/date header.
     - **At a glance** — a tight table: counts of new routes, new columns/tables, which projects are touched, anything gated or exceptional. This is the "do I even need to read further" section — a handful of rows, no prose.
     - **Affected surface** — a table: Path | Change. One row per file or directory the ADR forces work in. Name the file where you know it and the directory where you don't — a guessed exact path is worse than an honest directory. `Change` is one of `new` / `edit` / `contract only`.
     - **Schema** — any new/changed columns or tables as a fenced `diff` block (`+` for additions), not prose. Skip if no schema changes.
     - **Endpoints** — a markdown table: Method | Path | Guard | Purpose. One row per new or changed route.
     - **Notable exceptions** — anything that breaks an established convention on purpose (a boundary crossing, a naming exception, a deliberate deviation). Call these out as a blockquote (`> ⚠`), one per exception, stating what convention it breaks and why it was accepted anyway. This is the section most worth a second read before `/to-tasks`.
     - **Process flow** — a `mermaid` fenced block for **any** multi-step interaction the ADR introduces, not just uploads: a request round-trip, an auth or linking handshake, a session/state machine, a migration or backfill order, a retry/failure path. Use `sequenceDiagram` when the point is *who calls whom* across projects (label the participants by project — Client, Server, R2, Provider) and `flowchart` when the point is *branching* (a gate, a fallback, an error route). One diagram per distinct flow, max two; skip entirely for ADRs with no new sequence.
     - **Out of scope** — bullet list of what was explicitly deferred or rejected, pulled from Alternatives/Open questions. Each bullet is `**<the thing>** — <one clause of why, and where it lands instead>`. The "where instead" matters: a future slice, another ADR, or never.
     - **Left open** — anything the grilling surfaced but did not settle, one numbered line each. Distinct from Out of scope: that is *decided not to do*, this is *not yet decided*. These are the questions `/to-tasks` must not silently answer. Omit the section if nothing is open.
     - **Next step** — one line, e.g. `→ /to-tasks`.
   - **No UI mockups, no ASCII art, no ANSI/box-drawing layouts.** Those cost real tokens to author and re-verify on every regeneration for a visual the reader can get faster by opening the actual component. If a screen's layout genuinely needs explaining, describe it as a short field list (field — editable? — which route writes it), not a rendered mockup.
   - Keep the whole file short — this is a scanning aid, not a rewrite of the ADR. Tables and diagrams over sentences; if a section would just restate the ADR's prose, cut it.

---

### Constraints
- Keep it concise, direct, and unambiguous — this is an unchangeable technical contract, not an essay.
- The preview file is disposable and regenerated each time `/adr` runs for a new record — never hand-edit it; edit the ADR and rerun.

This ADR is now the locked architectural contract for the rest of the feature cycle. Next step: `/to-tasks`.