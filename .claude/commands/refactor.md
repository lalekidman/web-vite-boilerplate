---
description: Step 6 — Refactor implementation code for clarity, structure, and performance without breaking tests. Runs only when the user types it or `/ship` drives it; never invoke autonomously — this is a phase gate on a green slice, not general cleanup.
---

You are running **Step 6 (Refactor Phase)** of the TDD loop.

Task slice target:
$ARGUMENTS

---

### HARD RULES
1. **Behavioral Freeze:** You are strictly forbidden from changing public signatures, altering external behaviors, or modifying existing test assertions.
2. **Zero Regressions:** All type checks and tests must remain green. If a refactor breaks a test, roll back immediately.

---

### Execution Protocol

1. **Verify State & Load Architecture Guardrails:**
   - Locate and read the task file matching `$ARGUMENTS` in `.ai/tasks/` (e.g., `.ai/tasks/NN_*.md`).
   - Confirm that the task status is currently `green`.
   - Read `docs/CONTEXT.md` (if present) and this repo's `CLAUDE.md` for code quality standards and boundaries.
   - This is a React client: the layering contract is `routes/ → components/ → lib/ → lib/api/`. Moving logic *down* (a route's pure helper into `src/lib/`) is the refactor this codebase rewards; it also keeps tests out of jsdom.
   - Limit file edits strictly to those declared under the task's `Scope` section.

2. **Perform Refactoring:**
   - Improve code readability, eliminate duplication, streamline error handling, and ensure clean abstraction boundaries.
   - Do NOT add new functionality or speculative features.

3. **Validate Regression Suite:**
   - Run type checks and tests using the terminal execution tool:
     `npm run typecheck && npm test`
   - Verify zero type errors and zero failing tests.

4. **Update Task Status:**
   - Update the task frontmatter/metadata in `.ai/tasks/NN_*.md` to set `Status: completed` (or `done`).

---

### Output Guidance
Briefly summarize the structural/cleanliness improvements made, display the passing test output, and confirm the task slice is finished.