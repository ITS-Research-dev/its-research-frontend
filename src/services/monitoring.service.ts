import api from "@/lib/api";

import { ROUTES } from "@/constants/routes";

import { MonitoringData, MonitoringStudentDetail } from "@/types/monitoring";
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
   Mappers
------------------------------------------------------------------ */

/**
 * Safely parses a score object that may arrive as a raw JSON string
 * (happens when the TypeORM JSON column is not auto-deserialized).
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

function normalizeScore(scoreObj: Record<string, any> | null | undefined) {
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
    fungsionalitas: Number(scoreObj.fungsionalitas ?? scoreObj.fungsi ?? scoreObj.Fungsionalitas ?? 0),
    logika: Number(scoreObj.logika ?? scoreObj.Logika ?? 0),
    syntax: Number(scoreObj.syntax ?? scoreObj.sintaks ?? scoreObj.Sintaks ?? 0),
    code_style: Number(scoreObj.code_style ?? scoreObj.gaya ?? scoreObj.Gaya ?? 0),
    dokumentasi: Number(scoreObj.dokumentasi ?? scoreObj.dok ?? scoreObj.Dokumentasi ?? 0),
    konsep: Number(scoreObj.konsep ?? scoreObj.Konsep ?? 0),
  };
}

function mapRiwayatToProfileResponse(
  riwayat: ApiStudentDetail["riwayat"],
  aggScores: ApiStudentDetail["scores"],
): ProfileResponse[] {
  return riwayat.map((r) => {
    const parsedAi = parseScore(r.aiScore);
    const ai = parsedAi ?? {
      fungsionalitas: aggScores.fungsi,
      logika: aggScores.logika,
      syntax: aggScores.sintaks,
      code_style: aggScores.gaya,
      dokumentasi: aggScores.dok,
      konsep: aggScores.konsep,
    };

    // If the score was verified by teacher, use teacherScore; otherwise mirror AI.
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
        topic: { title: r.topik ?? "Umum" },
      },
    };
  });
}

function buildProfileSummary(
  raw: ProfileResponse[],
  avgScore: number,
  totalHint: number,
  scores: ApiStudentDetail["scores"],
): ProfileSummary {
  const topics = [...new Set(raw.map((r) => r.test.topic.title))];

  const competencies = [
    { name: "fungsionalitas", value: scores.fungsi },
    { name: "logika", value: scores.logika },
    { name: "syntax", value: scores.sintaks },
    { name: "code_style", value: scores.gaya },
    { name: "dokumentasi", value: scores.dok },
    { name: "konsep", value: scores.konsep },
  ].map(({ name, value }) => ({ name, score: value }));

  // weekly trend
  const trendMap: Record<string, { sum: number; count: number }> = {};
  for (const r of raw) {
    const d = new Date(r.createdAt);
    const dayOfMonth = d.getDate();
    const weekStart = Math.floor((dayOfMonth - 1) / 7) * 7 + 1;
    const weekEnd = weekStart + 6;
    const label = `${String(weekStart).padStart(2, "0")}-${String(weekEnd).padStart(2, "0")}`;
    if (!trendMap[label]) trendMap[label] = { sum: 0, count: 0 };
    trendMap[label].sum += r.averageScore;
    trendMap[label].count += 1;
  }

  // placeholder will be displayed if there's no history, so chart still render
  if (Object.keys(trendMap).length === 0) {
    trendMap["01-07"] = { sum: avgScore, count: 1 };
  }

  const competencyTrend: ProfileSummary["competencyTrend"] = {};
  for (const [label, { sum, count }] of Object.entries(trendMap)) {
    competencyTrend[label] = { total: { avg: Math.round(sum / count), count } };
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
   * Fetches the list of classes and merges them into a MonitoringData
   */
  async getMonitoring(): Promise<MonitoringData> {
    const response = await api.get<ApiClass[]>(ROUTES.API.TEACHER.MONITORING_CLASSES);
    const classes = response.data;

    if (classes.length === 0) {
      return {
        summary: { className: "—", totalStudents: 0, averageScore: 0 },
        students: [],
        topicScores: [],
        competencyTrend: {},
        levelTrend: {},
        topics: [],
      };
    }

    // filter class matching currently logged in guru
    const currentUser = useAuthStore.getState().user;
    const primary = classes.find((c) => c.wali === currentUser?.name) ?? classes[0];

    // fetch the class detail to get the student list and avg score
    const detailRes = await api.get<ApiClassDetail>(
      ROUTES.API.TEACHER.MONITORING_CLASS(primary.nama),
    );
    const detail = detailRes.data;

    return {
      summary: {
        className: detail.nama,
        totalStudents: detail.totalSiswa,
        averageScore: detail.rataNilai,
      },
      students: detail.siswa.map((s) => ({ id: s.id, name: s.nama })),
      topicScores: [],
      competencyTrend: {},
      levelTrend: {},
      topics: [],
    };
  }

  /**
   * Fetches a single student's detail and maps it into
   * MonitoringStudentDetail (with a full ProfileSummary).
   */
  async getStudentDetail(
    studentId: string,
    className?: string,
  ): Promise<MonitoringStudentDetail> {
    let resolvedClass = className;
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

    const res = await api.get<ApiStudentDetail>(
      ROUTES.API.TEACHER.MONITORING_STUDENT(resolvedClass, studentId),
    );
    const d = res.data;

    const raw = mapRiwayatToProfileResponse(d.riwayat, d.scores);
    const profile = buildProfileSummary(raw, d.nilai, d.hint, d.scores);

    const topicScores = profile.nameMaterials.map((topic) => {
      const entries = raw.filter((r) => r.test.topic.title === topic);
      const avg =
        entries.length > 0
          ? Math.round(
            entries.reduce((s, r) => s + r.averageScore, 0) / entries.length,
          )
          : 0;
      return { topic, score: avg };
    });

    return {
      id: studentId,
      name: d.nama,
      className: resolvedClass,
      profile,
      topicScores,
    };
  }
}

export const monitoringService = new MonitoringService();
