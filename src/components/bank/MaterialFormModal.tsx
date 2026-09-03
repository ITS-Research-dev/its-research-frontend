"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
  Eye,
  Pencil,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

import { BankMaterial } from "@/types/bank";

interface Props {
  open: boolean;
  mode: "create" | "edit";
  material?: BankMaterial;
  onClose: () => void;
  onSubmit: (data: MaterialFormData) => void;
}

export interface MaterialFormData {
  title: string;
  description: string;
  content: string;
  startDate: string;
  status: "active" | "inactive";
}

const initialForm: MaterialFormData = {
  title: "",
  description: "",
  content: "",
  startDate: "",
  status: "active",
};

type EditorMode = "write" | "preview";

const TITLE_MAX_LENGTH = 150;
const DESCRIPTION_MAX_LENGTH = 1000;

export default function MaterialFormModal({
  open,
  mode,
  material,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<MaterialFormData>(initialForm);

  const [editorMode, setEditorMode] = useState<EditorMode>("write");

  const [errors, setErrors] = useState<
    Partial<Record<keyof MaterialFormData, string>>
  >({});

  useEffect(() => {
    if (!open) return;

    setEditorMode("write");

    setErrors({});

    if (mode === "edit" && material) {
      setForm({
        title: material.title,
        description: material.description,
        content: material.content,
        startDate: material.startDate,
        status: material.status,
      });
    } else {
      setForm({
        ...initialForm,
      });
    }
  }, [open, mode, material]);

  const updateField = <K extends keyof MaterialFormData>(
    field: K,
    value: MaterialFormData[K],
  ) => {
    if (field === "title") {
      const v = String(value).slice(0, TITLE_MAX_LENGTH) as MaterialFormData[K];
      setForm((prev) => ({
        ...prev,
        [field]: v,
      }));
    } else if (field === "description") {
      const v = String(value).slice(0, DESCRIPTION_MAX_LENGTH) as MaterialFormData[K];
      setForm((prev) => ({
        ...prev,
        [field]: v,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const containsSymbols = (text: string) => {
  return /[^a-zA-Z0-9\s\u00C0-\u024F-]/.test(text);
  };

  const handleSubmit = () => {
  const newErrors: Partial<Record<keyof MaterialFormData, string>> = {};

  if (!form.startDate) {
    newErrors.startDate = "Tanggal mulai wajib diisi.";
  }

  if (!form.title.trim()) {
    newErrors.title = "Judul materi wajib diisi.";
  } else if (form.title.length > TITLE_MAX_LENGTH) {
    newErrors.title = `Batas maksimal judul adalah ${TITLE_MAX_LENGTH} karakter.`;
  } else if (containsSymbols(form.title)) {
    newErrors.title = "Judul hanya boleh berisi huruf, angka, spasi, dan tanda hubung (-).";
  }

  if (!form.description.trim()) {
    newErrors.description = "Deskripsi materi wajib diisi.";
  } else if (form.description.length > DESCRIPTION_MAX_LENGTH) {
    newErrors.description = `Batas maksimal deskripsi adalah ${DESCRIPTION_MAX_LENGTH} karakter.`;
  } else if (containsSymbols(form.description)) {
    newErrors.description = "Deskripsi hanya boleh berisi huruf, angka, spasi, dan tanda hubung (-).";
  }

  if (!form.content.trim()) {
    newErrors.content = "Konten materi wajib diisi.";
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    return;
  }

  onSubmit(form);
};

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === "create" ? "Tambah Materi Manual" : "Edit Materi"}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>

          <Button onClick={handleSubmit}>
            {mode === "create" ? "Simpan Materi" : "Simpan Perubahan"}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* ================= STATUS & TANGGAL ================= */}

        <div className="grid gap-5 md:grid-cols-2">
          {/* Status */}

          <div>
            <label className="mb-2 block text-sm font-medium text-text">
              Status
            </label>

            <button
              type="button"
              onClick={() =>
                updateField(
                  "status",
                  form.status === "active" ? "inactive" : "active",
                )
              }
              className="flex items-center gap-3"
            >
              <span
                className={`
                  relative
                  h-7
                  w-12
                  rounded-full
                  transition
                  ${form.status === "active" ? "bg-success" : "bg-gray-300"}
                `}
              >
                <span
                  className={`
                    absolute
                    top-1
                    h-5
                    w-5
                    rounded-full
                    bg-white
                    shadow
                    transition
                    ${form.status === "active" ? "left-6" : "left-1"}
                  `}
                />
              </span>

              <span>
                <span className="block text-sm font-medium text-text">
                  {form.status === "active" ? "Aktif" : "Tidak Aktif"}
                </span>

                <span className="block text-xs text-description">
                  {form.status === "active"
                    ? "Materi dapat digunakan siswa."
                    : "Materi tidak ditampilkan kepada siswa."}
                </span>
              </span>
            </button>
          </div>

          {/* Tanggal */}

          <Input
            label="Tanggal Mulai"
            type="date"
            value={form.startDate}
            required
            error={errors.startDate}
            onChange={(e) => updateField("startDate", e.target.value)}
          />
        </div>

        {/* ================= JUDUL ================= */}

        <Input
          label="Judul"
          required
          placeholder="mis. Perulangan (Loop)"
          value={form.title}
          error={errors.title}
          maxLength={TITLE_MAX_LENGTH}
          onChange={(e) => updateField("title", e.target.value)}
        />

        {/* ================= DESKRIPSI ================= */}

        <Textarea
          label="Deskripsi"
          placeholder="Siswa mampu memahami konsep perulangan..."
          value={form.description}
          required
          error={errors.description}
          onChange={(e) => updateField("description", e.target.value)}
          maxLength={DESCRIPTION_MAX_LENGTH}
        />

        {/* ================= MARKDOWN ================= */}

        <MarkdownEditor
          value={form.content}
          onChange={(value) => updateField("content", value)}
          mode={editorMode}
          error={errors.description}
          onModeChange={setEditorMode}
        />

        {/* character helper */}
        <div className="flex justify-between text-xs text-description">
          <div>Judul: {form.title.length}/{TITLE_MAX_LENGTH}</div>
          <div>Deskripsi: {form.description.length}/{DESCRIPTION_MAX_LENGTH}</div>
        </div>
      </div>
    </Modal>
  );
}

/* =========================================================
   MARKDOWN EDITOR
========================================================= */

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  mode: EditorMode;
  onModeChange: (mode: EditorMode) => void;
  error?: string;
}

function MarkdownEditor({
  value,
  onChange,
  mode,
  onModeChange,
  error,
}: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /*
   * Memasukkan syntax Markdown pada posisi cursor
   */
  const insertMarkdown = (before: string, after = "", defaultText = "") => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selected = value.slice(start, end);

    const text = selected || defaultText;

    const newValue =
      value.slice(0, start) + before + text + after + value.slice(end);

    onChange(newValue);

    requestAnimationFrame(() => {
      textarea.focus();

      if (selected) {
        const cursorPosition =
          start + before.length + selected.length + after.length;

        textarea.setSelectionRange(cursorPosition, cursorPosition);
      } else {
        const cursorPosition = start + before.length;

        textarea.setSelectionRange(cursorPosition, cursorPosition);
      }
    });
  };

  const insertLinePrefix = (prefix: string) => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selected = value.slice(start, end);

    /*
     * Jika ada beberapa baris yang dipilih,
     * prefix akan diberikan ke setiap baris.
     */
    const formatted = selected
      .split("\n")
      .map((line) => `${prefix}${line}`)
      .join("\n");

    const newValue = value.slice(0, start) + formatted + value.slice(end);

    onChange(newValue);

    requestAnimationFrame(() => {
      textarea.focus();

      textarea.setSelectionRange(start, start + formatted.length);
    });
  };

  const insertLink = () => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selected = value.slice(start, end);

    const linkText = selected || "teks link";

    const markdown = `[${linkText}](https://example.com)`;

    const newValue = value.slice(0, start) + markdown + value.slice(end);

    onChange(newValue);

    requestAnimationFrame(() => {
      textarea.focus();

      /*
       * Cursor ditempatkan di URL
       */
      const urlStart = start + linkText.length + 3;

      textarea.setSelectionRange(urlStart, urlStart + 19);
    });
  };

  return (
    <div>
      {/* Label */}

      <div className="mb-2 flex items-center justify-between">
        <label className="block text-sm font-medium text-text">
          Konten Materi
          <span className="ml-1 text-danger">*</span>
        </label>

        <span className="text-xs text-description">Markdown supported</span>
      </div>

      {/* Editor Container */}

      <div
        className={`overflow-hidden rounded-xl border ${
          error ? "border-danger" : "border-border"
        }`}
      >
        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between border-b border-border bg-surface px-3 py-2">
          {/* Toolbar */}

          {mode === "write" && (
            <div className="flex flex-wrap items-center gap-1">
              {/* Bold */}

              <ToolbarButton
                title="Bold"
                onClick={() => insertMarkdown("**", "**", "tebal")}
              >
                <Bold size={16} />
              </ToolbarButton>

              {/* Italic */}

              <ToolbarButton
                title="Italic"
                onClick={() => insertMarkdown("*", "*", "miring")}
              >
                <Italic size={16} />
              </ToolbarButton>

              {/* Strikethrough */}

              <ToolbarButton
                title="Strikethrough"
                onClick={() => insertMarkdown("~~", "~~", "coret")}
              >
                <Strikethrough size={16} />
              </ToolbarButton>

              <ToolbarDivider />

              {/* Heading 1 */}

              <ToolbarButton
                title="Heading 1"
                onClick={() => insertLinePrefix("# ")}
              >
                <Heading1 size={17} />
              </ToolbarButton>

              {/* Heading 2 */}

              <ToolbarButton
                title="Heading 2"
                onClick={() => insertLinePrefix("## ")}
              >
                <Heading2 size={17} />
              </ToolbarButton>

              {/* Quote */}

              <ToolbarButton
                title="Quote"
                onClick={() => insertLinePrefix("> ")}
              >
                <Quote size={16} />
              </ToolbarButton>

              {/* Code */}

              <ToolbarButton
                title="Inline Code"
                onClick={() => insertMarkdown("```", "```", "kode")}
              >
                <Code size={16} />
              </ToolbarButton>

              <ToolbarDivider />

              {/* Bullet List */}

              <ToolbarButton
                title="Bullet List"
                onClick={() => insertLinePrefix("- ")}
              >
                <List size={17} />
              </ToolbarButton>

              {/* Numbered List */}

              <ToolbarButton
                title="Numbered List"
                onClick={() => insertLinePrefix("1. ")}
              >
                <ListOrdered size={17} />
              </ToolbarButton>

              {/* Link */}

              <ToolbarButton title="Link" onClick={insertLink}>
                <LinkIcon size={16} />
              </ToolbarButton>
            </div>
          )}

          {/* Write / Preview */}

          <div className="ml-auto flex rounded-lg bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => onModeChange("write")}
              className={`
                flex
                items-center
                gap-2
                rounded-md
                px-3
                py-1.5
                text-xs
                font-medium
                transition
                ${
                  mode === "write"
                    ? "bg-white text-text shadow-sm"
                    : "text-description hover:text-text"
                }
              `}
            >
              <Pencil size={14} />
              Tulis
            </button>

            <button
              type="button"
              onClick={() => onModeChange("preview")}
              className={`
                flex
                items-center
                gap-2
                rounded-md
                px-3
                py-1.5
                text-xs
                font-medium
                transition
                ${
                  mode === "preview"
                    ? "bg-white text-text shadow-sm"
                    : "text-description hover:text-text"
                }
              `}
            >
              <Eye size={14} />
              Preview
            </button>
          </div>
        </div>

        {/* ================= CONTENT ================= */}

        {mode === "write" ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Tulis materi menggunakan Markdown...

Contoh:

# Perulangan

Perulangan digunakan untuk menjalankan kode
secara berulang.

## For Loop

Gunakan **for** untuk melakukan perulangan.

- for
- while

` + "`print(\"Hello\")`"}
            className="
              min-h-90
              w-full
              resize-y
              bg-surface
              px-4
              py-4
              text-sm
              leading-7
              text-text
              outline-none
              placeholder:text-description/60
            "
          />
        ) : (
          <div
            className="
              min-h-90
              max-h-125
              overflow-y-auto
              bg-surface
              px-6
              py-5
            "
          >
            {value.trim() ? (
              <MarkdownPreview content={value} />
            ) : (
              <p className="text-sm text-description">
                Belum ada konten untuk ditampilkan.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Helper */}

      <p className="mt-2 text-xs text-description">
        Gunakan toolbar untuk memformat teks atau tulis Markdown secara
        langsung.
      </p>
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  );
}

/* =========================================================
   TOOLBAR BUTTON
======================================================== */

interface ToolbarButtonProps {
  children: React.ReactNode;
  title: string;
  onClick: () => void;
}

function ToolbarButton({ children, title, onClick }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-lg
        text-description
        transition
        hover:bg-primary/10
        hover:text-primary
      "
    >
      {children}
    </button>
  );
}

