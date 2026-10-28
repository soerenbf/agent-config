---
name: devflow-implement
description: Execute an explicitly approved development plan through bounded delegation, inspected changes, meaningful checks, and independent review. Use to implement or resume an identified Devflow plan.
---

# Devflow Implement

## Authorization and preflight

Explicit user invocation of implementation for an identified plan approves that plan's stated local Git operations and delegation, subject to governing policy. Proposal creation, readiness, and agent-written approval text grant no execution permission. A skill cannot authorize itself. Ask before execution when plan identity, actual user authorization, or scope is missing or ambiguous.

Read local guidance and `devflow/<change-id>/{brief,plan,progress}.md`. Establish the exact approved plan revision/baseline and real user's invocation (wording, source/session/message reference, date if known). Record these in progress Authorization history with Git/delegation boundaries; preserve superseded approvals. Set `plan approved` only with this evidence.

Before starting or resuming, reconcile persisted task/check/review state with actual files, branch/HEAD, committed, staged, unstaged, and relevant untracked work. Inspect read-only Git status and diffs, not just saved checkboxes. Identify and explicitly exclude/protect unrelated user work and pre-existing history; never discard, overwrite, stage, or incorporate it. If overlapping ownership is unclear, stop and ask. Record discrepancies and next actions in Reconciliation and task state; stale evidence is not proof for changed code.

Confirm dependencies, required delegation/review tools, companions, fixtures, environment, and access actually exist. Missing required tools are a blocker: request an approved alternative rather than silently switching to solo execution or self-review. No new agent profile, dependency, or orchestration framework is required by this skill.

Never push or mutate remote state, including PRs, comments, reviews, issues, merges, or remote branches. Read-only research is allowed. Local branches/commits require the approved scope; history rewriting or delivery restructuring requires separate approval of the specific transformation. These instructions are not a security sandbox.

## Sequential bounded worker groups

The coordinator alone owns `progress.md` and task/milestone state. Select one dependency-ready approved group at a time; sequential groups are the default. Give the available worker tool a self-contained brief containing:

- Exact plan identity, group/task and acceptance IDs, dependencies and their evidence.
- Bounded writable paths, exclusions/protected work, non-goals, relevant code/test/context pointers, decisions and exact constraints. Include applicable local guidance and enough context to work without sibling resources.
- Required checks, prerequisites, expected execution evidence, and risk-based regression expectations.
- Authorized local Git/delegation limits; no remote mutations; no progress/task-state edits; no scope expansion. Stop on ambiguity, contradictory design evidence, or missing prerequisites.
- Current issue IDs/aliases, attempt counts and remaining budget; no untracked retries or independent budget resets.
- Required report: completed task IDs, changed files, actual commands and passed/failed/skipped/blocked/not-run results, tests executed, correction problem/remedy/check evidence, deviations and blockers.

After each return, inspect actual files and diffs against the assignment and protected baseline. Reconcile the report with actual output; a success report cannot establish completion. Rerun required checks and inspect execution evidence. Obtain independent task-group review for requirement alignment and code quality before marking the group complete. Record inspected output, evidence, findings, blockers and next action. Do not advance dependent work on unsupported completion claims.

## Corrections and changed assumptions

Autonomously correct clear in-scope defects within the approved design and budget; do not gate every routine fix on discussion. Report each correction as **problem, remedy, verification**, including actual result, in progress and the user-facing summary.

Use the Persistent unresolved-issue ledger: stable issue ID and aliases, failure/finding evidence, cumulative attempt count, each attempt's problem/remedy/verification, remaining blocker and user intervention/approval. Compare underlying symptom, cause, and affected behavior with existing entries before assigning a new ID. At most two autonomous remediation attempts are allowed for the same unresolved failure or finding across rounds and sessions, coordinator and workers combined. Persist/increment the count before each attempt so interruption cannot erase it. Renaming, rediscovery, a new reviewer, or a new session cannot reset the budget. At exhaustion, stop remediation, report evidence and ask for user intervention and approval before any further attempt; preserve the count and record that approval explicitly.

Material or ambiguous scope/design changes, contradictory evidence, disputed remedies, and unresolved blockers pause affected work. Present current evidence and the smallest proposed revision collaboratively; update the plan only with agreed decisions and obtain renewed approval of its exact identity before affected execution. Preserve prior authorization history. Continue other work only if genuinely independent and already authorized.

## Meaningful checks and independent review

Use the plan's falsifiable acceptance criteria, baseline behavior and original bug symptom. Choose unit, integration or E2E seams by risk and system boundaries, not a mandatory layer checklist. Prefer red/green regression proof where practical: show the relevant test fails for the original reason before the fix and passes after it; explain when this is unsafe or impractical. Do not invent a red result.

For every required check record prerequisites present, actual command/procedure and date, status **passed / failed / skipped / blocked / not run**, tests actually executed, and evidence path/result in Verification evidence. Inspect output for skipped tests, zero execution and absent fixtures even if the command exits zero. Missing fixtures/environment/access cannot count as success. Rerun affected checks and review affected surfaces after fixes, plus broad final checks required by the plan. Required checks cannot silently become optional.

For every independent review, provide the brief/approved plan, acceptance criteria, constraints, actual check evidence, explicit review baseline and intended change surface. Include relevant **committed, staged, unstaged, and untracked** work and explicit unrelated-work exclusions. Inspect baseline-to-HEAD, index and working-tree diffs and relevant untracked file contents; baseline-to-HEAD alone misses uncommitted work. Use a reviewer independent of the implementation author; do not substitute the worker's self-assessment or coordinator confidence. Include the separately installed `devflow-review` maintainability rubric and finding-category contract in every group and final reviewer brief; load its instructions and pass the actual guidance, not a sibling resource path. Findings must name a primary category and, for smells, a maintainability subtype, with concrete consequences and the smallest useful remedy.

After all groups complete, obtain an **independent integrated final feature review** of requirement alignment and code quality across the whole intended surface. Passing individual task-group reviews never substitutes for this final review. Persist reviewer, date, baseline/surface, evidence and conclusions in Review evidence and dispositions.

Clear in-scope defects may be corrected within the same persistent budget, followed by affected checks/review. For disputed or material remaining findings, invoke separately installed `devflow-review` for collaborative triage: inventory current-code evidence, distinguish governing-rule violations from heuristic concerns, separate concern validity from remedy/scope, recommend a disposition, and wait for user decisions. Record change, decline, clarify, follow-up, already addressed, or informational dispositions with rationale and source as applicable. Never automatically implement an out-of-scope recommendation or publish review responses.

## Milestone and handoff

Do not mark `implementation verified` until all groups are actually complete, agreed required checks have executed and passed, independent integrated final review has occurred, and material findings have correction evidence or user-approved dispositions. Failed, skipped, blocked or not-run required checks prevent this milestone. Record remaining limitations honestly, not as success.

Summarize completed scope, actual checks, correction reports, review/disposition evidence, blockers and next actions. Keep evidence and local drafts under the same change directory. Hand off to separately installed `devflow-deliver` for local delivery preparation; implementation verification does not establish `delivery prepared`, which additionally requires user approval of final local structure and PR materials. Publication remains user-owned.

Name `devflow-propose` for collaborative material replanning and `devflow-review` for independent assessment/triage. If a required companion is unavailable, report it and seek an approved alternative; never assume sibling resource paths or silently replace it. No OpenSpec runtime is used.
