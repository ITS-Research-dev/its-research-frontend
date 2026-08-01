import Card from "@/components/ui/Card";
import { LucideIcon } from "lucide-react";

interface CompetencyCardProps {
  title: string;
  value: number;
  icon?: LucideIcon;
}

export default function CompetencyCard({
  title,
  value,
  icon: Icon,
}: CompetencyCardProps) {
  const getVariant = () => {
    if (value >= 85)
      return {
        text: "Sangat Baik",
        color: "text-success",
        bg: "bg-success/10",
      };

    if (value >= 75)
      return {
        text: "Baik",
        color: "text-primary",
        bg: "bg-primary/10",
      };

    if (value >= 60)
      return {
        text: "Cukup",
        color: "text-warning",
        bg: "bg-warning/10",
      };

    return {
      text: "Perlu Latihan",
      color: "text-danger",
      bg: "bg-danger/10",
    };
  };

  const variant = getVariant();

  return (
    <Card
      className="
        group
        p-5

        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-primary
        hover:shadow-lg
      "
    >
      {Icon && (
        <div
          className={`
            mb-4
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            ${variant.bg}
          `}
        >
          <Icon size={22} className={variant.color} />
        </div>
      )}

      <div className={`text-3xl font-bold ${variant.color}`}>{value}</div>

      <div className={`mt-1 text-sm font-medium ${variant.color}`}>
        {variant.text}
      </div>

      <div className="mt-4 text-sm font-semibold text-text">{title}</div>
    </Card>
  );
}
