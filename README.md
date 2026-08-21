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

Skills live directly under [`skills/`](skills/). This flat structure is intentional.

## Install

Use the [`skills`](https://skills.sh/) CLI to discover and install the skills supported by your agent:

```sh
npx skills add .
```

Run the command from a local checkout. To inspect the available skills without installing them:

```sh
npx skills add . --list
```

## OpenSpec coordinator runtime

The coordinator also requires its Pi extension and user-level worker profile. Install the skill with `npx skills add .`, then symlink the runtime files so changes in this checkout are available after Pi reloads:

```sh
mkdir -p ~/.pi/agent/{extensions,agents}
ln -sfn "$(pwd)/extensions/openspec-subagent" ~/.pi/agent/extensions/openspec-subagent
ln -sfn "$(pwd)/agents/openspec-worker.md" ~/.pi/agent/agents/openspec-worker.md
```

Restart Pi (or run `/reload`) after installation or implementation changes. In a trusted target project with an apply-ready change, invoke the `openspec-coordinator` skill with an explicit change name. It checks that the `openspec_delegate` extension tool and `openspec-worker` profile are available before changing files.

To remove the runtime, delete `~/.pi/agent/extensions/openspec-subagent` and `~/.pi/agent/agents/openspec-worker.md`.