/* =========================================================
   TOOLBAR DIVIDER
======================================================== */

function ToolbarDivider() {
  return <span className="mx-1 h-5 w-px bg-border" />;
}

/* =========================================================
   MARKDOWN PREVIEW
======================================================== */

interface MarkdownPreviewProps {
  content: string;
}

function MarkdownPreview({ content }: MarkdownPreviewProps) {
  return (
    <div
      className="
        prose
        prose-sm
        max-w-none

        text-text

        prose-headings:text-text
        prose-p:text-description
        prose-strong:text-text
        prose-a:text-primary
        prose-code:text-primary
        prose-blockquote:text-description
      "
    >
      <ReactMarkdown
        components={{
          code({ children, className }) {
            const isInline = !className;

            if (isInline) {
              return (
                <code
                  className="
                    rounded-md
                    bg-gray-100
                    px-1.5
                    py-0.5
                    font-mono
                    text-sm
                    text-primary
                  "
                >
                  {children}
                </code>
              );
            }

            return (
              <code
                className={`
                  block
                  overflow-x-auto
                  rounded-xl
                  bg-gray-900
                  p-4
                  font-mono
                  text-sm
                  text-white
                  ${className ?? ""}
                `}
              >
                {children}
              </code>
            );
          },

          blockquote({ children }) {
            return (
              <blockquote
                className="
                  border-l-4
                  border-primary
                  bg-primary/5
                  px-4
                  py-2
                  italic
                "
              >
                {children}
              </blockquote>
            );
          },

          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}