"use client";

import { useCallback, useEffect, useState } from "react";

import { monitoringService } from "@/services/monitoring.service";
import { useClassStore } from "@/store/class.store";

import { MonitoringData, MonitoringStudentDetail } from "@/types/monitoring";

export function useMonitoring() {
  const [data, setData] = useState<MonitoringData>();
  const [loading, setLoading] = useState(true);

  const selectedClassId = useClassStore((s) => s.selectedClassId);
  const selectedClassName = useClassStore((s) => s.selectedClassName);

  const load = useCallback(async () => {
    try {
      setLoading(true);

      const result = await monitoringService.getMonitoring(selectedClassId);

      setData(result);
    } finally {
      setLoading(false);
    }
  }, [selectedClassId, selectedClassName]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    data,
    loading,
    reload: load,
  };
}

export function useMonitoringStudent(id: string) {
  const [student, setStudent] = useState<MonitoringStudentDetail>();

  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setLoading(true);

      const result = await monitoringService.getStudentDetail(id);

      setStudent(result);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    student,
    loading,
    reload: load,
  };
}
