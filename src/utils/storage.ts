import Cookies from "js-cookie";

const TOKEN_KEY = "access_token";
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

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);

    Cookies.remove(TOKEN_KEY);
  },

  saveUser(user: unknown) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser() {
    const user = localStorage.getItem(USER_KEY);

    return user ? JSON.parse(user) : null;
  },

  removeUser() {
    localStorage.removeItem(USER_KEY);
  },

  clear() {
    this.removeToken();

    this.removeUser();
  },
};
