---
name: devflow-capture
description: Collaboratively clarify and capture a change's goal, behavioral requirements, and technical design. Use when the user explicitly wants to turn exploration or an idea into change documents, or refine existing ones, without planning execution or implementing.
---

# Devflow Capture

Capture shared understanding, not just conversation. Work through goal → requirements → design, writing one document at a time as its substance becomes agreed. This is collaborative formulation, not an exhaustive grilling session or automatic document generation.

## Boundaries

- Create or revise change documents only on explicit request. Invoking capture authorizes this document collaboration, not implementation, Git writes, or remote mutations.
- Write only the agreed documents under `devflow/<change-id>/` in the target repository. Do not change application code, tests, configuration, or unrelated work.
- Do not create tasks, PR breakdowns, commit plans, approval logs, or a permanent spec registry. Execution planning and independent design stress-testing belong outside capture.
- No OpenSpec CLI, runtime, or companion skill is required.

## Establish Context and Destination

Reuse the conversation and read relevant project guidance, current code, tests, and referenced documents. Investigate accessible facts instead of asking the user to supply them. Current code and tests establish implemented behavior; agreed change documents describe intended behavior. Historical documents are context, not an authoritative description of today's system.

Use the user's identified change when resuming. For a new change, suggest a descriptive kebab-case ID and confirm its destination before the first write. Check whether the directory already exists. On collision, ask whether to resume it or choose another ID; never overwrite, merge unrelated records, or silently suffix the name. Do not create a directory or placeholder documents before the first document is agreed.

Read only relevant change history, not every past document. Existing v1 briefs/plans/progress are context; do not automatically convert or replace them.

## Select the Stage

Any stage is a valid entry or stopping point. Start from what the user requested and what is already established, not automatically from the beginning. Read the current prerequisite documents and any existing output document for the selected stage from disk before entering it, even if they appeared earlier in the conversation. File existence alone does not establish agreement or readiness; reconcile their substance with the user's current intent.

Read the selected stage's guide and template fully before working on that stage. All resource paths are relative to this skill directory, not the target repository. Do not load other stages' resources in advance.

| Stage | Prerequisites | Collaboration guide | Output template |
|---|---|---|---|
| Goal / proposal | Conversation and relevant project evidence | [Proposal collaboration](references/proposal-collaboration.md) | [Proposal](assets/proposal.md) → `proposal.md` |
| Behavioral requirements | Agreed `proposal.md` | [Requirements collaboration](references/requirements-collaboration.md) | [Requirements](assets/requirements.md) → `requirements.md` |
| Technical design | Agreed `proposal.md` and `requirements.md` | [Design collaboration](references/design-collaboration.md) | [Design](assets/design.md) → `design.md` |

If a prerequisite is missing or materially unclear, explain the gap and agree with the user to resolve that earlier stage first. Do not synthesize missing prerequisite documents without their agreement.

## Shared Collaborative Rhythm

1. **Synthesize first.** Explain what is already established for this stage, distinguishing evidence, agreed intent, assumptions, and meaningful gaps. Do not restart settled discussions.
2. **Resolve meaningful gaps together.** Investigate factual questions. Ask focused questions about decisions that matter, offering recommendations and reasons when useful. Group genuinely independent questions, but do not force a questionnaire or exhaust hypothetical edge cases.
3. **Confirm the substance.** Present a concise synthesis of the proposed document's meaning, including scope and consequential constraints. Ask whether it reflects the user's intent. Wait for explicit agreement before writing; the initial capture invocation alone is not agreement with newly proposed content. If the user corrects it, revise the understanding and confirm again.
4. **Write the agreed document.** Use the stage template, replace drafting guidance, and omit irrelevant optional sections. Preserve exact agreed constraints without padding or transcripts. Write this document now rather than holding it until all stages are complete.
5. **Check and pause.** Read the saved document, check it against the agreement and prerequisites, and report its path and any genuinely deferrable unknowns. Offer the next stage, but wait for the user's choice before entering it. Agreement to write one document does not authorize automatic progression through the rest.

Uncertainty is allowed; hidden decisions are not. Record a deferrable unknown only if it cannot undermine the document's purpose or change its consequential commitments. An unclear goal, contradictory behavior, or undecided architectural approach must be discussed, not disguised as an open question.

## Revisit and Resume

When later findings challenge an earlier document, explain the contradiction and its downstream consequences. Agree the revision before editing the earlier document, then identify affected downstream documents and ask which to reconcile next; do not enter or rewrite later stages automatically. Do not silently change requirements to fit a preferred implementation or treat an outdated design as settled.

On resume, inspect the relevant documents and current code, identify the requested stage and any substantive gaps, and continue the same rhythm. Do not persist permission claims or infer implementation approval from saved records. Existing unrelated edits must be preserved; if they conflict with an agreed revision, pause and ask.

## Finish Where the User Chooses

Report what was written, remaining uncertainty, and an optional next direction. A proposal alone is a valid outcome. Completing all three documents means intent and approach have been captured, not that execution is planned or implementation is approved.

Document formats are adapted from OpenSpec's proposal, behavioral requirement/scenario, and design conventions, without capability specs or delta operations.
