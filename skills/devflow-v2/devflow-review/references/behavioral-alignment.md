# Behavioral Alignment

Review what the software does against the agreed change's purpose and behavioral commitments. Use `proposal.md` for intent and scope and `requirements.md` for requirements and scenarios. Design and plan explain how and when those commitments should be realized; they do not silently override them.

## Determine What Applies Now

For whole-change review, assess all in-scope requirements, negative requirements, and consequential proposal constraints. Include integration between increments and previously preserved behavior affected by the change.

For a PR increment, identify the behavior that increment promises and any existing behavior it must preserve. Some final requirements may intentionally remain unimplemented until later increments. Their absence is not a defect in the current increment unless the current outcome or merge conditions require them.

If the mapping is unclear, investigate the plan and code, then ask about consequential ambiguity. Do not invent a finer-grained delivery contract or assume every requirement is due in every PR.

## Compare Commitments with Behavior

Trace relevant entry points, callers, state transitions, and tests. Investigate:

- Missing or partial outcomes, including error, boundary, and alternate scenarios.
- Code that appears to implement a requirement but produces a different observable result.
- Violations of negative requirements, compatibility promises, ordering guarantees, numeric limits, and other exact constraints.
- Behavior that contradicts the proposal's intended outcome despite satisfying a narrow scenario.
- Unrequested behavior with a concrete scope, compatibility, security, or maintenance consequence.
- Changes that undermine existing contracts the increment is meant to preserve.

Scenarios are evidence targets, not necessarily an exhaustive list of all correct behavior. Report reachable correctness or security defects even if the artifacts omit their trigger, but identify them as quality concerns rather than claiming an unstated requirement was agreed. Incidental implementation choices are not scope creep merely because the documents do not mention them.

## Evaluate Evidence

Look for tests and checks that exercise the actual commitment rather than merely share its terminology. Confirm that relevant paths run and assertions distinguish intended behavior from plausible regressions. Apply `review-v2` for detailed test-quality judgment; more tests are not automatically better evidence.

Distinguish implemented behavior, test existence, and successful execution. A checked task or previous success log cannot by itself establish current compliance. Missing execution evidence may block verified completion without proving a behavioral defect.

## Ground Findings

For an alignment concern, cite the requirement ID or artifact section, the actual code path, and the observable discrepancy. Explain why that commitment applies to this review scope. Recommend the narrowest useful correction, or request clarification if the artifacts conflict.

Do not silently choose a new product behavior, revise requirements to fit the code, or flag intentionally deferred work as a current omission. Conversely, a future PR cannot justify exposing an unsafe or misleading half-implemented behavior now.
