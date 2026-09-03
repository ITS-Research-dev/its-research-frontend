"use client";

import { useEffect, useImperativeHandle, useRef, forwardRef } from "react";

import "xterm/css/xterm.css";

export interface TerminalRef {
  clear: () => void;
  write: (text: string) => void;
  writeln: (text: string) => void;
  readLine: (prompt?: string) => Promise<string>;
  cancelInput: () => void;
  focus: () => void;
}

const CodeTerminal = forwardRef<TerminalRef>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const terminalRef = useRef<any>(null);

  const fitAddonRef = useRef<any>(null);

  const inputResolverRef = useRef<{
    resolve: (val: string) => void;
    reject: (err: any) => void;
    buffer: string;
  } | null>(null);

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

    focus() {
      terminalRef.current?.focus();
    },

    cancelInput() {
      if (inputResolverRef.current) {
        inputResolverRef.current.reject(new Error("Cancelled"));
        inputResolverRef.current = null;
      }
      if (terminalRef.current) {
        terminalRef.current.options.cursorBlink = false;
        terminalRef.current.options.theme = {
          ...terminalRef.current.options.theme,
          cursor: "transparent",
        };
      }
    },

    readLine(prompt?: string): Promise<string> {
      return new Promise((resolve, reject) => {
        if (!terminalRef.current) {
          resolve("");
          return;
        }

        if (inputResolverRef.current) {
          inputResolverRef.current.reject(new Error("Cancelled"));
        }

        const terminal = terminalRef.current;

        if (prompt) {
          terminal.write(prompt);
        }

        terminal.options.cursorBlink = true;
        terminal.options.theme = {
          ...terminal.options.theme,
          cursor: "#FFFFFF",
        };
        terminal.focus();

        inputResolverRef.current = {
          resolve: (val: string) => {
            terminal.options.cursorBlink = false;
            terminal.options.theme = {
              ...terminal.options.theme,
              cursor: "transparent",
            };
            inputResolverRef.current = null;
            resolve(val);
          },
          reject: (err: any) => {
            terminal.options.cursorBlink = false;
            terminal.options.theme = {
              ...terminal.options.theme,
              cursor: "transparent",
            };
            inputResolverRef.current = null;
            reject(err);
          },
          buffer: "",
        };
      });
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

          cursor: "transparent",

          selectionBackground: "#374151",
        },
      });

      terminal.loadAddon(fitAddon);

      terminal.open(containerRef.current);

      requestAnimationFrame(() => {
        fitAddon.fit();
      });

      terminal.onData((data: string) => {
        const active = inputResolverRef.current;
        if (!active) return;

        // Enter key
        if (data === "\r" || data === "\n" || data === "\r\n") {
          terminal.writeln("");
          active.resolve(active.buffer);
          return;
        }

        // Backspace key
        if (data === "\x7f" || data === "\b") {
          if (active.buffer.length > 0) {
            active.buffer = active.buffer.slice(0, -1);
            terminal.write("\b \b");
          }
          return;
        }

        // Ctrl+C
        if (data === "\x03") {
          terminal.writeln("^C");
          active.reject(new Error("Cancelled"));
          return;
        }

        // Printable text
        let printable = "";
        for (let i = 0; i < data.length; i++) {
          const code = data.charCodeAt(i);
          if (code >= 32 || code === 9) {
            printable += data[i];
          }
        }

        if (printable.length > 0) {
          active.buffer += printable;
          terminal.write(printable);
        }
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

      <div
        ref={containerRef}
        className="h-52 w-full bg-[#111827]"
        onClick={() => terminalRef.current?.focus()}
      />
    </div>
  );
});

CodeTerminal.displayName = "CodeTerminal";

export default CodeTerminal;
