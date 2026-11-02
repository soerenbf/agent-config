# Requirements Collaboration

## Purpose

Translate the agreed proposal into observable behavioral requirements and concrete acceptance scenarios. These are scoped to this change, not durable capability specs or a complete description of the system.

## Form the Understanding

- Read the current proposal and inspect relevant implementation and tests. Identify the intended differences and the surrounding behavior that must remain unchanged.
- Discuss inputs, outputs, relevant state changes, failures, and compatibility. Explore security, privacy, cancellation, ordering, and boundary cases when they materially affect this change, not as a mandatory checklist.
- Separate behavior from implementation. Function names, class boundaries, dependencies, and algorithms normally belong in design; include a technical constraint here only when it is itself an agreed externally imposed requirement.
- Give each requirement one coherent, testable commitment using clear normative language such as "must." Add concrete Given/When/Then scenarios that make success or failure observable. Include at least one scenario per requirement, and meaningful failure or boundary scenarios where relevant.
- For bugs, state the corrected behavior and a scenario reproducing the original symptom. Distinguish observed evidence from unverified reports; do not claim the regression has been executed.
- For structural changes without new external behavior, capture relevant preservation criteria instead of inventing new behavior to populate the document.

Use stable IDs `REQ-001`, `REQ-002`, etc. Scenarios use IDs tied to their requirement, such as `REQ-001-S1`. Preserve existing IDs on revision, never renumber for presentation, and do not reuse a removed ID for unrelated behavior. These IDs support later references from design, tasks, and tests; those artifacts need not exist now.

If a scenario exposes a changed goal or scope, resolve the proposal conflict explicitly before continuing. Do not silently broaden the feature or invent product policy.

## Ready to Confirm

The proposed requirements cover the agreed scope, each commitment has an observable acceptance scenario, and no unanswered question changes the required behavior. Safe deferred details must not hide undecided error behavior or user-facing policy.

## Write and Check

Use the requirements template linked from `SKILL.md`. Add requirement blocks as needed. Do not organize them into capabilities or ADDED/MODIFIED/REMOVED deltas. Reference the proposal rather than duplicating its rationale.

Check requirements against the proposal, scenarios against their requirements, and IDs for uniqueness. Preserve exact numeric limits, defaults, exclusions, and guarantees the user agreed. Follow the shared confirmation, write, and pause rhythm in `SKILL.md`.
