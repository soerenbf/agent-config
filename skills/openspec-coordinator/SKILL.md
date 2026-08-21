---
name: openspec-coordinator
description: Coordinate a ready OpenSpec change through sequential isolated workers, coordinator-owned task state, independent reviews, and bounded remediation. Use when asked to implement an OpenSpec change with delegated workers.
compatibility: Requires OpenSpec CLI, the openspec-subagent Pi extension, and the openspec-worker user agent profile installed from this package.
---

# OpenSpec Coordinator

Coordinate one named, apply-ready change. You own ordering, acceptance, task checkboxes, and final review; workers implement only their delegated group.

## Preflight

1. Require an explicit change name. If absent, run `openspec list --json`; ask the user to choose when more than one active change exists.
2. Run `openspec status --change "<name>" --json` and `openspec instructions apply --change "<name>" --json`.
3. Stop and report the OpenSpec blocker unless the apply instruction state is `ready`. Stop if workspace planning has no allowed edit roots.
4. Confirm `openspec_delegate` is available and `~/.pi/agent/agents/openspec-worker.md` exists. If either is absent, provide the installation command from this package's README and stop.
5. Read every `contextFiles` path returned by OpenSpec, then read the target project's applicable `AGENTS.md` and `CODING_STANDARDS.md` files.

Report the selected change, schema, pending-task count, and task grouping before editing.

## Sequential Delegation

Derive ordered, non-overlapping groups from incomplete task IDs. Keep explicitly dependent tasks in later groups and keep potentially overlapping files in separate groups. Delegate exactly one group at a time with `openspec_delegate` using `agent: "openspec-worker"` and the target checkout.

Each delegation prompt must include: task IDs and text, relevant OpenSpec context, local guidance, expected validation, the prohibition on editing `tasks.md`, and the required report format.

After each worker returns:

1. Reject the group if the tool failed, its report has blockers, task IDs differ from the assignment, changed files exceed the group scope, or validation is missing/failed.
2. For a failed validation, follow **Validation Failure Triage** before deciding whether to stop.
3. Inspect accepted worker changes and run applicable validation yourself.
4. Only after acceptance, change only the corresponding `- [ ]` entries in the selected change's tasks artifact to `- [x]`.
5. Continue to the next group. Never let a worker update OpenSpec task state.

## Validation Failure Triage

For a failed required check, inspect the failure, changed implementation, relevant test, task, and OpenSpec artifacts. Classify it as a clear implementation regression, a clear stale or incorrect test, environmental/flaky failure, or specification ambiguity.

For a clear implementation regression or stale/incorrect test, delegate one focused remediation group without waiting for user approval. Validate the remediation by rerunning the failed check and accept the original task only after it passes. Permit at most two remediation attempts for the same validation failure.

Stop and present the evidence for user direction when the failure is environmental or flaky, the artifact-defined behavior is ambiguous, the worker cannot complete remediation, or the failure remains after two attempts. Do not change OpenSpec scope to make a validation pass without the user's explicit decision.

## Final Review Gates

After all tasks are accepted, run both reviews separately:

1. Invoke `spec-review` against the implementation diff, governed by the selected change's proposal, design, specs, and tasks artifacts.
2. Invoke `review` against the same implementation diff.

Report their findings under separate headings. Notes and minor findings are not automatically changed.

## Review Findings and User-Directed Remediation

Present `spec-review` scope/alignment findings and `review` findings separately. The code-quality review must include an overview of correctness, security, maintainability, performance, and testing concerns. Do not delegate, edit files, alter OpenSpec task state, or change scope from review findings until the user explicitly decides for each material finding to fix the implementation, update/reconcile the OpenSpec scope, defer/accept it, or investigate further.

For selected implementation fixes, delegate one focused remediation group, validate and accept it using the normal process, then repeat both review gates. For a selected scope change, update the OpenSpec artifacts before making implementation changes, then rerun the applicable reviews. Permit at most two user-approved remediation rounds.

Stop and ask the user instead of guessing when:
- a worker reports a blocker or ambiguity;
- a review identifies contradictory or ambiguous requirements;
- material findings remain after the second approved remediation round; or
- the user has not selected a disposition for material findings.

## Completion

State completed tasks, changed files, validation, both review summaries, remaining minor findings, and whether the change is ready to archive.
