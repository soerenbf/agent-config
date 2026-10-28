---
name: devflow-diagnose
description: Investigate bugs or performance regressions with safe reproduction and evidence-ranked hypotheses. Use to diagnose an uncertain cause before proposal capture, without automatically editing or fixing.
---

# Devflow Diagnose

## Boundaries and safety

Diagnosis does not authorize a fix. Do not automatically create change IDs, `devflow/` records, test files, instrumentation, or implementation changes. Git writes are outside this activity. Never push or mutate remote state, including PRs, comments, reviews, issues, or branches; read-only research is permitted. Preserve unrelated work and follow governing policy.

Before running a reproduction or probe, assess side effects, environment, data, cost, and load. Prefer existing read-only checks or isolated disposable environments; ask permission before any potentially destructive, production-affecting, or externally mutating operation. Remote mutation remains prohibited even if a proposed probe would need it. Do not assume a test command is harmless.

Redact secrets and personal data before showing commands, output, traces, or summaries. Keep credentials out of command text and retain only diagnostic excerpts. If safe redaction loses necessary evidence, explain the gap and request a safe alternative.

## Establish the symptom

- Capture observed versus expected behavior, exact trigger, frequency, affected versions/environment, and impact. Separate user reports from directly observed evidence.
- Inspect relevant code, tests, guidance, and history read-only. Verify historical claims against current code. Research accessible facts yourself; ask the user for decisions or unavailable evidence.
- Seek the smallest safe reproduction exercising the original symptom, not merely a nearby error. Prefer an existing command or fixture. Reduce one input or condition at a time; for intermittent failures report attempts and failure rate rather than claiming determinism.
- If reproduction is unavailable, state what was tried and what access or redacted evidence is missing. Keep hypotheses provisional; do not substitute a guessed fix for evidence.

## Discriminate, do not anchor

Present a short ranked list of plausible causes. For each, give supporting and conflicting evidence, a falsifiable prediction, and a probe that would distinguish it from alternatives. Explain uncertainty and invite user corrections to the ranking.

Run only safe probes within existing authority. Vary one factor per probe where practical; otherwise disclose confounders. Compare prediction with actual result and update the ranking. For performance issues measure a baseline and comparable workload before inferring a cause. Stop when evidence is insufficient rather than escalating load or access silently.

Temporary instrumentation or any other edit requires explicit user permission first. Describe exact files, intended signal, risks, and cleanup; wait for approval. Permission to instrument is not permission to fix. Restrict approved edits to that scope, track them, and remove only your own temporary changes within the agreed cleanup scope. If cleanup would touch user work or exceeds permission, stop and ask.

## Handoff, not automatic repair

Summarize observations, reproduction (or its limitation), ranked causes and confidence, probe results, and unresolved questions in conversation. Define future verification against the original full symptom as well as a focused regression scenario; recommend red/green evidence where practical without writing tests now.

When the user considers diagnosis sufficient, suggest explicit invocation of the separately installed `devflow-propose` companion to capture findings and a bounded repair plan. Do not create records or implement merely because the cause is known. If the companion is missing, report it and ask how to proceed, rather than accessing sibling resources or improvising artifacts. No OpenSpec runtime or bundled resources are required.
