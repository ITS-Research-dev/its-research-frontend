import { ProfileSummary } from "./profile";
import { AssessmentDetail } from "@/types/asessment";

/* =========================================================
   STUDENT
========================================================= */

export interface MonitoringStudent {
  id: string;

  name: string;

  /**
   * Rata-rata nilai seluruh asesmen siswa.
   */
  averageScore: number;

  /**
   * Level kemampuan siswa saat ini.
   */
  level: string;

  /**
   * Nilai setiap kompetensi siswa.
   */
  competencies: {
    name: string;
    score: number;
  }[];

  /**
   * Riwayat asesmen yang telah dikerjakan siswa.
   */
  assessments: AssessmentDetail[];
}

/* =========================================================
   TOPIC SCORE
========================================================= */

export interface MonitoringTopicScore {
  topic: string;

  score: number;
}

/* =========================================================
   CLASS SUMMARY
========================================================= */

export interface MonitoringSummary {
  className: string;

  totalStudents: number;

  averageScore: number;
}

/* =========================================================
   MONITORING DATA
========================================================= */

export interface MonitoringData {
  /**
   * Ringkasan informasi kelas.
   */
  summary: MonitoringSummary;

  /**
   * Seluruh data siswa beserta nilai dan riwayat asesmennya.
   */
  students: MonitoringStudent[];

  /**
   * Rata-rata skor setiap topik dalam kelas.
   */
  topicScores: MonitoringTopicScore[];

  /**
   * Data perkembangan kompetensi seluruh kelas.
   *
   * Mengikuti struktur ProfileSummary agar dapat digunakan
   * kembali oleh komponen chart yang sama.
   */
  competencyTrend: ProfileSummary["competencyTrend"];

  /**
   * Data perkembangan level siswa dalam kelas.
   */
  levelTrend: ProfileSummary["levelTrend"];

  /**
   * Daftar topik pembelajaran dalam kelas.
   */
  topics: string[];
}

/* =========================================================
   STUDENT DETAIL
========================================================= */

export interface MonitoringStudentDetail {
  id: string;

  name: string;

  className: string;

  /**
   * Data profil siswa.
   */
  profile: ProfileSummary;

  /**
   * Skor siswa berdasarkan topik.
   */
  topicScores: MonitoringTopicScore[];
}

/* =========================================================
   MONITORING TREND
========================================================= */

export interface MonitoringCompetencyTrend {
  topic: string;
  averageScore: number;
}

export interface MonitoringLevelTrend {
  topic: string;
  level: string;
}

export interface ApiMonitoringTrendItem {
  topic?: string;
  score?: number;
  averageScore?: number;
  level?: string;
  date?: string;
  [key: string]: unknown;
}

export type ApiMonitoringTrendResponse =
  | ApiMonitoringTrendItem[]
  | Record<string, unknown>;
