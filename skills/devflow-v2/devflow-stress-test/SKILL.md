---
name: devflow-stress-test
description: Stress-test an existing Devflow change through a code-grounded grilling session. Use to challenge its goal, requirements, or design without editing documents or implementing.
---

# Devflow Stress Test

Use the `grilling` skill to challenge a captured change, not merely clarify its wording. Read and follow that skill's instructions; do not duplicate its interview process here. If it is unavailable, explain the dependency rather than silently substituting another process.

## Establish the Target

Resolve the user's identified `devflow/<change-id>/` directory. If the target is ambiguous, ask which change they mean.

Read its existing proposal, requirements, and design documents. Missing later-stage documents are valid; stress-test what exists. Read relevant project guidance, code, and tests as needed.

Distinguish implemented behavior, captured intent, and assumptions. Existing documents are the subject of examination, not proof that their decisions are correct.

## Frame the Grilling

Establish the requested focus, or default to the captured change as a whole. Use that scope to bound the grilling decision tree.

Challenge consequential assumptions, contradictions, missing behavior, failure cases, and unnecessary complexity. Ask whether the goal is worth pursuing and whether a simpler approach would satisfy it. Do not manufacture objections or reopen settled decisions without a concrete reason.

Ground factual claims in repository evidence. Let grilling govern the questioning, recommendations, and decision dependencies.

## Boundaries

Keep the session read-only. Do not edit change documents, implement, plan execution, perform Git writes, or mutate remote state.

Agreement during questioning establishes shared understanding, not permission to write or implement.

## Close and Hand Off

Summarize:
- Decisions that held up under examination.
- Agreed candidate revisions and their reasons.
- Unresolved questions and affected documents.

Do not create a separate stress-test report or approval record.

If the user requests applying the revisions, explicitly leave stress-testing and use `devflow-capture` to reconcile the affected documents. Follow its agreement and downstream-reconciliation rules; do not automatically rewrite every document.
