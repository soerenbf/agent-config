---
name: devflow-plan
description: Collaboratively translate agreed change documents into an ordered implementation plan of commit-sized task groups composed into reviewable PRs. Use to plan delivery after technical design, without implementing or performing Git writes.
---

# Devflow Plan

Plan how to deliver an agreed change safely in reviewable increments. Design establishes what changes and why the approach works; this skill establishes the delivery sequence and concrete work. Planning is collaborative, not automatic task generation.

## Boundaries

- Invoking this skill authorizes planning collaboration, not implementation, branches, commits, or remote mutations. Read-only investigation is allowed.
- Write only the agreed `devflow/<change-id>/plan.md` in the target repository. Do not edit application code, tests, configuration, prerequisite documents, or unrelated work.
- No OpenSpec CLI, runtime, or companion skill is required. Do not create separate task files, approval logs, or fixed commit contracts.

## Establish Context

Use the user's identified change and read its current `proposal.md`, `requirements.md`, `design.md`, and any existing `plan.md` from disk. Reuse the conversation and inspect relevant project guidance, code, tests, and Git state. Investigate accessible facts rather than asking the user to supply them. Current implementation establishes the starting point; change documents establish intended behavior and approach. File existence alone does not establish agreement.

If prerequisites are missing, contradictory, or materially undecided, explain the gap and agree how to resolve it before planning dependent work. Do not silently invent requirements or redesign the change to make delivery easier. Existing v1 records are context, not documents to automatically convert or replace.

Use the existing change directory; do not invent a new destination or overwrite an unrelated plan. If the target is ambiguous, confirm it before writing. Preserve unrelated edits and ask when they conflict with the proposed plan.

Read [the plan template](assets/plan.md) fully before drafting. Its path is relative to this skill directory, not the target repository.

## Plan Together

1. **Synthesize the starting point.** Summarize the agreed outcome, implementation seams, verification strategy, and consequential delivery constraints. Distinguish evidence from assumptions and surface meaningful gaps without restarting settled design discussions.
2. **Order task groups and compose PRs.** Create concise, observable task groups in implementation order; each group is one coherent commit-sized delegation unit. Tasks within a group may be combined into that commit, but commits do not span groups. Assign one or more complete groups to each PR. Recommend the smallest useful PR structure, explaining dependencies, risky transitions, and merge safety. Default to one PR; multiple PRs must earn their coordination cost. Discuss consequential choices with the user rather than presenting a finished breakdown as settled.
3. **Specify verification.** Include supporting tests and relevant checks in the task groups they verify. Resolve material ordering and feasibility questions together.
4. **Confirm the substance.** Present a concise synthesis of the delivery structure, dependencies, checks, and remaining deferrable unknowns. Wait for explicit agreement before writing; the initial invocation alone does not approve newly proposed content. Revise and reconfirm when corrected.
5. **Write, check, and stop.** Write the agreed plan using the template, replacing drafting guidance and omitting irrelevant sections. Read it back and check consistency with the agreement and prerequisite documents. Report its path and remaining uncertainty. Do not begin implementation or perform Git writes.

## Delivery Judgment

Task groups, commits, and PRs have distinct roles:

- **Task groups** are the ordered implementation checklist and smallest worker assignment. Each group should form one coherent commit-sized change; its tasks are observable work, not a copy of the design. Number groups and tasks (for example, `1`, `1.1`, `1.2`), and keep this single checklist in the plan. Include callers, fixtures, exports, documentation, configuration, and tests only where affected.
- **Commits** are created by the orchestrator, one per completed task group. Workers return uncommitted changes. A commit may cover multiple tasks within its assigned group, but must not combine groups.
- **PRs** are coherent review and integration units containing one or more complete task groups. Name each PR outcome and state dependencies and non-obvious merge conditions. Each PR includes supporting tests or relies on tests already present, never only tests promised in a later PR. Consider compatibility, deployment, migration, and rollback where relevant to intermediate states.

Order work by dependencies and risk, not a blanket implementation-then-tests sequence. Carry the design's verification strategy into actionable checks: specify actual commands, essential prerequisites, and expected outcomes where practical. Prefer regression proof for bug fixes. Put checks alongside the work they verify; reserve final verification for integrated behavior and review against requirements. Never describe planned or blocked checks as passed.

Keep the output proportional. A small change needs one PR and one or a few meaningful task groups, not artificial phases or detailed commit choreography. Do not repeat requirements or architectural rationale already captured elsewhere; link to their IDs or sections when useful. Record only deferrable unknowns that cannot change the delivery structure or undermine its safety. Material uncertainty needs discussion before writing.

## Resume and Revise

On resume, read the current documents, implementation, and relevant check evidence before changing the plan. Preserve useful task IDs and accurate completion state; do not reset completed tasks or infer completion from intention. Explain stale assumptions and agree substantive revisions before writing. If a finding challenges requirements or design, surface its downstream consequences and ask to resolve that earlier decision rather than silently changing it here.

Saved plans do not prove implementation authorization. End with the agreed delivery plan, not an automatic handoff into execution.
