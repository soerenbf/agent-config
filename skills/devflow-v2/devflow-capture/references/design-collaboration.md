# Design Collaboration

## Purpose

Agree an implementation approach grounded in the current code and the captured behavioral requirements. Explain consequential choices and their rationale, not a line-by-line implementation plan.

## Form the Understanding

- Re-read the proposal and requirements. Inspect the relevant code, callers, tests, and project conventions before suggesting architectural changes.
- Map the existing flow and the seams the change must reach. Use a small diagram where it makes ownership, state, or dependencies clearer.
- Compare the smallest plausible approaches. Prefer existing patterns and platform features when they meet the requirements; do not introduce abstraction or dependencies without a concrete need.
- Discuss consequential choices, alternatives, trade-offs, failure handling, and compatibility. Consider data safety, security, performance, migration, and rollback where relevant. Make irreversible effects explicit rather than claiming all changes can be rolled back.
- Connect the approach to requirement IDs. Discuss how meaningful behaviors and regression scenarios can be verified at appropriate test seams. Verification strategy is part of design, but do not claim checks have passed or prescribe a commit sequence.
- Identify facts needing investigation and decisions needing user judgment. Do not select an architecture silently or turn the session into an exhaustive adversarial review.

If the requirements cannot be met, explain the conflict and revisit them with the user. Do not adjust them to match a convenient implementation. Requirements specify the outcome; code establishes the current implementation, not whether its bugs are acceptable.

## Ready to Confirm

The approach can be explained concretely against the existing system, covers the requirement IDs, and has a meaningful verification strategy. Consequential architectural choices are settled. Any remaining question is genuinely deferrable without changing agreed behavior or the selected approach.

## Write and Check

Use the design template linked from `SKILL.md`. Include current implementation context with useful paths, the approach, consequential decisions with alternatives and rationale, risks, and verification. Include migration/rollback only when relevant; omit empty sections. Reference proposal scope and requirement IDs rather than restating their contents.

Check that no requirement is silently dropped, no unrelated work is added, and the proposed verification can distinguish success from failure. Do not add PR increments, commit checkpoints, tasks, or implementation permission claims. Follow the shared confirmation, write, and pause rhythm in `SKILL.md`.
