import api from "@/lib/api";
import { ROUTES } from "@/constants/routes";

import { AssementDetailResponse } from "@/types/asessment";

class TeacherAssessmentService {
  async getDetailById(
    studentId: string,
    assessmentId: string,
  ): Promise<AssementDetailResponse> {
    const response = await api.get<AssementDetailResponse>(
      `${ROUTES.API.TEACHER.STUDENT_PROFILE}/${studentId}/assessment/${assessmentId}`,
    );

    return response.data;
  }
}

export const teacherAssessmentService = new TeacherAssessmentService();
