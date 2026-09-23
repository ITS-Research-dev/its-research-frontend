// components/material/MarkdownContent.tsx
"use client";

import { useMemo } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

const renderer = new marked.Renderer();

// code block custom: tambah header bahasa + styling rounded/shadow
renderer.code = function (this: any, token: any) {
  const text = token.text || "";
  const lang = token.lang || "";
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
renderer.blockquote = function (this: any, token: any) {
  const innerHtml = this.parser.parse(token.tokens || []);
  return `
    <div class="my-6 flex gap-3 rounded-lg border-l-4 border-primary bg-primary/5 p-4">
      <span class="text-lg">💡</span>
      <div class="text-sm text-slate-700 [&_p]:m-0">${innerHtml}</div>
    </div>
  `;
};

// table custom: styling container overflow, border, rounded, and hover
renderer.tablecell = function (this: any, token: any) {
  const content = this.parser.parseInline(token.tokens || []);
  const alignClass = token.align ? `text-${token.align}` : "text-left";
  if (token.header) {
    return `<th class="px-4 py-3 font-semibold text-slate-800 border-b border-slate-200 ${alignClass}">${content}</th>`;
  }
  return `<td class="px-4 py-2.5 text-slate-700 ${alignClass}">${content}</td>`;
};

renderer.tablerow = function (this: any, token: any) {
  return `<tr class="hover:bg-slate-50/80 transition-colors">${token.text}</tr>`;
};

renderer.table = function (this: any, token: any) {
  const headerCells = (token.header || []).map((cell: any) => this.tablecell(cell)).join("");
  const headerRow = `<tr class="hover:bg-slate-50/80 transition-colors">${headerCells}</tr>`;

  const bodyRows = (token.rows || [])
    .map((row: any[]) => {
      const rowCells = row.map((cell: any) => this.tablecell(cell)).join("");
      return `<tr class="hover:bg-slate-50/80 transition-colors">${rowCells}</tr>`;
    })
    .join("");

  return `
    <div class="my-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
      <table class="w-full text-left text-sm border-collapse">
        <thead class="bg-slate-100/90 text-slate-800 font-semibold text-xs border-b border-slate-200">
          ${headerRow}
        </thead>
        <tbody class="divide-y divide-slate-100 bg-white">
          ${bodyRows}
        </tbody>
      </table>
    </div>
  `;
};

// heading dengan anchor + spacing lebih lega
renderer.heading = function (this: any, token: any) {
  const html = this.parser.parseInline(token.tokens || []);
  const plainText = token.text ?? "";
  const id = plainText.toLowerCase().replace(/[^\w]+/g, "-");
  const sizes: Record<number, string> = {
    1: "text-3xl font-bold mt-2 mb-4",
    2: "text-2xl font-bold mt-10 mb-4 pb-2 border-b border-slate-200",
    3: "text-xl font-semibold mt-8 mb-3",
  };
  return `<h${token.depth} id="${id}" class="${sizes[token.depth] ?? "text-lg font-semibold mt-6 mb-2"} text-slate-900 scroll-mt-24">${html}</h${token.depth}>`;
};

marked.use({ gfm: true, renderer });

export default function MarkdownContent({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) {
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
      className={`prose prose-slate max-w-none prose-p:leading-7 prose-p:text-slate-700 prose-strong:text-slate-900 prose-ol:my-4 prose-li:my-1 prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-primary prose-code:font-mono prose-code:before:content-none prose-code:after:content-none ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}