import {
  MonitoringCompetencyTrend,
  MonitoringLevelTrend,
} from "@/types/monitoring";

import { RawGraphProfile } from "@/types/profile";

export function buildMonitoringTrend(data: MonitoringCompetencyTrend[]) {
  const result: {
    [key: string]: {
      [key: string]: RawGraphProfile;
    };
  } = {};

  data.forEach((item) => {
    result[item.topic] = {
      total: {
        avg: item.averageScore,
        count: 1,
      },
    };
  });

  return result;
}

export function buildMonitoringLevelTrend(data: MonitoringLevelTrend[]) {
  const result: {
    [key: string]: {
      [key: string]: RawGraphProfile;
    };
  } = {};

  data.forEach((item) => {
    /**
     * Untuk sementara gunakan score berdasarkan level.
     * Nanti ketika API teacher sudah tersedia,
     * gunakan score asli dari backend.
     */
    const scoreMap: Record<string, number> = {
      Novice: 40,
      Beginner: 60,
      "Advance/Beginner": 65,
      Advance: 75,
      Competent: 85,
      Proficient: 90,
      Expert: 95,
    };

    result[item.topic] = {
      total: {
        avg: scoreMap[item.level] ?? 0,
        count: 1,
      },
    };
  });

  return result;
}
