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
import { LevelTrend, RawGraphProfile } from "@/types/profile";
import { DropdownItem } from "../common/DataTable";
import { RoundNumber } from "@/utils/global";
import { AssessmentLevel } from "@/types/asessment";

const colors = ["#ef4444", "#f59e0b","#f59e0b", "#3b82f6","#3b82f6", "#22c55e", "#22c55e"];
const levelName = ["", "Novice", "Beginner","Advance/Beginner", "Advance", "Competent", "Expert"];

const THRESHOLDS: { level: AssessmentLevel; min: number, color: string }[] = [
  { level: "Expert", min: 90, color: "#22c55e" },
  { level: "Competent", min: 80, color: "#22c55e" },
  { level: "Advance", min: 70, color: "#3b82f6" },
  { level: "Advance/Beginner", min: 60, color: "#3b82f6" },
  { level: "Beginner", min: 50, color:  "#f59e0b"},
  { level: "Novice", min: 0, color: "#f59e0b" },
];

interface Props {
  entries: { [key: string]: { [key: string]: RawGraphProfile } } | [];
  topics: string[];
}

interface TrendInfo {
  emoji: string;
  title: string;
  description: string;
  colorClass: string;
};


function isWeekKey(key: string): boolean {
  return key.includes("-"); // "01-07" -> week
}

function isMonthKey(key: string): boolean {
  return !key.includes("-"); // "08" -> month
}

function formatLevel(score: number) : { level: AssessmentLevel, color: string }  {
  const clamped = Math.max(0, Math.min(100, score));

  for (const { level, min, color } of THRESHOLDS) {
    if (clamped > min || (min === 0 && clamped >= 0)) {
      if (min !== 0 && clamped > min) return { level, color };
      if (min === 0) return {level, color};
    }
  }

  return { level: "Novice", color: "#ef4444"};
}

function formatEntries(
  entries: { [key: string]: { [key: string]: RawGraphProfile } },
  period: "week" | "month",
  topic: string
): LevelTrend[] {
  const matcher = period === "week" ? isWeekKey : isMonthKey;
  return Object.entries(entries)
    .filter(([key]) => matcher(key))
    .map(([key, bucket]) => {
      const value = topic === "all" ? bucket.total : bucket[topic];
      const score = value ? RoundNumber(value.avg / value.count) : 0 
      return {
        name: key,
        score, 
        ...formatLevel(score)
      };
    });
}

function formatRawTopics(topics: string[]) : DropdownItem[] {
    return [
      {
        label: "Semua Topik",
        value: "all",
      },
      ...topics.map((topicName) => ({
        label: topicName,
        value: topicName,
      })),
    ];
}

function getTrendInfo(data: { score: number, level: AssessmentLevel }[]): TrendInfo | null {
  if (data.length < 2) return null;

  const first = data[0].score;
  const last = data[data.length - 1].score;
  const currentLevel = data[data.length - 1].level;
  const diff = last - first;
  const absDiff = Math.abs(diff);

  if (diff > 0) {
    return {
      emoji: "📈",
      title: `Levelmu meningkat karena kenaikan ${absDiff} poin dari sejak awal pembelajaran.`,
      description: `Pertahankan konsistensi belajar untuk mencapai nilai maksimal. Sekarang kamu berada di level ${currentLevel}`,
      colorClass: "text-primary",
    };
  }

  if (diff < 0) {
    return {
      emoji: "📉",
      title: `Levelmu menurun karena penurunan sebanyak ${absDiff} poin dibanding periode awal.`,
      description: `Yuk, evaluasi kembali proses belajarmu agar kembali meningkat. Sekarang kamu berada di level ${currentLevel}`,
      colorClass: "text-destructive",
    };
  }

  return {
    emoji: "➖",
    title: "Levelmu stabil dibanding periode awal.",
    description: `Coba tingkatkan intensitas latihan untuk mendorong kemajuan lebih lanjut. Sekarang kamu berada di level ${currentLevel}`,
    colorClass: "text-muted-foreground",
  };
}

export default function LevelTrendChart({entries, topics }: Props) {
  const [period, setPeriod] = useState<"week" | "month">("week");
  const [topic, setTopic] = useState("all");

 const data = useMemo(() => {
     if (Array.isArray(entries)) return [];
     return formatEntries(entries, period, topic);
   }, [period, topic, entries]);
 
   const trend = getTrendInfo(data)

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
              onChange={setTopic}
              items={formatRawTopics(topics)}
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

            <XAxis dataKey="name" tick={{ fontSize: 12 }} />

            <YAxis
              domain={[0,100]}
              // ticks={[1, 2, 3, 4]}
              // tickFormatter={(value) => levelName[value]}
              tick={{ fontSize: 10.5 }}
            />

            <Tooltip
              formatter={(value) => {
                if(!value) return ""
                return formatLevel(value).level
              }}
            />

            <Bar dataKey="score" radius={[8, 8, 0, 0]}>
              {data.map((item, index) => (
                <Cell key={index} fill={item.color}/>
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary */}
       {trend && (
        <div className="mt-6 rounded-2xl border border-success/20 bg-success/10 p-5">
        <p className={`font-semibold ${trend.colorClass}`}>
          {trend.emoji} {trend.title}
        </p>
        <p className="mt-1 text-description">
          {trend.description}
        </p>
      </div>
        )}
    </Card>
  );
}
