/**
 * Parse the completion report produced by an OpenSpec worker.
 *
 * @param {string} output Worker final output.
 * @returns {{completedTasks: string[], changedFiles: string[], validation: string[], blockers: string[]}}
 * @throws {Error} When a required report section is absent.
 * @example
 * parseWorkerReport("## Completed Tasks\n- 1.1\n## Changed Files\n- `a.ts`\n## Validation\n- `npm test` — passed\n## Blockers\n- None")
 */
export function parseWorkerReport(output) {
  const sections = new Map();
  const heading = /^## (Completed Tasks|Changed Files|Validation|Blockers)\s*$/gim;
  const matches = [...output.matchAll(heading)];
  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const start = match.index + match[0].length;
    const end = matches[index + 1]?.index ?? output.length;
    sections.set(match[1].toLowerCase(), output.slice(start, end));
  }

  const required = ["completed tasks", "changed files", "validation", "blockers"];
  const missing = required.filter((name) => !sections.has(name));
  if (missing.length > 0) throw new Error(`Worker report is missing section(s): ${missing.join(", ")}.`);

  const items = (name) => (sections.get(name).match(/^\s*-\s+(.+?)\s*$/gm) ?? [])
    .map((line) => line.replace(/^\s*-\s+/, "").trim())
    .filter((line) => !/^none\.?$/i.test(line));

  return {
    completedTasks: items("completed tasks").map((item) => item.replace(/^`|`$/g, "")),
    changedFiles: items("changed files").map((item) => item.match(/`([^`]+)`/)?.[1] ?? item),
    validation: items("validation"),
    blockers: items("blockers"),
  };
}

/**
 * Convert a child-process outcome to an actionable delegation failure.
 *
 * @param {{exitCode: number | null, stderr: string, aborted: boolean}} outcome Process outcome.
 * @returns {string | undefined} A failure message, if the outcome failed.
 */
export function getDelegationFailure({ exitCode, stderr, aborted }) {
  if (aborted) return "Worker was cancelled.";
  if (exitCode !== 0) return `Worker exited with code ${exitCode ?? "unknown"}.${stderr ? ` ${stderr.trim()}` : ""}`;
  return undefined;
}

/**
 * Format a Pi JSON-mode event as concise worker progress.
 *
 * @param {string} line One JSONL event emitted by Pi.
 * @returns {string | undefined} Displayable progress, if the event is relevant.
 */
/**
 * Extract the final assistant text from Pi JSON-mode output.
 *
 * @param {string} transcript Complete JSONL output from a worker.
 * @returns {string | undefined} The final assistant text, if emitted.
 */
export function getFinalAssistantText(transcript) {
  let finalText;
  for (const line of transcript.split("\n")) {
    try {
      const event = JSON.parse(line);
      const message = event.message;
      if (event.type !== "message_end" || message?.role !== "assistant") continue;
      const text = message.content?.find((part) => part.type === "text")?.text;
      if (text) finalText = text;
    } catch {
      // Ignore non-JSON diagnostic output; process failure is handled separately.
    }
  }
  return finalText;
}

export function formatWorkerProgress(line) {
  let event;
  try {
    event = JSON.parse(line);
  } catch {
    return undefined;
  }

  const message = event.message;
  if (event.type === "tool_execution_start" && event.toolName) return `Worker: ${event.toolName}…`;
  if (event.type !== "message_end" || !message?.content) return undefined;

  if (message.role === "assistant") {
    const text = message.content.find((part) => part.type === "text")?.text;
    if (text) return `Worker: ${text}`;
    const tool = message.content.find((part) => part.type === "toolCall");
    if (tool) return `Worker: ${tool.name}…`;
  }
  if (message.role === "toolResult") return `Worker completed: ${message.toolName ?? "tool"}`;
  return undefined;
}
