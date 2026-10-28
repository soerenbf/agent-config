---
name: resolve-merge-conflicts
description: Interactively resolve in-progress Git merge, rebase, cherry-pick, revert, or stash conflicts by explaining each proposed fix, getting user approval before editing, and validating the result. Use when Git reports unmerged paths or files contain conflict markers.
---

# Resolve Merge Conflicts

Resolve conflicts interactively and semantically, not by mechanically choosing `ours` or `theirs`. Preserve the intent of both changes when compatible; do not invent unrelated behavior.

Default to review-before-edit. Explain each proposed resolution and wait for explicit user approval before applying it, even when the fix seems obvious. A request to resolve conflicts is not blanket approval of proposed fixes. Switch to autonomous resolution only if the user explicitly requests it; repository Git restrictions still apply.

This skill may edit conflicted files, but it MUST obey repository-local instructions governing Git operations. If Git writes are prohibited, do not stage files, run `git checkout`, continue or abort an operation, commit, reset, or otherwise mutate Git state. Instead, finish safe file edits, report what remains, and ask the user to perform the required Git commands.

## 1. Establish State

Read repository guidance such as `AGENTS.md` before changing anything. Confirm the source and destination branches and the operation's goal from Git state and the user's request; ask if unclear. For example, merging main into a next-version development branch does not mean main's behavior should automatically replace next-version changes.

Use read-only commands to identify the operation and unresolved paths:

```bash
git status --short
git status
git diff --name-only --diff-filter=U
git ls-files -u
```

Start with the bundled compact inspector rather than opening every conflicted file:

```bash
python3 ~/.pi/agent/skills/resolve-merge-conflicts/scripts/extract_conflict_context.py
```

Then inspect one file at a time:

```bash
python3 ~/.pi/agent/skills/resolve-merge-conflicts/scripts/extract_conflict_context.py \
  --file path/to/file
```

The script recognizes text, add/add, modify/delete, and index-only conflicts. Use `--json`, `--context`, or `--max-lines` when useful.

## 2. Recover Both Intents

For each conflict, determine why each side changed. Use the smallest useful combination of:

```bash
git log --oneline --decorate --graph --all -- path/to/file
git log -p -- path/to/file
git show <commit> -- path/to/file
git diff --cc -- path/to/file
git show :1:path/to/file  # merge base, when present
git show :2:path/to/file  # ours
git show :3:path/to/file  # theirs
```

Read related tests, callers, configuration, commit messages, PRs, and issues when they clarify intent. Do not infer correctness solely from branch names or recency.

### Ours/Theirs Warning

The labels are operation-relative:

- During a normal merge, `ours` is the checked-out branch and `theirs` is the merged branch.
- During a rebase, `ours` is generally the new base/upstream and `theirs` is the commit being replayed.

Confirm the active operation before interpreting either side.

## 3. Propose, Review, and Apply One Resolution at a Time

Work through one file at a time, presenting one conflict hunk per turn. Group hunks only when they form one inseparable semantic change; explain the grouping and list every affected location.

Choose a recommendation among these outcomes:

1. **Combine both intents** when they are compatible.
2. **Choose one intent** when the other is obsolete or contrary to the operation's goal.
3. **Ask the user** when the intents are incompatible, product behavior is unclear, data may be lost, or deletion is ambiguous.

Before editing, present a compact review:

- **Location:** file and hunk/line range, plus progress through the conflict list.
- **Both sides:** what each side changed and why, using confirmed branch/commit names rather than only `ours` and `theirs`.
- **Proposed result:** a focused diff or exact replacement showing what will be applied.
- **Removed / retained / added:** explicitly name discarded code or behavior, preserved intent, and any combined or adapted code. Say when nothing beyond conflict markers is removed.
- **Reason and risk:** why this fits the operation's goal, any uncertainty or trade-off, and the targeted check planned.

Ask the user to approve, revise, or skip this resolution, then stop and wait. Do not edit this or later conflicts while awaiting approval. If the user requests a different result, present the revised proposal and wait for approval again. If skipped, leave the conflict untouched and track it for the final report.

After approval, edit only the approved working-tree content and remove its conflict markers. Approval covers only the presented resolution, not later hunks or Git staging/continuation. Read more surrounding code when compact context is insufficient. Preserve unrelated user edits; if the conflict changed since the proposal, inspect it again and renew approval.

Re-inspect the applied result and report any meaningful difference from the proposal before presenting the next conflict. Any further corrective edit requires a new proposal and approval.

Do not:

- blindly choose `ours` or `theirs`
- resolve every hunk the same way
- introduce behavior unsupported by either side
- discard migrations, tests, security checks, or error handling without understanding why
- use `git checkout --ours`, `git checkout --theirs`, `git add`, or another Git-writing command when local policy prohibits it

For rename, binary, submodule, directory/file, or modify/delete conflicts, inspect index stages and history. Ask before destructive or uncertain resolutions.

## 4. Re-check and Validate

After each approved resolution, re-run the inspector for that file. Unreviewed or skipped hunks are expected to remain; do not remove their markers. Once all hunks in a file are approved and applied, run targeted checks. Before declaring the content resolved, verify:

```bash
git diff --name-only --diff-filter=U
rg -n '^(<<<<<<<|=======|>>>>>>>)( |$)' <resolved-paths>
```

An unmerged index can remain until the user stages files; distinguish that expected state from unresolved file content.

Run the project's targeted formatter, type checker, linter, build, and tests for the touched area. Expand to broader checks when risk warrants it. Do not fix unrelated failures.

## 5. Report Clearly

Summarize:

- files and hunks resolved
- how competing intents were preserved or which trade-off was chosen
- skipped, unreviewed, or ambiguous conflicts requiring user input
- checks run and their results
- remaining conflict markers or unmerged paths
- exact Git-writing steps the user must perform when policy prevents the agent from doing so

Never claim the merge or rebase is complete merely because conflict markers are gone. Completion also requires the appropriate staging and continuation steps, performed only when repository policy and user authorization allow them.
