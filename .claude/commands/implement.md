---
description: Step 5 — Write the minimum code to turn the failing test green. Runs only when the user types it or `/ship` drives it; never invoke autonomously — a green phase without a verified red phase before it is a process violation, not a shortcut.
---

You are running **Step 5 (Green Phase)** of the TDD loop.

Task slice target:
$ARGUMENTS

---

### HARD RULES
1. **Absolute Minimum Code:** Write only the code required to make the failing test pass. Do not write speculative helper functions, future-proofing code, or extra features.
2. **Strict Scope Fence:** If you realize you need to edit any file *not* explicitly listed in the task's `Scope` section, **HALT immediately** and notify the user. Do not silently widen the slice scope.

---

### Execution Protocol

1. **Verify State & Load Architecture Guardrails:**
   - Locate and read the task file matching `$ARGUMENTS` in `.ai/tasks/` (e.g., `.ai/tasks/NN_*.md`).
   - Confirm that the task status is currently `red`.
   - Read `docs/CONTEXT.md` (if present) and this repo's `CLAUDE.md` for the architecture guardrails and boundaries.
   - This is a React client: the layering contract is `routes/ → components/ → lib/ → lib/api/`. `src/lib/api/` is the only place `fetch` happens.
   - Limit your file access strictly to the files declared under the task's `Scope` section.

2. **Implement Minimal Code:**
   - Write or update the minimal production code in the scoped file(s) to fulfill the requirements tested in Step 4.

3. **Run Validation:**
   - Execute type checks and tests using the terminal execution tool:
     `npm run typecheck && npm test` (or execute the specific test file for this slice).
   - Ensure the tests turn green with zero type errors.

4. **Update Task Status:**
   - Update the task frontmatter/metadata in `.ai/tasks/NN_*.md` to set `Status: green`.

---

### Output Guidance
Briefly outline the code changes made, display the passing test output snippet, and confirm that the task status is now updated to `green`.

Next step: `/refactor`