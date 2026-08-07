"use client";

import {
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

import Card from "@/components/ui/Card";

import { CompetencyScore } from "@/types/asessment";

interface Props {
  competencies: CompetencyScore[];
}
export default function CompetencyRadar({ competencies }: Props) {
  return (
    <div className="p-5">
      <h3 className="font-semibold text-text">Visualisasi Kompetensi</h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={competencies}>
            <PolarGrid />

            <PolarAngleAxis
              dataKey="name"
              tick={{
                fontSize: 12,
              }}
            />

            <PolarRadiusAxis domain={[0, 100]} />

            <Radar
              name="Score"
              dataKey="score"
              stroke="#3fbcc3"
              fill="#3fbcc3"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-5">
        {competencies.map((item) => (
          <div key={item.name}>
            <div className="mb-2 flex justify-between">
              <span className="text-sm text-text">{item.name}</span>

              <span className="font-semibold text-primary">{item.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
