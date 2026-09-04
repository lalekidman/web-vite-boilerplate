---
description: Step 3 — Split the ADR into atomic vertical-slice task files in .ai/tasks/.
---

You are running **Step 3 (Atomic Task Breakdown)**.

Source ADR / feature target:
$ARGUMENTS

> **Note:** This command generates local task breakdown files for the in-context execution loop (`.ai/tasks/`). It does not create GitHub issues.

---

### HARD RULES
1. **No Application Code:** You are strictly forbidden from writing or modifying application source code or test files during this step.
2. **Strict File Operations:** You may ONLY read context files and write/update markdown files inside `.ai/tasks/` and `.ai/plan.md`, plus move existing task files into `.ai/tasks/archive/` per Step 0 below. `.ai/tasks/*` is gitignored (only `_template.md` is tracked), so these are plain filesystem moves, not `git mv`.

---

### Execution Protocol

0. **Archive Completed Task Files (housekeeping, runs first):**
   - Read `.ai/plan.md` to see which slices are ticked `[x]` and which ADR each
     belongs to (the plan groups slices under headers like `Cycle N — ADR
     000N`; each task file also states its ADR in its own `- **ADR:**` line —
     cross-check both).
   - An ADR is **archivable** only if *every* slice it owns is `[x]` in the
     plan — never archive a task file that belongs to the ADR named in
     `$ARGUMENTS` (it's the one you're about to add slices for), and never
     archive a task file whose ADR still has an open `[ ]` slice, even if that
     file itself is done.
   - For each archivable ADR, derive its slug from the ADR's own filename
     (e.g. `docs/adr/0001-merchant-identity-seats-not-people.md` →
     `0001-merchant-identity-seats-not-people`) and create
     `.ai/tasks/archive/<adr-slug>/` if it doesn't exist yet.
   - Move each of that ADR's task files from `.ai/tasks/NN_*.md` into
     `.ai/tasks/archive/<adr-slug>/NN_*.md` (plain `mv` — these files aren't
     git-tracked, see Hard Rule 2). Fix the relative `../../docs/adr/...`
     link inside each moved file (now one directory deeper:
     `docs/adr/...`).
   - Update `.ai/plan.md`: for every checklist entry you just moved, repoint
     its link from `tasks/NN_*.md` to `tasks/archive/<adr-slug>/NN_*.md`.
     Leave the checkbox state, slice text, and ordering untouched — this is a
     path fix, not a rewrite.
   - Skip entirely if nothing is archivable (e.g. the only prior ADR still has
     open slices, or there's no prior task backlog at all).

1. **Load Context & Architecture Boundaries:**
   - Locate and read the relevant ADR under `docs/adr/` matching `$ARGUMENTS`.
   - Read the corresponding feature PRD under `docs/prd/`.
   - Read `graphify-out/GRAPH_REPORT.md` to map exact file dependencies and blast radius. Do not blind-scan the file tree.

2. **Decompose into Vertical Slices:**
   - Break the feature down into tiny, decoupled **vertical slices** (schema $\rightarrow$ repository $\rightarrow$ service $\rightarrow$ route $\rightarrow$ single test assertion).
   - Ensure each slice is atomic, isolated, and small enough to be completed in $\le$ 10 minutes.

3. **Generate Task Files from Template:**
   - Read `.ai/tasks/_template.md` to parse the required structure.
   - For each slice, write a new task file to `.ai/tasks/NN_<kebab-slug>.md` (where `NN` is a zero-padded sequence number: `01`, `02`, etc.).
   - Fill out each task file completely:
     - **Scope:** Explicit list of files this slice is allowed to touch.
     - **Blast Radius:** Dependent modules or secondary impacts.
     - **Red Test:** Concrete assertion criteria and inputs for the failing test phase.
     - **Green Criteria:** Exact success conditions to complete the slice.

4. **Update Master Plan:**
   - Read `.ai/plan.md` and update it with the feature name, overall architectural blueprint summary, and the ordered checklist of generated task slices.

---

### Output Guidance
If Step 0 archived anything, list which ADR(s) and how many task files moved
into which `.ai/tasks/archive/<adr-slug>/` folder. Then summarize the vertical
slices created, show the sequence of generated task files in `.ai/tasks/`, and
state that `.ai/plan.md` has been updated.

Next step: `/red` (or `/tdd`) on the first task slice (`.ai/tasks/01_*.md`).