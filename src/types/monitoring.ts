import { ProfileResponse, ProfileSummary } from "./profile";
import { AssessmentDetail } from "@/types/asessment";

export interface MonitoringStudent {
  id: string;
  name: string;
}

export interface MonitoringTopicScore {
  topic: string;
  score: number;
}

export interface MonitoringSummary {
  className: string;
  totalStudents: number;
  averageScore: number;
}

export interface MonitoringData {
  summary: MonitoringSummary;

  students: MonitoringStudent[];

  topicScores: MonitoringTopicScore[];

  /**
   * Data trend kelas.
   * Bentuknya mengikuti ProfileSummary agar
   * bisa langsung digunakan oleh komponen profile.
   */
  competencyTrend: ProfileSummary["competencyTrend"];

  levelTrend: ProfileSummary["levelTrend"];

  topics: string[];
}

export interface MonitoringStudentDetail {
  id: string;

  name: string;

  className: string;

  /**
   * Data profile siswa.
   *
   * Dibuat mengikuti ProfileSummary supaya
   * komponen ProfileStats, CompetencyTrendChart,
   * LevelTrendChart dan AssessmentHistory
   * dapat digunakan kembali.
   */
  profile: ProfileSummary;

  /**
   * Digunakan khusus untuk TopicScoreDistribution.
   */
  topicScores: MonitoringTopicScore[];
}

export const monitoringAssessmentDetails: AssessmentDetail[] = [
  {
    id: "assessment-1",
    topic: "Variabel & Tipe Data",
    title: "Deklarasi Variabel Python",
    score: 95,
    level: "Expert",

    hintsUsed: 2,

    duration: "15 menit",

    feedback:
      "Pemahaman mengenai deklarasi variabel sudah sangat baik. Pertahankan konsistensi dalam penggunaan tipe data.",

    competencies: [
      {
        name: "Problem Solving",
        score: 92,
      },
      {
        name: "Algoritma",
        score: 95,
      },
      {
        name: "Syntax",
        score: 94,
      },
      {
        name: "Debugging",
        score: 90,
      },
      {
        name: "Efisiensi",
        score: 88,
      },
      {
        name: "Code Quality",
        score: 93,
      },
    ],

    questions: [
      {
        id: "q1",
        question: "Apa fungsi variabel dalam Python?",
        userAnswer: "Variabel digunakan untuk menyimpan sebuah nilai.",
        correctAnswer: "Variabel digunakan untuk menyimpan data atau nilai.",
        explanation:
          "Jawaban sudah sesuai karena variabel digunakan sebagai tempat penyimpanan nilai.",
        score: 100,
      },
      {
        id: "q2",
        question: "Manakah deklarasi variabel Python yang benar?",
        userAnswer: "nama = 'Dika'",
        correctAnswer: "nama = 'Dika'",
        explanation:
          "Sintaks tersebut merupakan deklarasi variabel string yang valid.",
        score: 100,
      },
    ],
  },

  {
    id: "assessment-2",
    topic: "Percabangan",
    title: "If Else Bertingkat",
    score: 83,
    level: "Competent",

    hintsUsed: 3,

    duration: "20 menit",

    feedback:
      "Pemahaman mengenai percabangan sudah cukup baik. Perlu meningkatkan ketelitian pada kondisi percabangan bertingkat.",

    competencies: [
      {
        name: "Problem Solving",
        score: 82,
      },
      {
        name: "Algoritma",
        score: 85,
      },
      {
        name: "Syntax",
        score: 84,
      },
      {
        name: "Debugging",
        score: 78,
      },
      {
        name: "Efisiensi",
        score: 80,
      },
      {
        name: "Code Quality",
        score: 82,
      },
    ],

    questions: [
      {
        id: "q1",
        question: "Apa fungsi if dalam Python?",
        userAnswer: "Untuk menjalankan kode berdasarkan kondisi.",
        correctAnswer: "Untuk menjalankan blok kode berdasarkan suatu kondisi.",
        explanation: "Jawaban sudah benar.",
        score: 100,
      },
    ],
  },

  {
    id: "assessment-3",
    topic: "Perulangan",
    title: "For Loop",
    score: 72,
    level: "Beginner",

    hintsUsed: 5,

    duration: "25 menit",

    feedback:
      "Masih diperlukan latihan mengenai konsep perulangan dan penggunaan range.",

    competencies: [
      {
        name: "Problem Solving",
        score: 70,
      },
      {
        name: "Algoritma",
        score: 72,
      },
      {
        name: "Syntax",
        score: 75,
      },
      {
        name: "Debugging",
        score: 68,
      },
      {
        name: "Efisiensi",
        score: 70,
      },
      {
        name: "Code Quality",
        score: 76,
      },
    ],

    questions: [
      {
        id: "q1",
        question: "Apa kegunaan for loop?",
        userAnswer: "Untuk melakukan perulangan.",
        correctAnswer:
          "Untuk melakukan iterasi terhadap suatu sequence atau iterable.",
        explanation: "Jawaban menunjukkan pemahaman dasar mengenai for loop.",
        score: 80,
      },
    ],
  },
];
