# Agent Config

Personal configuration for coding agents. The repository currently contains reusable agent skills and may grow to include Pi-specific extensions or other configuration.

## Skills

| Skill | Purpose |
| --- | --- |
| [`address-pr-comments`](skills/address-pr-comments/SKILL.md) | Assess unresolved pull request feedback interactively before taking action. |
| [`org-tech-docs`](skills/org-tech-docs/SKILL.md) | Create and review Concordium PRDs, technical proposals, security issue proposals, and ADRs. |
| [`resolve-merge-conflicts`](skills/resolve-merge-conflicts/SKILL.md) | Resolve Git conflicts semantically, with a helper for inspecting conflict context. |
| [`review`](skills/review/SKILL.md) | Review code changes for correctness, security, performance, maintainability, style, and testing. |

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
