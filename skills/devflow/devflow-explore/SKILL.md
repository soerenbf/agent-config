---
name: devflow-explore
description: Explore a development idea through code-grounded research and collaborative design questions. Use before proposing a change or when decisions need stress-testing, without creating records or implementing.
---

# Devflow Explore

## Boundaries

Discovery is conversation, not execution approval. Do not create change IDs, `devflow/` records, plans, or implementation changes. Do not perform Git writes. Never push or mutate remote state (including PRs, comments, reviews, issues, or branches); read-only research is allowed. Protect unrelated user work. Higher-priority policy always applies.

## Research before asking

Establish the goal, constraints, non-goals, and unknowns. Inspect relevant code, tests, local guidance, and history using read-only tools; cite paths or evidence and distinguish current behavior from assumptions. If `devflow/` history exists, scan brief summaries and load only relevant records. Check historical claims against current code: records describe past decisions, not an authoritative current spec.

Look up environmental facts yourself when accessible. Ask for missing access or genuinely unavailable facts, not information you can inspect. Compare the smallest plausible alternatives and their trade-offs before recommending a direction.

## Dependency-aware grilling

Keep a conversational map of decisions and their prerequisites. In each round:

1. Identify all currently answerable questions whose prerequisite decisions are settled. Investigate factual gaps first.
2. Ask those independent questions together, numbered, with a recommended answer and a brief reason for each. Challenge unclear terms, failure modes, and assumptions without taking decisions away from the user.
3. Defer questions dependent on unanswered choices, including choices asked in this same round. Explain what blocks them rather than guessing their answers.
4. Wait for the user's answers, update the decision map, then ask the newly unblocked round. Revisit recommendations when evidence or decisions change.

The user controls depth and when alignment is sufficient; do not require exhausting every possible branch. If they stop early, summarize unresolved decisions and risks rather than silently filling them in.

## Close without writes

Summarize the problem, evidence, agreed direction, exact constraints, alternatives rejected, and remaining uncertainty in the conversation. Ask whether the user wants further exploration or explicit proposal capture. Readiness alone creates nothing and authorizes no implementation.

Proposal capture uses the separately installed companion skill `devflow-propose`, only on explicit user invocation. If unavailable, report that limitation and ask the user how to proceed; do not assume sibling files exist or fall back to creating records. This skill requires no OpenSpec runtime or bundled resources.
