"use client";

import {
  TeacherDashboardSummary,
  TopicScore,
  AIEfficiency,
  DashboardTrendResponse,
} from "@/types/dashboard";

import DashboardStats from "./DashboardStats";
import TopicScoreDistribution from "./TopicScoreDistribution";
import AIEfficiencyCard from "./AIEfficiencyCard";
import CompetencyTrendChart from "../profile/CompetencyTrendChart";
import LevelTrendChart from "../profile/LevelTrendChart";

interface Props {
  summary: TeacherDashboardSummary;
  topicScores: TopicScore[];
  efficiency: AIEfficiency;
  trend: DashboardTrendResponse;
}

export default function DashboardSummary({
  summary,
  topicScores,
  efficiency,
  trend
}: Props) {
  return (
    <div className="space-y-6">
      <DashboardStats summary={summary} />

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <TopicScoreDistribution data={topicScores} />
        <AIEfficiencyCard data={efficiency} />
      </div>

      <CompetencyTrendChart entries={trend?.competencyTrend} topics={trend?.nameMaterials}/>
      <LevelTrendChart entries={trend?.levelTrend} topics={trend?.nameMaterials} />

    </div>
  );
}
