---
name: devflow-implement
description: Implement an approved Devflow change through sequential PR-sized workers, stacked local branches, independent reviews, and bounded automatic corrections. Use to implement or resume a Devflow plan without pushing or opening PRs.
---

# Devflow Implement

Coordinate the whole approved plan until verified or blocked. Workers implement and commit; you own branches, acceptance, local task state, reviews, and escalation. Local acceptance is not teammate approval or permission to publish.

## Authorization and Preflight

Explicit user invocation for an identified current plan authorizes its implementation, bounded delegation, local branches and commits, and the stack maintenance described here, subject to governing policy. Creating documents or finding a saved approval does not authorize execution. Ask when the target or authorization is ambiguous. Never push, force-push, open PRs, or mutate remote state.

Read `devflow/<change-id>/{proposal,requirements,design,plan}.md`, applicable project guidance, and relevant implementation and tests. Missing, contradictory, or materially undecided commitments block dependent execution; do not invent them or silently convert v1 records. Substantive artifact revisions require user agreement.

Inspect branch/HEAD, status, committed, staged, unstaged, and relevant untracked work. Protect unrelated work and pre-existing history. Do not overwrite, stash, stage, commit, or discard user changes. Pause if existing work overlaps the assignment or prevents safe branch switching. On resume, reconcile documents and checkboxes with actual commits and current check evidence; checked tasks are not proof of completion.

Require `Agent` with general-purpose workers and an independent reviewer. Discover and read the `devflow-review` skill and its required companions/references through the environment's skill registry. Do not assume sibling installation paths or silently substitute another review skill. Missing tools or companions require an agreed alternative before execution.

Before editing, report the selected change, original base commit, planned branch stack, pending tasks, checks, and protected work. Resolve consequential branch/base ambiguity with the user, not by guessing.

## Local Artifacts and Branch Stack

Devflow artifacts stay local and untracked by default. Resolve the repository's local exclude file with `git rev-parse --git-path info/exclude`; preserve its existing contents and add a root-anchored `/devflow/` rule if needed. Do not change shared `.gitignore`. If artifacts are already tracked, report that and ask before changing their tracking. Never force-add artifacts. The coordinator alone updates `plan.md` task checkboxes; workers must not edit change artifacts. Keep necessary resume notes concise and local in the same change directory, not in a new mandatory progress ledger.

For multiple planned PR increments, create `feature/<feature-name>` at the agreed original base, then build this stack:

```text
original base
  feature/<feature-name>       integration target; do not advance during execution
    <feature-name>/<increment-1>   intended PR base: feature/<feature-name>
      <feature-name>/<increment-2> intended PR base: <feature-name>/<increment-1>
        ...
```

Create each increment branch from the accepted previous increment tip. For one PR, create only its implementation branch from the agreed base. Choose descriptive names from the plan; never reset or repurpose a colliding existing branch without agreement. Record original base, branch names, parent relationships, and accepted tips locally so resume and later repairs have exact boundaries. Do not create remote PRs or merge increment branches into the feature branch.

Implementation invocation permits rebasing branches created for this execution, including on resume when ownership is established. It does not permit rewriting pre-existing user history. If branches have been published or ownership/publication status is uncertain, ask before rewriting; never infer force-push permission.

## Increment Implementation Loop

Process PR increments sequentially. Default to one general-purpose implementation worker per increment; split only when the assignment is too large for one bounded worker, preserving the same increment boundary. Delegate with `Agent`, `subagent_type: "general-purpose"`, in the target checkout. Wait for the worker to finish before another writer or branch operation; do not use an isolated worktree that automatically changes the agreed commit/branch structure.

Give each worker a self-contained brief containing:

- The change documents' relevant commitments, exact increment, task IDs/text, dependencies, non-goals, and acceptance criteria.
- Assigned checkout and branch, expected starting HEAD, bounded writable paths, protected work, and applicable project guidance.
- Explicit permission to create coherent implementation/test commits on that branch only. Stage specific owned files and inspect the staged diff; no blanket staging, branch operations, history rewriting, artifact edits, remote mutations, or scope expansion.
- Required checks, prerequisites, expected outcomes, and regression proof where practical. Stop on contradictory requirements, missing prerequisites, or consequential ambiguity.
- Required report: task IDs addressed, changed files, commit IDs, actual commands and passed/failed/skipped/blocked/not-run results, tests actually executed, deviations, and blockers. Corrections must state defect, remedy, and verification.

