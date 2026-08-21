import api from "@/lib/api";

import { ROUTES } from "@/constants/routes";

import { AssessmentLevel } from "@/types/asessment";
import {
  MonitoringData,
  MonitoringStudent,
  MonitoringStudentDetail,
} from "@/types/monitoring";

import { ProfileResponse, ProfileSummary } from "@/types/profile";

import { useAuthStore } from "@/store/auth.store";

/* ------------------------------------------------------------------
   Raw shapes returned by the backend
------------------------------------------------------------------ */

interface ApiClass {
  nama: string;
  wali: string;
  totalSiswa: number;
  countTotal: number;
}

interface ApiStudentItem {
  id: string;
  nama: string;
}

interface ApiClassDetail {
  nama: string;
  wali: string;
  totalSiswa: number;
  rataNilai: number;
  siswa: ApiStudentItem[];
}

interface ApiStudentDetail {
  nama: string;
  nilai: number;
  hint: number;

  scores: {
    logika: number;
    fungsi: number;
    sintaks: number;
    dok: number;
    gaya: number;
    konsep: number;
  };

  riwayat: {
    id: string;
    soal: string;
    topik: string | null;
    nilai: number;
    level: string;
    createdAt: string;

    aiScore: Record<string, number> | string | null;

    teacherScore: Record<string, number> | string | null;

    flagOverride: boolean;

    hintUsage: number;

    aiSuggestion: string | null;

    teacherSuggestion: string | null;
  }[];
}

/* ------------------------------------------------------------------
   Helpers
------------------------------------------------------------------ */

/**
 * Parse score jika backend mengirim JSON string.
 */
function parseScore(
  raw: Record<string, number> | string | null | undefined,
): Record<string, number> | null {
  if (!raw) return null;

  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as Record<string, number>;
    } catch {
      return null;
    }
  }

  return raw;
}

/**
 * Menyamakan berbagai kemungkinan nama property score
 * dari backend menjadi format frontend.
 */
function normalizeScore(scoreObj: Record<string, unknown> | null | undefined) {
  if (!scoreObj) {
    return {
      fungsionalitas: 0,
      logika: 0,
      syntax: 0,
      code_style: 0,
      dokumentasi: 0,
      konsep: 0,
    };
  }

  return {
    fungsionalitas: Number(
      scoreObj.fungsionalitas ??
        scoreObj.fungsi ??
        scoreObj.Fungsionalitas ??
        0,
    ),

    logika: Number(scoreObj.logika ?? scoreObj.Logika ?? 0),

    syntax: Number(
      scoreObj.syntax ??
        scoreObj.sintaks ??
        scoreObj.Syntax ??
        scoreObj.Sintaks ??
        0,
    ),

    code_style: Number(
      scoreObj.code_style ??
        scoreObj.gaya ??
        scoreObj.CodeStyle ??
        scoreObj.Gaya ??
        0,
    ),

    dokumentasi: Number(
      scoreObj.dokumentasi ?? scoreObj.dok ?? scoreObj.Dokumentasi ?? 0,
    ),

    konsep: Number(scoreObj.konsep ?? scoreObj.Konsep ?? 0),
  };
}

/**
 * Memastikan level dari API sesuai dengan AssessmentLevel.
 */
function normalizeAssessmentLevel(
  level: string | null | undefined,
): AssessmentLevel {
  const validLevels: AssessmentLevel[] = [
    "Novice",
    "Beginner",
    "Advance/Beginner",
    "Advance",
    "Competent",
    "Expert",
  ];

  if (level && validLevels.includes(level as AssessmentLevel)) {
    return level as AssessmentLevel;
  }

  return "Novice";
}

/* ------------------------------------------------------------------
   Profile Response Mapper
------------------------------------------------------------------ */

function mapRiwayatToProfileResponse(
  riwayat: ApiStudentDetail["riwayat"],
  aggScores: ApiStudentDetail["scores"],
): ProfileResponse[] {
  return (riwayat ?? []).map((r) => {
    const parsedAi = parseScore(r.aiScore);

    const ai = parsedAi ?? {
      fungsionalitas: aggScores.fungsi,
      logika: aggScores.logika,
      syntax: aggScores.sintaks,
      code_style: aggScores.gaya,
      dokumentasi: aggScores.dok,
      konsep: aggScores.konsep,
    };

    const rawTeacher = parseScore(r.teacherScore);

    const teacher = r.flagOverride && rawTeacher ? rawTeacher : ai;

    return {
      id: r.id,

      averageScore: r.nilai,

      level: r.level,

      createdAt: r.createdAt,

      hintUsage: r.hintUsage ?? 0,

      flagOverride: r.flagOverride,

      aiSuggestion: r.aiSuggestion ?? null,

      teacherSuggestion: r.teacherSuggestion ?? null,

      aiScore: normalizeScore(ai),

      teacherScore: normalizeScore(teacher),

      test: {
        title: r.soal,

        topic: {
          title: r.topik ?? "Umum",
        },
      },
    };
  });
}

