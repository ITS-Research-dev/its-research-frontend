import { api } from "./axios";
import { storage } from "@/utils/storage";

api.interceptors.request.use((config) => {
  const token = storage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
