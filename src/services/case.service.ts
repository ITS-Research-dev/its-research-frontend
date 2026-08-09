import { ROUTES } from "@/constants/routes";
import api from "@/lib/api";
import { CaseDetail, CaseItem, RunCodePayload, RunCodeResponse } from "@/types/case";

class CaseService {
  async getCases(): Promise<CaseItem[]> {
    const response = await api.get<CaseItem[]>(ROUTES.API.STUDENT.STUDY_CASE);
    return response.data;
  }

  async getCaseDetail(id: string): Promise<CaseDetail> {
    const response = await api.get<CaseDetail>(`${ROUTES.API.STUDENT.STUDY_CASE}/${id}`);
    return response.data;
  }

  async runCode(payload: RunCodePayload): Promise<RunCodeResponse> {
    const response = await api.post<RunCodeResponse>(ROUTES.API.STUDENT.RUN_CODE, {
      code: payload.code,
    });
    return response.data;
  }

  async submitCase() {
    return Promise.resolve({
      score: 88,

      level: "Expert",

      feedback:
        "Kode berhasil dijalankan. Struktur algoritma sudah baik, namun dokumentasi dan efisiensi masih dapat ditingkatkan.",

      competencies: [
        {
          name: "Problem Solving",
          score: 10,
        },
        {
          name: "Algoritma",
          score: 88,
        },
        {
          name: "Syntax",
          score: 92,
        },
        {
          name: "Debugging",
          score: 86,
        },
        {
          name: "Efisiensi",
          score: 84,
        },
        {
          name: "Code Quality",
          score: 91,
        },
      ],
    });
  }
}

export default new CaseService();
