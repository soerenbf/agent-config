import assert from "node:assert/strict";
import test from "node:test";
import { formatWorkerProgress, getDelegationFailure, getFinalAssistantText, parseWorkerReport } from "../report.mjs";

const completeReport = `## Completed Tasks
- 1.1

## Changed Files
- \`extensions/index.ts\` — added delegation

## Validation
- \`npm test\` — passed

## Blockers
- None`;

test("parses a complete worker report", () => {
  assert.deepEqual(parseWorkerReport(completeReport), {
    completedTasks: ["1.1"],
    changedFiles: ["extensions/index.ts"],
    validation: ["`npm test` — passed"],
    blockers: [],
  });
});

test("rejects incomplete worker reports", () => {
  assert.throws(() => parseWorkerReport("## Completed Tasks\n- 1.1"), /missing section/);
});

test("extracts the final assistant report from Pi JSONL", () => {
  const first = '{"type":"message_end","message":{"role":"assistant","content":[{"type":"text","text":"first"}]}}';
  const final = JSON.stringify({
    type: "message_end",
    message: { role: "assistant", content: [{ type: "text", text: completeReport }] },
  });
  assert.equal(getFinalAssistantText(`${first}\n${final}`), completeReport);
});

test("formats worker tool and assistant progress", () => {
  assert.equal(formatWorkerProgress('{"type":"tool_execution_start","toolName":"bash"}'), "Worker: bash…");
  assert.equal(
    formatWorkerProgress('{"type":"message_end","message":{"role":"assistant","content":[{"type":"text","text":"Running tests"}]}}'),
    "Worker: Running tests",
  );
  assert.equal(formatWorkerProgress("not JSON"), undefined);
});

test("reports cancelled and failed worker outcomes", () => {
  assert.equal(getDelegationFailure({ exitCode: null, stderr: "", aborted: true }), "Worker was cancelled.");
  assert.equal(getDelegationFailure({ exitCode: 1, stderr: "boom", aborted: false }), "Worker exited with code 1. boom");
  assert.equal(getDelegationFailure({ exitCode: 0, stderr: "", aborted: false }), undefined);
});
