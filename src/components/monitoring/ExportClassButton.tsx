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
    const summarySheet = [
      {
        "Nama Kelas": data.summary.className,
        "Jumlah Siswa": data.summary.totalStudents,
        "Rata-rata Nilai": data.summary.averageScore,
      },
    ];

    const studentsSheet = data.students.map((student, index) => ({
      No: index + 1,
      Nama: student.name,
    }));

    const topicSheet = data.topicScores.map((item) => ({
      Topik: item.topic,
      "Rata-rata Skor": item.score,
    }));

    const workbook = XLSX.utils.book_new();

    const summaryWorksheet = XLSX.utils.json_to_sheet(summarySheet);

    const studentsWorksheet = XLSX.utils.json_to_sheet(studentsSheet);

    const topicWorksheet = XLSX.utils.json_to_sheet(topicSheet);

    XLSX.utils.book_append_sheet(workbook, summaryWorksheet, "Ringkasan");

    XLSX.utils.book_append_sheet(workbook, studentsWorksheet, "Data Siswa");

    XLSX.utils.book_append_sheet(workbook, topicWorksheet, "Skor Topik");

    const fileName = `Data-Kelas-${data.summary.className
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")}.xlsx`;

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
