import { ROUTES } from "@/constants/routes";
import api from "@/lib/api";
import { VerificationDetail } from "@/types/verification";

export interface ReviewPayload {
  decision: "terima" | "koreksi";
  scores?: Record<string, number>;
  teacherNote?: string;
}

export interface RetryPayload {
  // allowRetry: boolean;
  retryDeadline: string;
}

class VerificationService {
  async getQueue(
    className?: string,
    q?: string,
  ): Promise<VerificationDetail[]> {
    const params = new URLSearchParams();
    if (className) params.append("class", className);
    if (q) params.append("q", q);

    const queryString = params.toString();
    const url = queryString
      ? `${ROUTES.API.TEACHER.VERIFICATION}?${queryString}`
      : ROUTES.API.TEACHER.VERIFICATION;

    const response = await api.get<VerificationDetail[]>(url);
    return Array.isArray(response.data) ? response.data : [];
  }

  async getDetail(id: string): Promise<VerificationDetail> {
    const response = await api.get<VerificationDetail>(
      `${ROUTES.API.TEACHER.VERIFICATION}/${id}`,
    );
    if (!response.data) {
      throw new Error("Verification detail not found");
    }
    return response.data;
  }

  async submitReview(id: string, payload: ReviewPayload): Promise<void> {
    await api.post(`${ROUTES.API.TEACHER.VERIFICATION}/${id}/review`, payload);
  }

  /**
   * Mengirim persetujuan coba ulang ke backend.
   * Endpoint: POST /teacher/verifications/:id/retry
   * Body: { allowRetry: true, retryDeadline: "<ISO string>" }
   *
   * Field sesuai backend commit c7c861525f52b2a40e475254424b9f5d232c187d.
   */
  async approveRetry(id: string, retryDeadline: string): Promise<void> {
    const payload: RetryPayload = {
      // allowRetry: true,
      retryDeadline,
    };
    await api.post(`${ROUTES.API.TEACHER.VERIFICATION}/${id}/retry`, payload);
  }
}

export const verificationService = new VerificationService();
export default verificationService;
