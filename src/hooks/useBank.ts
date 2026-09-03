"use client";

import bankService from "@/services/bank.service";
import materialService from "@/services/material.service";
import { useClassStore } from "@/store/class.store";
import { BankMaterial, BankQuestion, TopicDropdown } from "@/types/bank";
import { storage } from "@/utils/storage";
import { useCallback, useEffect, useState } from "react";

export function useBank() {
  const [materials, setMaterials] = useState<BankMaterial[]>([]);
  const [questions, setQuestions] = useState<BankQuestion[]>([]);
  const selectedClassId = useClassStore((s) => s.selectedClassId);
  const [loading, setLoading] = useState(true);

  const load = useCallback(
    async (silent = false) => {
      const activeClassId = selectedClassId || storage.getClass()[0]?.value;
      if (!activeClassId) {
        setLoading(false);
        return;
      }
      if (!silent) setLoading(true);

      try {
        const [materialsRes, questionsRes] = await Promise.all([
          bankService.getMaterials(activeClassId),
          bankService.getQuestions(activeClassId),
        ]);
        setMaterials(materialsRes || []);
        setQuestions(questionsRes || []);
      } catch (e) {
        console.error("Error loading bank data:", e);
      } finally {
        setLoading(false);
      }
    },
    [selectedClassId],
  );

  useEffect(() => {
    load();
  }, [load]);

  return { materials, questions, loading, reload: () => load(true) };
}

export function useBankMateriDetail(id: string) {
  const [material, setMaterial] = useState<BankMaterial | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try{
      setLoading(true);
      const response = await bankService.getMaterial(id);
      setMaterial(response);
    }finally{
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  return { material, loading, reload: load };
}

export function useBankQuestionDetail(id: string) {
  const [question, setQuestion] = useState<BankQuestion>();
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try{
      setLoading(true);
      const response = await bankService.getQuestion(id);
      setQuestion(response);
    }finally{
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  return { question, loading, reload: load };
}