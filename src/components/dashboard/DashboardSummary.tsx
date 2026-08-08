"use client";

import {
  TeacherDashboardSummary,
  TopicScore,
  AIEfficiency,
} from "@/types/dashboard";

import DashboardStats from "./DashboardStats";
import TopicScoreDistribution from "./TopicScoreDistribution";
import AIEfficiencyCard from "./AIEfficiencyCard";

import CompetencyTrendChart from "@/components/profile/CompetencyTrendChart";
import LevelTrendChart from "@/components/profile/LevelTrendChart";

interface Props {
  summary: TeacherDashboardSummary;
  topicScores: TopicScore[];
  efficiency: AIEfficiency;
}

export default function DashboardSummary({summary, topicScores, efficiency}: Props) {
  return (
    <div className="space-y-6">
      <DashboardStats summary={summary} />

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <TopicScoreDistribution data={topicScores} />
        <AIEfficiencyCard data={efficiency} />
      </div>

      <CompetencyTrendChart entries={[]} topics={[]}/>
      <LevelTrendChart entries={[]} topics={[]} />
    </div>
  );
}
