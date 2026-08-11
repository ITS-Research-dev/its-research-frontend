"use client";

import { useCallback, useEffect, useState } from "react";

import { assessmentService } from "@/services/asessment.service";

import { AssessmentDetail } from "@/types/asessment";
import { buildProfileSummary } from "@/utils/assessmentSummary";

export function useAssessmentDetails() {
  const [details, setDetails] = useState<AssessmentDetail[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);

    const data = await assessmentService.getDetails();

    setDetails(data);

    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    details,
    loading,
    reload: load,
  };
}

export function useAssessmentDetail(
  id: string,
  enabled: boolean = true,
  initialDetail?: AssessmentDetail,
) {
  const [detail, setDetail] = useState<AssessmentDetail | undefined>(
    initialDetail,
  );

  const [loading, setLoading] = useState(enabled && !initialDetail);

  const load = useCallback(async () => {
    // Jika menggunakan dummy data,
    // jangan lakukan API call.
    if (initialDetail) {
      setDetail(initialDetail);
      setLoading(false);
      return;
    }

    if (!enabled || !id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const data = await assessmentService.getDetailById(id);

      setDetail(buildProfileSummary(data));
    } finally {
      setLoading(false);
    }
  }, [id, enabled, initialDetail]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    detail,
    loading,
    reload: load,
  };
}
