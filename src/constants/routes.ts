export const ROUTES = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",

  API: {
    STUDENT: {
      MATERI: "/siswa/materi",
      PROFILE: "/siswa/profile",
      STUDY_CASE: "/siswa/study-case",
      RUN_CODE: "/siswa/study-case/run",
      SUBMIT_CASE: "/siswa/test/ai/assess",
    },
    TEACHER: {
      VERIFICATION: "/teacher/verifications",
      DASHBOARD: "/teacher/dashboard",
      DASHBOARD_TREND: "/teacher/dashboard/trend",
      BANK_MATERI: "/teacher/bank/materials",
      BANK_SOAL: "/teacher/bank/questions",
      MONITORING_CLASSES: "/teacher/monitoring/classes",
      MONITORING_CLASS: (className: string) =>
        `/teacher/monitoring/classes/${encodeURIComponent(className)}`,
      MONITORING_STUDENT: (className: string, studentId: string) =>
        `/teacher/monitoring/classes/${encodeURIComponent(className)}/students/${studentId}`,
    },
  },

  LOGIN_PAGE: "/auth/login",

STUDENT_DASHBOARD: "/student/materials",

  TEACHER_DASHBOARD: "/teacher/dashboard",
};
