import { MonitoringData, MonitoringStudentDetail } from "@/types/monitoring";

import { ProfileResponse, ProfileSummary } from "@/types/profile";

import { AssessmentDetail } from "@/types/asessment";

export const monitoringAssessmentDetails: AssessmentDetail[] = [
  {
    id: "assessment-1",

    topic: "Variabel & Tipe Data",

    title: "Deklarasi Variabel Python",

    score: 95,

    level: "Expert",

    hintsUsed: 1,

    duration: "07:35",

    feedback:
      "Kode yang ditulis sudah benar dan menghasilkan output sesuai dengan soal. Penamaan variabel sudah cukup baik dan penggunaan sintaks Python sudah tepat.",

    competencies: [
      {
        name: "Problem Solving",
        score: 95,
      },

      {
        name: "Algoritma",
        score: 90,
      },

      {
        name: "Syntax",
        score: 96,
      },

      {
        name: "Debugging",
        score: 88,
      },

      {
        name: "Efisiensi",
        score: 86,
      },

      {
        name: "Code Quality",
        score: 94,
      },
    ],

    questions: [
      {
        id: "question-1",

        question:
          'Buatlah sebuah variabel bernama "nama" yang berisi string "Marwa".',

        userAnswer: 'nama = "Marwa"',

        correctAnswer: 'nama = "Marwa"',

        explanation:
          "Python tidak memerlukan keyword khusus untuk mendeklarasikan variabel. Gunakan nama variabel kemudian operator '=' untuk memberikan nilai.",

        score: 95,
      },
    ],
  },

  {
    id: "assessment-2",

    topic: "Percabangan",

    title: "If Else Bertingkat",

    score: 83,

    level: "Competent",

    hintsUsed: 2,

    duration: "09:12",

    feedback:
      "Logika percabangan sudah sesuai dengan kebutuhan soal. Namun masih terdapat beberapa kondisi yang dapat disederhanakan sehingga kode menjadi lebih ringkas dan mudah dipahami.",

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
        score: 83,
      },

      {
        name: "Debugging",
        score: 80,
      },

      {
        name: "Efisiensi",
        score: 76,
      },

      {
        name: "Code Quality",
        score: 84,
      },
    ],

    questions: [
      {
        id: "question-2",

        question:
          "Buatlah program untuk menentukan apakah sebuah angka bernilai positif atau negatif menggunakan if else.",

        userAnswer: `angka = int(input())

if angka > 0:
    print("Positif")
else:
    print("Negatif")`,

        correctAnswer: `angka = int(input())

if angka > 0:
    print("Positif")
else:
    print("Negatif")`,

        explanation:
          "Statement if digunakan untuk mengecek suatu kondisi. Jika kondisi bernilai True maka blok if dijalankan, sedangkan jika False maka blok else dijalankan.",

        score: 83,
      },
    ],
  },

  {
    id: "assessment-3",

    topic: "Perulangan",

    title: "For Loop",

    score: 72,

    level: "Beginner",

    hintsUsed: 3,

    duration: "11:46",

    feedback:
      "Kamu sudah memahami konsep dasar perulangan, namun masih keliru dalam memilih jenis perulangan yang sesuai. Latih kembali penggunaan for untuk melakukan iterasi terhadap list.",

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
        score: 74,
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
        score: 73,
      },
    ],

    questions: [
      {
        id: "question-3",

        question:
          "Tuliskan perulangan yang digunakan untuk mencetak seluruh isi list buah.",

        userAnswer: `i = 0

while i < len(buah):
    print(buah[i])
    i += 1`,

        correctAnswer: `for item in buah:
    print(item)`,

        explanation:
          "Perulangan for lebih tepat digunakan ketika ingin melakukan iterasi terhadap setiap elemen pada list.",

        score: 72,
      },
    ],
  },
];

/* =========================================================
   HELPER
========================================================= */

