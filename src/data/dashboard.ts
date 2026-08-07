import {
  TeacherDashboardSummary,
  TopicScore,
  AIEfficiency,
} from "@/types/dashboard";

export const teacherDashboardSummary: TeacherDashboardSummary = {
  totalStudents: 35,

  averageAssessmentTime: "4 detik",

  averageScore: 83,
};

export const topicScores: TopicScore[] = [
  {
    topic: "Variabel",
    score: 88,
  },
  {
    topic: "Percabangan",
    score: 82,
  },
  {
    topic: "Perulangan",
    score: 65,
  },
  {
    topic: "Function",
    score: 90,
  },
  {
    topic: "List",
    score: 58,
  },
];

export const aiEfficiency: AIEfficiency = {
  percentage: 99.8,

  manualTime: "30 menit / siswa",

  aiTime: "4 detik / siswa",

  description:
    "Dengan bantuan AI, guru dapat fokus pada verifikasi hasil penilaian tanpa perlu mengoreksi satu per satu secara manual.",
};
