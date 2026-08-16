import api from "@/lib/api";

import { ROUTES } from "@/constants/routes";
import { LoginRequest, LoginResponse } from "@/types/auth";
import { BankData, BankMaterial, BankQuestion } from "@/types/bank";
import { MaterialFormData } from "@/components/bank/MaterialFormModal";
import { QuestionFormData } from "@/components/bank/QuestionFormModal";

class BankService {
  async getMaterials(idClass: string): Promise<BankMaterial[]> {
    const response = await api.get<BankMaterial[]>(
      ROUTES.API.TEACHER.BANK_MATERI + "?idClass=" + idClass,
    );
    return response.data;
  }

  async getQuestions(idClass: string): Promise<BankQuestion[]> {
    const response = await api.get<BankQuestion[]>(
      ROUTES.API.TEACHER.BANK_SOAL + "?idClass=" + idClass,
    );
    return response.data;
  }

  async createMaterial(
    idClass: string,
    data: MaterialFormData,
  ): Promise<BankMaterial> {
    const response = await api.post<BankMaterial>(
      ROUTES.API.TEACHER.BANK_MATERI,
      { ...data, idClass },
    );
    return response.data;
  }

  async editMaterial(
    id: string,
    data: MaterialFormData,
  ): Promise<BankMaterial> {
    const response = await api.put<BankMaterial>(
      ROUTES.API.TEACHER.BANK_MATERI + "/" + id,
      { ...data },
    );
    return response.data;
  }

  async createQuestion(
    data: QuestionFormData,
  ): Promise<BankQuestion> {
    const response = await api.post<BankQuestion>(
      ROUTES.API.TEACHER.BANK_SOAL,
      data,
    );
    return response.data;
  }

  async editQuestion(
    id: string,
    data: QuestionFormData,
  ): Promise<BankQuestion> {
    const response = await api.put<BankQuestion>(
      ROUTES.API.TEACHER.BANK_SOAL + "/" + id,
      data,
    );
    return response.data;
  }
}

export default new BankService();
