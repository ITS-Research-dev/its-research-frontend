"use client";

import { useCallback, useEffect, useState } from "react";

import { assessmentService } from "@/services/asessment.service";

import { AssessmentDetail, AssessmentHistoryItem } from "@/types/asessment";

export function useAssessmentHistory() {
  const [histories, setHistories] = useState<AssessmentHistoryItem[]>([]);

  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);

    const data = await assessmentService.getHistories();

    setHistories(data);

    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    histories,

    loading,

    reload: load,
  };
}

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

export function useAssessmentDetail(id: string) {
  const [detail, setDetail] = useState<AssessmentDetail>();

  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);

    const data = await assessmentService.getDetailById(id);

    setDetail(data);

    setLoading(false);
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    detail,

    loading,

    reload: load,
  };
}
