---
description: Steps 4–7 on repeat — drive slices through tdd → implement → refactor → handoff, then start the next one.
---

You are the **execution loop driver** for the SDD/TDD process. You do not write
code yourself in this command — you invoke the existing step commands in order,
verify each one actually landed, and then advance to the next slice.

Target:
$ARGUMENTS

`$ARGUMENTS` may be empty (start from the first unchecked slice in `.ai/plan.md`
and keep going until the plan is done), a single slice (`13`, or a task
filename — run just that one, then stop), a range (`13-17`), or a count
(`next 3`). If it names a slice that is already checked off, ask before redoing
it.

---

### GUARDRAILS — read these before anything else

1. **Never run, print, or suggest `/clear`.** `/handoff` step 5 tells you to
   remind the user to clear the context window. **Ignore that instruction and
   suppress that line from the output.** This loop's whole purpose is to keep
   going in one session; the handoff summary is the context carrier, not a
   goodbye note. Same for "start a new chat session".
2. **Never skip a phase.** Red before green, green before refactor, refactor
   before handoff. No fusing `/tdd` and `/implement` into one edit, even for a
   one-line slice.
3. **Never widen a slice's `Scope`.** If a phase reports it needs a file outside
   scope, that is a HALT (see Stop conditions), not a judgement call.
4. **One slice in flight at a time.** Do not read ahead into slice N+1's files
   while slice N is unfinished.
5. **Do not commit, push, or open PRs** unless the user asked for it in
   `$ARGUMENTS`.

---

### Execution Protocol

#### 0. Plan the run (once, at the start)

- Read `.ai/plan.md`: the blueprint, the ordering rule, and the slice checklist.
- Resolve `$ARGUMENTS` into an ordered queue of slice task files in
  `.ai/tasks/NN_*.md`. Respect the plan's stated ordering rule and any
  "must ship alongside" coupling noted in the task files — if a queued slice is
  coupled to one that isn't queued, say so before you start.
- **`.ai/plan.md` is per-cycle.** Each `## Cycle N — ADR NNNN` section carries its
  own `### Blueprint`, `### Slices` checklist and `### Progress log`. Work the
  newest cycle's list unless `$ARGUMENTS` says otherwise; earlier cycles' task
  files live under `.ai/tasks/archive/<adr-slug>/`. Slices are numbered from
  `01` — there is no slice `00` in this repo.
- **Record the run baseline.** Before the first red phase, capture
  `git rev-parse HEAD` and `git status --porcelain`, and keep both in the
  transcript. Guardrail 5 means nothing is committed during the run, and this
  branch normally already carries unrelated uncommitted work — without this
  snapshot the end-of-run change summary (§4) cannot separate what this run
  touched from what was dirty before it started.
- State the queue back to the user in one line (`Queue: 13 → 14 → 15`), then
  print the **run ledger** (below) with every cell pending, then begin. Do not
  ask for permission to start; `$ARGUMENTS` was the permission.

**The run ledger** is the visible proof that no phase was skipped. One row per
queued slice, one column per command in the cycle:

Render it as a markdown table, always with these exact columns:

| Slice | `/tdd` | `/implement` | `/refactor` | `/handoff` | Docs | Status |
| --- | :-: | :-: | :-: | :-: | :-: | --- |
| 13 <title> | · | · | · | · | · | queued |
| 14 <title> | · | · | · | · | · | queued |
| 15 <title> | · | · | · | · | · | queued |

Cell markers: `·` not run · `▶` running · `✓` ran and verified ·
`✗` HALTed here · `–` not applicable (only ever for `docs`).

Row `status` is the task file's own status word (`queued` → `red` → `green` →
`refactored` → `done`), read back from the task file — never assumed from the
fact that you invoked the command.

#### 1. Per-slice cycle

For each slice in the queue, in order:

**After every phase below, reprint the slice's ledger row** with the phase you
just finished flipped to `✓` and the next one to `▶`, before starting it:

