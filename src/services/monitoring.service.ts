import api from "@/lib/api";

import { ROUTES } from "@/constants/routes";

import { MonitoringData, MonitoringStudentDetail } from "@/types/monitoring";

class MonitoringService {
  /**
   * Mengambil data monitoring kelas
   */
  async getMonitoring(): Promise<MonitoringData> {
    const response = await api.get<MonitoringData>(
      ROUTES.API.TEACHER.STUDENT_PROFILE,
    );

    return response.data;
  }

  /**
   * Mengambil detail siswa berdasarkan ID
   */
  async getStudentDetail(id: string): Promise<MonitoringStudentDetail> {
    const response = await api.get<MonitoringStudentDetail>(
      `${ROUTES.API.TEACHER.STUDENT_PROFILE}/${id}`,
    );

    return response.data;
  }

  /**
   * Mengambil detail assessment siswa
   */
  async getAssessmentDetail(studentId: string, assessmentId: string) {
    const response = await api.get(
      `${ROUTES.API.TEACHER.STUDENT_ASSESSMENT}/${studentId}/${assessmentId}`,
    );

    return response.data;
  }
}

export const monitoringService = new MonitoringService();