/* ------------------------------------------------------------------
   Build Profile Summary
------------------------------------------------------------------ */

function buildProfileSummary(
  raw: ProfileResponse[],
  avgScore: number,
  totalHint: number,
  scores: ApiStudentDetail["scores"],
): ProfileSummary {
  const topics = [...new Set(raw.map((item) => item.test.topic.title))];

  const competencies = [
    {
      name: "fungsionalitas",
      value: scores.fungsi,
    },

    {
      name: "logika",
      value: scores.logika,
    },

    {
      name: "syntax",
      value: scores.sintaks,
    },

    {
      name: "code_style",
      value: scores.gaya,
    },

    {
      name: "dokumentasi",
      value: scores.dok,
    },

    {
      name: "konsep",
      value: scores.konsep,
    },
  ].map(({ name, value }) => ({
    name,
    score: value,
  }));

  /* =====================================================
     BUILD WEEKLY TREND
  ===================================================== */

  const trendMap: Record<
    string,
    {
      sum: number;
      count: number;
    }
  > = {};

  for (const item of raw) {
    const date = new Date(item.createdAt);

    const dayOfMonth = date.getDate();

    const weekStart = Math.floor((dayOfMonth - 1) / 7) * 7 + 1;

    const weekEnd = weekStart + 6;

    const label = `${String(weekStart).padStart(2, "0")}-${String(
      weekEnd,
    ).padStart(2, "0")}`;

    if (!trendMap[label]) {
      trendMap[label] = {
        sum: 0,
        count: 0,
      };
    }

    trendMap[label].sum += item.averageScore;

    trendMap[label].count += 1;
  }

  /**
   * Jika siswa belum memiliki riwayat,
   * tetap tampilkan satu data agar chart
   * tidak kosong.
   */
  if (Object.keys(trendMap).length === 0) {
    trendMap["01-07"] = {
      sum: avgScore,
      count: 1,
    };
  }

  const competencyTrend: ProfileSummary["competencyTrend"] = {};

  for (const [label, value] of Object.entries(trendMap)) {
    competencyTrend[label] = {
      total: {
        avg: Math.round(value.sum / value.count),

        count: value.count,
      },
    };
  }

  return {
    averageScore: avgScore,

    totalHints: totalHint,

    nameMaterials: topics,

    totalMaterials: topics.length,

    totalCases: raw.length,

    competencies,

    competencyTrend,

    levelTrend: competencyTrend,

    raw,
  };
}

/* ------------------------------------------------------------------
   Service
------------------------------------------------------------------ */

