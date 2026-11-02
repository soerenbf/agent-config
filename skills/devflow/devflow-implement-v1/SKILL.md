---
name: devflow-implement-v1
description: Execute an explicitly approved development plan through bounded delegation, inspected changes, meaningful checks, and independent review. Use to implement or resume an identified Devflow plan.
---

# Devflow Implement

## Authorization and preflight

Explicit user invocation of implementation for an identified plan approves that plan's stated local Git operations and delegation, subject to governing policy. Proposal creation, readiness, and agent-written approval text grant no execution permission. A skill cannot authorize itself. Ask before execution when plan identity, actual user authorization, or scope is missing or ambiguous.

Read local guidance and `devflow/<change-id>/{brief,plan,progress}.md`. A new session requires fresh user approval before implementation or Git writes, even if records say work was approved before. Explicit invocation for the identified current plan provides that approval. Do not persist authorization logs, quoted permission exchanges or approval provenance. The plan describes proposed operations; the current conversation grants permission.

Before starting or resuming, reconcile persisted task/check/review state with actual files, branch/HEAD, committed, staged, unstaged, and relevant untracked work. Inspect read-only Git status and diffs, not just saved checkboxes. Identify and explicitly exclude/protect unrelated user work and pre-existing history; never discard, overwrite, stage, or incorporate it. If overlapping ownership is unclear, stop and ask. Keep only current discrepancies/blockers and next actions in progress; stale evidence is not proof for changed code. Do not append a chronological preflight or reconciliation log.

Confirm dependencies, required delegation/review tools, companions, fixtures, environment, and access actually exist. Missing required tools are a blocker: request an approved alternative rather than silently switching to solo execution or self-review. No new agent profile, dependency, or orchestration framework is required by this skill.

Never push or mutate remote state, including PRs, comments, reviews, issues, merges, or remote branches. Read-only research is allowed. Local branches/commits require the approved scope; history rewriting or delivery restructuring requires separate approval of the specific transformation. These instructions are not a security sandbox.

## Sequential bounded worker groups

The coordinator alone owns `progress.md` and task completion. Keep groups, dependencies and stable-ID checkboxes only there; the plan owns approach, verification and proposed Git structure. If an active record lacks a checklist, derive it from existing scope without inferring completion; ask about ambiguous tasks. Preserve existing IDs and evidence on resume. Select one dependency-ready approved group at a time; sequential groups are the default. Give the available worker tool a self-contained brief containing:

- Exact plan identity, group/task and acceptance IDs, dependencies and their evidence.
- Bounded writable paths, exclusions/protected work, non-goals, relevant code/test/context pointers, decisions and exact constraints. Include applicable local guidance and enough context to work without sibling resources.
- Required checks, prerequisites, expected execution evidence, and risk-based regression expectations.
- Authorized local Git/delegation limits; no remote mutations; no progress/task-state edits; no scope expansion. Stop on ambiguity, contradictory design evidence, or missing prerequisites.
- Current issue IDs/aliases, attempt counts and remaining budget; no untracked retries or independent budget resets.
- Required report: completed task IDs, changed files, actual commands and passed/failed/skipped/blocked/not-run results, tests executed, correction problem/remedy/check evidence, deviations and blockers.

After each return, inspect actual files and diffs against the assignment and protected baseline. Reconcile the report with actual output; a success report cannot establish completion. Rerun required checks and inspect execution evidence. Obtain independent task-group review for requirement alignment and code quality before marking the group complete. Attach concise results, commit IDs or useful evidence links to relevant tasks, plus a current blocker/next action when needed. Only then check tasks whose criteria are met; leave failed, blocked or unverified tasks unchecked with a short reason. Do not repeat workflow instructions, plan checks or empty evidence tables in progress. Reopen a checked item when current evidence invalidates completion, preserving the earlier evidence and reason. Show completed/total tasks and current blockers in group handoffs so progress is visible. Do not advance dependent work on unsupported completion claims.

## Corrections and changed assumptions

Autonomously correct clear in-scope defects within the approved design and budget; do not gate every routine fix on discussion. Report each correction as **problem, remedy, verification**, including actual result, in progress and the user-facing summary.

