"use client";

import { useCallback, useEffect, useState } from "react";

import { assessmentService } from "@/services/asessment.service";

import { buildProfileSummary } from "@/utils/assessmentSummary";

import { ProfileSummary } from "@/types/profile";

export function useProfileSummary() {
  const [summary, setSummary] = useState<ProfileSummary>();

  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);

    const details = await assessmentService.getDetails();

    const result = buildProfileSummary(details);

    setSummary(result);

    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    summary,

    loading,

    reload: load,
  };
}
