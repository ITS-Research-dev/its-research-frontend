import Card from "@/components/ui/Card";

import { Trophy, Lightbulb } from "lucide-react";

import { AssessmentDetail } from "@/types/asessment";

interface Props {
  detail: AssessmentDetail;
}

export default function AssessmentSummary({ detail }: Props) {
  const items = [
    {
      title: "Nilai Keseluruhan",
      value: detail.score,
      suffix: "",
      icon: Trophy,
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      title: "Hint Digunakan",
      value: detail.hintsUsed,
      suffix: "x",
      icon: Lightbulb,
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            className="
              border
              border-border
              p-6
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-primary
              hover:shadow-lg
            "
          >
            <div className="flex items-center justify-between">
              <div
                className={`
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  ${item.bg}
                `}
              >
                <Icon size={28} className={item.color} />
              </div>

              <p className="text-sm text-description">{item.title}</p>
            </div>

            <div className="mt-8">
              <h2 className="text-3xl font-bold text-text">
                {item.value}
                <span className="text-lg">{item.suffix}</span>
              </h2>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