| Slice | `/tdd` | `/implement` | `/refactor` | `/handoff` | Docs | Status |
| --- | :-: | :-: | :-: | :-: | :-: | --- |
| 13 <title> | ✓ | ▶ | · | · | · | red |

Only write `✓` once you have seen the evidence the phase demands (a real failing
test, a clean typecheck+test run, a re-read status word). If you did not invoke
a command, its cell stays `·` and the slice cannot be reported done.

1. **Red** — invoke the `/tdd` command with the slice identifier. Do not proceed
   until you have seen a real failing test that fails for the *right reason*
   (missing implementation, not a typo or an import error) and the task status
   reads `red`.
2. **Green** — invoke the `/implement` command with the same identifier. Do not
   proceed until `npm run typecheck && npm test` is clean and status reads
   `green`.
3. **Refactor** — invoke the `/refactor` command with the same identifier.
   Behaviour must be frozen and the suite must stay green, and status must read
   `refactored` before you advance. A refactor that changes an assertion is a
   rollback, not a refactor.
4. **Handoff** — invoke the `/handoff` command with the same identifier. It ticks
   the task to `done`, checks the box in the current cycle's `### Slices` list in
   `.ai/plan.md`, and appends one dated (`YYYY-MM-DD`) line to that same cycle's
   `### Progress log` (`handoff.md` step 3). Those are the only two plan edits —
   no other section of `.ai/plan.md` is touched. Apply **Guardrail 1** to its
   output.
5. **Doc sync (definition of done, per `CLAUDE.md`)** — before calling the slice
   finished, confirm:
   - **An endpoint got wired or changed shape** → `docs/api-contracts.md` (if the
     project keeps one) reflects the new request/response.
   - **A cross-cutting fact changed** — a new route in `src/App.tsx`, a new
     `src/lib/` module other features will ride on, a service-worker precache
     change, or a change to an auth/session path → `docs/architecture.md` updated.
   - **PRD state moved** → the relevant `docs/prd/NN-*.md` checkbox, and the
     feature's status marker in `docs/master-prd.md` if it changed.
   If any is stale, fix it now — the slice is not done until the docs are true.
6. **Compact the record and advance.** Emit the slice recap (format below) and
   move straight to the next slice's Red phase. Do not wait for the user.

#### 2. Between slices — keep context cheap

The handoff summary is what carries forward, so keep the running transcript
lean:

- Discard verbose terminal output once a phase is verified. Quote at most 2–3
  lines of test output per phase, and only the lines that prove the state.
- Do not re-read `.ai/plan.md`, `CONTEXT.md`, or `docs/` files you already read
  this session unless a slice changed them.
- Do not re-summarise finished slices beyond their recap tables.
- Between phases, reprint only the **current slice's** ledger row, not the whole
  table. The full table is printed twice: at the start of the run and at the end
  (or on HALT).

#### 3. Per-slice recap format

After each slice, output exactly this shape and nothing more — the slice's
finished ledger row, then the detail table:

**Slice NN <title> — done**

| Slice | `/tdd` | `/implement` | `/refactor` | `/handoff` | Docs | Status |
| --- | :-: | :-: | :-: | :-: | :-: | --- |
| NN <title> | ✓ | ✓ | ✓ | ✓ | ✓ | done |

| Phase | Command | Result |
| --- | --- | --- |
| Red | `/tdd NN` | `<test file>` — <assertion, one clause> |
| Green | `/implement NN` | `<files touched>` |
| Refactor | `/refactor NN` | <what improved, or "no change needed"> |
| Handoff | `/handoff NN` | task `done`, box ticked, progress-log line added |
| Docs | — | `<docs touched>`, or "none required" |

Next: Slice MM <title>

#### 4. End of run

When the queue is empty (or the plan has no unchecked slices left):

