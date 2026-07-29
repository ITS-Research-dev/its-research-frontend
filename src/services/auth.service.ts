import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/constants/api";

import type { LoginRequest, LoginResponse } from "@/types/auth";

export const AuthService = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      payload,
    );

    return response.data;
  },
};
