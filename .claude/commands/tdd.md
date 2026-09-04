---
description: Step 4 — Write a failing test for one task slice (true red phase). Runs only when the user types it or `/ship` drives it; never invoke autonomously — picking the slice is the operator's call, not an inference from the task at hand.
---

You are running **Step 4 (Red Phase)** of the TDD loop. 

Task slice target:
$ARGUMENTS

---

### HARD RULES
1. **Zero Implementation Code:** You are strictly forbidden from writing or modifying non-test application/feature code during this step.
2. **True Red Mandate:** The test MUST fail. A passing test at this stage means the test is invalid or incomplete.

---

### Execution Protocol

1. **Pin Context:**
   - Locate and read the target task file matching `$ARGUMENTS` in `.ai/tasks/` (e.g., `.ai/tasks/NN_*.md`).
   - Read ONLY the files explicitly listed in that task file's `Scope` section. Do not read or touch files outside this scope.

2. **Write the Failing Test:**
   - Create or update the automated test file for this slice based on the inputs, error handling, and boundary conditions defined in the task's **Red** section.

3. **Run and Validate Test Failure:**
   - Execute the test using the terminal tool (e.g., `npm test path/to/spec.test.ts` or project test runner).
   - Verify that the output confirms a failure for the **right reason** (missing implementation).
   - If the test unexpectedly passes natively, rewrite and tighten your test assertions until it produces a clean, true failure.

4. **Update Task Status:**
   - Update the task's frontmatter or metadata block in `.ai/tasks/NN_*.md` to set `Status: red`.

---

### Output Guidance
Confirm that the test file has been created/updated, show the failing terminal output snippet, and state that the task status is now set to `red`. 

Next step: `/implement`