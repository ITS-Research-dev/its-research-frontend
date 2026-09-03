"use client";

import { useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ConfirmModal from "@/components/common/ConfirmModal";
import AlertModal from "@/components/common/AlertModal";
import Loading from "@/components/common/Loading";


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

import { BankMaterial, BankQuestion } from "@/types/bank";
import { useBank } from "@/hooks/useBank";
import EmptyState from "@/components/common/EmptyState";
import bankService from "@/services/bank.service";
import { useClassStore } from "@/store/class.store";
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
  const { materials, questions, loading, reload } = useBank();

  /* =====================================================
     MATERIAL FORM
  ===================================================== */

  const [materialModalOpen, setMaterialModalOpen] = useState(false);

  const [materialMode, setMaterialMode] = useState<FormMode>("create");
  const selectedClassId = useClassStore((s) => s.selectedClassId);

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

  const handleEditMaterial = async (material: BankMaterial) => {
    setSelectedMaterial(material);
    setMaterialMode("edit");
    setMaterialModalOpen(true);
  };

  const handleMaterialSubmit = async (data: MaterialFormData) => {
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

  const handleEditQuestion = async (question: BankQuestion) => {
    setSelectedQuestion(question);
    setQuestionMode("edit");
    setQuestionModalOpen(true);
  };

  const handleQuestionSubmit = async (data: QuestionFormData) => {
    setPendingQuestion(data);
    setConfirmType("question");
    setConfirmOpen(true);
  };

  /* =====================================================
     CONFIRM SAVE
  ===================================================== */

  const handleConfirmSave = async () => {
    /*
     * ============================
     * MATERIAL
     * ============================
     */

    if (confirmType === "material" && pendingMaterial) {
      const data = pendingMaterial;

      if (materialMode == "edit" && selectedMaterial?.id) {
        await bankService.editMaterial(selectedMaterial.id, data);
        setSuccessTitle("Materi Berhasil Diperbarui");
        setSuccessDescription("Perubahan materi berhasil disimpan.");
      } else {
        await bankService.createMaterial(selectedClassId, data);
        setSuccessTitle("Materi berhasil Ditambahkan");
      }

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
    }

    /*
     * ============================
     * QUESTION
     * ============================
     */

    if (confirmType === "question" && pendingQuestion) {
      const data = pendingQuestion;
      if (questionMode == "edit" && selectedQuestion?.id) {
        await bankService.editQuestion(selectedQuestion.id, data);
        setSuccessTitle("Soal Berhasil Diperbarui");
        setSuccessDescription("Perubahan soal berhasil disimpan.");
      } else {
        await bankService.createQuestion(data);
        setSuccessTitle("Soal Berhasil Ditambahkan");
      }

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
    reload();
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

  if (loading && materials.length === 0 && questions.length === 0) {
    return <Loading open={loading} />;
  }

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
        totalMaterials={materials.filter((m) => m.status === "active").length}
        totalQuestions={questions.filter((m) => m.status === "active").length}
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

      <div className={activeTab === "material" ? "block" : "hidden"}>
        {loading ? (
          <Loading open={loading} />
        ) : (
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
      </div>

      {/* =================================================
          QUESTION TAB
      ================================================= */}

      <div className={activeTab === "question" ? "block" : "hidden"}>
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
      </div>

      {/* =================================================
          REFERENCE TAB
      ================================================= */}

      <div className={activeTab === "reference" ? "block" : "hidden"}>
        <ReferenceUpload
          selectedClassId={selectedClassId}
          materials={materials}
          onPublished={reload}
        />
      </div>

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
