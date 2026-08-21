---
name: tdd
description: Plan and execute test-driven bug fixes, issue resolutions, and changes to existing observable behavior. Use during relevant OpenSpec exploration, proposal creation, and implementation.
---

# Test-Driven Development

Use this skill by default for bug fixes, issue resolutions, and changes to existing observable behavior.

## Plan the Behavioral Contract

During relevant OpenSpec exploration, identify without implementing:
- the desired observable behavior;
- the public seams through which it can be exercised; and
- the behavioral tests to add or update.

If exploration was skipped, perform and record this analysis while creating the proposal. For every planned test, state the intended pre-implementation failure: the desired behavior is absent. Pause for clarification when the behavior, seam, or test contract is uncertain.

Test through public interfaces. Do not write implementation-coupled tests, tautological tests, or mocks of internal collaborators. Mock only genuine system boundaries when necessary.

## Establish the Red Suite

Before changing production implementation:
1. Add or update **all** planned behavioral tests.
2. Run the relevant suite.
3. Verify every changed test fails for its intended behavioral reason, not because of an unrelated error.

After verifying the complete red suite, stop. Return control to the user so they can review it or create a Git checkpoint. Do **not** begin production implementation until the user explicitly confirms continuation. Never create Git commits.

## Implement After Confirmation

After explicit confirmation, implement the desired behavior while preserving the agreed behavioral contract. Run the complete relevant suite and verify it passes without weakening the tests.
