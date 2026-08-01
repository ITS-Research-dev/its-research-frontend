import {
  assessmentDetails,
  assessmentHistories,
} from "@/data/assessmentHistory";

import { AssessmentDetail, AssessmentHistoryItem } from "@/types/asessment";

class AssessmentService {
  /**
   * Mengambil seluruh riwayat asesmen
   */
  async getHistories(): Promise<AssessmentHistoryItem[]> {
    return assessmentHistories;
  }

  /**
   * Mengambil seluruh detail asesmen
   */
  async getDetails(): Promise<AssessmentDetail[]> {
    return assessmentDetails;
  }

  /**
   * Mengambil detail asesmen berdasarkan id
   */
  async getDetailById(id: string): Promise<AssessmentDetail | undefined> {
    return assessmentDetails.find((item) => item.id === id);
  }
}

export const assessmentService = new AssessmentService();
