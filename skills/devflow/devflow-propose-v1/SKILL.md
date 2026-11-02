---
name: devflow-propose-v1
description: Capture an explicitly requested development proposal as a concise brief, plan, and task checklist. Use after exploration or diagnosis without authorizing implementation.
---

# Devflow Propose

## Boundary

Create change records only on explicit user request, never merely because discovery is ready. Proposal creation does not authorize implementation, branches or commits. No Git writes here. Never push or mutate remote PRs, comments, reviews, issues or branches; read-only research is allowed. Follow governing policy and protect unrelated work.

Invoking implementation approves the identified current plan's stated local Git operations and delegation for the current session. New sessions require fresh approval before implementation or Git writes, regardless of saved records. Material scope/design changes and specific history restructuring require renewed approval. Do not persist authorization logs, quoted permission exchanges or approval provenance.

## Capture understanding, not the conversation

Reuse discussion and inspect relevant code rather than restart discovery. Preserve consequential constraints, including negative requirements, ordering guarantees and numeric defaults, without recording every question or rejected option. Distinguish facts from assumptions and expose unresolved decisions. For bugs, retain the original symptom, reproduction, known cause or uncertainty, and a meaningful regression check. Acceptance criteria must be falsifiable.

Use descriptive stable kebab-case IDs under the single repository-local root `devflow/<change-id>/`. Check for existing destinations before writing; on collision ask whether to resume or choose another ID, never overwrite or silently suffix. Scan summaries of existing briefs, read relevant histories, check claims against current code, and link related changes with a reason (`extends`, `revises`, `supersedes`). Completed records remain historical; later behavior changes get a new record.

## Write three short documents

Use the bundled templates:

- [Brief](templates/brief.md): short discovery summary, problem and desired behavior, meaningful non-goals, acceptance criteria and related changes.
- [Plan](templates/plan.md): technical approach, consequential decisions, verification strategy and proposed Git/delivery structure. No task grouping or completion state.
- [Progress](templates/progress.md): grouped task checkboxes, dependencies, current blocker/next action and concise results beside tasks. This is the only task list.

Keep each fact in one place. Omit irrelevant/empty sections; a simple plan can be a few paragraphs. Do not copy skill rules, review rubrics, permission disclaimers or the discussion transcript into records. Put detailed logs/review reports in linked files only when useful, within the same change directory; do not pre-create an audit dossier.

Populate progress with short, granular unchecked tasks and stable IDs such as `G1.1`. Each task has an observable completion criterion or references a plan check; do not append a miniature contract to every checkbox. Include each group's tests/review and final verification/integrated review. Keep dependencies at group headings, not duplicated in the plan. Default to sequential groups and one branch/PR; task groups, commits and PR increments are distinct boundaries. Each increment carries supporting tests or explicitly depends on tests in an earlier increment, never a later one.

Choose unit/integration/E2E seams by risk. State actual commands, essential prerequisites and expected outcomes in the plan. Prefer red/green regression proof where practical; skipped, blocked or not-run required checks are not verification. Put proposed local branches/commits and delegation in the plan, with special protections or stop conditions only when specific to the change.

## Resume and handoff

Read the records and reconcile actual files, Git state and relevant check evidence. Preserve task IDs and useful results; correct stale completion without appending a chronological reconciliation log. Fresh approval in a new session is mandatory before implementation or Git writes; records are context, never proof of permission. Unclear scope or contradictory evidence requires discussion, not inference.

Summarize the documents and unresolved decisions, then wait for explicit implementation invocation. Milestones remain workflow gates, not mandatory record tables: plan approved on invocation; implementation verified after required checks, independent integrated review and material finding dispositions; delivery prepared after approval of final structure/materials. Group reviews alone never replace final review.

Name separately installed companions when needed: `devflow-explore-v1`, `devflow-diagnose-v1`, `devflow-implement-v1`, `devflow-review-v1`, `devflow-deliver-v1`. Missing companions/tools require reporting and an agreed alternative, not sibling-file access or silent substitution. No OpenSpec runtime is required.
