import { Lightbulb } from "lucide-react";

interface SummaryCardProps {
  children: React.ReactNode;
}

export default function SummaryCard({ children }: SummaryCardProps) {
  return (
    <div className="my-8 rounded-2xl border border-warning bg-warning/10 p-6">
      <div className="mb-3 flex items-center gap-2">
        <Lightbulb size={20} className="text-warning" />

        <h3 className="font-semibold text-warning">Ringkasan</h3>
      </div>

      <div className="text-text leading-7">{children}</div>
    </div>
  );
}
