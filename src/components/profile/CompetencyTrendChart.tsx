"use client";

import { useMemo, useState } from "react";

import Card from "@/components/ui/Card";
import Dropdown from "@/components/ui/DropDown";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const topicOptions = [
  {
    label: "Semua Topik",
    value: "all",
  },
  {
    label: "Variabel",
    value: "variable",
  },
  {
    label: "Percabangan",
    value: "if",
  },
  {
    label: "Perulangan",
    value: "loop",
  },
  {
    label: "Function",
    value: "function",
  },
];

const weeklyData = [
  { name: "M1", score: 60 },
  { name: "M2", score: 68 },
  { name: "M3", score: 74 },
  { name: "M4", score: 81 },
  { name: "M5", score: 88 },
];

const monthlyData = [
  { name: "Jan", score: 65 },
  { name: "Feb", score: 70 },
  { name: "Mar", score: 78 },
  { name: "Apr", score: 85 },
  { name: "Mei", score: 89 },
];

export default function CompetencyTrendChart() {
  const [period, setPeriod] = useState<"week" | "month">("week");

  const [topic, setTopic] = useState("all");

  const data = useMemo(() => {
    return period === "week" ? weeklyData : monthlyData;
  }, [period]);

  const first = data[0].score;

  const last = data[data.length - 1].score;

  const increase = last - first;

  return (
    <Card className="p-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-xl font-bold text-text">
            Trend Rata-rata Kompetensi
          </h2>

          <p className="mt-1 text-description">
            Perkembangan rata-rata kompetensi berdasarkan hasil asesmen.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Dropdown
            value={topic}
            onChange={setTopic}
            items={topicOptions}
            placeholder="Topik"
          />

          <div className="flex rounded-xl border border-border bg-surface p-1">
            <button
              onClick={() => setPeriod("week")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                period === "week" ? "bg-primary text-white" : "text-description"
              }`}
            >
              Minggu
            </button>

            <button
              onClick={() => setPeriod("month")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                period === "month"
                  ? "bg-primary text-white"
                  : "text-description"
              }`}
            >
              Bulan
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 h-90">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" />

            <XAxis dataKey="name" tick={{ fontSize: 12 }} />

            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
              stroke="#3fbcc3"
              strokeWidth={3}
              dot={{
                r: 6,
              }}
              activeDot={{
                r: 8,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 rounded-2xl bg-primary/5 p-5">
        <p className="font-semibold text-primary">
          📈 Kompetensimu meningkat {increase} poin dibanding periode awal.
        </p>

        <p className="mt-1 text-description">
          Pertahankan konsistensi belajar untuk mencapai nilai maksimal.
        </p>
      </div>
    </Card>
  );
}
