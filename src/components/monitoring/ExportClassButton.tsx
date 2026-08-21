"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";

import Button from "@/components/ui/Button";

import { MonitoringData } from "@/types/monitoring";
import { monitoringService } from "@/services/monitoring.service";

interface Props {
  data: MonitoringData;
}

export default function ExportClassButton({ data }: Props) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    try {
      setLoading(true);

      /* =====================================================
         FETCH DETAIL SEMUA SISWA
      ===================================================== */

      const studentDetails = await Promise.all(
        data.students.map((student) =>
          monitoringService.getStudentDetail(
            student.id,
            data.summary.className,
          ),
        ),
      );

      /* =====================================================
         SHEET 1 — RINGKASAN KELAS
      ===================================================== */

      const summarySheet = [
        {
          "Nama Kelas": data.summary.className,
          "Jumlah Siswa": data.summary.totalStudents,
          "Rata-rata Nilai Kelas": data.summary.averageScore,
        },
      ];

      /* =====================================================
         SHEET 2 — RINGKASAN SISWA
      ===================================================== */

      const studentsSheet = studentDetails.map((student, index) => ({
        No: index + 1,
        "Nama Siswa": student.name,
        "Rata-rata Nilai": student.profile.averageScore,
        "Total Hint": student.profile.totalHints,
        "Jumlah Materi": student.profile.totalMaterials,
        "Jumlah Studi Kasus": student.profile.totalCases,
      }));

      /* =====================================================
         SHEET 3 — NILAI KOMPETENSI SISWA

         Semua kompetensi dibuat menjadi kolom.
      ===================================================== */

      const competenciesSheet = studentDetails.map((student, index) => {
        const row: Record<string, string | number> = {
          No: index + 1,
          "Nama Siswa": student.name,
        };

        student.profile.competencies.forEach((competency) => {
          row[competency.name] = competency.score;
        });

        return row;
      });

      /* =====================================================
         SHEET 4 — SKOR PER TOPIK

         Setiap siswa dapat memiliki beberapa topik.
      ===================================================== */

      const topicScoresSheet = studentDetails.flatMap((student) =>
        student.topicScores.map((topic, index) => ({
          No: index + 1,
          "Nama Siswa": student.name,
          Topik: topic.topic,
          "Rata-rata Skor": topic.score,
        })),
      );

      /* =====================================================
         SHEET 5 — RIWAYAT ASESMEN

         Data berasal dari:
         student.profile.raw
      ===================================================== */

      const assessmentHistorySheet = studentDetails.flatMap((student) =>
        student.profile.raw.map((assessment, index) => ({
          No: index + 1,

          "Nama Siswa": student.name,

          "Judul Soal": assessment.test.title,

          Topik: assessment.test.topic.title,

          Nilai: assessment.averageScore,

          Level: assessment.level,

          Tanggal: assessment.createdAt,

          "Jumlah Hint": assessment.hintUsage,

          "Status Override Guru": assessment.flagOverride
            ? "Diverifikasi Guru"
            : "Belum Diverifikasi",

          "Saran AI": assessment.aiSuggestion ?? "-",

          "Catatan Guru": assessment.teacherSuggestion ?? "-",
        })),
      );

      /* =====================================================
         SHEET 6 — DETAIL SKOR AI

         Satu baris untuk setiap asesmen.
      ===================================================== */

      const aiScoresSheet = studentDetails.flatMap((student) =>
        student.profile.raw.map((assessment, index) => ({
          No: index + 1,

          "Nama Siswa": student.name,

          "Judul Soal": assessment.test.title,

          Topik: assessment.test.topic.title,

          Fungsionalitas: assessment.aiScore.fungsionalitas,

          Logika: assessment.aiScore.logika,

          Syntax: assessment.aiScore.syntax,

          "Code Style": assessment.aiScore.code_style,

          Dokumentasi: assessment.aiScore.dokumentasi,

          Konsep: assessment.aiScore.konsep,
        })),
      );

      /* =====================================================
         SHEET 7 — DETAIL SKOR GURU

         Jika belum diverifikasi, service saat ini
         menggunakan skor AI sebagai nilai teacherScore.
      ===================================================== */

      const teacherScoresSheet = studentDetails.flatMap((student) =>
        student.profile.raw.map((assessment, index) => ({
          No: index + 1,

          "Nama Siswa": student.name,

          "Judul Soal": assessment.test.title,

          Topik: assessment.test.topic.title,

          Fungsionalitas: assessment.teacherScore.fungsionalitas,

          Logika: assessment.teacherScore.logika,

          Syntax: assessment.teacherScore.syntax,

          "Code Style": assessment.teacherScore.code_style,

          Dokumentasi: assessment.teacherScore.dokumentasi,

          Konsep: assessment.teacherScore.konsep,

          Status: assessment.flagOverride ? "Diverifikasi Guru" : "Skor AI",
        })),
      );

      /* =====================================================
         CREATE WORKBOOK
      ===================================================== */

      const workbook = XLSX.utils.book_new();

      /* =====================================================
         CREATE WORKSHEETS
      ===================================================== */

      const summaryWorksheet = XLSX.utils.json_to_sheet(summarySheet);

      const studentsWorksheet = XLSX.utils.json_to_sheet(studentsSheet);

      const competenciesWorksheet = XLSX.utils.json_to_sheet(competenciesSheet);

      const topicScoresWorksheet = XLSX.utils.json_to_sheet(topicScoresSheet);

      const assessmentHistoryWorksheet = XLSX.utils.json_to_sheet(
        assessmentHistorySheet,
      );

      const aiScoresWorksheet = XLSX.utils.json_to_sheet(aiScoresSheet);

      const teacherScoresWorksheet =
        XLSX.utils.json_to_sheet(teacherScoresSheet);

      /* =====================================================
         SET COLUMN WIDTHS
      ===================================================== */

      summaryWorksheet["!cols"] = [{ wch: 25 }, { wch: 18 }, { wch: 25 }];

      studentsWorksheet["!cols"] = [
        { wch: 8 },
        { wch: 28 },
        { wch: 20 },
        { wch: 15 },
        { wch: 18 },
        { wch: 22 },
      ];

      competenciesWorksheet["!cols"] = [
        { wch: 8 },
        { wch: 28 },
        { wch: 18 },
        { wch: 15 },
        { wch: 15 },
        { wch: 18 },
        { wch: 18 },
        { wch: 15 },
      ];

      topicScoresWorksheet["!cols"] = [
        { wch: 8 },
        { wch: 28 },
        { wch: 30 },
        { wch: 20 },
      ];

      assessmentHistoryWorksheet["!cols"] = [
        { wch: 8 },
        { wch: 28 },
        { wch: 35 },
        { wch: 25 },
        { wch: 12 },
        { wch: 18 },
        { wch: 22 },
        { wch: 25 },
        { wch: 35 },
        { wch: 35 },
      ];

      aiScoresWorksheet["!cols"] = [
        { wch: 8 },
        { wch: 28 },
        { wch: 35 },
        { wch: 25 },
        { wch: 18 },
        { wch: 15 },
        { wch: 15 },
        { wch: 18 },
        { wch: 18 },
        { wch: 15 },
      ];

      teacherScoresWorksheet["!cols"] = [
        { wch: 8 },
        { wch: 28 },
        { wch: 35 },
        { wch: 25 },
        { wch: 18 },
        { wch: 15 },
        { wch: 15 },
        { wch: 18 },
        { wch: 18 },
        { wch: 15 },
        { wch: 25 },
      ];

      /* =====================================================
         APPEND SHEETS
      ===================================================== */

      XLSX.utils.book_append_sheet(
        workbook,
        summaryWorksheet,
        "Ringkasan Kelas",
      );

      XLSX.utils.book_append_sheet(
        workbook,
        studentsWorksheet,
        "Ringkasan Siswa",
      );

      XLSX.utils.book_append_sheet(
        workbook,
        competenciesWorksheet,
        "Kompetensi Siswa",
      );

      XLSX.utils.book_append_sheet(
        workbook,
        topicScoresWorksheet,
        "Skor per Topik",
      );

      XLSX.utils.book_append_sheet(
        workbook,
        assessmentHistoryWorksheet,
        "Riwayat Asesmen",
      );

      XLSX.utils.book_append_sheet(workbook, aiScoresWorksheet, "Skor AI");

      XLSX.utils.book_append_sheet(
        workbook,
        teacherScoresWorksheet,
        "Skor Guru",
      );

      /* =====================================================
         FILE NAME
      ===================================================== */

      const fileName = `Monitoring-${data.summary.className
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9-]/g, "")}.xlsx`;

      XLSX.writeFile(workbook, fileName);
    } catch (error) {
      console.error("Gagal export data kelas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      startIcon={<Download size={17} />}
      onClick={handleExport}
      disabled={loading}
    >
      {loading ? "Menyiapkan Data..." : "Export Data Kelas"}
    </Button>
  );
}
