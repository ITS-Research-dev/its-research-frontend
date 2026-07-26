import api from "@/lib/axios";

export const UserService = {
  getProfile() {
    return api.get("/user/profile");
  },

  getStudents(classId: number) {
    return api.get("/user", {
      params: {
        classId,
      },
    });
  },
};
