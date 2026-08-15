"use client";

import { useEffect, useState } from "react";

import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Dropdown from "@/components/ui/DropDown";
import Button from "@/components/ui/Button";

import { BankQuestion, BankMaterial } from "@/types/bank";

interface Props {
  open: boolean;
  mode: "create" | "edit";
  question?: BankQuestion;
  materials: BankMaterial[];
  onClose: () => void;
  onSubmit: (data: QuestionFormData) => void;
}

export interface QuestionFormData {
  materialId: string;
  title: string;
  description: string;
  expectedOutput: string;
  hint1: string;
  hint2: string;
  hint3: string;
  status: "active" | "inactive";
}

const initialForm: QuestionFormData = {
  materialId: "",
  title: "",
  description: "",
  expectedOutput: "",
  hint1: "",
  hint2: "",
  hint3: "",
  status: "active",
};

export default function QuestionFormModal({
  open,
  mode,
  question,
  materials,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<QuestionFormData>(initialForm);

  const materialItems = materials.map((material) => ({
    label: material.title,
    value: material.id,
  }));

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && question) {
      setForm({
        materialId: question.materialId,
        title: question.title,
        description: question.description,
        expectedOutput: question.expectedOutput,
        hint1: question.hint1,
        hint2: question.hint2,
        hint3: question.hint3,
        status: question.status,
      });
    } else {
      setForm({
        ...initialForm,
        materialId: materials[0]?.id ?? "",
      });
    }
  }, [open, mode, question, materials]);

  const updateField = <K extends keyof QuestionFormData>(
    field: K,
    value: QuestionFormData[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!form.materialId) return;
    if (!form.title.trim()) return;
    if (!form.description.trim()) return;

    onSubmit(form);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === "create" ? "Tambah Soal Manual" : "Edit Soal"}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>

          <Button onClick={handleSubmit}>
            {mode === "create" ? "Simpan Soal" : "Simpan Perubahan"}
          </Button>
        </>
      }
    >
      <div className="max-h-[65vh] space-y-5 overflow-y-auto pr-2">
        {/* Status */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text">
            Status
          </label>

          <button
            type="button"
            onClick={() =>
              updateField(
                "status",
                form.status === "active" ? "inactive" : "active",
              )
            }
            className="flex items-center gap-3"
          >
            {/* Toggle */}
            <span
              className={`
                relative
                h-7
                w-12
                rounded-full
                transition
                ${form.status === "active" ? "bg-success" : "bg-gray-300"}
              `}
            >
              <span
                className={`
                  absolute
                  top-1
                  h-5
                  w-5
                  rounded-full
                  bg-white
                  shadow
                  transition
                  ${form.status === "active" ? "left-6" : "left-1"}
                `}
              />
            </span>

            {/* Status description */}
            <span>
              <span className="block text-sm font-medium text-text">
                {form.status === "active" ? "Aktif" : "Tidak Aktif"}
              </span>

              <span className="block text-xs text-description">
                {form.status === "active"
                  ? "Soal dapat digunakan dalam studi kasus."
                  : "Soal tidak ditampilkan dalam studi kasus."}
              </span>
            </span>
          </button>
        </div>

        {/* Materi */}
        <Dropdown
          label="Topik Materi"
          value={form.materialId}
          items={materialItems}
          placeholder="Pilih materi"
          onChange={(value) => updateField("materialId", value)}
        />

        {/* Judul */}
        <Input
          label="Judul Soal"
          required
          placeholder="mis. 4. Menghitung Rata-rata"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
        />

        {/* Deskripsi */}
        <Textarea
          label="Deskripsi Soal"
          placeholder="Buat fungsi Python untuk ..."
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
        />

        {/* Expected Output */}
        <Input
          label="Output yang Diharapkan"
          placeholder="mis. Jika r=10, maka luas=314.0"
          value={form.expectedOutput}
          onChange={(e) => updateField("expectedOutput", e.target.value)}
        />

        {/* Hint 1 */}
        <Textarea
          label="Hint 1 — Pseudocode"
          placeholder="Tuliskan langkah-langkah penyelesaian..."
          value={form.hint1}
          onChange={(e) => updateField("hint1", e.target.value)}
        />

        {/* Hint 2 */}
        <Textarea
          label="Hint 2 — Cloze Code"
          placeholder="Berikan kode dengan beberapa bagian yang harus dilengkapi..."
          value={form.hint2}
          onChange={(e) => updateField("hint2", e.target.value)}
        />

        {/* Hint 3 */}
        <Textarea
          label="Hint 3 — Basic Code"
          placeholder="Berikan contoh kode dasar sebagai bantuan..."
          value={form.hint3}
          onChange={(e) => updateField("hint3", e.target.value)}
        />
      </div>
    </Modal>
  );
}
