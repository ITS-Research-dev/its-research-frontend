"use client";

import { useRouter } from "next/navigation";
import AuthService from "@/services/auth.service";
import { storage } from "@/utils/storage";
import { useAuthStore } from "@/store/auth.store";
import { ROUTES } from "@/constants/routes";
import { ROLES } from "@/constants/roles";
import { LoginRequest } from "@/types/auth";
import { useClassStore } from "@/store/class.store";

export function useAuth() {
  const router = useRouter();

  const { setToken, setUser, logout: clearStore } = useAuthStore();
  const { selectedClassId, setSelectedClassId } = useClassStore();

  const login = async (payload: LoginRequest) => {
    const response = await AuthService.login(payload);

    storage.saveToken(response.access_token);

    storage.saveUser(response.user);

    setToken(response.access_token);

    setUser(response.user);

    if (response.user.role === ROLES.TEACHER) {
      setSelectedClassId(storage.getClass()[0].value);
      router.replace(ROUTES.TEACHER_DASHBOARD);
    } else {
      router.replace(ROUTES.STUDENT_DASHBOARD);
    }

    router.refresh();
  };

  const logout = async () => {
    try {
      // await AuthService.logout();
    } finally {
      storage.clear();
      setSelectedClassId("")

      clearStore();

      router.replace(ROUTES.LOGIN_PAGE);

      router.refresh();
    }
  };

  return {
    login,
    logout,
  };
}
