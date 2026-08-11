import { AssessmentHistoryItem, AssessmentDetail } from "@/types/asessment";

export const assessmentHistories: AssessmentHistoryItem[] = [
  {
    id: "1",
    topic: "Variabel & Tipe Data",
    title: "Deklarasi Variabel Python",
    score: 95,
    level: "Expert",
  },
  {
    id: "2",
    topic: "Percabangan",
    title: "If Else Bertingkat",
    score: 83,
    level: "Competent",
  },
  {
    id: "3",
    topic: "Perulangan",
    title: "For Loop",
    score: 72,
    level: "Beginner",
  },
];

export const assessmentDetails: AssessmentDetail[] = [
  {
    id: "1",

    topic: "Variabel & Tipe Data",

    title: "Deklarasi Variabel Python",

    score: 95,

  level: "Expert",

    hintsUsed: 1,

    duration: "07:35",

    feedback:
      "Kode yang kamu tulis sudah benar dan menghasilkan output sesuai dengan soal. Penamaan variabel sudah cukup baik dan penggunaan sintaks Python sudah tepat. Pertahankan konsistensi penulisan kode agar tetap mudah dibaca.",

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
        id: "1",

        question:
          'Buatlah sebuah variabel bernama "nama" yang berisi string "Marwa".',

        userAnswer: `nama = "Marwa"`,

        correctAnswer: `nama = "Marwa"`,

        explanation:
          "Python tidak memerlukan keyword khusus untuk mendeklarasikan variabel. Cukup gunakan nama variabel kemudian operator '=' untuk memberikan nilai.",

        score: 95,
      },
    ],
  },

  {
    id: "2",

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
        id: "1",

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
    id: "3",

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
        id: "1",

        question:
          "Tuliskan perulangan yang digunakan untuk mencetak seluruh isi list buah.",

        userAnswer: `i = 0

while i < len(buah):
    print(buah[i])
    i += 1`,

        correctAnswer: `for item in buah:
    print(item)`,

        explanation:
          "Perulangan for lebih tepat digunakan ketika ingin melakukan iterasi terhadap setiap elemen pada list karena sintaksnya lebih sederhana, mudah dibaca, dan lebih idiomatis dalam Python.",

        score: 72,
      },
    ],
  },
];

export function getDummyAssessmentDetail(assessmentId: string): AssessmentDetail {
  const normalizedId = assessmentId.replace("assessment-", "");
  const found = assessmentDetails.find(
    (item) => item.id === assessmentId || item.id === normalizedId
  );
  return found || assessmentDetails[0];
}
