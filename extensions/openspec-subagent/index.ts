import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { StringEnum } from "@earendil-works/pi-ai";
import { getAgentDir, type ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";
import { formatWorkerProgress, getDelegationFailure, getFinalAssistantText, parseWorkerReport } from "./report.mjs";

const delegationSchema = Type.Object({
  task: Type.String({ description: "The single ordered task group to implement." }),
  cwd: Type.Optional(Type.String({ description: "Project checkout for the worker. Defaults to the current checkout." })),
  agent: Type.Optional(Type.String({ default: "openspec-worker", description: "Installed user-level worker profile." })),
  mode: Type.Optional(StringEnum(["execute"] as const)),
});

/** Registers a cancellable, single-worker OpenSpec delegation tool. */
export default function registerOpenSpecSubagent(pi: ExtensionAPI): void {
  pi.registerTool({
    name: "openspec_delegate",
    label: "OpenSpec Delegate",
    description: "Run exactly one isolated openspec-worker process and return its structured completion report.",
    promptSnippet: "Delegate one ordered OpenSpec task group to an isolated worker.",
    promptGuidelines: [
      "Use openspec_delegate for exactly one sequential OpenSpec worker group; inspect its structured report before changing task state.",
    ],
    parameters: delegationSchema,
    async execute(_toolCallId, params, signal, onUpdate, ctx) {
      const agent = params.agent ?? "openspec-worker";
      const profilePath = join(getAgentDir(), "agents", `${agent}.md`);
      let profile: string;
      try {
        profile = await readFile(profilePath, "utf8");
      } catch {
        throw new Error(`Worker profile not found: ${profilePath}. Install openspec-worker before delegating.`);
      }
      const frontmatter = profile.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
      const model = frontmatter?.[1].match(/^model:\s*(.+)\s*$/m)?.[1];
      const systemPrompt = profile.replace(/^---[\s\S]*?---\s*/, "");
      const args = ["--mode", "json", "--no-session", "-p"];
      if (model) args.push("--model", model);
      args.push("--append-system-prompt", systemPrompt, `Task: ${params.task}`);
      const output: string[] = [];
      let stdoutBuffer = "";
      let stderr = "";
      let aborted = false;

      const exitCode = await new Promise<number | null>((resolve) => {
        const child = spawn("pi", args, { cwd: params.cwd ?? ctx.cwd, shell: false, stdio: ["ignore", "pipe", "pipe"] });
        child.stdout.on("data", (chunk: Buffer) => {
          const text = chunk.toString();
          output.push(text);
          stdoutBuffer += text;
          const lines = stdoutBuffer.split("\n");
          stdoutBuffer = lines.pop() ?? "";
          for (const line of lines) {
            const progress = formatWorkerProgress(line);
            if (progress) onUpdate?.({ content: [{ type: "text", text: progress }], details: {} });
          }
        });
        child.stderr.on("data", (chunk: Buffer) => { stderr += chunk.toString(); });
        child.on("close", resolve);
        child.on("error", () => resolve(1));
        const cancel = () => {
          aborted = true;
          child.kill("SIGTERM");
        };
        if (signal?.aborted) cancel();
        else signal?.addEventListener("abort", cancel, { once: true });
      });

      const failure = getDelegationFailure({ exitCode, stderr, aborted });
      if (failure) throw new Error(failure);
      const transcript = output.join("");
      const finalText = getFinalAssistantText(transcript);
      if (!finalText) throw new Error("Worker exited without an assistant completion report.");
      const report = parseWorkerReport(finalText);
      return { content: [{ type: "text", text: finalText }], details: { report } };
    },
  });
}