function createProfileSummary(assessments: ProfileResponse[]): ProfileSummary {
  const topics = [...new Set(assessments.map((item) => item.test.topic.title))];

  const averageScore =
    assessments.length > 0
      ? assessments.reduce((sum, item) => sum + item.averageScore, 0) /
        assessments.length
      : 0;

  const totalHints = assessments.reduce((sum, item) => sum + item.hintUsage, 0);

  const competencies = [
    "fungsionalitas",
    "logika",
    "syntax",
    "code_style",
    "dokumentasi",
    "konsep",
  ].map((name) => {
    const total = assessments.reduce((sum, item) => {
      const score =
        typeof item.aiScore === "string"
          ? JSON.parse(item.aiScore)
          : item.aiScore;

      return sum + (score?.[name] ?? 0);
    }, 0);

    return {
      name,
      score: assessments.length > 0 ? total / assessments.length : 0,
    };
  });

  const competencyTrend: ProfileSummary["competencyTrend"] = {
    "01-07": {
      total: {
        avg: 76,
        count: 1,
      },
    },

    "08-14": {
      total: {
        avg: 82,
        count: 1,
      },
    },

    "15-21": {
      total: {
        avg: 87,
        count: 1,
      },
    },
  };

  const levelTrend: ProfileSummary["levelTrend"] = competencyTrend;

  return {
    averageScore,

    totalHints,

    nameMaterials: topics,

    totalMaterials: topics.length,

    totalCases: assessments.length,

    competencies,

    competencyTrend,

    levelTrend,

    raw: assessments,
  };
}

/* =========================================================
   ASSESSMENT DUMMY
========================================================= */

const dikaAssessments: ProfileResponse[] = [
  {
    id: "assessment-1",

    averageScore: 95,

    level: "Expert",

    createdAt: "2026-07-01T08:00:00Z",

    hintUsage: 1,

    aiScore: {
      fungsionalitas: 95,
      logika: 90,
      syntax: 96,
      code_style: 88,
      dokumentasi: 86,
      konsep: 94,
    },

    teacherScore: {
      fungsionalitas: 95,
      logika: 90,
      syntax: 96,
      code_style: 88,
      dokumentasi: 86,
      konsep: 94,
    },

    test: {
      title: "Deklarasi Variabel Python",

      topic: {
        title: "Variabel & Tipe Data",
      },
    },
  },

  {
    id: "assessment-2",

    averageScore: 83,

    level: "Competent",

    createdAt: "2026-07-10T08:00:00Z",

    hintUsage: 2,

    aiScore: {
      fungsionalitas: 82,
      logika: 85,
      syntax: 83,
      code_style: 80,
      dokumentasi: 78,
      konsep: 84,
    },

    teacherScore: {
      fungsionalitas: 82,
      logika: 85,
      syntax: 83,
      code_style: 80,
      dokumentasi: 78,
      konsep: 84,
    },

    test: {
      title: "If Else Bertingkat",

      topic: {
        title: "Percabangan",
      },
    },
  },

  {
    id: "assessment-3",

    averageScore: 72,

    level: "Beginner",

    createdAt: "2026-07-18T08:00:00Z",

    hintUsage: 3,

    aiScore: {
      fungsionalitas: 70,
      logika: 72,
      syntax: 74,
      code_style: 68,
      dokumentasi: 70,
      konsep: 73,
    },

    teacherScore: {
      fungsionalitas: 70,
      logika: 72,
      syntax: 74,
      code_style: 68,
      dokumentasi: 70,
      konsep: 73,
    },

    test: {
      title: "For Loop",

      topic: {
        title: "Perulangan",
      },
    },
  },
];

