"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, House, SearchX } from "lucide-react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function NotFound() {
  const [backPath, setBackPath] = useState("/student/materials");
  const [role, setRole] = useState<"student" | "teacher">("student");

  useEffect(() => {
    const pathname = window.location.pathname;

    if (pathname.startsWith("/teacher")) {
      setRole("teacher");
      setBackPath("/teacher/dashboard");
    } else {
      setRole("student");
      setBackPath("/student/materials");
    }
  }, []);

  const title =
    role === "teacher" ? "Halaman Tidak Ditemukan" : "Materi Tidak Ditemukan";

  const description =
    role === "teacher"
      ? "Halaman yang Anda cari tidak tersedia atau mungkin telah dipindahkan."
      : "Halaman atau materi yang Anda cari tidak tersedia atau mungkin telah dipindahkan.";

  const buttonText =
    role === "teacher" ? "Kembali ke Dashboard" : "Kembali ke Materi";

  return (
    <div
      className="h-screen flex items-center justify-center px-4 bg-[url('/images/bg-login.png')]
    bg-cover
    bg-center
    bg-no-repeat"
    >
      <Card className="w-full max-w-lg p-8 text-center sm:p-10">
        {/* Icon */}

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <SearchX size={38} />
        </div>

        {/* 404 */}

        <p className="mt-6 text-6xl font-bold tracking-tight text-primary">
          404
        </p>

        {/* Title */}

        <h1 className="mt-4 text-2xl font-bold text-text">{title}</h1>

        {/* Description */}

        <p className="mx-auto mt-3 max-w-md leading-relaxed text-description">
          {description}
        </p>

        {/* Action */}

        <div className="mt-8 flex justify-center">
          <Link href={backPath}>
            <Button
              startIcon={
                role === "teacher" ? (
                  <House size={17} />
                ) : (
                  <ArrowLeft size={17} />
                )
              }
            >
              {buttonText}
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