After the worker returns, inspect actual commits, files, diffs, branch identity, and working-tree state against the assignment and protected baseline. Reject unsupported completion claims, unexpected changes, missing commits, or failed/missing required checks. Run applicable checks yourself; zero relevant tests or skipped prerequisites do not establish success. Never discard unexpected work to restore the expected state.

Obtain an independent general-purpose reviewer for the increment using `devflow-review`. Provide its actual guidance, all four change documents, the increment's heading/outcome, exact parent/start and head commits, relevant check evidence, and explicit exclusions. Include intended uncommitted/untracked implementation if any remains; do not hide it behind a commit-only diff. Require behavioral, design/delivery, and implementation-quality assessment. The reviewer must not implement, commit, edit artifacts, or publish anything. Inspect the findings rather than accepting the report uncritically.

Apply the correction policy below, rerun affected checks, and re-review corrections until the increment is supported or blocked. Only then mark its satisfied tasks complete in local `plan.md` and record the accepted tip. Leave blocked or unverified tasks unchecked with a short reason. Continue automatically to the next increment; report completed/total tasks and a concise correction summary at each handoff.

## Defect Remediation and Escalation

Automatically correct clear in-scope implementation defects and clearly stale/incorrect tests within the agreed behavior and design. Delegate each correction to a fresh bounded general-purpose worker, with commit permission and the same ownership restrictions. Never weaken a valid test or change requirements simply to pass validation.

Before each autonomous attempt, record a compact local defect identifier, underlying symptom/cause, cumulative attempt count, and next action. Allow at most two autonomous correction attempts per unresolved defect across worker runs, reviews, and resumed sessions. Renaming or rediscovery does not reset the count; include the remaining budget in worker briefs. Count an attempt before dispatch so interruption cannot erase it. Do not create an empty issue ledger or authorization log.

Show the user **defect → remedy → verification** for automatic corrections, including actual outcomes. A concise report is required even when no decision is needed. Optional improvements are not automatic work.

Pause affected execution and present evidence when requirements/design are ambiguous, a remedy changes scope, the failure is environmental/flaky, a worker is blocked, a rebase conflicts, or a defect remains after two attempts. Ask for a concrete disposition or further authorization; do not reset the budget or silently omit a required check. Agreed substantive document changes precede affected implementation. Preserve current work and branch/rebase state when blocked.

## Earlier-Increment Fixes and Stack Repair

If a later or final review finds a defect belonging to an earlier increment, put its correction there rather than on the final branch. Before switching, require a safe working tree and record every affected branch's old tip and parent boundary. Switch to the responsible increment, delegate the correction commit, validate it, and independently review the correction before propagating it.

Rebase descendants in order, replaying only each descendant's own commits. For example, after fixing increment 1, use the equivalent of:

```text
git rebase --onto <new-increment-1-tip> <old-increment-1-tip> <increment-2-branch>
git rebase --onto <new-increment-2-tip> <old-increment-2-tip> <increment-3-branch>
```

Use recorded commit identities, not moving branch names for old boundaries. Check the graph and each increment diff for missing or duplicated changes. Do not replay the entire stack onto each new parent. Stop on conflicts and seek user-directed resolution; do not autonomously choose resolutions or abort away work.

Rebasing invalidates downstream verification even without conflicts. Reopen affected completion state, rerun affected checks and increment reviews against the rebuilt parents, then restore checkboxes only with current evidence. Repeat integrated verification and whole-change review after the repair. Keep the local stack record current; never rewrite unrelated branches.

## Final Verification and Completion

After all increments are accepted, run the plan's integrated checks and obtain an independent whole-change review through `devflow-review`. Compare the original base with the final increment tip, covering cross-increment interactions and all intended implementation changes. Increment reviews do not substitute for this gate. Apply the same correction budget and earlier-increment repair process to final findings, then rerun affected verification and full review.

Mark final verification tasks complete only when required checks actually passed, independent integrated review occurred, and material findings have correction evidence or explicit user-approved dispositions. Failed, blocked, skipped, or not-run required checks prevent verified completion. Never describe local acceptance as remote review approval or merge readiness established by teammates.

Report completed scope and tasks, each branch and intended PR base, actual verification, increment and integrated review conclusions, automatic defect/remedy/verification summaries, and remaining limitations or blockers. Leave all branches local. Pushing, PR creation, and remote delivery are separate user-directed work.
