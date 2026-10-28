# Proposal Collaboration

## Purpose

Agree why the change should exist and what success means before specifying detailed behavior. Reuse exploration rather than rerunning it. A clear goal can be small; do not inflate it to justify a document.

## Form the Understanding

- Identify the affected users or systems, the concrete problem or opportunity, and the desired outcome. Distinguish the user's goal from a suggested solution.
- Inspect the relevant current behavior and constraints. Cite useful paths rather than presenting historical claims as facts.
- Clarify scope, meaningful non-goals, compatibility boundaries, and any exact constraints the user has established. Challenge terms such as "simple," "fast," or "reliable" only where their ambiguity changes the goal or scope.
- For a bug, preserve the reported symptom, observed behavior, intended correction, and reproduction evidence if available. Do not declare an uncertain cause proven or turn capture into a repair session.
- Surface conflicting goals and offer the smallest plausible scope that satisfies the actual need. Do not select a technical solution merely to fill the proposal.

Ask naturally about meaningful gaps. If the goal is still unclear, keep collaborating; do not write an empty proposal with the goal listed as an open question.

## Ready to Confirm

The user can recognize the problem, desired outcome, scope, and consequential constraints in your synthesis. No unresolved decision changes what the change is for. Detailed scenarios and technical choices can remain for their own stages.

## Write and Check

Use the proposal template linked from `SKILL.md`. Keep the motivation and scope here; behavioral contracts belong in requirements, and implementation choices belong in design. Describe known impact without inventing an exhaustive file list. Mark known breaking changes explicitly.

Check that the proposal reflects the agreed goal, preserves non-goals and constraints, and does not promise features the user never requested. Follow the shared confirmation, write, and pause rhythm in `SKILL.md`.
