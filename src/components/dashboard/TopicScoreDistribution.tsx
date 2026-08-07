"use client";

import Card from "@/components/ui/Card";
import { TopicScore } from "@/types/dashboard";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

import { AlertTriangle } from "lucide-react";

interface Props {
  data: TopicScore[];
}

export default function TopicScoreDistribution({ data }: Props) {
  const getColor = (score: number) => {
    if (score < 60) return "#ef4444";
    if (score < 70) return "#f59e0b";
    return "#3b82f6";
  };

  const weakestTopic = [...data].sort((a, b) => a.score - b.score)[0];

  const warningTopic = [...data]
    .filter((item) => item.score >= 60 && item.score < 70)
    .sort((a, b) => a.score - b.score)[0];

  return (
    <Card className="p-4">
      <div>
        <h2 className="text-xl font-bold text-text">
          Distribusi Skor per Topik
        </h2>

        <p className="mt-1 text-description">
          Rata-rata nilai siswa pada setiap topik pembelajaran.
        </p>
      </div>

      {/* Chart */}
      <div className="mt-8 h-90">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 5,
              right: 10,
              bottom: 5,
            }}
            barCategoryGap={20}
          >
            <CartesianGrid strokeDasharray="4 4" horizontal={false} />

            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />

            <YAxis
              type="category"
              dataKey="topic"
              width={120}
              tick={{
                fontSize: 13,
                fill: "#374151",
              }}
            />

            <Tooltip />

            <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={30}>
              {data.map((item) => (
                <Cell key={item.topic} fill={getColor(item.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Highlight */}
      <div className="mt-6 space-y-3">
        {weakestTopic && (
          <div className="flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-red-600">
            <AlertTriangle size={18} />

            <p>
              Topik lemah:{" "}
              <span className="font-semibold">{weakestTopic.topic}</span>{" "}
              (rata-rata {weakestTopic.score})
            </p>
          </div>
        )}

        {warningTopic && (
          <div className="flex items-center gap-3 rounded-xl bg-amber-50 px-4 py-3 text-amber-700">
            <AlertTriangle size={18} />

            <p>
              Perlu perhatian:{" "}
              <span className="font-semibold">{warningTopic.topic}</span>{" "}
              (rata-rata {warningTopic.score})
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
