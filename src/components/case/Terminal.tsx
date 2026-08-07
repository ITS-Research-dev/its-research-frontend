"use client";

import { useEffect, useImperativeHandle, useRef, forwardRef } from "react";

import "xterm/css/xterm.css";

export interface TerminalRef {
  clear: () => void;
  write: (text: string) => void;
  writeln: (text: string) => void;
}

const CodeTerminal = forwardRef<TerminalRef>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const terminalRef = useRef<any>(null);

  const fitAddonRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    clear() {
      terminalRef.current?.clear();
    },

    write(text: string) {
      terminalRef.current?.write(text);
    },

    writeln(text: string) {
      terminalRef.current?.writeln(text);
    },
  }));

  useEffect(() => {
    let mounted = true;

    let resizeHandler: (() => void) | null = null;

    async function initTerminal() {
      if (!containerRef.current) return;

      const { Terminal } = await import("xterm");

      const { FitAddon } = await import("xterm-addon-fit");

      if (!mounted) return;

      const fitAddon = new FitAddon();

      const terminal = new Terminal({
        cursorBlink: true,

        convertEol: true,

        fontFamily: "JetBrains Mono",

        fontSize: 14,

        theme: {
          background: "#111827",

          foreground: "#E5E7EB",

          cursor: "#FFFFFF",

          selectionBackground: "#374151",
        },
      });

      terminal.loadAddon(fitAddon);

      terminal.open(containerRef.current);

      requestAnimationFrame(() => {
        fitAddon.fit();
      });

      terminal.writeln("Python Terminal");
      terminal.writeln("");
      terminal.writeln("> Klik 'Uji Coba' untuk menjalankan program.");

      terminalRef.current = terminal;
      fitAddonRef.current = fitAddon;

      resizeHandler = () => {
        fitAddonRef.current?.fit();
      };

      window.addEventListener("resize", resizeHandler);
    }

    initTerminal();

    return () => {
      mounted = false;

      if (resizeHandler) {
        window.removeEventListener("resize", resizeHandler);
      }

      terminalRef.current?.dispose();
    };
  }, []);

  return (
    <div className="border-t border-border">
      <div className="bg-[#1F2937] px-5 py-2">
        <h3 className="font-semibold text-white">Terminal</h3>
      </div>

      <div ref={containerRef} className="h-52 w-full bg-[#111827]" />
    </div>
  );
});

CodeTerminal.displayName = "CodeTerminal";

export default CodeTerminal;
