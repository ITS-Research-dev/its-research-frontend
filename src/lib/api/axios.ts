import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/auth.store";
import { storage } from "@/utils/storage";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url ?? "";
    const isLoginRequest = requestUrl.includes(ROUTES.LOGIN);

    if (!isLoginRequest && [401, 403].includes(error.response?.status)) {
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
