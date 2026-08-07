"use client";

import { useCallback, useEffect, useState } from "react";
import caseService from "@/services/case.service";
import { CaseCardData, CaseDetail } from "@/types/case";
import { mapToCaseCardData } from "@/utils/caseMapper";

export function useCases() {
  const [cases, setCases] = useState<CaseCardData[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);

    const response = await caseService.getCases();

    setCases(response.map(mapToCaseCardData));

    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    cases,
    loading,
    reload: load,
  };
}

export function useCaseDetail(id: string) {
  const [detail, setDetail] = useState<CaseDetail>();

  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);

    const response = await caseService.getCaseDetail(id);

    setDetail(response);

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
