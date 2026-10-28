---
name: devflow-propose
description: Capture an explicitly requested development proposal as durable brief, plan, and progress records. Use after exploration or diagnosis to preserve decisions without authorizing implementation.
---

# Devflow Propose

## Permission boundary

Only explicit user invocation of proposal creation permits creating records. Readiness, a suggested handoff, or an agent-authored approval claim is not invocation. Creating or updating a proposal NEVER authorizes implementation, delegation, branches, or commits. Do not implement or perform Git writes here. Never push or mutate remote state, including PRs, comments, reviews, issues, or remote branches; read-only research is allowed. Protect unrelated work and obey higher-priority policy.

Explicit user invocation of implementation for an identified plan approves that plan's stated local Git operations and delegation only, subject to governing policy. Missing or ambiguous plan identity or scope requires clarification. A skill cannot grant itself permission.

## Capture existing understanding

Reuse the discussion and inspect relevant code, tests, and local guidance rather than restarting discovery. Preserve exact user decisions, including negative requirements, ordering guarantees, numeric defaults, and rejected alternatives. Cross-check the draft against the conversation; distinguish decisions, evidence, assumptions, and unresolved questions. Ask only necessary clarifications. Unresolved decisions block affected implementation; independent work is eligible only if already approved and genuinely independent.

For bugs, retain observed versus expected behavior, minimal reproduction, ranked evidence and uncertainty, and verification against the original symptom. For features, describe observable before/after behavior. Give acceptance criteria falsifiable inputs, expected outcomes, and a check that could fail. Do not turn preferences into invented requirements.

## Select history and identity safely

Use one repository-local root, `devflow/<change-id>/`, with a descriptive kebab-case stable ID. Scan the short discovery summaries at the beginning of existing briefs, then load relevant full records only. Verify historical claims against current code. Record `extends`, `revises`, or `supersedes` links with reasons; history is not a permanent current-behavior specification or a central index.

Check whether the chosen ID or any destination exists before writing. On collision, stop and ask whether to resume that record or choose a new ID; never overwrite, silently merge, or auto-number it. Keep the ID stable after creation. Completed records stay in place: only factual corrections belong there; later behavior changes get a new linked record.

## Write three records

Use these authoritative, individually installed resources:

- [Brief template](templates/brief.md)
- [Plan template](templates/plan.md)
- [Progress template](templates/progress.md)

Fill them with supported facts; use explicit unknown or not-applicable entries instead of fabricated evidence. Keep delivery drafts and supporting evidence within this same change directory, not another registry or root. No CLI, framework, central index, or OpenSpec runtime is required.

Plan bounded worker groups with dependencies, relevant context/paths, decisions, scope, checks, and reporting expectations. The coordinator owns progress and verifies actual output, not worker claims. Default to sequential groups and one branch/PR. Worker groups, commits, and PR increments are distinct boundaries; explain any split by reviewability or delivery benefit. Each increment includes supporting tests or explicitly depends on tests in an earlier increment, never later tests.

Choose unit, integration, or E2E checks by risk, not mechanically all layers. Record fixtures, environment/access prerequisites, baseline behavior, and evidence of actual test execution. Prefer red/green regression proof where practical. Required skipped, blocked, or not-run checks cannot establish verification. Specify local Git operations, delegation/tool availability, protected work, and stop conditions. Missing required tools require a blocker and approved alternative, not a silent strategy switch. History rewriting or delivery restructuring requires separate approval of the specific transformation.

## Resume and provenance

On requested resume, read all three records and reconcile them with actual files, read-only Git state (including staged, unstaged, committed, and relevant untracked changes), and verification evidence. Identify and exclude unrelated user work. Persist discrepancies and next actions; do not trust stale completion or approval checkboxes. Authorization must identify the real user's implementation invocation, its source and wording, the approved plan revision/baseline, and local Git/delegation scope. If unavailable or ambiguous, ask again before execution. Never manufacture authorization from an agent statement.

Material scope/design changes or contradictory evidence pause affected work for revision and renewed approval. Preserve previous authorization history rather than treating it as approval of a changed plan. Track each unresolved failure/finding under a stable issue identity: at most two autonomous remediation attempts across rounds and sessions. Renaming or rediscovery cannot reset the count; exhaustion requires user intervention and approval before further attempts.

## Finish with a handoff, not execution

Summarize paths, exact decisions, unresolved blockers, proposed checks, and scope awaiting approval. Leave all three milestones unearned on new proposals. `plan approved` requires actual implementation invocation for the identified plan; `implementation verified` requires required checks actually passing plus independent integrated final feature review after all groups, with material findings resolved or user-dispositioned; `delivery prepared` additionally requires user approval of final local structure and materials. Group reviews alone never replace final review.

Name separately installed companions: `devflow-explore` for design decisions, `devflow-diagnose` for uncertain causes, `devflow-implement` for explicit approved execution, `devflow-review` for independent assessment, and `devflow-deliver` for local delivery preparation. If a requested companion is unavailable, report it and ask how to proceed; do not assume sibling resource paths or silently substitute execution. Publication remains the user's responsibility.
