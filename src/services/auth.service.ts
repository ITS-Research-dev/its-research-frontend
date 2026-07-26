import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/constants/api";

import type { LoginRequest } from "@/types/auth";

export const AuthService = {
  login: async (payload: LoginRequest) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, payload);

    return response.data;
  },

  logout: async () => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT);

    return response.data;
  },
};
