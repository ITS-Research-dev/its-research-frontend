"use client";

import { Download } from "lucide-react";
import ExcelJS from "exceljs";
import Button from "@/components/ui/Button";
import { MonitoringData } from "@/types/monitoring";

interface Props {
  data: MonitoringData;
}

export default function ExportClassButton({ data }: Props) {
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Sistem Monitoring Sekolah";
    workbook.created = new Date();

    /* =====================================================
       REUSABLE STYLES (TEMPLATE ELEGAN SEKOLAH)
    ===================================================== */
    const primaryHeaderFill: ExcelJS.Fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "1E3A8A" }, // Dark Navy Blue
    };

    const headerFont: Partial<ExcelJS.Font> = {
      name: "Calibri",
      size: 11,
      bold: true,
      color: { argb: "FFFFFF" },
    };

    const dataFont: Partial<ExcelJS.Font> = {
      name: "Calibri",
      size: 11,
    };

    const thinBorder: Partial<ExcelJS.Borders> = {
      top: { style: "thin", color: { argb: "D1D5DB" } },
      left: { style: "thin", color: { argb: "D1D5DB" } },
      bottom: { style: "thin", color: { argb: "D1D5DB" } },
      right: { style: "thin", color: { argb: "D1D5DB" } },
    };

    const zebraFill: ExcelJS.Fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "F8FAFC" }, // Light Slate
    };

    // Helper untuk merapikan Sheet Tabel
    const formatSheet = (
      sheet: ExcelJS.Worksheet,
      columns: Partial<ExcelJS.Column>[],
      rowsData: Record<string, any>[]
    ) => {
      sheet.columns = columns;

      // Style Header
      const headerRow = sheet.getRow(1);
      headerRow.height = 28;
      headerRow.eachCell((cell) => {
        cell.fill = primaryHeaderFill;
        cell.font = headerFont;
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.border = thinBorder;
      });

      // Insert Data & Apply Styling
      rowsData.forEach((dataRow, rowIndex) => {
        const row = sheet.addRow(dataRow);
        row.height = 20;

        row.eachCell({ includeEmpty: true }, (cell) => {
          cell.font = dataFont;
          cell.border = thinBorder;
          cell.alignment = { vertical: "middle" };

          // Striping baris genap
          if (rowIndex % 2 === 1) {
            cell.fill = zebraFill;
          }
        });
      });

      // Auto Adjust Column Width
      sheet.columns.forEach((column) => {
        let maxLength = 12;
        column.eachCell?.({ includeEmpty: true }, (cell) => {
          const columnText = cell.value ? cell.value.toString() : "";
          if (columnText.length > maxLength) {
            maxLength = columnText.length;
          }
        });
        column.width = Math.min(maxLength + 4, 45); // Max width 45 agar tidak terlalu lebar
      });
    };

    /* =====================================================
       SHEET 1: RINGKASAN KELAS (DENGAN TAMPILAN CARD / TEMPLATE)
    ===================================================== */
    const summarySheet = workbook.addWorksheet("Ringkasan Kelas");
    summarySheet.views = [{ showGridLines: true }];

    // Header Judul Template
    summarySheet.mergeCells("A1:C1");
    const titleCell = summarySheet.getCell("A1");
    titleCell.value = "LAPORAN RINGKASAN MONITORING KELAS";
    titleCell.font = { name: "Calibri", size: 14, bold: true, color: { argb: "1E3A8A" } };
    titleCell.alignment = { vertical: "middle" };
    summarySheet.getRow(1).height = 30;

    // Sub-Judul / Kelas Info
    summarySheet.mergeCells("A2:C2");
    const subTitleCell = summarySheet.getCell("A2");
    subTitleCell.value = `Kelas: ${data.summary.className}`;
    subTitleCell.font = { name: "Calibri", size: 11, italic: true, color: { argb: "4B5563" } };

    // Tabel Ringkasan
    const summaryTableHeaders = ["Metrik Kelas", "Nilai / Jumlah"];
    summarySheet.getRow(4).values = summaryTableHeaders;
    
    const summaryData = [
      ["Nama Kelas", data.summary.className],
      ["Jumlah Siswa", data.summary.totalStudents],
      ["Rata-rata Nilai Kelas", data.summary.averageScore],
      ["Jumlah Topik", data.topics.length],
    ];

    summaryData.forEach((row) => summarySheet.addRow(row));

    // Style khusus Sheet Ringkasan
    const summaryHeaderRow = summarySheet.getRow(4);
    summaryHeaderRow.height = 24;
    summaryHeaderRow.eachCell((cell) => {
      cell.fill = primaryHeaderFill;
      cell.font = headerFont;
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.border = thinBorder;
    });

    for (let r = 5; r <= 8; r++) {
      const row = summarySheet.getRow(r);
      row.height = 22;
      row.getCell(1).font = { name: "Calibri", bold: true };
      row.getCell(1).border = thinBorder;
      row.getCell(2).border = thinBorder;
      row.getCell(2).alignment = { horizontal: "center" };
    }
    summarySheet.getColumn(1).width = 25;
    summarySheet.getColumn(2).width = 25;

    /* =====================================================
       SHEET 2: DATA SISWA
    ===================================================== */
    const studentsSheet = workbook.addWorksheet("Data Siswa");
    studentsSheet.views = [{ showGridLines: true }];

    const studentColumns = [
      { header: "No", key: "No" },
      { header: "Nama Siswa", key: "Nama Siswa" },
      { header: "Rata-rata Nilai", key: "Rata-rata Nilai" },
      { header: "Level", key: "Level" },
      { header: "Jumlah Asesmen", key: "Jumlah Asesmen" },
    ];

    const studentRows = data.students.map((student, index) => ({
      No: index + 1,
      "Nama Siswa": student.name,
      "Rata-rata Nilai": student.averageScore,
      Level: student.level,
      "Jumlah Asesmen": student.assessments?.length ?? 0,
    }));

    formatSheet(studentsSheet, studentColumns, studentRows);

    /* =====================================================
       SHEET 3: RIWAYAT ASESMEN
    ===================================================== */
    const assessmentSheet = workbook.addWorksheet("Riwayat Asesmen");
    assessmentSheet.views = [{ showGridLines: true }];

    const assessmentColumns = [
      { header: "Nama Siswa", key: "Nama Siswa" },
      { header: "Topik", key: "Topik" },
      { header: "Judul Asesmen", key: "Judul Asesmen" },
      { header: "Nilai", key: "Nilai" },
      { header: "Level", key: "Level" },
      { header: "Hint Digunakan", key: "Hint Digunakan" },
      { header: "Durasi", key: "Durasi" },
      { header: "Feedback", key: "Feedback" },
    ];

    const assessmentRows = data.students.flatMap((student) =>
      (student.assessments ?? []).map((assessment) => ({
        "Nama Siswa": student.name,
        Topik: assessment.topic,
        "Judul Asesmen": assessment.title,
        Nilai: assessment.score,
        Level: assessment.level,
        "Hint Digunakan": assessment.hintsUsed,
        Durasi: assessment.duration,
        Feedback: assessment.feedback,
      }))
    );

    formatSheet(assessmentSheet, assessmentColumns, assessmentRows);

    /* =====================================================
       SHEET 4: SKOR KOMPETENSI
    ===================================================== */
    const competencySheet = workbook.addWorksheet("Skor Kompetensi");
    competencySheet.views = [{ showGridLines: true }];

    const competencyColumns = [
      { header: "Nama Siswa", key: "Nama Siswa" },
      { header: "Topik", key: "Topik" },
      { header: "Judul Asesmen", key: "Judul Asesmen" },
      { header: "Nilai", key: "Nilai" },
      { header: "Fungsionalitas", key: "Fungsionalitas" },
      { header: "Logika", key: "Logika" },
      { header: "Syntax", key: "Syntax" },
      { header: "Code Style", key: "Code Style" },
      { header: "Dokumentasi", key: "Dokumentasi" },
      { header: "Konsep", key: "Konsep" },
    ];

    const competencyRows = data.students.flatMap((student) =>
      (student.assessments ?? []).map((assessment) => {
        const assessmentData = assessment as typeof assessment & {
          flagOverride?: boolean;
          aiScore?: Record<string, number>;
          teacherScore?: Record<string, number>;
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
      })
    );

    formatSheet(competencySheet, competencyColumns, competencyRows);

    /* =====================================================
       SHEET 5: SKOR TOPIK
    ===================================================== */
    const topicSheet = workbook.addWorksheet("Skor Topik");
    topicSheet.views = [{ showGridLines: true }];

    const topicColumns = [
      { header: "No", key: "No" },
      { header: "Topik", key: "Topik" },
      { header: "Rata-rata Skor", key: "Rata-rata Skor" },
    ];

    const topicRows = data.topicScores.map((item, index) => ({
      No: index + 1,
      Topik: item.topic,
      "Rata-rata Skor": item.score,
    }));

    formatSheet(topicSheet, topicColumns, topicRows);

    /* =====================================================
       DOWNLOAD / WRITE FILE
    ===================================================== */
    const className =
      data.summary.className
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9-]/g, "") || "Kelas";

    const fileName = `Monitoring-Kelas-${className}.xlsx`;

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    window.URL.revokeObjectURL(url);
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