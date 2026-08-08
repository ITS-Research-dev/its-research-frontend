"use client";

import { useCallback, useEffect, useState } from "react";

import { assessmentService } from "@/services/asessment.service";

import { buildProfileSummary } from "@/utils/assessmentSummary";

import { ProfileSummary } from "@/types/profile";
import profileService from "@/services/profile.service";

export function useProfileSummary() {
  const [summary, setSummary] = useState<ProfileSummary>();

  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);

    const result = await profileService.getProfile();
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
