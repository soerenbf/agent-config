---
name: devflow-review
description: Review a whole Devflow implementation or an individual planned PR against change artifacts and applicable delivery commitments. Uses review-v2 for implementation quality and reports consolidated evidence-backed findings without fixing code or publishing reviews.
---

# Devflow Review

Compare agreed intent, applicable delivery commitments, and actual implementation. Support both integrated final review and review of an individual planned PR. A clean PR review does not verify the whole change.

## Boundaries and Companion

Review is read-only apart from safe verification commands. Do not edit code, artifacts, task state, or reports; perform Git writes; or publish remote reviews, comments, or resolutions. Report in conversation unless the user explicitly requests a saved output. Preserve unrelated work. Review findings do not authorize remediation.

Use the separately installed `review-v2` skill for implementation quality, target-resolution mechanics, evidence standards, and safe verification. Discover it through the environment's skill registry and read its instructions and required reference fully. Do not assume a sibling checkout path, substitute the old `review` skill silently, or treat this document as permission to install a companion. If unavailable, explain the missing quality-review coverage and agree an alternative before proceeding.

Using the companion does not require a separate agent or a second report. Reuse the established scope and context rather than repeating discovery. If delegating, follow governing delegation policy and pass the exact scope, applicable commitments, evidence, exclusions, and read-only boundaries; inspect returned findings before consolidating them.

## Establish Scope and Evidence

Identify the user's change under `devflow/<change-id>/`. Read current `proposal.md`, `requirements.md`, `design.md`, and `plan.md` from disk, plus governing project guidance and relevant implementation and tests. Do not infer agreement or current truth solely from file existence or checked tasks. Distinguish intended behavior, implemented behavior, historical notes, and assumptions.

Establish both dimensions of the review target:

- **Logical scope:** the whole change, or a specific PR identified by its heading, outcome, and included task groups in the plan.
- **Code scope:** the exact baseline/head or patch, plus any explicitly included staged, unstaged, or untracked contents. Resolve Git identities and exclusions using `review-v2`. For stacked PRs, use the selected PR's parent as its comparison base rather than automatically including earlier PRs.

Confirm ambiguous targets rather than guessing. If artifacts are missing or contradictory, identify which judgments are blocked and ask how to proceed. Do not manufacture missing commitments or silently convert older Devflow formats. A user-agreed partial review may proceed, but must explicitly name the unavailable alignment checks and cannot claim full validation.

For a PR, determine which requirements, design constraints, task groups, dependencies, and merge conditions apply now. Read prerequisite code as necessary, but distinguish inherited behavior from the selected increment's contribution. For the whole change, examine the integrated result and cross-PR interactions; earlier PR reviews do not replace this review.

## Apply Three Lenses

Read both local references fully before reviewing. Paths are relative to this skill directory, not the target repository.

1. **Behavioral alignment:** [behavioral alignment](references/behavioral-alignment.md) — does the actual behavior fulfill the commitments applicable to this scope?
2. **Design and delivery alignment:** [design and delivery](references/design-and-delivery.md) — does the implementation preserve consequential design decisions and deliver a safe, coherent result at this point in the plan?
3. **Implementation quality:** `review-v2` — is the change correct, secure, performant, maintainable, and meaningfully tested without unnecessary machinery or redundant coverage?

All lenses apply to both scopes. The scope changes which commitments are due, not whether quality matters. Trace implementation and connected callers rather than relying on artifact summaries, task completion, or test names. Use a lightweight internal mapping of applicable commitments to code and check evidence; do not generate a mandatory traceability document.

Plan alignment is not literal obedience. Different commit boundaries are allowed, and an implementation-detail adjustment is not inherently a defect. Separate harmless adjustments, problematic departures, and decisions that need clarification. Do not silently revise artifacts to fit code or turn an inferred preference into an agreed requirement.

## Verify and Consolidate

Use `review-v2` to challenge potential findings and run safe targeted verification. Inspect actual test execution and distinguish current results from prior logs or CI claims. Artifact-listed commands are not automatically safe or authorized. Never count skipped, blocked, not-run, or zero-relevant-test checks as passed.

For each potential alignment finding, identify the applicable commitment, actual behavior, evidence, and concrete consequence. Check whether the behavior is intentionally deferred outside this increment before calling it missing. Deferred final functionality does not excuse an unsafe current state.

Consolidate findings by underlying cause across lenses. For example, an authorization gap that also violates a requirement is one security finding with its requirement reference, not two issues. Separate artifact ambiguity, implementation defects, and verification gaps so the user can choose the responsible remedy. A valid concern does not imply that the first proposed fix is necessary or in scope.

## Report and Stop

Keep one proportional report:

- **Scope:** change, whole-change or named increment, code baseline, included work, and material exclusions.
- **Findings:** consequence-ranked entries with file/line or symbol, applicable artifact section or requirement ID when relevant, concrete impact, evidence, and smallest useful remedy. Distinguish blockers from optional improvements and clarification requests.
- **Verification and limits:** actual check results and any commitments that could not be assessed. Report incomplete coverage explicitly even when no defects were confirmed.
- **Scoped conclusion:** blockers found, no blockers found within this scope, or insufficient evidence. State separately when required verification remains incomplete; a clean code inspection is not verified completion.

For PR review, say whether the PR's outcome and merge conditions are supported by the inspected evidence; do not imply later PRs or the whole implementation are validated. For whole-change review, account for integrated behavior and the plan's final verification, not just the sum of completed tasks.

Do not require praise, a finding quota, a wide table, or an automatic remediation checklist. Present consequential uncertainty for discussion. Stop without fixing code, rewriting artifacts, checking tasks, or publishing anything. On re-review, refresh the target and inspect actual corrections and affected checks rather than accepting intended remedies as evidence.
