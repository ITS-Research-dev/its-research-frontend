// hooks/useMaterial.ts
"use client";

import materialService from "@/services/material.service";
import { MaterialCardData, MaterialDetail } from "@/types/materials";
import { mapToCardData } from "@/utils/materialMapper";
import { useCallback, useEffect, useState } from "react";

export function useMaterials() {
  const [materials, setMaterials] = useState<MaterialCardData[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const responses = await materialService.getMateri();
    setMaterials(responses.map(mapToCardData));
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { materials, loading, reload: load };
}

export function useMaterialDetail(id: string) {
  const [material, setMaterial] = useState<MaterialDetail>();
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const response = await materialService.getDetailMateri(id);
    setMaterial(response);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  return { material, loading, reload: load };
}