import Card from "@/components/ui/Card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  iconBackground?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconColor = "text-primary",
  iconBackground = "bg-primary/10",
}: StatCardProps) {
  return (
    <Card
      className="
        group
        p-4
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
        hover:border-primary
      "
    >
      <div
        className={`
          mb-5
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          ${iconBackground}
        `}
      >
        <Icon
          size={28}
          className={`${iconColor} transition-transform duration-300 group-hover:scale-110`}
        />
      </div>

      <h2 className="text-3xl font-bold text-text">{value}</h2>

      <p className="mt-2 text-sm text-description">{title}</p>
    </Card>
  );
}