- **Cycle-level doc sweep.** Per-slice doc sync (step 1.5) only catches what
  that one task file's `Scope` touches — it will not catch a fact that's true
  only once the *whole cycle* lands. Before the final ledger, re-read the
  cycle's ADR (the one named in `.ai/plan.md`'s cycle header) end to end,
  specifically its **Decision** and **Consequences** sections, and check
  whether it names any PRD item, `docs/master-prd.md` row, or other doc as
  stale, resolved, or superseded by this cycle. If it does and that doc still
  shows the old state, fix it now — same "not done until the docs are true"
  bar as step 1.5, just scoped to the cycle instead of the slice. Note what
  you changed (or "none found") in the run summary below.
- Output the **final run ledger** — the full table, every queued slice, every
  command cell in its end state — so the user can see at a glance that each
  slice really went through all four commands:

| Slice | `/tdd` | `/implement` | `/refactor` | `/handoff` | Docs | Status |
| --- | :-: | :-: | :-: | :-: | :-: | --- |
| 13 <title> | ✓ | ✓ | ✓ | ✓ | ✓ | done |
| 14 <title> | ✓ | ✓ | ✓ | ✓ | – | done |
| 15 <title> | ✓ | ✓ | ✗ | · | · | green |

- Output the **change summary**, derived from the §0 baseline and nothing else.
  Run `git diff --stat <baseline-sha>` and `git status --porcelain`, subtract the
  paths that were already dirty at baseline, and report what *this run* changed:

| Slice | Behaviour now true that wasn't before | Files |
| --- | --- | --- |
| 13 <title> | <one clause, present tense> | `<paths from the diff>` |

  Three rules, because this is the one section that can lie:
  - **The Files column comes from the diff, never from recollection.** By the end
    of a multi-slice run the transcript is lossy, and a remembered file list
    reads confidently while being wrong.
  - **If a slice's diff is empty, say so** — do not describe what it was supposed
    to do. An empty diff on a `done` slice is itself a finding worth surfacing.
  - **One clause per slice.** The ADR and the cycle's `### Progress log` already
    carry the narrative. This table exists to make the run reviewable at a
    glance, not to retell it.

Follow it with a short **run summary**: doc updates made (per-slice and the
cycle-level sweep above, called out separately), anything deferred, and the next
unchecked slice in `.ai/plan.md`. Any row that is not all-`✓` must be named in
the summary with the reason. Then stop — no `/clear` suggestion, no new-session
suggestion.

---

### Stop conditions — HALT the loop, report, and wait for the user

Stop the whole loop (do not silently move to the next slice) when:

- **Scope breach:** a phase needs a file outside the slice's `Scope`.
- **Red won't go red:** the test passes before implementation and tightening the
  assertions doesn't fix it — the slice or its task file is wrong.
- **Green won't go green:** typecheck or tests still fail after **two** honest
  attempts. Do not weaken the test, mark it skipped, or loosen an assertion to
  get past this. Report the failure output.
- **Unrelated breakage:** a test outside this slice starts failing.
- **Spec conflict:** the task file, ADR, PRD, or code disagree about intended
  behaviour. That's a doc bug — surface it, don't guess.
- **Missing prerequisite:** the slice depends on a slice that hasn't landed.
- **Contract gap:** the slice needs a response field or type that its task file's
  **Contract** section doesn't declare and no module in `Scope` exports. Report
  it — don't widen `Scope` to patch it. Response shapes live as `<Thing>Response`
  interfaces in `src/lib/api/`, each mirroring one `docs/api-contracts.md` row.
- **Contract error:** an existing `<Thing>Response` is wrong for the slice's
  actual requirement. Name the correction needed and stop. Never cast, alias, or
  widen your way past a wrong type: that buries the drift in implementation code
  where no later step will find it.

On HALT: print the run ledger with the failing cell marked `✗`, then state which
slice and phase stopped you, the concrete reason, the minimal failing evidence,
and the options you see. Leave the task status at whatever phase it truthfully
reached. Slices already completed in this run stay completed — their rows keep
their `✓`s.
