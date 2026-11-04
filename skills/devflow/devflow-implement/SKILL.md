---
name: devflow-implement
description: Implement an approved Devflow change by delegating ordered task groups to sequential workers, with orchestrator-owned Git, PR-boundary reviews, and bounded automatic corrections. Use to implement or resume a Devflow plan without pushing or opening PRs.
---

# Devflow Implement

Coordinate the whole approved plan until verified or blocked. Delegate one task group at a time; workers implement and return uncommitted changes. You own all Git operations, including branches and commits, plus acceptance, local task state, PR-boundary reviews, and escalation. Local acceptance is not teammate approval or permission to publish.

## Authorization and Preflight

Explicit user invocation for an identified current plan authorizes its implementation, bounded delegation, local branches and commits, and the stack maintenance described here, subject to governing policy. Creating documents or finding a saved approval does not authorize execution. Ask when the target or authorization is ambiguous. Never push, force-push, open PRs, or mutate remote state.

Read `devflow/<change-id>/{proposal,requirements,design,plan}.md`, applicable project guidance, and relevant implementation and tests. Missing, contradictory, or materially undecided commitments block dependent execution; do not invent them or silently convert v1 records. Substantive artifact revisions require user agreement.

Inspect branch/HEAD, status, committed, staged, unstaged, and relevant untracked work. Protect unrelated work and pre-existing history. Do not overwrite, stash, stage, commit, or discard user changes. Pause if existing work overlaps the assignment or prevents safe branch switching. On resume, reconcile documents and checkboxes with actual commits and current check evidence; checked tasks are not proof of completion.

Require `Agent` with general-purpose workers and an independent reviewer. Discover and read the `devflow-review` skill and its required companions/references through the environment's skill registry. Do not assume sibling installation paths or silently substitute another review skill. Missing tools or companions require an agreed alternative before execution.

Before editing, report the selected change, original base commit, planned branch stack, pending tasks, checks, approved model selections, and protected work. Resolve consequential branch/base ambiguity with the user, not by guessing.

## Local Artifacts and Branch Stack

Devflow artifacts stay local and untracked by default. Resolve the repository's local exclude file with `git rev-parse --git-path info/exclude`; preserve its existing contents and add a root-anchored `/devflow/` rule if needed. Do not change shared `.gitignore`. If artifacts are already tracked, report that and ask before changing their tracking. Never force-add artifacts. The coordinator alone updates `plan.md` task checkboxes; workers must not edit change artifacts. Keep necessary resume notes concise and local in the same change directory, not in a new mandatory progress ledger.

Record any evidence captured during implementation, including benchmark results, under `devflow/<change-slug>/evidence/`, creating the directory when needed. Include the commands, relevant environment/setup, commit identity, and actual results needed to interpret or reproduce it. Workers return captured evidence to the coordinator, who saves it locally; workers must not edit change artifacts. Preserve existing evidence and keep it out of implementation commits.

The orchestrator alone creates and manages planned PR branches. For multiple PRs, create `feature/<feature-name>` at the agreed original base, then build this stack:

```text
original base
  feature/<feature-name>       integration target; do not advance during execution
    <feature-name>/pr-1   intended PR base: feature/<feature-name>
      <feature-name>/pr-2 intended PR base: <feature-name>/pr-1
        ...
```

Create each PR branch from the accepted previous PR tip. For one PR, create only its implementation branch from the agreed base. Choose descriptive names from the plan; never reset or repurpose a colliding existing branch without agreement. Record original base, branch names, parent relationships, and accepted tips locally so resume and later repairs have exact boundaries. Do not create remote PRs or merge PR branches into the feature branch.

Implementation invocation permits rebasing branches created for this execution, including on resume when ownership is established. It does not permit rewriting pre-existing user history. If branches have been published or ownership/publication status is uncertain, ask before rewriting; never infer force-push permission.

## Model Selection

Use the exact model and thinking level approved in `plan.md` for every delegation, passing them explicitly as `Agent`'s `model` and `thinking` arguments. Task-group workers and defect corrections, including earlier-group repairs, use the affected group's implementation selection. PR reviews and repeated reviews use that PR's review selection; final whole-change reviews use the whole-change review selection.

If an existing plan lacks selections, recommend and obtain user approval before dispatch, then record them in `plan.md`. Recommend `openai-codex/gpt-6.1-terra` with `medium` thinking for ordinary implementation and `openai-codex/gpt-6.1-sol` with `high` thinking for complex groups involving difficult reasoning, such as concurrency, security-sensitive behavior, or cross-cutting invariants; file count alone does not imply complexity. Recommend `openai-codex/gpt-6.1-sol` with `high` thinking for reviews, or `xhigh` for PRs containing complex groups and whole-change review when complex work is included. User-approved choices take precedence over recommendations.

If unexpected complexity warrants a different selection, explain the recommendation and obtain approval before updating the plan or switching. If a selected model or thinking level is unavailable, pause for an agreed alternative; never silently substitute.

## Task Group Implementation Loop

