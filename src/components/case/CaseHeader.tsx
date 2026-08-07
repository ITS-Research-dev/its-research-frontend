"use client";

import Link from "next/link";

import { ArrowLeft } from "lucide-react";

interface Props {
  title: string;
}

export default function CaseHeader({ title }: Props) {
  return (
    <div className="space-y-6">
      <Link
        href="/student/case"
        className="
          inline-flex
          items-center
          gap-2

          text-sm
          font-medium

          text-primary

          transition-colors

          hover:text-primary/80
        "
      >
        <ArrowLeft size={18} />
        Kembali ke Studi Kasus
      </Link>

      <div>
        <p
          className="
            text-sm
            font-semibold
            uppercase
            tracking-[0.25em]
            text-primary
          "
        >
          STUDI KASUS
        </p>

        <h1
          className="
            mt-2
            text-4xl
            font-bold
            text-text
          "
        >
          {title}
        </h1>

        <p className="mt-3 text-description">
          Selesaikan seluruh soal pada studi kasus ini sebelum melakukan submit.
          Setelah submit, jawaban tidak dapat diubah kembali.
        </p>
      </div>
    </div>
  );
}
