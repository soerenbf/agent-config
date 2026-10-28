# Plan: <change-id>

## Identity and design
- Plan revision and baseline (identify the exact contents to be approved):
- Design, rationale, relevant code/context paths:
- Exact constraints from brief; rejected alternatives:
- Scope / non-goals:
- Unresolved decisions and affected groups blocked:

## Worker groups and dependencies
Sequential by default. Groups are not commits or PRs. Coordinator owns progress and inspects output.

| Group | Bounded paths / task / acceptance IDs | Dependencies | Decisions / context | Required checks | Worker reporting |
| --- | --- | --- | --- | --- | --- |
| G1 | <scope> | <prerequisites> | <references> | <commands / outcomes> | <changes, evidence, blockers> |

## Verification strategy
- Baseline behavior and original symptom (for bugs):
- Risk-based test seams and why unit / integration / E2E is appropriate:
- Red/green regression proof where practical; explain limitations:

| Check / acceptance IDs | Command or procedure | Required fixtures / environment / access | Proof tests actually executed | Required? |
| --- | --- | --- | --- | --- |
| <check> | <procedure> | <prerequisites> | <expected execution evidence> | <yes/no with rationale> |

- Independent group review approach:
- Independent integrated final feature review after all groups: requirement alignment and code quality, explicit baseline, committed/staged/unstaged/relevant untracked surface, unrelated-work exclusions:
- Affected rechecks/review after fixes and broad final checks:
- Required failed, skipped, blocked, or not-run checks prevent implementation verified.

## Proposed local structure and execution scope — not yet authorized
- Default: one branch, one PR; proposed branch/base:
- Provisional commits (distinct from worker groups):
- PR increments and rationale if split; supporting tests in each or explicit earlier-increment dependency:
- Exact allowed local Git operations and limits:
- Delegation scope, sequential groups, available tools and required companions:
- Protected pre-existing history and unrelated/uncommitted work:
- No pushes or remote mutations; publication is user-owned.
- Specific history rewriting or delivery restructuring requires separate user approval of that transformation.

## Stop conditions and approval boundary
- Unresolved decisions, material scope/design changes, contradictory evidence, missing tools/prerequisites: stop affected work and seek clarification/reapproval. Only independent already-approved work may continue.
- At most two autonomous attempts per unresolved issue across sessions/rounds; persist identity and count. Exhaustion requires user intervention/approval.
- Explicit user implementation invocation for this identified plan approves only stated local Git/delegation scope, subject to higher policy. Proposal creation and agent-authored approval text grant no execution permission.
- Keep delivery drafts/evidence under this change directory. No additional index or registry.
