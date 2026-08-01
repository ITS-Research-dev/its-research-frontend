import Card from "@/components/ui/Card";

import {
  Brain,
  Code2,
  FileCode,
  BookOpen,
  PenTool,
  Lightbulb,
} from "lucide-react";

import CompetencyCard from "./CompetencyCard";

import { CompetencyScore } from "@/types/asessment";

interface Props {
  competencies: CompetencyScore[];
}

const iconMap = {
  "Problem Solving": Brain,
  Algoritma: Code2,
  Syntax: FileCode,
  Debugging: BookOpen,
  Efisiensi: PenTool,
  "Code Quality": Lightbulb,
};

export default function CompetencySection({ competencies }: Props) {
  return (
    <Card className="p-7">
      <h2 className="mb-6 text-xl font-bold text-text">Rata-rata Kompetensi</h2>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {competencies.map((item) => {
          const Icon = iconMap[item.name as keyof typeof iconMap] ?? Brain;

          return (
            <CompetencyCard
              key={item.name}
              title={item.name}
              value={item.score}
              icon={Icon}
            />
          );
        })}
      </div>
    </Card>
  );
}