For an actual unresolved issue, keep a compact note beside its task or under an optional blockers section: stable issue ID/aliases, cumulative autonomous attempt count, latest result and next action. Link detailed evidence only if useful; do not create an empty ledger or approval history. Compare underlying symptom, cause, and affected behavior with existing entries before assigning a new ID. At most two autonomous remediation attempts are allowed for the same unresolved failure or finding across rounds and sessions, coordinator and workers combined. Persist/increment the count before each attempt so interruption cannot erase it. Renaming, rediscovery, a new reviewer, or a new session cannot reset the budget. At exhaustion, stop remediation and ask for user intervention and approval before any further attempt; preserve the count. Fresh session approval alone does not reset the budget or approve more attempts on an exhausted issue.

Material or ambiguous scope/design changes, contradictory evidence, disputed remedies, and unresolved blockers pause affected work. Present current evidence and the smallest proposed revision collaboratively; update the plan only with agreed decisions and obtain renewed approval of its exact identity before affected execution. Do not maintain an authorization history. Continue other work only if genuinely independent and authorized in the current session.

## Meaningful checks and independent review

Use the plan's falsifiable acceptance criteria, baseline behavior and original bug symptom. Choose unit, integration or E2E seams by risk and system boundaries, not a mandatory layer checklist. Prefer red/green regression proof where practical: show the relevant test fails for the original reason before the fix and passes after it; explain when this is unsafe or impractical. Do not invent a red result.

For required checks, attach a concise actual result and useful evidence link to the relevant task, distinguishing **passed / failed / skipped / blocked / not run**. Inspect prerequisites and confirm tests actually executed; do not reproduce the plan's commands or an execution transcript in progress. Inspect output for skipped tests, zero execution and absent fixtures even if the command exits zero. Missing fixtures/environment/access cannot count as success. Rerun affected checks and review affected surfaces after fixes, plus broad final checks required by the plan. Required checks cannot silently become optional.

For every independent review, provide the brief/approved plan, acceptance criteria, constraints, actual check evidence, explicit review baseline and intended change surface. Include relevant **committed, staged, unstaged, and untracked** work and explicit unrelated-work exclusions. Inspect baseline-to-HEAD, index and working-tree diffs and relevant untracked file contents; baseline-to-HEAD alone misses uncommitted work. Use a reviewer independent of the implementation author; do not substitute the worker's self-assessment or coordinator confidence. Include the separately installed `devflow-review-v1` maintainability rubric and finding-category contract in every group and final reviewer brief; load its instructions and pass the actual guidance, not a sibling resource path. Findings must name a primary category and, for smells, a maintainability subtype, with concrete consequences and the smallest useful remedy.

After all groups complete, obtain an **independent integrated final feature review** of requirement alignment and code quality across the whole intended surface. Passing individual task-group reviews never substitutes for this final review. Attach a concise final-review conclusion and any useful report link to its checklist task. Keep only actual unresolved findings/decisions in an optional section, not an empty review schema.

Clear in-scope defects may be corrected within the same persistent budget, followed by affected checks/review. For disputed or material remaining findings, invoke separately installed `devflow-review-v1` for collaborative triage: inventory current-code evidence, distinguish governing-rule violations from heuristic concerns, separate concern validity from remedy/scope, recommend a disposition, and wait for user decisions. Record change, decline, clarify, follow-up, already addressed, or informational dispositions with rationale and source as applicable. Never automatically implement an out-of-scope recommendation or publish review responses.

## Milestone and handoff

Do not mark `implementation verified` until all groups are actually complete, agreed required checks have executed and passed, independent integrated final review has occurred, and material findings have correction evidence or user-approved dispositions. Failed, skipped, blocked or not-run required checks prevent this milestone. Record remaining limitations honestly, not as success.

Summarize completed scope, actual checks, correction reports, review/disposition evidence, blockers and next actions. Keep evidence and local drafts under the same change directory. Hand off to separately installed `devflow-deliver-v1` for local delivery preparation; implementation verification does not establish `delivery prepared`, which additionally requires user approval of final local structure and PR materials. Publication remains user-owned.

Name `devflow-propose-v1` for collaborative material replanning and `devflow-review-v1` for independent assessment/triage. If a required companion is unavailable, report it and seek an approved alternative; never assume sibling resource paths or silently replace it. No OpenSpec runtime is used.
