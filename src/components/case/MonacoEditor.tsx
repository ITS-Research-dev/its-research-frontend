"use client";

import { useRef } from "react";

import Editor, { OnMount } from "@monaco-editor/react";
import type { editor } from "monaco-editor";

import { JetBrains_Mono } from "next/font/google";
import { registerPythonLanguage } from "@/lib/api/pythonLanguage";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
});

interface Props {
  code: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

const editorOptions: editor.IStandaloneEditorConstructionOptions = {
  automaticLayout: true,
  autoIndent: "full",
  autoClosingBrackets: "always",
  autoClosingQuotes: "always",
  autoSurround: "languageDefined",
  tabSize: 4,
  insertSpaces: true,
  detectIndentation: false,
  formatOnPaste: true,
  formatOnType: true,
  guides: {
    indentation: true,
    bracketPairs: true,
  },
  bracketPairColorization: {
    enabled: true,
  },
};

export default function MonacoEditor({
  code,
  disabled = false,
  onChange,
}: Props) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleMount: OnMount = (editorInstance, monaco) => {
    editorRef.current = editorInstance;

    editorInstance.focus();

    registerPythonLanguage(monaco);

    monaco.editor.setTheme("vs-dark");
  };

  return (
    <Editor
      height="400px"
      language="python"
      theme="vs-dark"
      value={code}
      className={jetbrainsMono.className}
      onMount={handleMount}
      onChange={(value) => onChange(value ?? "")}
      options={{
        ...editorOptions,
        readOnly: disabled,
      }}
    />
  );
}
