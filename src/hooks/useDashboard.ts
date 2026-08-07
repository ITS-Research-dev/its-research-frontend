"use client";

import { useCallback, useEffect, useState } from "react";

import dashboardService from "@/services/dashboard.service";

import {
  TeacherDashboardSummary,
  TopicScore,
  AIEfficiency,
} from "@/types/dashboard";

export function useDashboard() {
  const [summary, setSummary] = useState<TeacherDashboardSummary>();

  const [topicScores, setTopicScores] = useState<TopicScore[]>([]);

  const [efficiency, setEfficiency] = useState<AIEfficiency>();

  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);

    try {
      const [summaryRes, topicScoreRes, aiEfficiencyRes] = await Promise.all([
        dashboardService.getSummary(),
        dashboardService.getTopicScores(),
        dashboardService.getAIEfficiency(),
      ]);

      setSummary(summaryRes);

      setTopicScores(topicScoreRes);

      setEfficiency(aiEfficiencyRes);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    summary,
    topicScores,
    efficiency,
    loading,
    reload: load,
  };
}
