interface CodeBlockProps {
  children: string;
}

export default function CodeBlock({ children }: CodeBlockProps) {
  return (
    <pre className="my-6 overflow-x-auto rounded-2xl bg-slate-900 p-5">
      <code className="font-mono text-sm text-slate-100">{children}</code>
    </pre>
  );
}
