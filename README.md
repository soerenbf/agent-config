# Agent Config

Personal configuration for coding agents. The repository currently contains reusable agent skills and may grow to include Pi-specific extensions or other configuration.

## Skills

| Skill | Purpose |
| --- | --- |
| [`address-pr-comments`](skills/address-pr-comments/SKILL.md) | Assess unresolved pull request feedback interactively before taking action. |
| [`org-tech-docs`](skills/org-tech-docs/SKILL.md) | Create and review Concordium PRDs, technical proposals, security issue proposals, and ADRs. |
| [`resolve-merge-conflicts`](skills/resolve-merge-conflicts/SKILL.md) | Resolve Git conflicts semantically, with a helper for inspecting conflict context. |
| [`openspec-coordinator`](skills/openspec-coordinator/SKILL.md) | Coordinate a ready OpenSpec change through sequential delegated implementation and reviews. |
| [`review`](skills/review/SKILL.md) | Review code changes for correctness, security, performance, maintainability, style, and testing. |
| [`tdd`](skills/tdd/SKILL.md) | Plan behavioral tests, establish a complete red suite, and wait for confirmation before implementation. |

### Devflow v1

| Skill | Purpose |
| --- | --- |
| [`devflow-explore-v1`](skills/devflow/devflow-explore-v1/SKILL.md) | Research an idea and align on design conversationally. |
| [`devflow-diagnose-v1`](skills/devflow/devflow-diagnose-v1/SKILL.md) | Investigate symptoms with safe probes and ranked hypotheses. |
| [`devflow-propose-v1`](skills/devflow/devflow-propose-v1/SKILL.md) | Explicitly capture a brief, plan, and progress record with bundled templates. |
| [`devflow-implement-v1`](skills/devflow/devflow-implement-v1/SKILL.md) | Execute an identified approved plan with bounded delegation and independent verification. |
| [`devflow-review-v1`](skills/devflow/devflow-review-v1/SKILL.md) | Independently assess changes and collaboratively triage findings. |
| [`devflow-deliver-v1`](skills/devflow/devflow-deliver-v1/SKILL.md) | Prepare reviewable local delivery structure and PR materials. |

Existing skills live directly under [`skills/`](skills/); the six Devflow v1 skills are grouped under [`skills/devflow/`](skills/devflow/). Each has its own `SKILL.md`; the grouping directory deliberately has none so it cannot shadow nested discovery.

### Devflow v2

| Skill | Purpose |
| --- | --- |
| [`devflow-capture`](skills/devflow-v2/devflow-capture/SKILL.md) | Agree and capture the proposal, requirements, and design. |
| [`devflow-stress-test`](skills/devflow-v2/devflow-stress-test/SKILL.md) | Challenge a change before implementation. |
| [`devflow-plan`](skills/devflow-v2/devflow-plan/SKILL.md) | Agree reviewable PR increments and concrete tasks. |
| [`devflow-implement`](skills/devflow-v2/devflow-implement/SKILL.md) | Implement and verify the plan on local branches. |
| [`devflow-review`](skills/devflow-v2/devflow-review/SKILL.md) | Review an increment or the whole change against its commitments. |
| [`devflow-deliver`](skills/devflow-v2/devflow-deliver/SKILL.md) | Agree concise PR drafts and reviewer comments, then publish only with separate explicit approval. |

V2 delivery handles each planned increment one at a time. Agree all titles, descriptions, and useful reviewer comments before authorizing publication of the set. Drafts can state incomplete checks; they must not claim verified completion. Existing PRs are reused and comments are not duplicated. Integration PRs and branch restructuring are out of scope.

Publication requires governing policy that explicitly permits approved branch pushes, draft PR creation, and agreed PR edits/comments through `gh`. Skill invocation or approval of wording alone does not authorize remote changes. Implementation remains local-only. Devflow artifacts and draft materials stay local under `devflow/<change-id>/`; the delivery skill does not require a `resume.md` or another ledger.

## Install

Use the [`skills`](https://skills.sh/) CLI to discover and install the skills supported by your agent:

```sh
npx skills add .
```

Run the command from a local checkout. To inspect the available skills without installing them:

```sh
npx skills add . --list
```

Select individual skills by their declared names (companions are installed separately):

```fish
npx skills add . --skill devflow-propose-v1 --agent pi --copy
npx skills add . --skill devflow-explore-v1 devflow-diagnose-v1 devflow-implement-v1 devflow-review-v1 devflow-deliver-v1 --agent pi --copy
```

These commands install into the current project; add `--global` only when you intend a user-level install. `--copy` retains bundled resources without source symlinks. For Pi package installation instead, run `pi install /absolute/path/to/agent-config`; the existing `pi.skills` manifest discovers the grouped skills recursively. Reload Pi afterward. See [packaging evidence and isolated checks](tests/devflow/README.md#packaging-verification).

## Devflow v1 lifecycle and permissions

Explore or diagnose first: these activities stay conversational, with no records or implementation edits. Explicitly invoke `devflow-propose-v1` to create `devflow/<change-id>/{brief,plan,progress}.md`. Records preserve historical intent and evidence; current code remains authoritative, not a permanent spec registry.

Keep records small: the brief holds the summary, problem/behavior, non-goals, acceptance criteria and related history; the plan holds approach/decisions, verification and proposed local Git/delegation; progress alone holds grouped tasks/dependencies, short results, current blocker and next action. Add compact unresolved-issue retry counts or technical review decisions only when needed, not empty audit tables or authorization logs.

Explicit implementation invocation for an identified current plan establishes **plan approved** for the current session, authorizing only its stated local Git operations and delegation under governing policy. Proposal creation is not execution approval. Every new session requires fresh approval before implementation or Git writes, regardless of saved approval claims; reconcile actual files and evidence first. Material replanning and specific history restructuring require specific renewed approval. Unresolved correction budgets persist across sessions; fresh approval neither resets them nor authorizes a third attempt.

**Implementation verified** requires executed passing required checks and independent integrated final review, not merely worker success or group reviews. Review findings are collaboratively triaged. **Delivery prepared** additionally requires user approval of final local structure and PR materials; specific history rewrites require separate approval. Unrelated work is protected throughout.

Devflow v1 never pushes or mutates remote PRs, comments, reviews, issues, merges, or branches. Read-only research is allowed; descriptions and suggested replies stay local for user publication. These are prompt-level contracts, not a security sandbox or proof of model compliance. Devflow needs no OpenSpec runtime, special worker profile, or new dependency. Missing required companion skills or delegation/review tools are reported rather than silently substituted.

## OpenSpec coordinator runtime

The coordinator uses [`@tintinweb/pi-subagents`](https://github.com/tintinweb/pi-subagents) and a user-level worker profile. Install the package and symlink the profile so changes in this checkout are available after Pi reloads:

```sh
pi install npm:@tintinweb/pi-subagents
mkdir -p ~/.pi/agent/agents
ln -sfn "$(pwd)/agents/openspec-worker.md" ~/.pi/agent/agents/openspec-worker.md
```

Restart Pi (or run `/reload`) after installation or profile changes. In a trusted target project with an apply-ready change, invoke the `openspec-coordinator` skill with an explicit change name. It checks that the `Agent` tool and `openspec-worker` profile are available before changing files.

Use `/agents` to inspect, steer, or resume worker sessions. Do not share worker transcripts: they can contain sensitive prompts and tool output.

To remove the runtime, run `pi remove npm:@tintinweb/pi-subagents` and delete `~/.pi/agent/agents/openspec-worker.md`.
