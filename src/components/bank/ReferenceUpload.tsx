"use client";

import { useRef } from "react";
import { FolderOpen } from "lucide-react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function ReferenceUpload() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Card className="p-7">
      <div>
        <h2 className="text-lg font-bold text-text">Upload Buku Referensi</h2>

        <p className="mt-2 text-description">
          Unggah softfile buku (PDF), sistem akan mengekstrak dan menyimpannya
          sebagai basis rujukan.
        </p>
      </div>

      <input ref={inputRef} type="file" accept=".pdf" className="hidden" />

      <div
        onClick={() => inputRef.current?.click()}
        className="
          mt-6
          flex
          min-h-56
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-2xl
          border-2
          border-dashed
          border-border
          px-6
          text-center
          transition
          hover:border-primary
          hover:bg-primary/5
        "
      >
        <FolderOpen size={38} className="text-warning" />

        <p className="mt-4 font-semibold text-text">
          Klik atau seret file PDF ke sini
        </p>

        <p className="mt-1 text-sm text-description">Maks. 25MB per file</p>

        <Button
          type="button"
          className="mt-4"
          onClick={(event) => {
            event.stopPropagation();
            inputRef.current?.click();
          }}
        >
          Pilih File
        </Button>
      </div>
    </Card>
  );
}