const citraAssessments: ProfileResponse[] = [
  {
    id: "assessment-4",

    averageScore: 90,

    level: "Expert",

    createdAt: "2026-07-02T08:00:00Z",

    hintUsage: 1,

    aiScore: {
      fungsionalitas: 90,
      logika: 91,
      syntax: 92,
      code_style: 87,
      dokumentasi: 85,
      konsep: 90,
    },

    teacherScore: {
      fungsionalitas: 90,
      logika: 91,
      syntax: 92,
      code_style: 87,
      dokumentasi: 85,
      konsep: 90,
    },

    test: {
      title: "Tipe Data Python",

      topic: {
        title: "Variabel & Tipe Data",
      },
    },
  },

  {
    id: "assessment-5",

    averageScore: 85,

    level: "Competent",

    createdAt: "2026-07-11T08:00:00Z",

    hintUsage: 2,

    aiScore: {
      fungsionalitas: 86,
      logika: 84,
      syntax: 85,
      code_style: 82,
      dokumentasi: 80,
      konsep: 87,
    },

    teacherScore: {
      fungsionalitas: 86,
      logika: 84,
      syntax: 85,
      code_style: 82,
      dokumentasi: 80,
      konsep: 87,
    },

    test: {
      title: "Percabangan Dasar",

      topic: {
        title: "Percabangan",
      },
    },
  },
];

/* =========================================================
   MONITORING CLASS
========================================================= */

export const monitoringData: MonitoringData = {
  summary: {
    className: "XI RPL 2",

    totalStudents: 30,

    averageScore: 82,
  },

  students: [
    {
      id: "1",
      name: "Dika Pratama",
    },

    {
      id: "2",
      name: "Citra Ramadhani",
    },

    {
      id: "3",
      name: "Eka Putri",
    },

    {
      id: "4",
      name: "Ayu Lestari",
    },

    {
      id: "5",
      name: "Rizky Maulana",
    },
  ],

  topicScores: [
    {
      topic: "Variabel & Tipe Data",
      score: 85,
    },

    {
      topic: "Percabangan",
      score: 82,
    },

    {
      topic: "Perulangan",
      score: 78,
    },

    {
      topic: "Fungsi",
      score: 86,
    },

    {
      topic: "List",
      score: 79,
    },
  ],

  topics: [
    "Variabel & Tipe Data",
    "Percabangan",
    "Perulangan",
    "Fungsi",
    "List",
  ],

  competencyTrend: {
    "01-07": {
      total: {
        avg: 76,
        count: 1,
      },
    },

    "08-14": {
      total: {
        avg: 80,
        count: 1,
      },
    },

    "15-21": {
      total: {
        avg: 84,
        count: 1,
      },
    },

    "22-28": {
      total: {
        avg: 87,
        count: 1,
      },
    },
  },

  levelTrend: {
    "01-07": {
      total: {
        avg: 76,
        count: 1,
      },
    },

    "08-14": {
      total: {
        avg: 80,
        count: 1,
      },
    },

    "15-21": {
      total: {
        avg: 84,
        count: 1,
      },
    },

    "22-28": {
      total: {
        avg: 87,
        count: 1,
      },
    },
  },
};

/* =========================================================
   DETAIL SISWA
========================================================= */

export const monitoringStudentDetails: MonitoringStudentDetail[] = [
  {
    id: "1",

    name: "Dika Pratama",

    className: "XI RPL 2",

    topicScores: [
      {
        topic: "Variabel & Tipe Data",
        score: 82,
      },

      {
        topic: "Percabangan",
        score: 76,
      },

      {
        topic: "Perulangan",
        score: 68,
      },

      {
        topic: "Fungsi",
        score: 85,
      },

      {
        topic: "List",
        score: 72,
      },
    ],

    profile: createProfileSummary(dikaAssessments),
  },

  {
    id: "2",

    name: "Citra Ramadhani",

    className: "XI RPL 2",

    topicScores: [
      {
        topic: "Variabel & Tipe Data",
        score: 90,
      },

      {
        topic: "Percabangan",
        score: 85,
      },

      {
        topic: "Perulangan",
        score: 80,
      },

      {
        topic: "Fungsi",
        score: 88,
      },

      {
        topic: "List",
        score: 82,
      },
    ],

    profile: createProfileSummary(citraAssessments),
  },
];
