import { ROUTES } from "@/constants/routes";
import { caseDetails, caseItems } from "@/data/case";
import api from "@/lib/api";
import { CaseItem, RunCodePayload, RunCodeResponse } from "@/types/case";

class CaseService {
  async getCases() : Promise<CaseItem[]> {
    const response = await api.get<CaseItem[]>(ROUTES.API.STUDENT.MATERI);
    return response.data;
  }

  async getCaseDetail(id: string) {
    const detail = caseDetails.find((item) => item.id === id);

    if (!detail) {
      throw new Error("Studi kasus tidak ditemukan");
    }

    return Promise.resolve(detail);
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

  async runCode(payload: RunCodePayload): Promise<RunCodeResponse> {
    await new Promise((resolve) => setTimeout(resolve, 700));

    const code = payload.code;

    if (code.trim() === "") {
      return {
        stdout: "",
        stderr: "SyntaxError: invalid syntax",
        exitCode: 1,
      };
    }

    if (!code.includes("print")) {
      return {
        stdout: "",
        stderr: "NameError: name 'printt' is not defined",
        exitCode: 1,
      };
    }

    const detail = caseDetails.find((item) =>
      item.questions.some((q) => q.id === payload.questionId),
    );

    const question = detail?.questions.find((q) => q.id === payload.questionId);

    return {
      stdout: question?.expectedOutput ?? "",
      stderr: "",
      exitCode: 0,
    };
  }
}

export default new CaseService();
