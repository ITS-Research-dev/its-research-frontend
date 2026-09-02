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
      // Submission queue endpoints
      SUBMISSION_SUBMIT: "/siswa/submission/submit",
      SUBMISSION_EVENTS: "/siswa/submission/queue/events",
      SUBMISSION_STATUS: (jobId: string) => `/siswa/submission/status/${jobId}`,
      SUBMISSION_MY_QUEUE: "/siswa/submission/my-queue",
      SUBMISSION_STATS: "/siswa/submission/stats",
    },
    TEACHER: {
      VERIFICATION: "/teacher/verifications",
      DASHBOARD: "/teacher/dashboard",
      DASHBOARD_TREND: "/teacher/dashboard/trend",
      BANK_MATERI: "/teacher/bank/materials",
      BANK_SOAL: "/teacher/bank/questions",
      GENERATE_FROM_REFERENCE: "/api/generate-materi",
      MONITORING_CLASSES: "/teacher/monitoring/classes",
      MONITORING_CLASS: (className: string) =>
        `/teacher/monitoring/classes/${encodeURIComponent(className)}`,
      MONITORING_STUDENT: (className: string, studentId: string) =>
        `/teacher/monitoring/classes/${encodeURIComponent(className)}/students/${studentId}`,
      STUDENT_PROFILE: "/teacher/student-profile",
    },
    GEMINI: {
      GENERATE_MATERI: "/api/generate-materi",
      COUNT_TOKENS: "/api/count-tokens",
    },
  },

  LOGIN_PAGE: "/auth/login",

STUDENT_DASHBOARD: "/student/materials",

  TEACHER_DASHBOARD: "/teacher/dashboard",
};