Process PRs in dependency order and task groups in their planned order. Delegate exactly one complete task group per worker, using `Agent`, `subagent_type: "general-purpose"`, in the target checkout. One worker writes at a time; wait for its return and acceptance before dispatching the next. Workers return uncommitted changes. The orchestrator alone performs Git operations: inspect, verify, stage specific owned files, create one coherent commit per group, and switch/create branches. Never combine groups into one commit. Do not use isolated worktrees that alter the agreed branch/commit structure.

Give each worker a self-contained brief containing:

- The change documents' relevant commitments, exact task group and task IDs/text, dependencies, non-goals, and acceptance criteria.
- Assigned checkout and branch, expected starting HEAD, bounded writable paths, protected work, and applicable project guidance.
- Explicit instruction to leave changes uncommitted and not perform Git operations, edit change artifacts, mutate remote state, or expand scope.
- Required checks, prerequisites, expected outcomes, and regression proof where practical. Stop on contradictory requirements, missing prerequisites, or consequential ambiguity.
- Required report: task IDs addressed, changed files, actual commands and passed/failed/skipped/blocked/not-run results, tests executed, captured evidence for the coordinator to save under `devflow/<change-slug>/evidence/`, deviations, and blockers. Corrections state defect, remedy, and verification.

After each worker returns, inspect its summary, changed files, diff, and working-tree state against the assignment and protected baseline. Verify reported checks; run applicable checks yourself. Reject unsupported completion claims, unexpected changes, or failed/missing required checks. Only after verifying the group's completion, create its commit and mark its satisfied tasks complete in local `plan.md`. Leave blocked or unverified tasks unchecked with a short reason. Never discard unexpected work to restore the expected state.

After all groups assigned to a PR are committed, obtain one independent general-purpose review of that PR using `devflow-review`. Provide its actual guidance, all four change documents, the PR heading/outcome and included task groups, exact parent/base and head commits, relevant check evidence, and explicit exclusions. Require behavioral, design/delivery, and implementation-quality assessment. Reviewer must not implement, perform Git operations, edit artifacts, or publish anything. Inspect findings rather than accepting the report uncritically. Apply correction policy, rerun affected checks, and repeat PR review until supported or blocked. Then continue to next PR and report completed/total tasks and concise correction summary at each handoff.

## Defect Remediation and Escalation

Automatically correct clear in-scope implementation defects and clearly stale/incorrect tests within the agreed behavior and design. Delegate each correction to a fresh bounded general-purpose worker assigned to the smallest affected complete task group; worker leaves changes uncommitted and orchestrator validates and commits. Never weaken a valid test or change requirements simply to pass validation.

Before each autonomous attempt, record a compact local defect identifier, underlying symptom/cause, cumulative attempt count, and next action. Allow at most two autonomous correction attempts per unresolved defect across worker runs, reviews, and resumed sessions. Renaming or rediscovery does not reset the count; include the remaining budget in worker briefs. Count an attempt before dispatch so interruption cannot erase it. Do not create an empty issue ledger or authorization log.

Show the user **defect → remedy → verification** for automatic corrections, including actual outcomes. A concise report is required even when no decision is needed. Optional improvements are not automatic work.

Pause affected execution and present evidence when requirements/design are ambiguous, a remedy changes scope, the failure is environmental/flaky, a worker is blocked, a rebase conflicts, or a defect remains after two attempts. Ask for a concrete disposition or further authorization; do not reset the budget or silently omit a required check. Agreed substantive document changes precede affected implementation. Preserve current work and branch/rebase state when blocked.

## Earlier-Increment Fixes and Stack Repair

If a PR review finds a defect belonging to an earlier task group, correct it in that group's history rather than appending unrelated repair to the last group. Require a safe working tree and record affected branch tips and parent boundaries before switching. Delegate the affected group correction; worker returns uncommitted changes and orchestrator validates and commits. Revalidate later groups and repeat review for every affected PR.

If the fix changes an earlier PR branch, rebase descendant PR branches in order, replaying only each descendant branch's own commits. Use recorded commit identities, not moving branch names for old boundaries. Check graph and each PR diff for missing or duplicated changes. Do not replay the entire stack onto each new parent. Stop on conflicts and seek user-directed resolution; do not autonomously choose resolutions or abort away work.

History changes invalidate downstream verification. Reopen affected completion state, rerun affected checks and PR reviews against rebuilt bases, then restore checkboxes only with current evidence. Repeat integrated verification and whole-change review after repair. Keep local stack record current; never rewrite unrelated branches.

## Final Verification and Completion

After all PRs are accepted, run the plan's integrated checks and obtain an independent whole-change review through `devflow-review`. Compare the original base with the final PR tip, covering cross-PR interactions and all intended implementation changes. PR-boundary reviews do not substitute for this gate. Apply the same correction budget and earlier-task-group repair process to final findings, then rerun affected verification and full review.

Mark final verification tasks complete only when required checks actually passed, independent integrated review occurred, and material findings have correction evidence or explicit user-approved dispositions. Failed, blocked, skipped, or not-run required checks prevent verified completion. Never describe local acceptance as remote review approval or merge readiness established by teammates.

Report completed scope and tasks, each branch and intended PR base, actual verification, PR and integrated review conclusions, automatic defect/remedy/verification summaries, and remaining limitations or blockers. Leave all branches local. Pushing, PR creation, and remote delivery are separate user-directed work.
