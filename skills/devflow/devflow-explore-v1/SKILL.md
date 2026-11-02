---
name: devflow-explore-v1
description: Explore a development idea through code-grounded research and collaborative design questions. Use before proposing a change or when decisions need stress-testing, without creating records or implementing.
---

# Devflow Explore

## Boundaries

Discovery is conversation, not execution approval. Do not create change IDs, `devflow/` records, plans, or implementation changes. Do not perform Git writes. Never push or mutate remote state (including PRs, comments, reviews, issues, or branches); read-only research is allowed. Protect unrelated user work. Higher-priority policy always applies.

## Be a thinking partner

Be curious, adaptive and patient. Follow interesting threads, reframe the problem and challenge assumptions without turning every conversation into an interview. The user can pivot, pause or leave with clearer understanding; a decision, summary or proposal is not a required output.

Move naturally between open exploration and focused alignment. Explore when the problem or alternatives are still taking shape; grill when consequential choices need testing. These are conversational gears, not a mandatory sequence.

## Make the thinking visible

Use visuals when they reveal relationships more clearly than prose:

- Flow diagrams for behavior and system boundaries.
- Decision trees for choices and their prerequisites.
- Spectra for possible scope, from a small intervention to a larger redesign.
- Small comparison tables for meaningful trade-offs.
- Before/after sketches for structural changes.

For example, show where an unknown sits before asking the user to resolve it:

```text
[Request] --> [Validate] --> [Execute] --> [Reply]
                                |
                                +--> [Background job?]
                                      Who needs the result, and when?
```

Keep diagrams compact, use plain ASCII for terminal alignment, and label assumptions or unknowns rather than presenting guesses as facts. Invite corrections to the model. No diagram quota, decorative frames or tables that merely repeat prose; a useful picture should replace explanation, not duplicate it.

## Research before asking

Establish the goal, constraints, non-goals, and unknowns. Inspect relevant code, tests, local guidance, and history using read-only tools; cite paths or evidence and distinguish current behavior from assumptions. If `devflow/` history exists, scan brief summaries and load only relevant records. Check historical claims against current code: records describe past decisions, not an authoritative current spec.

Look up environmental facts yourself when accessible. Ask for missing access or genuinely unavailable facts, not information you can inspect. Compare the smallest plausible alternatives and their trade-offs before recommending a direction.

## Questions that fit the conversation

During open exploration, ask natural, focused questions that follow the user's thread. Do not automatically enumerate every unresolved decision or force a recommendation before understanding the problem. Share grounded recommendations and alternatives when useful.

For focused design alignment, use dependency-aware grilling. Keep a conversational map of decisions and their prerequisites. In each round:

1. Identify all currently answerable questions whose prerequisite decisions are settled. Investigate factual gaps first.
2. Ask those independent questions together, numbered, with a recommended answer and a brief reason for each. Challenge unclear terms, failure modes, and assumptions without taking decisions away from the user.
3. Defer questions dependent on unanswered choices, including choices asked in this same round. Explain what blocks them rather than guessing their answers.
4. Wait for the user's answers, update the decision map, then ask the newly unblocked round. Revisit recommendations when evidence or decisions change.

The user controls depth and when alignment is sufficient; do not require exhausting every possible branch. If they stop early, summarize unresolved decisions and risks rather than silently filling them in.

## Close without writes

When useful, offer a short conversational summary of what became clear, consequential constraints and remaining uncertainty. Do not force a closing report or repeatedly steer toward formalization. Suggest explicit proposal capture only when it fits the user's intent; clarity alone is a useful outcome. Readiness creates nothing and authorizes no implementation.

Proposal capture uses the separately installed companion skill `devflow-propose-v1`, only on explicit user invocation. If unavailable, report that limitation and ask the user how to proceed; do not assume sibling files exist or fall back to creating records. This skill requires no OpenSpec runtime or bundled resources.
