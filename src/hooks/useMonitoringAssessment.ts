"use client";

import { useCallback, useEffect, useState } from "react";

import { monitoringService } from "@/services/monitoring.service";

export function useMonitoringAssessment(
  studentId: string,
  assessmentId: string,
) {
  const [detail, setDetail] = useState<any>();
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setLoading(true);

      const result = await monitoringService.getAssessmentDetail(
        studentId,
        assessmentId,
      );

      setDetail(result);
    } finally {
      setLoading(false);
    }
  }, [studentId, assessmentId]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    detail,
    loading,
    reload: load,
  };
}
