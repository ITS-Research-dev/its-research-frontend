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

type FormErrors = Partial<Record<keyof QuestionFormData, string>>;

const TITLE_MAX_LENGTH = 150;
const DESCRIPTION_MAX_LENGTH = 1000;

export default function QuestionFormModal({
  open,
  mode,
  question,
  materials,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<QuestionFormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});

  const materialItems = materials.map((material) => ({
    label: material.title,
    value: material.id,
  }));

  useEffect(() => {
    if (!open) return;

    setErrors({});

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
    if (field === "title") {
      const v = String(value).slice(0, TITLE_MAX_LENGTH) as QuestionFormData[K];
      setForm((prev) => ({
        ...prev,
        [field]: v,
      }));
    } else if (field === "description") {
      const v = String(value).slice(0, DESCRIPTION_MAX_LENGTH) as QuestionFormData[K];
      setForm((prev) => ({
        ...prev,
        [field]: v,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const containsForbiddenChars = (text: string) => {
    const forbidden = /[\x00-\x1F<>]/;
    return forbidden.test(text);
  };

  const isAlphanumericWithSpaces = (text: string) => {
    return /^[a-zA-Z0-9À-ž\s]+$/.test(text);
  };

  const handleSubmit = () => {
    const newErrors: FormErrors = {};

    if (!form.materialId) {
      newErrors.materialId = "Topik materi wajib dipilih.";
    }

    if (!form.title.trim()) {
      newErrors.title = "Judul soal wajib diisi.";
    } else if (form.title.length > TITLE_MAX_LENGTH) {
      newErrors.title = `Batas maksimal judul adalah ${TITLE_MAX_LENGTH} karakter.`;
    } else if (!isAlphanumericWithSpaces(form.title)) {
      newErrors.title = "Judul hanya boleh berisi huruf, angka, dan spasi (tidak boleh menggunakan simbol).";
    }

    if (!form.description.trim()) {
      newErrors.description = "Deskripsi soal wajib diisi.";
    } else if (form.description.length > DESCRIPTION_MAX_LENGTH) {
      newErrors.description = `Batas maksimal deskripsi adalah ${DESCRIPTION_MAX_LENGTH} karakter.`;
    } else if (containsForbiddenChars(form.description)) {
      newErrors.description = "Deskripsi mengandung karakter yang tidak diperbolehkan (mis. '<' atau karakter kontrol).";
    }

    if (!form.expectedOutput.trim()) {
      newErrors.expectedOutput = "Output yang diharapkan wajib diisi.";
    }

    if (!form.hint1.trim()) {
      newErrors.hint1 = "Hint 1 wajib diisi.";
    }

    if (!form.hint2.trim()) {
      newErrors.hint2 = "Hint 2 wajib diisi.";
    }

    if (!form.hint3.trim()) {
      newErrors.hint3 = "Hint 3 wajib diisi.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

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
      <div className="space-y-5">
        {/* ================= STATUS ================= */}
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

        {/* ================= MATERI ================= */}
        <Dropdown
          label="Topik Materi"
          value={form.materialId}
          items={materialItems}
          placeholder="Pilih materi"
          error={errors.materialId}
          onChange={(value) => updateField("materialId", value)}
        />

        {/* ================= JUDUL ================= */}
        <Input
          label="Judul Soal"
          required
          placeholder="mis. Menghitung Rata Rata"
          value={form.title}
          error={errors.title}
          maxLength={TITLE_MAX_LENGTH}
          onChange={(e) => updateField("title", e.target.value)}
        />

        {/* ================= DESKRIPSI ================= */}
        <Textarea
          label="Deskripsi Soal"
          placeholder="Buat fungsi Python untuk ..."
          value={form.description}
          required
          error={errors.description}
          onChange={(e) => updateField("description", e.target.value)}
          maxLength={DESCRIPTION_MAX_LENGTH}
        />

        {/* ================= EXPECTED OUTPUT ================= */}
        <Input
          label="Output yang Diharapkan"
          required
          placeholder="mis. Jika r=10, maka luas=314.0"
          value={form.expectedOutput}
          error={errors.expectedOutput}
          onChange={(e) => updateField("expectedOutput", e.target.value)}
        />

        {/* ================= HINT 1 ================= */}
        <Textarea
          label="Hint 1 — Pseudocode"
          placeholder="Tuliskan langkah-langkah penyelesaian..."
          value={form.hint1}
          required
          error={errors.hint1}
          onChange={(e) => updateField("hint1", e.target.value)}
        />

        {/* ================= HINT 2 ================= */}
        <Textarea
          label="Hint 2 — Cloze Code"
          placeholder="Berikan kode dengan beberapa bagian yang harus dilengkapi..."
          value={form.hint2}
          required
          error={errors.hint2}
          onChange={(e) => updateField("hint2", e.target.value)}
        />

        {/* ================= HINT 3 ================= */}
        <Textarea
          label="Hint 3 — Basic Code"
          placeholder="Berikan contoh kode dasar sebagai bantuan..."
          value={form.hint3}
          required
          error={errors.hint3}
          onChange={(e) => updateField("hint3", e.target.value)}
        />

        <div className="flex justify-between text-xs text-description">
          <div>Judul: {form.title.length}/{TITLE_MAX_LENGTH}</div>
          <div>Deskripsi: {form.description.length}/{DESCRIPTION_MAX_LENGTH}</div>
        </div>
      </div>
    </Modal>
  );
}