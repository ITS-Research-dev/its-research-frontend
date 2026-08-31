import { ROUTES } from "@/constants/routes";
import api from "@/lib/api";
import { Scoring } from "@/types/profile";
import { CompetencyScore } from "@/types/asessment";
import { CaseDetail, CaseItem, RunCodePayload, RunCodeResponse } from "@/types/case";

/* ================================
 * Types
 * ================================ */

export interface SubmitCasePayload {
  soal: string;
  expectedOutput: string;
  studentCode: string;
  hintUsage: number;
}

export interface SubmitCaseResponse {
  aiScore: Scoring;
  overallScore: number;
  flagOverride: boolean;
  aiSuggestion: string;
  aiFinishTime: string;
  hintUsage: number;
  level: string;
}

/* ================================
 * Helpers
 * ================================ */

const COMPETENCY_LABEL_MAP: Record<keyof Scoring, string> = {
  fungsionalitas: "Fungsionalitas",
  logika: "Logika",
  syntax: "Syntax",
  code_style: "Code Style",
  dokumentasi: "Dokumentasi",
  konsep: "Konsep",
};

export function mapScoringToCompetencies(aiScore: Scoring): CompetencyScore[] {
  return (Object.keys(aiScore) as (keyof Scoring)[]).map((key) => ({
    name: COMPETENCY_LABEL_MAP[key] ?? key,
    score: aiScore[key],
  }));
}

/* ================================
 * Service
 * ================================ */

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
      stdin: payload.stdin,
    });
    return response.data;
  }

  async submitCase(payload: SubmitCasePayload): Promise<SubmitCaseResponse> {
    const response = await api.post<SubmitCaseResponse>(
      ROUTES.API.STUDENT.SUBMIT_CASE,
      payload,
    );
    return response.data;
  }
}

export default new CaseService();
