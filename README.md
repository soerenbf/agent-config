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

### Devflow

| Skill | Purpose |
| --- | --- |
| [`devflow-capture`](skills/devflow/devflow-capture/SKILL.md) | Agree and capture the proposal, requirements, and design. |
| [`devflow-stress-test`](skills/devflow/devflow-stress-test/SKILL.md) | Challenge a change before implementation. |
| [`devflow-plan`](skills/devflow/devflow-plan/SKILL.md) | Agree reviewable PR increments and concrete tasks. |
| [`devflow-implement`](skills/devflow/devflow-implement/SKILL.md) | Implement and verify the plan on local branches. |
| [`devflow-review`](skills/devflow/devflow-review/SKILL.md) | Review an increment or the whole change against its commitments. |
| [`devflow-deliver`](skills/devflow/devflow-deliver/SKILL.md) | Agree concise PR drafts and reviewer comments, then publish only with separate explicit approval. |

Devflow skills are grouped under [`skills/devflow/`](skills/devflow/). Each has its own `SKILL.md`; the grouping directory deliberately has none so it cannot shadow nested discovery.

Delivery handles each planned increment one at a time. Agree all titles, descriptions, and useful reviewer comments before authorizing publication of the set. Drafts can state incomplete checks; they must not claim verified completion. Existing PRs are reused and comments are not duplicated. Integration PRs and branch restructuring are out of scope.

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
npx skills add . --skill devflow-capture --agent pi --copy
npx skills add . --skill devflow-stress-test devflow-plan devflow-implement devflow-review devflow-deliver --agent pi --copy
```

These commands install into the current project; add `--global` only when you intend a user-level install. `--copy` retains bundled resources without source symlinks. For Pi package installation instead, run `pi install /absolute/path/to/agent-config`; the existing `pi.skills` manifest discovers the grouped skills recursively. Reload Pi afterward. See [packaging evidence and isolated checks](tests/devflow/README.md#packaging-verification).

## Devflow lifecycle and permissions

Use capture to agree `devflow/<change-id>/{proposal,requirements,design}.md`, then plan to agree PR increments and tasks in `plan.md`. Stress-test challenges those decisions without editing them. Documents alone do not authorize implementation.

Explicit implementation invocation for an identified current plan authorizes its stated local Git operations and delegation under governing policy. Implementation builds the branch stack, verifies each increment, and obtains independent integrated final review. Required checks must actually pass; task checkboxes and worker reports are not proof. Correction attempts are bounded across resumed sessions. Substantive replanning and history restructuring outside the approved scope require agreement.

Review assesses an increment or the whole change without implementing fixes or publishing feedback. Delivery agrees PR materials and obtains separate authorization for publication as described above. Unrelated work is protected throughout. These are prompt-level contracts, not a security sandbox or proof of model compliance. Devflow needs no OpenSpec runtime or special worker profile. Missing required companion skills or delegation/review tools are reported rather than silently substituted.

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
