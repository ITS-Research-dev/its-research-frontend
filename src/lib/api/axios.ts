import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/auth.store";
import { storage } from "@/utils/storage";
import axios, { InternalAxiosRequestConfig } from "axios";
import type { RefreshResponse } from "@/types/auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

let refreshRequest: Promise<string> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const requestUrl = error.config?.url ?? "";
    const isLoginRequest = requestUrl.includes(ROUTES.LOGIN);
    const isRefreshRequest = requestUrl.includes(ROUTES.REFRESH);
    const request = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (
      error.response?.status === 401 &&
      request &&
      !request._retry &&
      !isLoginRequest &&
      !isRefreshRequest
    ) {
      request._retry = true;

      try {
        if (!refreshRequest) {
          const refreshToken = storage.getRefreshToken();
          if (!refreshToken) throw new Error("Refresh token tidak tersedia");

          refreshRequest = api
            .post<RefreshResponse>(ROUTES.REFRESH, {
              refresh_token: refreshToken,
            })
            .then(({ data }) => {
              storage.saveToken(data.access_token);
              storage.saveRefreshToken(data.refresh_token);
              return data.access_token;
            })
            .finally(() => {
              refreshRequest = null;
            });
        }

        const accessToken = await refreshRequest;
        request.headers.Authorization = `Bearer ${accessToken}`;
        return api(request);
      } catch (refreshError) {
        storage.clear();
        useAuthStore.getState().logout();

        if (
          typeof window !== "undefined" &&
          window.location.pathname !== ROUTES.LOGIN_PAGE
        ) {
          window.location.replace(ROUTES.LOGIN_PAGE);
        }

        return Promise.reject(refreshError);
      }
    }

    if (
      !isLoginRequest &&
      !isRefreshRequest &&
      [401, 403].includes(error.response?.status)
    ) {
      storage.clear();
      useAuthStore.getState().logout();

      if (
        typeof window !== "undefined" &&
        window.location.pathname !== ROUTES.LOGIN_PAGE
      ) {
        window.location.replace(ROUTES.LOGIN_PAGE);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
