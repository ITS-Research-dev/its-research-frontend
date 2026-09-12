"use client";

import MonitoringStats from "./MonitoringStats";
import MonitoringTable from "./MonitoringTable";
import ExportClassButton from "./ExportClassButton";

import TopicScoreDistribution from "@/components/dashboard/TopicScoreDistribution";
import CompetencyTrendChart from "@/components/profile/CompetencyTrendChart";
import LevelTrendChart from "@/components/profile/LevelTrendChart";

import { MonitoringData } from "@/types/monitoring";

interface Props {
  data: MonitoringData;
}

export default function MonitoringSummary({ data }: Props) {
  const topics = data.topicScores.map((item) => item.topic);

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-text">Monitoring Kelas</h2>

          <p className="mt-1 text-sm text-description">
            Pantau perkembangan dan performa siswa kelas{" "}
            <span className="font-medium text-text">
              {data.summary.className}
            </span>
            .
          </p>
        </div>

        <ExportClassButton data={data} />
      </div>

      {/* STAT */}

      <MonitoringStats summary={data.summary} />

      {/* TOPIC SCORE */}

      <TopicScoreDistribution data={data.topicScores} />

      <CompetencyTrendChart entries={data.competencyTrend} topics={topics} />

      <LevelTrendChart entries={data.levelTrend} topics={topics} />

      {/* TABLE */}

      <MonitoringTable data={data.students} />
    </div>
  );
}
