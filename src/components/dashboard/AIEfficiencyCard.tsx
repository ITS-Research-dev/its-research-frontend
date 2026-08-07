"use client";

import Card from "@/components/ui/Card";

import { Bot, Clock3, Gauge } from "lucide-react";

import { AIEfficiency } from "@/types/dashboard";

interface Props {
  data: AIEfficiency;
}

export default function AIEfficiencyCard({ data }: Props) {
  return (
    <Card className="flex h-full flex-col p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-primary/10 p-3">
          <Bot className="text-primary" size={24} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text">Efisiensi AI</h2>

          <p className="text-sm text-description">
            Perbandingan proses penilaian
          </p>
        </div>
      </div>

      {/* Persentase */}
      <div className="mt-8 flex flex-col items-center">
        <div className="text-6xl font-bold text-primary">
          {data.percentage}%
        </div>

        <p className="mt-2 text-sm text-description">
          Efisiensi waktu penilaian
        </p>
      </div>

      {/* Detail */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
          <div className="flex items-center gap-2">
            <Clock3 size={18} className="text-danger" />

            <span className="text-sm text-text">Manual</span>
          </div>

          <span className="font-semibold text-danger">{data.manualTime}</span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-primary/5 p-4">
          <div className="flex items-center gap-2">
            <Gauge size={18} className="text-success" />

            <span className="text-sm text-text">Dengan AI</span>
          </div>

          <span className="font-semibold text-success">{data.aiTime}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 rounded-xl bg-primary/5 p-4">
        <p className="text-sm leading-6 text-description">{data.description}</p>
      </div>
    </Card>
  );
}
