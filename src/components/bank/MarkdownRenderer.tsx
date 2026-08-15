"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article
      className="
        mx-auto
        w-full
        max-w-4xl
        text-[15px]
        leading-7
        text-text
      "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          /* =========================
             HEADING 1
          ========================= */

          h1: ({ children }) => (
            <h1
              className="
                mb-5
                mt-2
                border-b
                border-border
                pb-3
                text-3xl
                font-bold
                leading-tight
                text-text
              "
            >
              {children}
            </h1>
          ),

          /* =========================
             HEADING 2
          ========================= */

          h2: ({ children }) => (
            <h2
              className="
                mb-4
                mt-9
                border-b
                border-border
                pb-2
                text-xl
                font-bold
                leading-tight
                text-text
              "
            >
              {children}
            </h2>
          ),

          /* =========================
             HEADING 3
          ========================= */

          h3: ({ children }) => (
            <h3
              className="
                mb-3
                mt-7
                text-lg
                font-bold
                leading-tight
                text-text
              "
            >
              {children}
            </h3>
          ),

          /* =========================
             PARAGRAPH
          ========================= */

          p: ({ children }) => (
            <p
              className="
                mb-5
                text-[15px]
                leading-7
                text-description
              "
            >
              {children}
            </p>
          ),

          /* =========================
             STRONG
          ========================= */

          strong: ({ children }) => (
            <strong className="font-bold text-text">{children}</strong>
          ),

          /* =========================
             EMPHASIS
          ========================= */

          em: ({ children }) => (
            <em className="italic text-text">{children}</em>
          ),

          /* =========================
             DELETE
          ========================= */

          del: ({ children }) => (
            <del className="text-description">{children}</del>
          ),

          /* =========================
             LINK
          ========================= */

          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                font-medium
                text-primary
                underline
                underline-offset-2
                transition
                hover:text-primary-hover
              "
            >
              {children}
            </a>
          ),

          /* =========================
             UNORDERED LIST
          ========================= */

          ul: ({ children }) => (
            <ul
              className="
                mb-5
                ml-6
                list-disc
                space-y-2
                text-description
              "
            >
              {children}
            </ul>
          ),

          /* =========================
             ORDERED LIST
          ========================= */

          ol: ({ children }) => (
            <ol
              className="
                mb-5
                ml-6
                list-decimal
                space-y-2
                text-description
              "
            >
              {children}
            </ol>
          ),

          /* =========================
             LIST ITEM
          ========================= */

          li: ({ children }) => <li className="pl-1 leading-7">{children}</li>,

          /* =========================
             BLOCKQUOTE
          ========================= */

          blockquote: ({ children }) => (
            <blockquote
              className="
                my-6
                border-l-4
                border-primary
                bg-primary/5
                px-5
                py-4
                text-description
                italic
              "
            >
              {children}
            </blockquote>
          ),

          /* =========================
             INLINE CODE
          ========================= */

          code: ({ children, className }) => {
            const isBlock =
              typeof className === "string" && className.includes("language-");

            if (!isBlock) {
              return (
                <code
                  className="
                    rounded-md
                    bg-gray-100
                    px-1.5
                    py-0.5
                    font-mono
                    text-[13px]
                    font-medium
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
                  font-mono
                  text-[13px]
                  leading-6
                  text-gray-100
                  ${className ?? ""}
                `}
              >
                {children}
              </code>
            );
          },

          /* =========================
             CODE BLOCK
          ========================= */

          pre: ({ children }) => (
            <div className="my-6 overflow-hidden rounded-xl border border-gray-800 bg-[#0d1117] shadow-sm">
              <div className="flex items-center border-b border-gray-800 bg-[#161b22] px-4 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>

                <span className="ml-3 text-xs text-gray-400">Code</span>
              </div>

              <pre
                className="
                  overflow-x-auto
                  p-5
                  text-[13px]
                  leading-6
                "
              >
                {children}
              </pre>
            </div>
          ),

          /* =========================
             HORIZONTAL RULE
          ========================= */

          hr: () => <hr className="my-8 border-border" />,

          /* =========================
             TABLE
          ========================= */

          table: ({ children }) => (
            <div className="my-6 w-full overflow-x-auto rounded-xl border border-border">
              <table className="w-full border-collapse text-sm">
                {children}
              </table>
            </div>
          ),

          thead: ({ children }) => (
            <thead className="bg-gray-50">{children}</thead>
          ),

          th: ({ children }) => (
            <th
              className="
                border-b
                border-border
                px-4
                py-3
                text-left
                text-sm
                font-semibold
                text-text
              "
            >
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td
              className="
                border-b
                border-border
                px-4
                py-3
                text-sm
                leading-6
                text-description
              "
            >
              {children}
            </td>
          ),

          /* =========================
             IMAGE
          ========================= */

          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt ?? ""}
              className="
                my-6
                max-h-120
                w-auto
                max-w-full
                rounded-xl
                border
                border-border
                object-contain
              "
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
