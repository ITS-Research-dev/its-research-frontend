import { ROUTES } from "@/constants/routes";
import api from "@/lib/api";
import { VerificationDetail } from "@/types/verification";

export interface ReviewPayload {
  decision: "terima" | "koreksi";
  scores?: Record<string, number>;
  teacherNote?: string;
}

class VerificationService {
  async getQueue(className?: string, q?: string): Promise<VerificationDetail[]> {
    const params = new URLSearchParams();
    if (className) params.append("class", className);
    if (q) params.append("q", q);

    const queryString = params.toString();
    const url = queryString
      ? `${ROUTES.API.TEACHER.VERIFICATION}?${queryString}`
      : ROUTES.API.TEACHER.VERIFICATION;

    const response = await api.get<VerificationDetail[]>(url);
    return response.data;
  }

  async getDetail(id: string): Promise<VerificationDetail> {
    const response = await api.get<VerificationDetail>(
      `${ROUTES.API.TEACHER.VERIFICATION}/${id}`,
    );
    return response.data;
  }

  async submitReview(id: string, payload: ReviewPayload): Promise<void> {
    await api.post(`${ROUTES.API.TEACHER.VERIFICATION}/${id}/review`, payload);
  }
}

export const verificationService = new VerificationService();
export default verificationService;
