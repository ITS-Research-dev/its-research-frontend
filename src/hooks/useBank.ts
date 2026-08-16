// hooks/useMaterial.ts
"use client";

import bankService from "@/services/bank.service";
import materialService from "@/services/material.service";
import { useClassStore } from "@/store/class.store";
import { BankMaterial, BankQuestion, TopicDropdown } from "@/types/bank";
import { useCallback, useEffect, useState } from "react";

export function useBank() {
  const [materials, setMaterials] = useState<BankMaterial[]>([]);
  const [questions, setQuestions] = useState<BankQuestion[]>([]);
  const selectedClassId = useClassStore((s) => s.selectedClassId);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!selectedClassId) {
      setLoading(false);
      return;
    }
    setLoading(true);

    const materialsRes = await bankService.getMaterials(selectedClassId);
    setMaterials(materialsRes);
    const questionsRes = await bankService.getQuestions(selectedClassId);
    setQuestions(questionsRes);

    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { materials, questions, loading, reload: load };
}