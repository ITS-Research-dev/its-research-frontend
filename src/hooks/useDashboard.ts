"use client";

import { useCallback, useEffect, useState } from "react";

import dashboardService from "@/services/dashboard.service";

import {
  TeacherDashboardSummary,
  TopicScore,
  AIEfficiency,
  DashboardTrendResponse,
} from "@/types/dashboard";
import { useClassStore } from "@/store/class.store";

export function useDashboard() {
  const [summary, setSummary] = useState<TeacherDashboardSummary>();
  const [topicScores, setTopicScores] = useState<TopicScore[]>([]);
  const [efficiency, setEfficiency] = useState<AIEfficiency>();
  const [trend, setTrend] = useState<DashboardTrendResponse>();
  const selectedClassId = useClassStore((s) => s.selectedClassId);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedClassId) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    async function fetchDashboard() {
      setLoading(true);
      try {
        const { summary, topicScores } = await dashboardService.getDashboard(selectedClassId);
      const trend = await dashboardService.getTrend(selectedClassId)
        if (cancelled) return;

        setSummary(summary);
        setTopicScores(topicScores ?? []);
        setEfficiency(buildAIEfficiency(summary.averageAssessmentTime));
        setTrend(trend)
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchDashboard();
  }, [selectedClassId]);

  return {
    summary,
    trend,
    topicScores,
    efficiency,
    loading,
  };
}

const MANUAL_TIME_SECONDS = 30 * 60; // baseline: 30 menit/siswa

function parseDurationToSeconds(duration: string): number {
  // parse format "2m 28s", "1h 5m 3s", "45s", dst
  const regex = /(\d+)h|(\d+)m|(\d+)s/g;
  let totalSeconds = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(duration)) !== null) {
    if (match[1]) totalSeconds += Number(match[1]) * 3600;
    if (match[2]) totalSeconds += Number(match[2]) * 60;
    if (match[3]) totalSeconds += Number(match[3]);
  }

  return totalSeconds;
}

function buildAIEfficiency(averageAssessmentTime: string): AIEfficiency {
  const aiSeconds = parseDurationToSeconds(averageAssessmentTime);

  const percentage =
    aiSeconds > 0
      ? Number(
          (
            ((MANUAL_TIME_SECONDS - aiSeconds) / MANUAL_TIME_SECONDS) *
            100
          ).toFixed(1),
        )
      : 0;

  return {
    percentage,
    manualTime: `${MANUAL_TIME_SECONDS / 60} menit / siswa`,
    aiTime: `${averageAssessmentTime} / siswa`,
    description:
      "Dengan bantuan AI, guru dapat fokus pada verifikasi hasil penilaian tanpa perlu mengoreksi satu per satu secara manual.",
  };
}
