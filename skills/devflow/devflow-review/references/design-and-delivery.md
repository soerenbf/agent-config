# Design and Delivery Alignment

Review consequential technical decisions and the delivery commitments applicable to the selected scope. Use `design.md` for the agreed approach and constraints and `plan.md` for ordered task groups, their PR assignments, dependencies, merge conditions, and verification.

## Consequential Design Decisions

Compare the implementation with the design's responsible layers, interfaces, data flows, invariants, error handling, compatibility, migration, and rollback commitments where relevant.

Distinguish:

- **Harmless adjustment:** a different internal detail that preserves agreed behavior and consequential constraints. Do not manufacture a finding.
- **Problematic departure:** a change that breaks an agreed constraint or introduces a concrete risk. Explain the consequence and evidence.
- **Decision needing clarification:** a materially different approach whose acceptability cannot be established from current agreement. Explain the trade-off without treating difference alone as a defect.

A justified implementation improvement may warrant a design update later, but review does not authorize that update. If the design itself is unsafe or contradictory, identify the design issue rather than forcing code to follow it blindly.

## PR Review

Assess the selected PR's coherent outcome and included task groups, not the complete future feature:

- Are its declared dependencies actually present in the reviewed base or otherwise satisfied as the plan requires?
- Are its outcome and non-obvious merge conditions supported by the code and check evidence?
- Does it preserve required behavior through the intermediate state, including mixed versions, data formats, flags, migrations, and deployment order where relevant?
- Does it include supporting tests or rely on protection already present, rather than tests only promised in a later increment?
- Does it accidentally depend on work outside its parent chain or include unrelated later work with a meaningful review or integration cost?
- Are temporary paths and deferred cleanup consistent with the plan, without exposing an unsafe intermediate state?

A stacked PR need not stand alone without its declared parent. An intentional intermediate state need not implement the final feature, but must satisfy its current safety and compatibility commitments.

## Whole-Change Review

Inspect the integrated result across increments:

- Are all intended outcomes present and compatible with each other?
- Did temporary scaffolding, obsolete paths, or redundant tests survive beyond their intended lifetime?
- Do migration, rollout, and rollback assumptions still hold for the actual implementation?
- Were final integrated checks meaningfully executed, rather than inferred from successful isolated increment checks?
- Are outstanding tasks genuinely unfinished work, stale bookkeeping, or deferrals that need an explicit decision?

Earlier clean PR reviews do not prove integrated correctness or completion.

## Tasks and Commit Progression

Treat task-group tasks as observable delivery commitments, not proof. Verify relevant work and evidence regardless of checkbox state. Report a materially incomplete task when it undermines the increment's outcome or a required check; do not elevate stale bookkeeping into a code defect.

Each task group is intended to produce one coherent commit. Tasks within a group may share that commit, but commits should not combine separate groups. Assess this boundary only where it affects traceability or reviewability; do not flag message wording. Inspect actual history only as needed for a stated history/reviewability commitment or an ordering risk; a final tree alone cannot prove intermediate commits were safe.

## Verification and Gaps

Evaluate applicable local checks and, for whole-change review, final verification. Use the safe-verification rules in `review-v2`. Failed or unexecuted required checks prevent claiming verified completion, even if code inspection found no blockers. Distinguish an environmental blocker from a demonstrated implementation failure.

Ground each finding in the relevant design decision, PR heading, merge condition, or task, then show the concrete discrepancy and consequence. Keep recommended remediation proportional; discuss scope/design changes rather than silently planning them during review.
