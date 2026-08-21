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

/* =========================================================
   ASSESSMENT DETAILS
========================================================= */

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

/* =========================================================
   MONITORING STUDENTS
========================================================= */

export const monitoringStudents: MonitoringStudent[] = [
  {
    id: "student-1",

    name: "Ahmad Fauzan",

    averageScore: 89,

    level: "Expert",

    competencies: [
      {
        name: "Problem Solving",
        score: 90,
      },
      {
        name: "Algoritma",
        score: 92,
      },
      {
        name: "Syntax",
        score: 91,
      },
      {
        name: "Debugging",
        score: 85,
      },
      {
        name: "Efisiensi",
        score: 84,
      },
      {
        name: "Code Quality",
        score: 90,
      },
    ],

    assessments: [
      monitoringAssessmentDetails[0],
      monitoringAssessmentDetails[1],
    ],
  },

  {
    id: "student-2",

    name: "Budi Santoso",

    averageScore: 78,

    level: "Competent",

    competencies: [
      {
        name: "Problem Solving",
        score: 76,
      },
      {
        name: "Algoritma",
        score: 80,
      },
      {
        name: "Syntax",
        score: 82,
      },
      {
        name: "Debugging",
        score: 72,
      },
      {
        name: "Efisiensi",
        score: 75,
      },
      {
        name: "Code Quality",
        score: 80,
      },
    ],

    assessments: [
      monitoringAssessmentDetails[1],
      monitoringAssessmentDetails[2],
    ],
  },

  {
    id: "student-3",

    name: "Citra Lestari",

    averageScore: 92,

    level: "Expert",

    competencies: [
      {
        name: "Problem Solving",
        score: 94,
      },
      {
        name: "Algoritma",
        score: 93,
      },
      {
        name: "Syntax",
        score: 95,
      },
      {
        name: "Debugging",
        score: 88,
      },
      {
        name: "Efisiensi",
        score: 90,
      },
      {
        name: "Code Quality",
        score: 94,
      },
    ],

    assessments: [monitoringAssessmentDetails[0]],
  },
];
