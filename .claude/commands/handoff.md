---
description: Step 7 — Record progress, mark the slice done, and clear the context slate. Runs only when the user types it or `/ship` drives it; never invoke autonomously — it writes `done` into the task file and the plan, which must reflect verified phases, not intent.
---

You are running **Step 7 (Handoff)** of the SDD/TDD loop.

Completed task slice target:
$ARGUMENTS

---

### Execution Protocol

1. **Final Verification Check:**
   - Execute the test and typecheck suite using the terminal execution tool:
     `npm run typecheck && npm test`
   - Ensure all checks pass cleanly with zero errors before proceeding.

2. **Update Task Status:**
   - Locate and update the target task file in `.ai/tasks/` matching `$ARGUMENTS` (e.g., `.ai/tasks/NN_*.md`).
   - Set the task metadata `Status: done`.

3. **Update Master Plan & Progress Log:**
   - Open and edit `.ai/plan.md`.
   - Check off `[x]` the completed task slice in the feature checklist.
   - Append a dated one-line entry (`YYYY-MM-DD`) to the **Progress log** section summarizing what shipped and any noted follow-ups.

4. **Generate Lean Handoff Summary:**
   - Produce a brief, high-density summary for the next session.
   - Include:
     - What was implemented and verified.
     - The next task slice to execute from `.ai/plan.md`.
     - Crucial architectural context or state the next session needs to know.
   - **Strict Constraint:** Omit all raw terminal logs, compile outputs, and verbose stack traces from this output to conserve tokens.

5. **Trigger Context Slate Clear:**
   - Remind the user to clear your assistant's context window before initiating the next task slice.

---

### Output Guidance
Display the brief handoff summary and state:
"Slice marked as `done`. Please run `/clear` or start a new chat session to keep the next loop clean and cheap."