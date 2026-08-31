"use client";

import { useEffect, useRef } from "react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import MonacoEditor from "./MonacoEditor";
import CodeTerminal, { TerminalRef } from "./Terminal";

interface RunResult {
  stdout: string;
  stderr: string;
}

interface Props {
  code: string;

  disabled?: boolean;

  running?: boolean;

  /** Whether there's already a submission being processed in the queue */
  hasQueuedSubmission?: boolean;

  /** Position in queue for the current question (0 = not queued) */
  queuePosition?: number;

  onCodeChange: (value: string) => void;

  onRun: (stdin?: string) => Promise<RunResult>;

  onSubmit: () => void;
}

export function extractInputPrompts(code: string): string[] {
  const lines = code.split("\n").map((line) => {
    const commentIdx = line.indexOf("#");
    return commentIdx >= 0 ? line.slice(0, commentIdx) : line;
  });
  const cleanCode = lines.join("\n");

  const regex = /input\s*\(\s*(?:(['"`]{1,3})([\s\S]*?)\1)?\s*\)/g;
  const prompts: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(cleanCode)) !== null) {
    const promptText = match[2] !== undefined ? match[2] : "";
    prompts.push(promptText);
  }

  return prompts;
}

function formatRemainingStdout(stdout: string, prompts: string[]): string {
  let remaining = stdout;
  for (const prompt of prompts) {
    if (prompt && remaining.includes(prompt)) {
      remaining = remaining.replace(prompt, "");
    }
  }
  return remaining.trim();
}

export default function CodeEditor({
  code,
  disabled = false,
  running = false,
  hasQueuedSubmission = false,
  queuePosition = 0,
  onCodeChange,
  onRun,
  onSubmit,
}: Props) {
  const terminalRef = useRef<TerminalRef>(null);

  const handleRun = async () => {
    if (!terminalRef.current || running) return;

    terminalRef.current.clear();

    terminalRef.current.writeln("> python main.py");
    terminalRef.current.writeln("");

    try {
      const prompts = extractInputPrompts(code);
      const inputs: string[] = [];

      for (const prompt of prompts) {
        const userInput = await terminalRef.current.readLine(prompt);
        inputs.push(userInput);
      }

      const stdin = inputs.length > 0 ? inputs.join("\n") + "\n" : undefined;

      const result = await onRun(stdin);

      const remainingOutput = formatRemainingStdout(result.stdout || "", prompts);

      if (remainingOutput) {
        terminalRef.current.write("\x1b[32m");
        terminalRef.current.writeln(remainingOutput);
        terminalRef.current.write("\x1b[0m");
      }

      if (result.stderr) {
        terminalRef.current.write("\x1b[31m");
        terminalRef.current.writeln(result.stderr);
        terminalRef.current.write("\x1b[0m");
      }

      terminalRef.current.writeln("");
      terminalRef.current.writeln(
        `Process finished with exit code ${result.stderr ? 1 : 0}`,
      );
    } catch (error: any) {
      if (error?.message === "Cancelled") {
        terminalRef.current.writeln("\nExecution cancelled.");
        return;
      }

      terminalRef.current.write("\x1b[31m");
      terminalRef.current.writeln("Unexpected Error");
      terminalRef.current.write("\x1b[0m");

      terminalRef.current.writeln("");
      terminalRef.current.writeln("Process finished with exit code 1");

      console.error(error);
    }
  };

  useEffect(() => {
    const handler = async (e: KeyboardEvent) => {
      // Ctrl + Enter
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();

        if (!disabled && !running) {
          await handleRun();
        }
      }

      // Ctrl + S
      if (e.ctrlKey && e.key.toLowerCase() === "s") {
        e.preventDefault();

        if (!disabled) {
          onSubmit();
        }
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [disabled, running, code]);

  // Determine submit button text
  const getSubmitLabel = () => {
    if (disabled && queuePosition > 0) {
      return `Antrian #${queuePosition}`;
    }
    if (disabled) {
      return "Sudah Disubmit";
    }
    if (hasQueuedSubmission) {
      return "Submit (Antrian)";
    }
    return "Submit";
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-border bg-surface px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400" />

          <span className="h-3 w-3 rounded-full bg-yellow-400" />

          <span className="h-3 w-3 rounded-full bg-green-400" />
        </div>

        <div className="font-medium text-text">main.py</div>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Python
          </span>
        </div>
      </div>

      {/* EDITOR */}
      <div className="flex-1">
        <MonacoEditor code={code} disabled={disabled} onChange={onCodeChange} />
      </div>

      {/* TERMINAL */}
      <CodeTerminal ref={terminalRef} />

      {/* ACTION */}
      <div className="flex items-center justify-end gap-3 border-t border-border bg-white px-6 py-4">
        {/* Queue position indicator */}
        {queuePosition > 0 && (
          <span className="mr-auto inline-flex items-center gap-1.5 rounded-lg bg-warning/10 px-3 py-1.5 text-xs font-semibold text-warning">
            <span className="h-1.5 w-1.5 rounded-full bg-warning animate-pulse" />
            Antrian #{queuePosition}
          </span>
        )}

        <Button
          variant="secondary"
          loading={running}
          disabled={disabled}
          onClick={handleRun}
        >
          Uji Coba
        </Button>

        <Button disabled={disabled} onClick={onSubmit}>
          {getSubmitLabel()}
        </Button>
      </div>
    </div>
  );
}
