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

  onCodeChange: (value: string) => void;

  onRun: () => Promise<RunResult>;

  onSubmit: () => void;
}

export default function CodeEditor({
  code,
  disabled = false,
  running = false,
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
    terminalRef.current.writeln("Running...");
    terminalRef.current.writeln("");

    try {
      const result = await onRun();

      terminalRef.current.clear();

      terminalRef.current.writeln("> python main.py");
      terminalRef.current.writeln("");

      if (result.stdout) {
        terminalRef.current.write("\x1b[32m");
        terminalRef.current.writeln(result.stdout);
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
    } catch (error) {
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
      <div className="flex justify-end gap-3 border-t border-border bg-white px-6 py-4">
        <Button
          variant="secondary"
          loading={running}
          disabled={disabled}
          onClick={handleRun}
        >
          Uji Coba
        </Button>

        <Button disabled={disabled} onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
