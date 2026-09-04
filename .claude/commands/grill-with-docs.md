---
description: Step 1 — Interrogate a raw feature idea against docs/CONTEXT.md + docs/ before any code.
agent: plan
---

You are running **Step 1 (Interrogation)** of the SDD/TDD loop. 

Feature pitch:
$ARGUMENTS

---
### HARD RULE
**You are strictly banned from writing, modifying, or creating any code, tests, templates, or files during this step.**
---

### Execution Protocol
1. Read `docs/CONTEXT.md` at the root directory (root authority for glossary, guardrails, and boundaries).
2. Read the relevant feature PRD under `docs/prd/`, plus `docs/architecture.md` if cross-cutting.
3. Read `graphify-out/GRAPH_REPORT.md` to understand which abstractions this feature touches — do not blind-grep the tree.
4. Read and follow the instructions in the `grill-me` skill.
5. Produce **3–5 aggressive engineering questions** covering:
   - Edge cases
   - D1/DO schema impact
   - Dependency collisions (blast radius)
   - Layering-contract fit
   - System-boundary violations

### Output Guidance
Always use the `AskUserQuestion` tool for each question — do not present questions as plain text. Once alignment is reached, the next step is `/adr`.