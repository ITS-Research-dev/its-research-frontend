import { ReactNode } from "react";

interface EmptyStateProps {
  title: string;

  description: string;

  action?: ReactNode;
}

export default function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20">
      <h2 className="text-xl font-semibold text-text">{title}</h2>

      <p className="mt-2 text-description">{description}</p>

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
