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
import { CompetencyTrend, ProfileResponse, RawGraphProfile } from "@/types/profile";
import { RoundNumber } from "@/utils/global";
import { DropdownItem } from "../common/DataTable";

interface Props {
  entries: { [key: string]: { [key: string]: RawGraphProfile } };
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

function formatEntries(
  entries: { [key: string]: { [key: string]: RawGraphProfile } },
  period: "week" | "month",
  topic: string
): CompetencyTrend[] {
  const matcher = period === "week" ? isWeekKey : isMonthKey;
  return Object.entries(entries)
    .filter(([key]) => matcher(key))
    .map(([key, bucket]) => {
      const value = topic === "all" ? bucket.total : bucket[topic];
      return {
        name: key,
        score : value ? RoundNumber(value.avg / value.count) : 0,
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

function getTrendInfo(data: { score: number }[]): TrendInfo | null {
  if (data.length < 2) return null;

  const first = data[0].score;
  const last = data[data.length - 1].score;
  const diff = last - first;
  const absDiff = Math.abs(diff);

  if (diff > 0) {
    return {
      emoji: "📈",
      title: `Kompetensimu meningkat ${absDiff} poin dibanding periode awal.`,
      description: "Pertahankan konsistensi belajar untuk mencapai nilai maksimal.",
      colorClass: "text-primary",
    };
  }

  if (diff < 0) {
    return {
      emoji: "📉",
      title: `Kompetensimu menurun ${absDiff} poin dibanding periode awal.`,
      description: "Yuk, evaluasi kembali proses belajarmu agar kembali meningkat.",
      colorClass: "text-destructive",
    };
  }

  return {
    emoji: "➖",
    title: "Kompetensimu stabil dibanding periode awal.",
    description: "Coba tingkatkan intensitas latihan untuk mendorong kemajuan lebih lanjut.",
    colorClass: "text-muted-foreground",
  };
}

export default function CompetencyTrendChart({ entries, topics }: Props) {
  const [period, setPeriod] = useState<"week" | "month">("week");
  const [topic, setTopic] = useState("all");

  const data = useMemo(() => {
    return formatEntries(entries, period, topic);
  }, [period, topic, entries]);

  const trend = getTrendInfo(data)


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
            items={formatRawTopics(topics)}
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

      {trend && (
          <div className="mt-6 rounded-2xl bg-primary/5 p-5">
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
