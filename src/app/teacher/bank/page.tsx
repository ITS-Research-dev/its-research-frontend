"use client";

import { useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ConfirmModal from "@/components/common/ConfirmModal";
import AlertModal from "@/components/common/AlertModal";

import BankStats from "@/components/bank/BankStats";
import MaterialTable from "@/components/bank/MaterialTable";
import QuestionTable from "@/components/bank/QuestionTable";
import ReferenceUpload from "@/components/bank/ReferenceUpload";

import MaterialFormModal, {
  MaterialFormData,
} from "@/components/bank/MaterialFormModal";

import QuestionFormModal, {
  QuestionFormData,
} from "@/components/bank/QuestionFormModal";

import { bankData } from "@/data/bank";

import { BankMaterial, BankQuestion } from "@/types/bank";

type Tab = "material" | "question" | "reference";

type FormMode = "create" | "edit";

type ConfirmType = "material" | "question" | null;

export default function TeacherBankPage() {
  /* =====================================================
     TAB
  ===================================================== */

  const [activeTab, setActiveTab] = useState<Tab>("material");

  /* =====================================================
     DATA
  ===================================================== */

  const [materials, setMaterials] = useState<BankMaterial[]>(
    bankData.materials,
  );

  const [questions, setQuestions] = useState<BankQuestion[]>(
    bankData.questions,
  );

  /* =====================================================
     MATERIAL FORM
  ===================================================== */

  const [materialModalOpen, setMaterialModalOpen] = useState(false);

  const [materialMode, setMaterialMode] = useState<FormMode>("create");

  const [selectedMaterial, setSelectedMaterial] = useState<
    BankMaterial | undefined
  >();

  /* =====================================================
     QUESTION FORM
  ===================================================== */

  const [questionModalOpen, setQuestionModalOpen] = useState(false);

  const [questionMode, setQuestionMode] = useState<FormMode>("create");

  const [selectedQuestion, setSelectedQuestion] = useState<
    BankQuestion | undefined
  >();

  /* =====================================================
     CONFIRM MODAL
  ===================================================== */

  const [confirmOpen, setConfirmOpen] = useState(false);

  const [confirmType, setConfirmType] = useState<ConfirmType>(null);

  const [pendingMaterial, setPendingMaterial] =
    useState<MaterialFormData | null>(null);

  const [pendingQuestion, setPendingQuestion] =
    useState<QuestionFormData | null>(null);

  /* =====================================================
     SUCCESS MODAL
  ===================================================== */

  const [successOpen, setSuccessOpen] = useState(false);

  const [successTitle, setSuccessTitle] = useState("");

  const [successDescription, setSuccessDescription] = useState("");

  /* =====================================================
     MATERIAL
  ===================================================== */

  const handleAddMaterial = () => {
    setSelectedMaterial(undefined);
    setMaterialMode("create");
    setMaterialModalOpen(true);
  };

  const handleEditMaterial = (material: BankMaterial) => {
    setSelectedMaterial(material);
    setMaterialMode("edit");
    setMaterialModalOpen(true);
  };

  const handleMaterialSubmit = (data: MaterialFormData) => {
    /*
     * Jangan langsung menyimpan data.
     * Simpan sementara terlebih dahulu.
     */
    setPendingMaterial(data);

    setConfirmType("material");

    setConfirmOpen(true);
  };

  /* =====================================================
     QUESTION
  ===================================================== */

  const handleAddQuestion = () => {
    setSelectedQuestion(undefined);
    setQuestionMode("create");
    setQuestionModalOpen(true);
  };

  const handleEditQuestion = (question: BankQuestion) => {
    setSelectedQuestion(question);
    setQuestionMode("edit");
    setQuestionModalOpen(true);
  };

  const handleQuestionSubmit = (data: QuestionFormData) => {
    /*
     * Jangan langsung menyimpan data.
     * Simpan sementara terlebih dahulu.
     */
    setPendingQuestion(data);

    setConfirmType("question");

    setConfirmOpen(true);
  };

  /* =====================================================
     CONFIRM SAVE
  ===================================================== */

  const handleConfirmSave = () => {
    /*
     * ============================
     * MATERIAL
     * ============================
     */

    if (confirmType === "material" && pendingMaterial) {
      const data = pendingMaterial;

      if (materialMode === "create") {
        const newMaterial: BankMaterial = {
          id: `material-${Date.now()}`,
          title: data.title,
          description: data.description,
          content: data.content,
          startDate: data.startDate,
          status: data.status,
        };

        setMaterials((prev) => [...prev, newMaterial]);

        setSuccessTitle("Materi Berhasil Ditambahkan");

        setSuccessDescription(
          "Materi baru berhasil ditambahkan ke bank materi.",
        );
      } else if (materialMode === "edit" && selectedMaterial) {
        setMaterials((prev) =>
          prev.map((item) =>
            item.id === selectedMaterial.id
              ? {
                  ...item,
                  title: data.title,
                  description: data.description,
                  content: data.content,
                  startDate: data.startDate,
                  status: data.status,
                }
              : item,
          ),
        );

        setSuccessTitle("Materi Berhasil Diperbarui");

        setSuccessDescription("Perubahan materi berhasil disimpan.");
      }

      /*
       * Bersihkan state pending.
       */

      setPendingMaterial(null);
      setConfirmType(null);
      setConfirmOpen(false);

      /*
       * Tutup form.
       */

      setMaterialModalOpen(false);

      /*
       * Baru tampilkan success.
       */

      setSuccessOpen(true);

      return;
    }

    /*
     * ============================
     * QUESTION
     * ============================
     */

    if (confirmType === "question" && pendingQuestion) {
      const data = pendingQuestion;

      const material = materials.find((item) => item.id === data.materialId);

      if (questionMode === "create") {
        const newQuestion: BankQuestion = {
          id: `question-${Date.now()}`,
          title: data.title,
          description: data.description,
          expectedOutput: data.expectedOutput,
          hint1: data.hint1,
          hint2: data.hint2,
          hint3: data.hint3,
          materialId: data.materialId,
          topic: {
            id: data.materialId,
            title: material?.title ?? "Materi",
          },
          status: data.status,
        };

        setQuestions((prev) => [...prev, newQuestion]);

        setSuccessTitle("Soal Berhasil Ditambahkan");

        setSuccessDescription("Soal baru berhasil ditambahkan ke bank soal.");
      } else if (questionMode === "edit" && selectedQuestion) {
        setQuestions((prev) =>
          prev.map((item) =>
            item.id === selectedQuestion.id
              ? {
                  ...item,
                  title: data.title,
                  description: data.description,
                  expectedOutput: data.expectedOutput,
                  hint1: data.hint1,
                  hint2: data.hint2,
                  hint3: data.hint3,
                  materialId: data.materialId,
                  topic: {
                    id: data.materialId,
                    title: material?.title ?? item.topic.title,
                  },
                  status: data.status,
                }
              : item,
          ),
        );

        setSuccessTitle("Soal Berhasil Diperbarui");

        setSuccessDescription("Perubahan soal berhasil disimpan.");
      }

      /*
       * Bersihkan state pending.
       */

      setPendingQuestion(null);
      setConfirmType(null);
      setConfirmOpen(false);

      /*
       * Tutup form.
       */

      setQuestionModalOpen(false);

      /*
       * Baru tampilkan success.
       */

      setSuccessOpen(true);
    }
  };

  /* =====================================================
     CLOSE CONFIRM
  ===================================================== */

  const handleCloseConfirm = () => {
    setConfirmOpen(false);

    setConfirmType(null);

    /*
     * Pending data juga dibersihkan.
     * Jadi jika user membatalkan,
     * tidak ada data lama yang tersimpan.
     */

    setPendingMaterial(null);
    setPendingQuestion(null);
  };

  /* =====================================================
     CLOSE SUCCESS
  ===================================================== */

  const handleCloseSuccess = () => {
    setSuccessOpen(false);

    setSuccessTitle("");
    setSuccessDescription("");
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="space-y-8">
      {/* =================================================
          HEADER
      ================================================= */}

      <PageHeader
        title="Bank Materi & Soal"
        description="Kelola materi dan soal secara manual, atau generate otomatis dari buku referensi."
      />

      {/* =================================================
          STATS
      ================================================= */}

      <BankStats
        totalMaterials={materials.length}
        totalQuestions={questions.length}
      />

      {/* =================================================
          TABS
      ================================================= */}

      <div className="border-b border-border">
        <div className="flex gap-8 overflow-x-auto">
          {/* MATERIAL */}

          <button
            type="button"
            onClick={() => setActiveTab("material")}
            className={`
              relative
              whitespace-nowrap
              pb-4
              text-sm
              font-semibold
              transition

              ${
                activeTab === "material"
                  ? "text-text"
                  : "text-description hover:text-text"
              }
            `}
          >
            Bank Materi
            {activeTab === "material" && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />
            )}
          </button>

          {/* QUESTION */}

          <button
            type="button"
            onClick={() => setActiveTab("question")}
            className={`
              relative
              whitespace-nowrap
              pb-4
              text-sm
              font-semibold
              transition

              ${
                activeTab === "question"
                  ? "text-text"
                  : "text-description hover:text-text"
              }
            `}
          >
            Bank Soal
            {activeTab === "question" && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />
            )}
          </button>

          {/* REFERENCE */}

          <button
            type="button"
            onClick={() => setActiveTab("reference")}
            className={`
              relative
              whitespace-nowrap
              pb-4
              text-sm
              font-semibold
              transition

              ${
                activeTab === "reference"
                  ? "text-text"
                  : "text-description hover:text-text"
              }
            `}
          >
            Upload & Generate dari Referensi
            {activeTab === "reference" && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>
      </div>

      {/* =================================================
          MATERIAL TAB
      ================================================= */}

      {activeTab === "material" && (
        <Card className="p-7">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-text">Daftar Materi</h2>

              <p className="mt-1 text-sm text-description">
                Kelola materi pembelajaran yang tersedia.
              </p>
            </div>

            <Button onClick={handleAddMaterial}>+ Tambah Manual</Button>
          </div>

          <MaterialTable data={materials} onEdit={handleEditMaterial} />
        </Card>
      )}

      {/* =================================================
          QUESTION TAB
      ================================================= */}

      {activeTab === "question" && (
        <Card className="p-7">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-text">Daftar Soal</h2>

              <p className="mt-1 text-sm text-description">
                Kelola soal yang tersedia dalam bank soal.
              </p>
            </div>

            <Button onClick={handleAddQuestion}>+ Tambah Manual</Button>
          </div>

          <QuestionTable data={questions} onEdit={handleEditQuestion} />
        </Card>
      )}

      {/* =================================================
          REFERENCE TAB
      ================================================= */}

      {activeTab === "reference" && <ReferenceUpload />}

      {/* =================================================
          MATERIAL FORM MODAL
      ================================================= */}

      <MaterialFormModal
        open={materialModalOpen}
        mode={materialMode}
        material={selectedMaterial}
        onClose={() => setMaterialModalOpen(false)}
        onSubmit={handleMaterialSubmit}
      />

      {/* =================================================
          QUESTION FORM MODAL
      ================================================= */}

      <QuestionFormModal
        open={questionModalOpen}
        mode={questionMode}
        question={selectedQuestion}
        materials={materials}
        onClose={() => setQuestionModalOpen(false)}
        onSubmit={handleQuestionSubmit}
      />

      {/* =================================================
          CONFIRM MODAL
      ================================================= */}

      <ConfirmModal
        open={confirmOpen}
        title={
          confirmType === "material"
            ? materialMode === "create"
              ? "Tambah Materi?"
              : "Simpan Perubahan Materi?"
            : questionMode === "create"
              ? "Tambah Soal?"
              : "Simpan Perubahan Soal?"
        }
        description={
          confirmType === "material"
            ? materialMode === "create"
              ? "Apakah Anda yakin ingin menambahkan materi ini?"
              : "Apakah Anda yakin ingin menyimpan perubahan materi ini?"
            : questionMode === "create"
              ? "Apakah Anda yakin ingin menambahkan soal ini?"
              : "Apakah Anda yakin ingin menyimpan perubahan soal ini?"
        }
        confirmText="Yakin"
        cancelText="Batal"
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmSave}
      />

      {/* =================================================
          SUCCESS MODAL
      ================================================= */}

      <AlertModal
        open={successOpen}
        title={successTitle}
        description={successDescription}
        type="success"
        buttonText="OK"
        onClose={handleCloseSuccess}
      />
    </div>
  );
}
