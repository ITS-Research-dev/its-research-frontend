import { CaseItem, CaseDetail, CaseQuestion } from "@/types/case";

export const caseItems: CaseItem[] = [
  {
    id: "1",
    title: "Variabel & Tipe Data",
    totalTest: 3,
    startDate: "2026-08-01",
  },
  {
    id: "2",
    title: "Percabangan",
    totalTest: 3,
    startDate: "2026-08-03",
  },
  {
    id: "3",
    title: "Perulangan",
    totalTest: 3,
    startDate: "2026-08-05",
  },
];

export const caseQuestions: Record<string, CaseQuestion[]> = {
  "1": [
    {
      id: "1",
      order: 1,
      title: "Deklarasi Variabel",
      description:
        'Buatlah variabel bernama "nama" yang berisi string "Marwa".',

      expectedOutput: "Marwa",

      starterCode: "# Tulis kode kamu di sini\n",

      hints: [
        "Gunakan operator = untuk memberi nilai.",
        "Python tidak membutuhkan tipe data saat deklarasi.",
        'Gunakan string "Marwa".',
      ],
    },

    {
      id: "2",
      order: 2,
      title: "Tipe Integer",
      description:
        "Buat variabel umur dengan nilai 20 kemudian tampilkan menggunakan print().",

      expectedOutput: "20",

      starterCode: "# Tulis kode kamu di sini\n",

      hints: [
        "Gunakan print().",
        "Gunakan integer.",
        "Nama variabel adalah umur.",
      ],
    },

    {
      id: "3",
      order: 3,
      title: "Operasi Penjumlahan",
      description: "Buat dua variabel kemudian tampilkan hasil penjumlahannya.",

      expectedOutput: "15",

      starterCode: "# Tulis kode kamu di sini\n",

      hints: ["Gunakan operator +.", "Gunakan print().", "Jumlah akhirnya 15."],
    },
  ],

  "2": [
    {
      id: "4",
      order: 1,
      title: "If Else",
      description:
        "Buat program untuk mengecek apakah angka positif atau negatif.",

      expectedOutput: "Positif",

      starterCode: "# Tulis kode kamu di sini\n",

      hints: ["Gunakan if.", "Gunakan else.", "Bandingkan dengan angka 0."],
    },

    {
      id: "5",
      order: 2,
      title: "If Bertingkat",
      description: "Gunakan if elif else untuk menentukan grade nilai.",

      expectedOutput: "A",

      starterCode: "# Tulis kode kamu di sini\n",

      hints: [
        "Gunakan elif.",
        "Bandingkan beberapa kondisi.",
        "Gunakan nilai >= 90.",
      ],
    },

    {
      id: "6",
      order: 3,
      title: "Operator Logika",
      description: "Gunakan operator and untuk menentukan kelulusan.",

      expectedOutput: "Lulus",

      starterCode: "# Tulis kode kamu di sini\n",

      hints: ["Gunakan and.", "Minimal dua kondisi.", "Print hasil akhir."],
    },
  ],

  "3": [
    {
      id: "7",
      order: 1,
      title: "For Loop",
      description: "Cetak angka 1 sampai 5 menggunakan for.",

      expectedOutput: `1
2
3
4
5`,

      starterCode: "# Tulis kode kamu di sini\n",

      hints: ["Gunakan range().", "Gunakan for.", "Print setiap iterasi."],
    },

    {
      id: "8",
      order: 2,
      title: "While Loop",
      description: "Cetak angka menggunakan while.",

      expectedOutput: `1
2
3
4
5`,

      starterCode: "# Tulis kode kamu di sini\n",

      hints: ["Gunakan while.", "Tambah nilai i.", "Gunakan kondisi berhenti."],
    },

    {
      id: "9",
      order: 3,
      title: "Loop List",
      description: "Cetak seluruh isi list buah.",

      expectedOutput: `apel
jeruk
mangga`,

      starterCode: "# Tulis kode kamu di sini\n",

      hints: ["Gunakan for.", "Loop setiap item.", "Print item."],
    },
  ],
};

export const caseDetails: CaseDetail[] = [
  {
    id: "1",
    title: "Variabel & Tipe Data",
    topic: "Dasar Pemrograman",
    description:
      "Pahami konsep variabel dan tipe data dalam pemrograman dengan menyelesaikan studi kasus berikut.",
    status: "learning",
    questions: caseQuestions["1"],
  },

  {
    id: "2",
    title: "Percabangan",
    topic: "Dasar Pemrograman",
    description:
      "Terapkan struktur kontrol percabangan untuk membuat keputusan dalam program.",
    status: "completed",
    questions: caseQuestions["2"],
  },

  {
    id: "3",
    title: "Perulangan",
    topic: "Dasar Pemrograman",
    description:
      "Gunakan perulangan untuk mengerjakan tugas berulang secara efisien.",
    status: "locked",
    questions: caseQuestions["3"],
  },
];
