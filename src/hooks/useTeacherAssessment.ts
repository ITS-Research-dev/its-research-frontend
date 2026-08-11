"use client";

import { useCallback, useEffect, useState } from "react";

import { teacherAssessmentService } from "@/services/teacherAssessment.service";

import { AssessmentDetail } from "@/types/asessment";
import { buildProfileSummary } from "@/utils/assessmentSummary";

export function useTeacherAssessmentDetail(
  studentId: string,
  assessmentId: string,
) {
  const [detail, setDetail] = useState<AssessmentDetail>();
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setLoading(true);

      const data = await teacherAssessmentService.getDetailById(
        studentId,
        assessmentId,
      );

      setDetail(buildProfileSummary(data));
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