class MonitoringService {
  /**
   * Mengambil data monitoring kelas.
   */
  async getMonitoring(): Promise<MonitoringData> {
    /* =====================================================
       FETCH LIST KELAS
    ===================================================== */

    const response = await api.get<ApiClass[]>(
      ROUTES.API.TEACHER.MONITORING_CLASSES,
    );

    const classes = response.data;

    /* =====================================================
       JIKA BELUM ADA KELAS
    ===================================================== */

    if (classes.length === 0) {
      return {
        summary: {
          className: "—",
          totalStudents: 0,
          averageScore: 0,
        },

        students: [],

        topicScores: [],

        competencyTrend: {},

        levelTrend: {},

        topics: [],
      };
    }

    /* =====================================================
       PILIH KELAS GURU
    ===================================================== */

    const currentUser = useAuthStore.getState().user;

    const primary =
      classes.find((item) => item.wali === currentUser?.name) ?? classes[0];

    /* =====================================================
       FETCH DETAIL KELAS
    ===================================================== */

    const detailRes = await api.get<ApiClassDetail>(
      ROUTES.API.TEACHER.MONITORING_CLASS(primary.nama),
    );

    const detail = detailRes.data;

    /* =====================================================
       FETCH DETAIL SETIAP SISWA

       Endpoint tetap sama dengan sebelumnya:
       MONITORING_STUDENT(className, studentId)
    ===================================================== */

    const students: MonitoringStudent[] = await Promise.all(
      detail.siswa.map(async (student) => {
        const studentRes = await api.get<ApiStudentDetail>(
          ROUTES.API.TEACHER.MONITORING_STUDENT(detail.nama, student.id),
        );

        const studentData = studentRes.data;

        const raw = mapRiwayatToProfileResponse(
          studentData.riwayat,
          studentData.scores,
        );

        const profile = buildProfileSummary(
          raw,
          studentData.nilai,
          studentData.hint,
          studentData.scores,
        );

        /**
         * Ambil level asesmen terakhir.
         */
        const latestAssessment =
          raw.length > 0 ? raw[raw.length - 1] : undefined;

        const assessments = raw.map((item) => ({
          id: item.id,

          topic: item.test.topic.title,

          title: item.test.title,

          score: item.averageScore,

          level: normalizeAssessmentLevel(item.level),

          hintsUsed: item.hintUsage,

          duration: "-",

          feedback: item.teacherSuggestion ?? item.aiSuggestion ?? "-",

          competencies: [
            {
              name: "Fungsionalitas",

              score: item.teacherScore.fungsionalitas,
            },

            {
              name: "Logika",

              score: item.teacherScore.logika,
            },

            {
              name: "Syntax",

              score: item.teacherScore.syntax,
            },

            {
              name: "Code Style",

              score: item.teacherScore.code_style,
            },

            {
              name: "Dokumentasi",

              score: item.teacherScore.dokumentasi,
            },

            {
              name: "Konsep",

              score: item.teacherScore.konsep,
            },
          ],

          /**
           * API monitoring saat ini belum
           * mengirim detail pertanyaan.
           */
          questions: [],
        }));

        return {
          id: student.id,

          name: studentData.nama,

          averageScore: studentData.nilai,

          level: latestAssessment ? latestAssessment.level : "Belum Ada",

          competencies: profile.competencies,

          assessments,
        };
      }),
    );

    /* =====================================================
       HITUNG RATA-RATA SKOR PER TOPIK
    ===================================================== */

    const topicMap: Record<
      string,
      {
        total: number;
        count: number;
      }
    > = {};

    students.forEach((student) => {
      student.assessments.forEach((assessment) => {
        if (!topicMap[assessment.topic]) {
          topicMap[assessment.topic] = {
            total: 0,
            count: 0,
          };
        }

        topicMap[assessment.topic].total += assessment.score;

        topicMap[assessment.topic].count += 1;
      });
    });

    const topicScores = Object.entries(topicMap).map(([topic, value]) => ({
      topic,

      score: Math.round(value.total / value.count),
    }));

    /* =====================================================
       BUILD COMPETENCY TREND KELAS
    ===================================================== */

    const competencyTrend: ProfileSummary["competencyTrend"] = {};

    topicScores.forEach((item) => {
      competencyTrend[item.topic] = {
        total: {
          avg: item.score,

          count: 1,
        },
      };
    });

    /* =====================================================
       LEVEL TREND

       Sementara menggunakan struktur yang sama agar
       komponen chart tetap kompatibel.
    ===================================================== */

    const levelTrend = competencyTrend;

    /* =====================================================
       RETURN DATA
    ===================================================== */

    return {
      summary: {
        className: detail.nama,

        totalStudents: detail.totalSiswa,

        averageScore: detail.rataNilai,
      },

      students,

      topicScores,

      competencyTrend,

      levelTrend,

      topics: topicScores.map((item) => item.topic),
    };
  }

  /**
   * Mengambil detail satu siswa.
   *
   * Endpoint dan alur fetch tetap sama
   * dengan implementasi sebelumnya.
   */
  async getStudentDetail(
    studentId: string,
    className?: string,
  ): Promise<MonitoringStudentDetail> {
    let resolvedClass = className;

    /* =====================================================
       CARI KELAS JIKA BELUM DIKIRIM
    ===================================================== */

    if (!resolvedClass) {
      const classesRes = await api.get<ApiClass[]>(
        ROUTES.API.TEACHER.MONITORING_CLASSES,
      );

      if (classesRes.data.length > 0) {
        resolvedClass = classesRes.data[0].nama;
      } else {
        throw new Error("No classes available");
      }
    }

    /* =====================================================
       FETCH DETAIL SISWA

       Endpoint tetap sama.
    ===================================================== */

    const res = await api.get<ApiStudentDetail>(
      ROUTES.API.TEACHER.MONITORING_STUDENT(resolvedClass, studentId),
    );

    const studentData = res.data;

    const raw = mapRiwayatToProfileResponse(
      studentData.riwayat,
      studentData.scores,
    );

    const profile = buildProfileSummary(
      raw,
      studentData.nilai,
      studentData.hint,
      studentData.scores,
    );

    /* =====================================================
       HITUNG SKOR BERDASARKAN TOPIK
    ===================================================== */

    const topicScores = profile.nameMaterials.map((topic) => {
      const entries = raw.filter((item) => item.test.topic.title === topic);

      const average =
        entries.length > 0
          ? Math.round(
              entries.reduce((total, item) => total + item.averageScore, 0) /
                entries.length,
            )
          : 0;

      return {
        topic,

        score: average,
      };
    });

    return {
      id: studentId,

      name: studentData.nama,

      className: resolvedClass,

      profile,

      topicScores,
    };
  }
}

export const monitoringService = new MonitoringService();
