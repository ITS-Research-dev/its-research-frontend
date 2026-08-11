"use client";

import { useCallback, useEffect, useState } from "react";

import { monitoringService } from "@/services/monitoring.service";

import { MonitoringData, MonitoringStudentDetail } from "@/types/monitoring";

export function useMonitoring() {
  const [data, setData] = useState<MonitoringData>();
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setLoading(true);

      const result = await monitoringService.getMonitoring();

      setData(result);
    } finally {
      setLoading(false);
    }
  }, []);

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
