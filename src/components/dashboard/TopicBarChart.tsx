"use client";

import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { TopicScore } from "@/types/dashboard";

interface Props {
  data: TopicScore[];
}

export default function TopicBarChart({ data }: Props) {
  const getColor = (score: number) => {
    if (score < 60) return "#C5533D"; // merah
    if (score < 70) return "#F0B13A"; // kuning
    return "#4B74A8"; // biru
  };

  return (
    <div className="mt-6 h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="topic"
            tickLine={false}
            axisLine={false}
            tick={{
              fill: "#6B7280",
              fontSize: 13,
            }}
          />

          <YAxis hide domain={[0, 100]} />

          <Bar dataKey="score" radius={[6, 6, 0, 0]} maxBarSize={70}>
            <LabelList
              dataKey="score"
              position="top"
              style={{
                fill: "#111827",
                fontWeight: 700,
                fontSize: 14,
              }}
            />

            {data.map((item) => (
              <Cell key={item.topic} fill={getColor(item.score)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
