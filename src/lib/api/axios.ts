import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/auth.store";
import { storage } from "@/utils/storage";
import axios, { InternalAxiosRequestConfig } from "axios";
import type { RefreshResponse } from "@/types/auth";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const defaultHeaders = {
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": "true",
};

const api = axios.create({ baseURL, headers: defaultHeaders });

let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = (): Promise<string> => {
  if (!refreshPromise) {
    const refreshToken = storage.getRefreshToken();
    if (!refreshToken) return Promise.reject(new Error("Refresh token tidak tersedia"));

    refreshPromise = axios.post<RefreshResponse>(`${baseURL}${ROUTES.REFRESH}`,{ refresh_token: refreshToken }, { headers: defaultHeaders })
      .then(({ data }) => {
        storage.saveToken(data.access_token);
        storage.saveRefreshToken(data.refresh_token);
        return data.access_token;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

const forceLogout = () => {
  storage.clear();
  useAuthStore.getState().logout();

  if (typeof window !== "undefined" && window.location.pathname !== ROUTES.LOGIN_PAGE) {
    window.location.replace(ROUTES.LOGIN_PAGE);
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const requestUrl = error.config?.url ?? "";
    const status = error.response?.status;
    const isAuthRequest = requestUrl.includes(ROUTES.LOGIN) || requestUrl.includes(ROUTES.REFRESH);
    const request = error.config as | (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;

   //? Handle 401 karena Token Expired
    if (status === 401 && request && !request._retry && !isAuthRequest) {
      request._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        request.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(request);
      } catch (refreshError) {
        forceLogout();
        return Promise.reject(refreshError);
      }
    }

    //? Handle 403 (Kebanyakan karena ngeakses halaman yang protected)
    if (status === 403 && !isAuthRequest) forceLogout();
    return Promise.reject(error);
  },
);

export default api;
