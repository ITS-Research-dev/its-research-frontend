import { ROUTES } from "@/constants/routes";
import {
  assessmentDetails,
  assessmentHistories,
} from "@/data/assessmentHistory";
import api from "@/lib/api";

import { AssementDetailResponse, AssessmentDetail } from "@/types/asessment";

class AssessmentService {

  /**
   * Mengambil seluruh detail asesmen
   */
  async getDetails(): Promise<AssessmentDetail[]> {
    return assessmentDetails;
  }

  /**
   * Mengambil detail asesmen berdasarkan id
   */
  async getDetailById(id: string): Promise<AssementDetailResponse> {
        const response = await api.get<AssementDetailResponse>(`${ROUTES.API.STUDENT.PROFILE}/${id}`)
        return response.data
  }
}

export const assessmentService = new AssessmentService();
