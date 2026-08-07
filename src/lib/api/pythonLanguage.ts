import type * as monaco from "monaco-editor";

export function registerPythonLanguage(monacoInstance: typeof monaco) {
  monacoInstance.languages.setLanguageConfiguration("python", {
    comments: {
      lineComment: "#",
    },

    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"],
    ],

    autoClosingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: "{", close: "}" },
      { open: "'", close: "'" },
      { open: '"', close: '"' },
    ],

    surroundingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: "{", close: "}" },
      { open: "'", close: "'" },
      { open: '"', close: '"' },
    ],

    indentationRules: {
      increaseIndentPattern: /^.*:\s*$/,

      decreaseIndentPattern: /^\s*(return|break|continue|pass|raise)\b/,
    },
  });
}
