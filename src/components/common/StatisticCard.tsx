import { ReactNode } from "react";

interface StatisticCardProps {
  title: string;

  value: string | number;

  icon?: ReactNode;

  color?: string;
}

export default function StatisticCard({
  title,
  value,
  icon,
  color = "bg-primary/10",
}: StatisticCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-description">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-text">{value}</h2>
        </div>

        {icon && <div className={`rounded-xl p-4 ${color}`}>{icon}</div>}
      </div>
    </div>
  );
}
