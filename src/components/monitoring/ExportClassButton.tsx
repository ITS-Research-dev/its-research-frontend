"use client";

import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import Button from "@/components/ui/Button";
import { MonitoringData } from "@/types/monitoring";

interface Props {
  data: MonitoringData;
}

export default function ExportClassButton({ data }: Props) {
  const handleExport = () => {
    /* =====================================================
       SHEET 1: RINGKASAN KELAS
    ===================================================== */

    const summarySheet = [
      {
        "Nama Kelas": data.summary.className,
        "Jumlah Siswa": data.summary.totalStudents,
        "Rata-rata Nilai Kelas": data.summary.averageScore,
        "Jumlah Topik": data.topics.length,
      },
    ];

    /* =====================================================
       SHEET 2: DATA SISWA
    ===================================================== */

    const studentsSheet = data.students.map((student, index) => ({
      No: index + 1,
      "Nama Siswa": student.name,
      "Rata-rata Nilai": student.averageScore,
      Level: student.level,
      "Jumlah Asesmen": student.assessments?.length ?? 0,
    }));

    /* =====================================================
       SHEET 3: RIWAYAT ASESMEN
    ===================================================== */

    const assessmentSheet = data.students.flatMap((student) =>
      (student.assessments ?? []).map((assessment) => ({
        "Nama Siswa": student.name,
        Topik: assessment.topic,
        "Judul Asesmen": assessment.title,
        Nilai: assessment.score,
        Level: assessment.level,
        "Hint Digunakan": assessment.hintsUsed,
        Durasi: assessment.duration,
        Feedback: assessment.feedback,
      })),
    );

    /* =====================================================
       SHEET 4: SKOR KOMPETENSI

       Menggunakan satu sumber skor:
       - Teacher Score jika sudah di-override guru
       - AI Score jika belum di-override
    ===================================================== */

    const competencyScoreSheet = data.students.flatMap((student) =>
      (student.assessments ?? []).map((assessment) => {
        /*
         * Tentukan skor yang digunakan.
         *
         * Jika assessment memiliki flagOverride dan nilainya true,
         * gunakan teacherScore.
         *
         * Jika tidak, gunakan aiScore.
         *
         * Fallback ke objek kosong agar export tetap aman.
         */

        const assessmentData = assessment as typeof assessment & {
          flagOverride?: boolean;
          aiScore?: {
            fungsionalitas?: number;
            logika?: number;
            syntax?: number;
            code_style?: number;
            dokumentasi?: number;
            konsep?: number;
          };
          teacherScore?: {
            fungsionalitas?: number;
            logika?: number;
            syntax?: number;
            code_style?: number;
            dokumentasi?: number;
            konsep?: number;
          };
        };

        const selectedScore =
          assessmentData.flagOverride && assessmentData.teacherScore
            ? assessmentData.teacherScore
            : assessmentData.aiScore;

        return {
          "Nama Siswa": student.name,

          Topik: assessment.topic,

          "Judul Asesmen": assessment.title,

          Nilai: assessment.score,

          Fungsionalitas: selectedScore?.fungsionalitas ?? 0,

          Logika: selectedScore?.logika ?? 0,

          Syntax: selectedScore?.syntax ?? 0,

          "Code Style": selectedScore?.code_style ?? 0,

          Dokumentasi: selectedScore?.dokumentasi ?? 0,

          Konsep: selectedScore?.konsep ?? 0,
        };
      }),
    );

    /* =====================================================
       SHEET 5: SKOR TOPIK
    ===================================================== */

    const topicSheet = data.topicScores.map((item, index) => ({
      No: index + 1,
      Topik: item.topic,
      "Rata-rata Skor": item.score,
    }));

    /* =====================================================
       MEMBUAT WORKBOOK
    ===================================================== */

    const workbook = XLSX.utils.book_new();

    /* =====================================================
       MEMBUAT WORKSHEET
    ===================================================== */

    const summaryWorksheet = XLSX.utils.json_to_sheet(summarySheet);

    const studentsWorksheet = XLSX.utils.json_to_sheet(studentsSheet);

    const assessmentWorksheet = XLSX.utils.json_to_sheet(assessmentSheet);

    const competencyScoreWorksheet =
      XLSX.utils.json_to_sheet(competencyScoreSheet);

    const topicWorksheet = XLSX.utils.json_to_sheet(topicSheet);

    /* =====================================================
       MENGATUR LEBAR KOLOM
    ===================================================== */

    summaryWorksheet["!cols"] = [{ wch: 25 }, { wch: 18 }];

    studentsWorksheet["!cols"] = [
      { wch: 8 },
      { wch: 30 },
      { wch: 18 },
      { wch: 18 },
      { wch: 18 },
    ];

    assessmentWorksheet["!cols"] = [
      { wch: 30 },
      { wch: 25 },
      { wch: 35 },
      { wch: 12 },
      { wch: 18 },
      { wch: 18 },
      { wch: 15 },
      { wch: 60 },
    ];

    competencyScoreWorksheet["!cols"] = [
      { wch: 30 },
      { wch: 25 },
      { wch: 35 },
      { wch: 12 },
      { wch: 18 },
      { wch: 12 },
      { wch: 12 },
      { wch: 15 },
      { wch: 15 },
      { wch: 12 },
    ];

    topicWorksheet["!cols"] = [{ wch: 8 }, { wch: 35 }, { wch: 20 }];

    /* =====================================================
       MENAMBAHKAN SHEET KE WORKBOOK
    ===================================================== */

    XLSX.utils.book_append_sheet(workbook, summaryWorksheet, "Ringkasan Kelas");

    XLSX.utils.book_append_sheet(workbook, studentsWorksheet, "Data Siswa");

    XLSX.utils.book_append_sheet(
      workbook,
      assessmentWorksheet,
      "Riwayat Asesmen",
    );

    XLSX.utils.book_append_sheet(
      workbook,
      competencyScoreWorksheet,
      "Skor Kompetensi",
    );

    XLSX.utils.book_append_sheet(workbook, topicWorksheet, "Skor Topik");

    /* =====================================================
       NAMA FILE
    ===================================================== */

    const className =
      data.summary.className
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9-]/g, "") || "Kelas";

    const fileName = `Monitoring-Kelas-${className}.xlsx`;

    /* =====================================================
       DOWNLOAD FILE
    ===================================================== */

    XLSX.writeFile(workbook, fileName);
  };

  return (
    <Button
      variant="outline"
      startIcon={<Download size={17} />}
      onClick={handleExport}
    >
      Export Data Kelas
    </Button>
  );
}
