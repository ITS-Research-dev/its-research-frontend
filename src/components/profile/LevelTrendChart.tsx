"use client";

import { useMemo, useState } from "react";

import Card from "@/components/ui/Card";
import Dropdown from "@/components/ui/DropDown";

import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from "recharts";

const topicItems = [
  {
    label: "Semua Topik",
    value: "all",
  },
  {
    label: "Variabel & Tipe Data",
    value: "variables",
  },
  {
    label: "Percabangan",
    value: "condition",
  },
  {
    label: "Perulangan",
    value: "loop",
  },
];

const chartData = {
  all: {
    week: [
      { label: "M1", level: 1 },
      { label: "M2", level: 2 },
      { label: "M3", level: 2 },
      { label: "M4", level: 3 },
      { label: "M5", level: 4 },
    ],
    month: [
      { label: "Jan", level: 1 },
      { label: "Feb", level: 2 },
      { label: "Mar", level: 2 },
      { label: "Apr", level: 3 },
      { label: "Mei", level: 4 },
    ],
  },

  variables: {
    week: [
      { label: "M1", level: 1 },
      { label: "M2", level: 2 },
      { label: "M3", level: 2 },
      { label: "M4", level: 3 },
      { label: "M5", level: 4 },
    ],
    month: [
      { label: "Jan", level: 1 },
      { label: "Feb", level: 2 },
      { label: "Mar", level: 3 },
      { label: "Apr", level: 3 },
      { label: "Mei", level: 4 },
    ],
  },

  condition: {
    week: [
      { label: "M1", level: 1 },
      { label: "M2", level: 1 },
      { label: "M3", level: 2 },
      { label: "M4", level: 2 },
      { label: "M5", level: 3 },
    ],
    month: [
      { label: "Jan", level: 1 },
      { label: "Feb", level: 2 },
      { label: "Mar", level: 2 },
      { label: "Apr", level: 3 },
      { label: "Mei", level: 3 },
    ],
  },

  loop: {
    week: [
      { label: "M1", level: 2 },
      { label: "M2", level: 2 },
      { label: "M3", level: 3 },
      { label: "M4", level: 3 },
      { label: "M5", level: 4 },
    ],
    month: [
      { label: "Jan", level: 2 },
      { label: "Feb", level: 2 },
      { label: "Mar", level: 3 },
      { label: "Apr", level: 4 },
      { label: "Mei", level: 4 },
    ],
  },
};

const colors = ["#ef4444", "#f59e0b", "#3b82f6", "#22c55e"];

const levelName = ["", "Novice", "Beginner", "Competent", "Proficient"];

export default function LevelTrendChart() {
  const [topic, setTopic] = useState<keyof typeof chartData>("all");

  const [period, setPeriod] = useState<"week" | "month">("week");

  const data = useMemo(() => {
    return chartData[topic][period];
  }, [topic, period]);

  const first = data[0].level;

  const last = data[data.length - 1].level;

  const increase = last - first;

  return (
    <Card className="p-7">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-xl font-bold text-text">Trend Level Kemahiran</h2>

          <p className="mt-1 text-description">
            Perkembangan level berdasarkan hasil asesmen.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="w-64">
            <Dropdown
              value={topic}
              onChange={(value) => setTopic(value as keyof typeof chartData)}
              items={topicItems}
              placeholder="Pilih Topik"
            />
          </div>

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

      {/* Chart */}
      <div className="mt-8 h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="4 4" />

            <XAxis dataKey="label" tick={{ fontSize: 12 }} />

            <YAxis
              domain={[1, 4]}
              ticks={[1, 2, 3, 4]}
              tickFormatter={(value) => levelName[value]}
              tick={{ fontSize: 10.5 }}
            />

            <Tooltip
              formatter={(value) => {
                const level = Number(value);

                return [levelName[level] ?? "-", "Level"];
              }}
            />

            <Bar dataKey="level" radius={[8, 8, 0, 0]}>
              {data.map((item, index) => (
                <Cell key={index} fill={colors[item.level - 1]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary */}
      <div className="mt-6 rounded-2xl border border-success/20 bg-success/10 p-5">
        <p className="font-semibold text-success">
          🚀 Levelmu meningkat {increase} tingkat sejak awal pembelajaran.
        </p>

        <p className="mt-1 text-description">
          Saat ini kamu berada pada level{" "}
          <span className="font-semibold text-success">{levelName[last]}</span>.
        </p>
      </div>
    </Card>
  );
}
