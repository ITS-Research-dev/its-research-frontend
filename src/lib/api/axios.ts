import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
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
    if (error.response?.status === 403) {
      storage.clear();
      useAuthStore.getState().logout();

      if (typeof window !== "undefined") {
        window.location.href = ROUTES.LOGIN_PAGE;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
