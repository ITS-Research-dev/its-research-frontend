import api from "@/lib/api";

import { ROUTES } from "@/constants/routes";

import { AssessmentLevel } from "@/types/asessment";
import {
  ApiMonitoringTrendResponse,
  MonitoringData,
  MonitoringStudent,
  MonitoringStudentDetail,
  MonitoringTopicScore,
} from "@/types/monitoring";

import { ProfileResponse, ProfileSummary } from "@/types/profile";

import { useAuthStore } from "@/store/auth.store";
import { useClassStore } from "@/store/class.store";
import { storage } from "@/utils/storage";
import dashboardService from "@/services/dashboard.service";
import { formatIntoProfileSummary } from "@/utils/profileMapper";

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
   * Mendapatkan classId dan className aktif dari Auth / Class Store
   */
  getActiveClassInfo(preferredClassId?: string): {
    classId: string;
    className: string;
  } {
    const { selectedClassId: storeSelectedId, selectedClassName: storeSelectedName } =
      useClassStore.getState();
    const classesFromStorage = storage.getClass();

    const targetClassId =
      preferredClassId ||
      storeSelectedId ||
      classesFromStorage[0]?.value ||
      "";

    // Prioritaskan selectedClassName dari store jika class ID cocok
    if (
      storeSelectedName &&
      (!preferredClassId || preferredClassId === storeSelectedId)
    ) {
      return { classId: targetClassId, className: storeSelectedName };
    }

    // Fallback: cari dari storage
    const foundItem =
      classesFromStorage.find((c) => c.value === targetClassId) ||
      classesFromStorage[0];

    return {
      classId: targetClassId,
      className: foundItem?.label || "",
    };
  }

  /**
   * Mengambil data trend monitoring berdasarkan classId dari Auth store.
   * GET /teacher/monitoring/trend?classId={classId}
   */
  async getTrend(classId: string): Promise<ApiMonitoringTrendResponse> {
    const response = await api.get<ApiMonitoringTrendResponse>(
      ROUTES.API.TEACHER.MONITORING_TREND(classId),
    );
    return response.data;
  }

  /**
   * Mengambil data monitoring kelas.
   */
  async getMonitoring(classIdParam?: string): Promise<MonitoringData> {
    /* =====================================================
       1. AMBIL CLASS ID & CLASS NAME DARI AUTH STORE / CLASS STORE
    ===================================================== */
    const { classId, className: authClassName } =
      this.getActiveClassInfo(classIdParam);

    /* =====================================================
       2. FETCH TREND & DASHBOARD DATA (AGAR DENGAN DASHBOARD KONSISTEN SAMPAI DETIL)
    ===================================================== */
    let apiCompetencyTrend: ProfileSummary["competencyTrend"] = {};
    let apiLevelTrend: ProfileSummary["levelTrend"] = {};
    let apiTopicScores: MonitoringTopicScore[] = [];

    if (classId) {
      // 2a. Coba ambil trend dari endpoint monitoring trend
      try {
        const trendData: any = await this.getTrend(classId);
        if (
          trendData?.competencyTrend &&
          Object.keys(trendData.competencyTrend).length > 0
        ) {
          apiCompetencyTrend = trendData.competencyTrend;
          apiLevelTrend = trendData.levelTrend || trendData.competencyTrend;
        }
      } catch (error) {
        console.warn("Failed to fetch monitoring trend:", error);
      }

      // 2b. Jika endpoint monitoring trend belum mengirim data lengkap, ambil dari dashboard service
      if (Object.keys(apiCompetencyTrend).length === 0) {
        try {
          const dashTrend = await dashboardService.getTrend(classId);
          if (
            dashTrend?.competencyTrend &&
            Object.keys(dashTrend.competencyTrend).length > 0
          ) {
            apiCompetencyTrend = dashTrend.competencyTrend;
            apiLevelTrend = dashTrend.levelTrend || dashTrend.competencyTrend;
          }
        } catch (error) {
          console.warn(
            "Failed to fetch dashboard trend for monitoring:",
            error,
          );
        }
      }

      // 2c. Ambil topicScores dari dashboard service agar 100% persis dengan Dashboard Guru
      try {
        const dashData = await dashboardService.getDashboard(classId);
        if (dashData?.topicScores && dashData.topicScores.length > 0) {
          apiTopicScores = dashData.topicScores;
        }
      } catch (error) {
        console.warn(
          "Failed to fetch dashboard topic scores for monitoring:",
          error,
        );
      }
    }

    /* =====================================================
       3. FETCH DAFTAR KELAS & RESOLVE CLASS NAME
    ===================================================== */
    let resolvedClassName = authClassName;

    const response = await api.get<ApiClass[]>(
      ROUTES.API.TEACHER.MONITORING_CLASSES,
    );
    const classes = response.data;

    if (classes.length === 0 && !resolvedClassName) {
      return {
        summary: {
          className: "—",
          totalStudents: 0,
          averageScore: 0,
        },
        students: [],
        topicScores: apiTopicScores,
        competencyTrend: apiCompetencyTrend,
        levelTrend: apiLevelTrend,
        topics: apiTopicScores.map((t) => t.topic),
      };
    }

    if (classes.length > 0) {
      // 1. Exact match
      const exactMatch = classes.find((c) => c.nama === resolvedClassName);
      if (exactMatch) {
        resolvedClassName = exactMatch.nama;
      } else {
        // 2. Case-insensitive match
        const ciMatch = classes.find(
          (c) => c.nama.toLowerCase() === resolvedClassName.toLowerCase(),
        );
        if (ciMatch) {
          resolvedClassName = ciMatch.nama;
        } else if (!resolvedClassName) {
          // 3. Fallback ke kelas pertama hanya jika resolvedClassName benar-benar kosong
          resolvedClassName = classes[0].nama;
        }
        // Jika ada resolvedClassName tapi tidak match → tetap gunakan nilai dari store
        // agar request ke API menggunakan nama yang sesuai kelas yang dipilih
      }
    }

    /* =====================================================
       4. FETCH DETAIL KELAS
    ===================================================== */
    const detailRes = await api.get<ApiClassDetail>(
      ROUTES.API.TEACHER.MONITORING_CLASS(resolvedClassName),
    );
    const detail = detailRes.data;

    /* =====================================================
       5. FETCH DETAIL SETIAP SISWA & KUMPULKAN RIWAYAT
       Endpoint: MONITORING_STUDENT(className, studentId)
    ===================================================== */
    const allRawAssessments: ProfileResponse[] = [];

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

        allRawAssessments.push(...raw);

        const profile = buildProfileSummary(
          raw,
          studentData.nilai,
          studentData.hint,
          studentData.scores,
        );

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
       6. HITUNG FALLBACK SKOR PER TOPIK JIKA API DARI DASHBOARD KOSONG
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

    const fallbackTopicScores = Object.entries(topicMap).map(
      ([topic, value]) => ({
        topic,
        score: Math.round(value.total / value.count),
      }),
    );

    const finalTopicScores =
      apiTopicScores.length > 0 ? apiTopicScores : fallbackTopicScores;

    /* =====================================================
       7. BUILD FALLBACK COMPETENCY & LEVEL TREND (JIKA API TREND KOSONG)
    ===================================================== */
    let fallbackCompetencyTrend: ProfileSummary["competencyTrend"] = {};

    if (Object.keys(apiCompetencyTrend).length === 0) {
      const trendBucketMap: Record<
        string,
        Record<string, { sum: number; count: number }>
      > = {};

      allRawAssessments.forEach((item) => {
        const date = new Date(item.createdAt);
        const dayOfMonth = date.getDate();
        const weekStart = Math.floor((dayOfMonth - 1) / 7) * 7 + 1;
        const weekEnd = weekStart + 6;
        const weekLabel = `${String(weekStart).padStart(2, "0")}-${String(
          weekEnd,
        ).padStart(2, "0")}`;

        const monthLabel = String(date.getMonth() + 1).padStart(2, "0");
        const topicTitle = item.test.topic.title || "Umum";

        for (const label of [weekLabel, monthLabel]) {
          if (!trendBucketMap[label]) {
            trendBucketMap[label] = {};
          }

          if (!trendBucketMap[label]["total"]) {
            trendBucketMap[label]["total"] = { sum: 0, count: 0 };
          }
          trendBucketMap[label]["total"].sum += item.averageScore;
          trendBucketMap[label]["total"].count += 1;

          if (!trendBucketMap[label][topicTitle]) {
            trendBucketMap[label][topicTitle] = { sum: 0, count: 0 };
          }
          trendBucketMap[label][topicTitle].sum += item.averageScore;
          trendBucketMap[label][topicTitle].count += 1;
        }
      });

      for (const [label, bucket] of Object.entries(trendBucketMap)) {
        fallbackCompetencyTrend[label] = {};
        for (const [key, value] of Object.entries(bucket)) {
          fallbackCompetencyTrend[label][key] = {
            avg: Math.round(value.sum / value.count),
            count: value.count,
          };
        }
      }

      if (Object.keys(fallbackCompetencyTrend).length === 0) {
        const defaultWeeks = ["01-07", "08-14", "15-21", "22-28"];
        const avg = detail.rataNilai || 0;
        defaultWeeks.forEach((label) => {
          fallbackCompetencyTrend[label] = {
            total: { avg, count: 1 },
          };
          finalTopicScores.forEach((t) => {
            fallbackCompetencyTrend[label][t.topic] = {
              avg: t.score || avg,
              count: 1,
            };
          });
        });
      }
    }

    const finalCompetencyTrend =
      Object.keys(apiCompetencyTrend).length > 0
        ? apiCompetencyTrend
        : fallbackCompetencyTrend;

    const finalLevelTrend =
      Object.keys(apiLevelTrend).length > 0
        ? apiLevelTrend
        : finalCompetencyTrend;

    /* =====================================================
       8. RETURN DATA
    ===================================================== */
    return {
      summary: {
        className: detail.nama,
        totalStudents: detail.totalSiswa,
        averageScore: detail.rataNilai,
      },
      students,
      topicScores: finalTopicScores,
      competencyTrend: finalCompetencyTrend,
      levelTrend: finalLevelTrend,
      topics: finalTopicScores.map((item) => item.topic),
    };
  }

  /**
   * Mengambil detail satu siswa.
   */
  async getStudentDetail(
    studentId: string,
    className?: string,
  ): Promise<MonitoringStudentDetail> {
    let resolvedClass = className;

    if (!resolvedClass) {
      const activeInfo = this.getActiveClassInfo();
      resolvedClass = activeInfo.className;
    }

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

    /* =====================================================
       MAP RIWAYAT KE FORMAT ProfileResponse[]
       (sama persis dengan yang dikirim endpoint /siswa/profile)
    ===================================================== */
    const raw = mapRiwayatToProfileResponse(
      studentData.riwayat,
      studentData.scores,
    );

    /* =====================================================
       GUNAKAN formatIntoProfileSummary — SAMA PERSIS
       DENGAN HALAMAN PROFIL & RIWAYAT SISWA
    ===================================================== */
    const profile = formatIntoProfileSummary(raw);

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

  async getAssessmentDetail(studentId: string, assessmentId: string) {
    const res = await this.getStudentDetail(studentId);
    const item = res.profile.raw.find((a) => a.id === assessmentId);
    return item || null;
  }
}

export const monitoringService = new MonitoringService();
