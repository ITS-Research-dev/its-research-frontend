import { DropdownItem } from "@/components/common/DataTable";
import { User } from "@/types/auth";
import Cookies from "js-cookie";

const TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_KEY = "user";

export const storage = {
  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);

    Cookies.set(TOKEN_KEY, token, {
      expires: 1,
      sameSite: "lax",
    });
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  saveRefreshToken(token: string) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
    Cookies.set(REFRESH_TOKEN_KEY, token, {
      expires: 7,
      sameSite: "lax",
    });
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);

    Cookies.remove(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
  },

  saveUser(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser(): User | null {
    const user = localStorage.getItem(USER_KEY);

    return user ? JSON.parse(user) : null;
  },

  getClass(): DropdownItem[] {
    const user = this.getUser();

    if (!user || !user.classId) return [];

    return user.classId.map((c: any) => ({
      value: c.class ? c.class.id : c.idClass || c.id,
      label: c.class ? c.class.title : c.title || "Kelas",
    }));
  },

  removeUser() {
    localStorage.removeItem(USER_KEY);
  },

  clear() {
    this.removeToken();
    this.removeUser();
  },
};
