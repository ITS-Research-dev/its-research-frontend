import api from "@/lib/api";

import { ROUTES } from "@/constants/routes";

import { LoginRequest, LoginResponse } from "@/types/auth";

class AuthService {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(ROUTES.LOGIN, payload);

    return response.data;
  }

  async logout() {
    const response = await api.post(ROUTES.LOGOUT);

    return response.data;
  }
}

export default new AuthService();
