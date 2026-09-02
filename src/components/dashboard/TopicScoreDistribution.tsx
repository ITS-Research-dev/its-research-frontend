"use client";

import { useMemo, useState } from "react";

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

import { AlertTriangle, BarChart2, Trophy } from "lucide-react";

interface Props {
  data: TopicScore[];
}

type FilterType = "lowest" | "highest";

export default function TopicScoreDistribution({ data }: Props) {
  const [filter, setFilter] = useState<FilterType>("lowest");

  const safeData = useMemo(() => data ?? [], [data]);

  const displayedData = useMemo(() => {
    const sortedData = [...safeData].sort((a, b) => {
      if (filter === "lowest") {
        return a.score - b.score;
      }

      return b.score - a.score;
    });

    return sortedData.slice(0, 5);
  }, [safeData, filter]);

  const getColor = (score: number) => {
    if (score < 60) return "#ef4444";
    if (score < 70) return "#f59e0b";

    return "#3b82f6";
  };

  const weakestTopic = filter === "lowest" ? displayedData[0] : null;

  const strongestTopic = filter === "highest" ? displayedData[0] : null;

  const isEmpty =
    safeData.length === 0 ||
    safeData.every((item) => !item.score || item.score === 0);

  return (
    <Card className="p-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-text">
            Distribusi Skor per Topik
          </h2>

          <p className="mt-1 text-description">
            Rata-rata nilai siswa pada setiap topik pembelajaran.
          </p>
        </div>

        {/* Filter Tab (Selalu tampil) */}
        <div className="flex rounded-xl border border-border bg-surface p-1">
          <button
            onClick={() => setFilter("lowest")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === "lowest" ? "bg-primary text-white" : "text-description"
            }`}
          >
            Terendah
          </button>

          <button
            onClick={() => setFilter("highest")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === "highest"
                ? "bg-primary text-white"
                : "text-description"
            }`}
          >
            Tertinggi
          </button>
        </div>
      </div>

      {isEmpty ? (
        /* Empty State */
        <div className="mt-8 flex h-90 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-surface/50">
          <div className="text-center">
            <h2 className="font-semibold text-xl text-text">
              Belum Ada Data Topik
            </h2>
            <p className="mt-1 text-md text-description">
              Data distribusi skor per topik akan muncul setelah siswa
              menyelesaikan kuis.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Chart */}
          <div className="mt-8 h-90">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={displayedData}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 20,
                  bottom: 5,
                  left: 10,
                }}
                barCategoryGap={20}
              >
                <CartesianGrid strokeDasharray="4 4" horizontal={false} />

                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fontSize: 12 }}
                />

                <YAxis
                  type="category"
                  dataKey="topic"
                  width={130}
                  tick={{
                    fontSize: 12,
                    fill: "#374151",
                  }}
                  tickLine={false}
                  axisLine={false}
                  style={{
                    textTransform: "capitalize",
                  }}
                />

                <Tooltip />

                <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={30}>
                  {displayedData.map((item) => (
                    <Cell key={item.topic} fill={getColor(item.score)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Highlight 5 Terendah */}
          {filter === "lowest" && weakestTopic && (
            <div className="mt-6 flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-red-600">
              <AlertTriangle size={18} />

              <p>
                Topik dengan skor terendah:{" "}
                <span className="font-semibold">{weakestTopic.topic}</span>{" "}
                dengan rata-rata skor {weakestTopic.score}.
              </p>
            </div>
          )}

          {/* Highlight 5 Tertinggi */}
          {filter === "highest" && strongestTopic && (
            <div className="mt-6 flex items-center gap-3 rounded-xl bg-primary/10 px-4 py-3 text-primary">
              <Trophy size={18} />

              <p>
                Topik dengan skor tertinggi:{" "}
                <span className="font-semibold">{strongestTopic.topic}</span>{" "}
                dengan rata-rata skor {strongestTopic.score}.
              </p>
            </div>
          )}
        </>
      )}
    </Card>
  );
}
