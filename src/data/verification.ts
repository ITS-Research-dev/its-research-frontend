import { VerificationDetail, VerificationItem } from "@/types/verification";

export const verificationData: VerificationItem[] = [
  {
    id: "1",
    studentName: "Dika Pratama",
    questionTitle: "Rata-rata Tiga Nilai",
    aiScore: 57,
    status: "Perlu Verifikasi",

    aiNote:
      "Struktur fungsi masih perlu diperbaiki, hasil perhitungan kadang tidak sesuai output yang diharapkan. Disarankan pendampingan tambahan pada konsep dasar fungsi.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 58,
        teacherScore: 58,
      },
      {
        name: "Fungsionalitas",
        aiScore: 62,
        teacherScore: 62,
      },
      {
        name: "Sintaks",
        aiScore: 62,
        teacherScore: 62,
      },
      {
        name: "Dokumentasi",
        aiScore: 45,
        teacherScore: 45,
      },
      {
        name: "Gaya",
        aiScore: 55,
        teacherScore: 55,
      },
      {
        name: "Konsep",
        aiScore: 60,
        teacherScore: 60,
      },
    ],
  },

  {
    id: "2",
    studentName: "Citra Ramadhani",
    questionTitle: "Luas Lingkaran",
    aiScore: 72,
    status: "Perlu Verifikasi",

    aiNote:
      "Perhitungan sudah mendekati hasil yang diharapkan, namun terdapat beberapa bagian kode yang masih perlu diperiksa kembali.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 70,
        teacherScore: 70,
      },
      {
        name: "Fungsionalitas",
        aiScore: 75,
        teacherScore: 75,
      },
      {
        name: "Sintaks",
        aiScore: 78,
        teacherScore: 78,
      },
      {
        name: "Dokumentasi",
        aiScore: 65,
        teacherScore: 65,
      },
      {
        name: "Gaya",
        aiScore: 70,
        teacherScore: 70,
      },
      {
        name: "Konsep",
        aiScore: 74,
        teacherScore: 74,
      },
    ],
  },

  {
    id: "3",
    studentName: "Eka Putri",
    questionTitle: "Keliling Persegi Panjang",
    aiScore: 85,
    status: "Selesai",

    aiNote:
      "Kerja bagus, kode rapi dan mudah dibaca. Dokumentasi kode masih bisa ditingkatkan.",

    teacherNote: "Sesuai, skor AI diterima langsung.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 88,
        teacherScore: 88,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Dokumentasi",
        aiScore: 65,
        teacherScore: 65,
      },
      {
        name: "Gaya",
        aiScore: 80,
        teacherScore: 80,
      },
      {
        name: "Konsep",
        aiScore: 88,
        teacherScore: 88,
      },
    ],
  },

  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
  {
    id: "4",
    studentName: "Ayu Lestari",
    questionTitle: "Konversi Celsius ke Fahrenheit",
    aiScore: 96,
    status: "Selesai",

    aiNote: "Implementasi sudah benar dan struktur kode cukup baik.",

    teacherNote: "Skor AI diterima tanpa perubahan.",

    dimensions: [
      {
        name: "Logika",
        aiScore: 96,
        teacherScore: 96,
      },
      {
        name: "Fungsi",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Sintaks",
        aiScore: 98,
        teacherScore: 98,
      },
      {
        name: "Dokumentasi",
        aiScore: 90,
        teacherScore: 90,
      },
      {
        name: "Gaya",
        aiScore: 95,
        teacherScore: 95,
      },
      {
        name: "Konsep",
        aiScore: 98,
        teacherScore: 98,
      },
    ],
  },
];

export const verificationDetails: VerificationDetail[] = verificationData.map(
  (item) => ({
    ...item,

    finalScores: item.dimensions,

    aiAccuracy: item.status === "Selesai" ? 100 : 0,
  }),
);
