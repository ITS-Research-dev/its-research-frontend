"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

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

  isSubmitted?: boolean;

  running?: boolean;

  isAssessing?: boolean;

  /** Whether there's already a submission being processed in the queue */
  hasQueuedSubmission?: boolean;

  /** Position in queue for the current question (0 = not queued) */
  queuePosition?: number;

  onCodeChange: (value: string) => void;

  onRun: (stdin?: string) => Promise<RunResult>;

  onSubmit: () => void;
}

function AssessmentProgressBar({ queuePosition }: { queuePosition: number }) {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(18);

  const stages = [
    "Menghubungkan ke AI Evaluator...",
    "Mengeksekusi dan memvalidasi output program...",
    "Menganalisis logika, sintaks, dan efisiensi kode...",
    "Menghitung skor kompetensi dan feedback...",
  ];

  useEffect(() => {
    const stageTimer = setInterval(() => {
      setStage((prev) => (prev + 1) % stages.length);
    }, 4000);

    const progressTimer = setInterval(() => {
      setProgress((prev) =>
        prev < 90 ? prev + Math.floor(Math.random() * 6) + 2 : prev,
      );
    }, 1200);

    return () => {
      clearInterval(stageTimer);
      clearInterval(progressTimer);
    };
  }, [stages.length]);

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-surface/85 backdrop-blur-sm p-6">
      <div className="w-full max-w-md rounded-2xl border border-primary/20 bg-white p-6 shadow-xl text-center space-y-5">
        <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Loader2 size={32} className="animate-spin text-primary" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-primary" />
          </span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-text">AI Sedang Menilai Jawaban</h3>
          <p className="mt-1 text-xs text-description">
            {queuePosition > 0
              ? `Sedang dalam antrian posisi #${queuePosition}. Evaluasi akan segera diproses.`
              : "Kode kamu sedang dianalisis secara komprehensif oleh AI."}
          </p>
        </div>

        {/* Centered Progress Bar */}
        <div className="space-y-2 text-left">
          <div className="flex justify-between text-xs font-semibold text-text">
            <span className="text-primary font-medium">{stages[stage]}</span>
            <span className="tabular-nums text-description">{progress}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 p-3 text-xs text-description text-left">
          💡 <span className="font-medium text-text">Tips:</span> Kamu bisa berpindah ke soal lain di panel navigasi kiri sambil menunggu hasil penilaian ini.
        </div>
      </div>
    </div>
  );
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
  isSubmitted = false,
  running = false,
  isAssessing = false,
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
    if (isAssessing) {
      return "Menilai...";
    }
    if (queuePosition > 0) {
      return `Antrian #${queuePosition}`;
    }
    if (hasQueuedSubmission) {
      return isSubmitted ? "Submit Ulang (Antrian)" : "Submit (Antrian)";
    }
    if (isSubmitted) {
      return "Submit Ulang";
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
      <div className="relative flex-1">
        {isAssessing && <AssessmentProgressBar queuePosition={queuePosition} />}
        <MonacoEditor code={code} disabled={disabled || isAssessing} onChange={onCodeChange} />
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
          disabled={disabled || isAssessing}
          onClick={handleRun}
        >
          Uji Coba
        </Button>

        <Button disabled={disabled || isAssessing} onClick={onSubmit}>
          {getSubmitLabel()}
        </Button>
      </div>
    </div>
  );
}
