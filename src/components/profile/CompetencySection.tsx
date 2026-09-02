import Card from "@/components/ui/Card";

import {
  Brain,
  Code2,
  FileCode,
  BookOpen,
  PenTool,
  Lightbulb,
  BarChart2,
} from "lucide-react";

import CompetencyCard from "./CompetencyCard";

import { CompetencyScore } from "@/types/asessment";
import { RoundNumber, TitleCase } from "@/utils/global";

interface Props {
  competencies: CompetencyScore[];
  totalCase: number;
}

const iconMap = {
  "Problem Solving": Brain,
  Algoritma: Code2,
  Syntax: FileCode,
  Debugging: BookOpen,
  Efisiensi: PenTool,
  "Code Quality": Lightbulb,
};

export default function CompetencySection({ competencies, totalCase }: Props) {
  return (
    <Card className="p-7">
      <h2 className="mb-6 text-xl font-bold text-text">Rata-rata Kompetensi</h2>

      {competencies.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-surface/50 py-12">
          <h2 className="font-semibold text-xl text-text">
            Belum Ada Data Kompetensi
          </h2>
          <p className="text-md text-description">
            Data kompetensi akan muncul setelah asesmen selesai dinilai.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
          {competencies.map((item) => {
            const Icon = iconMap[item.name as keyof typeof iconMap] ?? Brain;
            const hasData = totalCase > 0 && item.score > 0;

            return (
              <CompetencyCard
                key={item.name}
                title={TitleCase(item.name)}
                value={RoundNumber(totalCase > 0 ? item.score / totalCase : 0)}
                icon={Icon}
                hasData={hasData}
              />
            );
          })}
        </div>
      )}
    </Card>
  );
}
