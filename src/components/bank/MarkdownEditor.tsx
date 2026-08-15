"use client";

import { useRef } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  List,
  ListOrdered,
  Link,
  Code2,
  Quote,
} from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export default function MarkdownEditor({
  value,
  onChange,
  label = "Konten Materi",
  error,
  required = false,
  placeholder = "Tulis materi menggunakan Markdown...",
}: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (before: string, after = "", defaultText = "teks") => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selectedText = value.slice(start, end);
    const text = selectedText || defaultText;

    const newValue =
      value.slice(0, start) + before + text + after + value.slice(end);

    onChange(newValue);

    requestAnimationFrame(() => {
      textarea.focus();

      const selectionStart = start + before.length;
      const selectionEnd = selectionStart + text.length;

      textarea.setSelectionRange(selectionStart, selectionEnd);
    });
  };

  const insertLine = (prefix: string, defaultText = "Item") => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selectedText = value.slice(start, end);

    const text = selectedText || defaultText;

    const newValue = value.slice(0, start) + prefix + text + value.slice(end);

    onChange(newValue);

    requestAnimationFrame(() => {
      textarea.focus();

      const selectionStart = start + prefix.length;
      const selectionEnd = selectionStart + text.length;

      textarea.setSelectionRange(selectionStart, selectionEnd);
    });
  };

  const insertLink = () => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selectedText = value.slice(start, end);

    const text = selectedText || "teks link";

    const markdown = `[${text}](https://example.com)`;

    const newValue = value.slice(0, start) + markdown + value.slice(end);

    onChange(newValue);

    requestAnimationFrame(() => {
      textarea.focus();

      const urlStart = start + text.length + 3;
      const urlEnd = urlStart + "https://example.com".length;

      textarea.setSelectionRange(urlStart, urlEnd);
    });
  };

  const insertCode = () => {
    insertMarkdown("`", "`", "code");
  };

  const insertCodeBlock = () => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selectedText = value.slice(start, end);

    const text = selectedText || "const example = true;";

    const markdown = `\`\`\`javascript\n${text}\n\`\`\``;

    const newValue = value.slice(0, start) + markdown + value.slice(end);

    onChange(newValue);

    requestAnimationFrame(() => {
      textarea.focus();

      const cursorPosition = start + markdown.length;

      textarea.setSelectionRange(cursorPosition, cursorPosition);
    });
  };

  const tools = [
    {
      label: "Bold",
      icon: Bold,
      action: () => insertMarkdown("**", "**"),
    },
    {
      label: "Italic",
      icon: Italic,
      action: () => insertMarkdown("*", "*"),
    },
    {
      label: "Strikethrough",
      icon: Strikethrough,
      action: () => insertMarkdown("~~", "~~"),
    },
    {
      label: "Heading",
      icon: Heading2,
      action: () => insertLine("## ", "Judul"),
    },
    {
      label: "Bullet List",
      icon: List,
      action: () => insertLine("- ", "Item"),
    },
    {
      label: "Numbered List",
      icon: ListOrdered,
      action: () => insertLine("1. ", "Item"),
    },
    {
      label: "Quote",
      icon: Quote,
      action: () => insertLine("> ", "Kutipan"),
    },
    {
      label: "Inline Code",
      icon: Code2,
      action: insertCode,
    },
    {
      label: "Code Block",
      icon: Code2,
      action: insertCodeBlock,
    },
    {
      label: "Link",
      icon: Link,
      action: insertLink,
    },
  ];

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-text">
          {label}

          {required && <span className="ml-1 text-danger">*</span>}
        </label>
      )}

      <div
        className={`
          overflow-hidden
          rounded-xl
          border
          bg-surface

          ${
            error
              ? "border-danger"
              : "border-border focus-within:border-primary"
          }
        `}
      >
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 border-b border-border bg-gray-50 p-2">
          {tools.map((tool) => {
            const Icon = tool.icon;

            return (
              <button
                key={tool.label}
                type="button"
                title={tool.label}
                onClick={tool.action}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  text-description
                  transition
                  hover:bg-primary/10
                  hover:text-primary
                "
              >
                <Icon size={17} />
              </button>
            );
          })}
        </div>

        {/* Editor */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="
            min-h-80
            w-full
            resize-y
            bg-surface
            px-4
            py-4
            font-mono
            text-sm
            leading-7
            text-text
            outline-none
            placeholder:text-description/60
          "
        />
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-danger">{error}</p>
      ) : (
        <p className="mt-1.5 text-xs text-description">
          Mendukung Markdown seperti heading, bold, italic, list, link, quote,
          dan code.
        </p>
      )}
    </div>
  );
}
