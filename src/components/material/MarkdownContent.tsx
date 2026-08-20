// components/material/MarkdownContent.tsx
"use client";

import { useMemo } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

const renderer = new marked.Renderer();

// code block custom: tambah header bahasa + styling rounded/shadow
renderer.code = ({ text, lang }) => {
  const validLang = lang && hljs.getLanguage(lang) ? lang : "plaintext";
  const highlighted = hljs.highlight(text, { language: validLang }).value;

  return `
    <div class="my-6 overflow-hidden rounded-xl border border-slate-800 bg-[#0d1117] shadow-md">
      <div class="flex items-center justify-between bg-slate-900/80 px-4 py-2 text-xs font-medium text-slate-400">
        <span class="uppercase tracking-wide">${validLang}</span>
      </div>
      <pre class="overflow-x-auto p-4 text-sm leading-relaxed"><code class="hljs language-${validLang}">${highlighted}</code></pre>
    </div>
  `;
};

// blockquote jadi "tips box" bergaya, bukan quote biasa
renderer.blockquote = ({ tokens }) => {
  const innerHtml = marked.parser(tokens);
  return `
    <div class="my-6 flex gap-3 rounded-lg border-l-4 border-primary bg-primary/5 p-4">
      <span class="text-lg">💡</span>
      <div class="text-sm text-slate-700 [&_p]:m-0">${innerHtml}</div>
    </div>
  `;
};

// heading dengan anchor + spacing lebih lega
renderer.heading = ({ tokens, depth }) => {
  const html = marked.parseInline(tokens.map((t: any) => t.raw ?? t.text).join(""));
  const plainText = tokens.map((t: any) => t.text ?? "").join("");
  const id = plainText.toLowerCase().replace(/[^\w]+/g, "-");
  const sizes: Record<number, string> = {
    1: "text-3xl font-bold mt-2 mb-4",
    2: "text-2xl font-bold mt-10 mb-4 pb-2 border-b border-slate-200",
    3: "text-xl font-semibold mt-8 mb-3",
  };
  return `<h${depth} id="${id}" class="${sizes[depth] ?? "text-lg font-semibold mt-6 mb-2"} text-slate-900 scroll-mt-24">${html}</h${depth}>`;
};

marked.use({ renderer });

export default function MarkdownContent({ content }: { content: string }) {
  const html = useMemo(() => {
    try {
      const raw = marked.parse(content) as string;
      return DOMPurify.sanitize(raw);
    } catch (err) {
      console.error("Markdown parse error:", err);
      return `<p class="text-red-500">Gagal memuat konten materi.</p>`;
    }
  }, [content]);

  return (
    <div
      className="prose prose-slate max-w-none prose-p:leading-7 prose-p:text-slate-700 prose-strong:text-slate-900 prose-ol:my-4 prose-li:my-1"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}