"use client";

import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  FolderOpen,
  FileText,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  RefreshCw,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Dropdown from "@/components/ui/DropDown";
import AlertModal from "@/components/common/AlertModal";

import {
  BankMaterial,
  GeminiGenerateResponse,
  GeminiMateriItem,
  GeminiQuestionItem,
  TopicDropdown,
} from "@/types/bank";
import { MaterialFormData } from "@/components/bank/MaterialFormModal";
import { QuestionFormData } from "@/components/bank/QuestionFormModal";
import bankService from "@/services/bank.service";
import { useClassStore } from "@/store/class.store";
import { storage } from "@/utils/storage";

/* =====================================================
   TYPE LOKAL (alur reference → generate)
===================================================== */

type Step =
  | "upload" // pilih & proses file
  | "processing" // ekstrak dokumen & generate via Gemini API
  | "not_found" // materi python tidak ditemukan
  | "topic" // pilih topik + tombol generate
  | "preview"; // hasil generate + generate ulang / publikasikan

type GenerateType = "material" | "question";

interface GeneratedSource {
  chapter: string;
  fileName: string;
  pageRange: string;
}

interface GeneratedMaterialDraft extends MaterialFormData {
  type: "material";
  source: GeneratedSource;
}

interface GeneratedQuestionDraft extends QuestionFormData {
  type: "question";
  source: GeneratedSource;
}

type GeneratedDraft = GeneratedMaterialDraft | GeneratedQuestionDraft;

interface ReferenceUploadProps {
  selectedClassId?: string;
  materials?: BankMaterial[];
  onPublished?: () => void;
}

/* =====================================================
   COMPONENT
===================================================== */

export default function ReferenceUpload({
  selectedClassId = "",
  materials = [],
  onPublished,
}: ReferenceUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<Step>("upload");

  const [file, setFile] = useState<File | null>(null);
  const [chunkCount, setChunkCount] = useState(0);
  const [topics, setTopics] = useState<TopicDropdown[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<string>("");

  const [extractedMaterials, setExtractedMaterials] = useState<
    GeminiMateriItem[]
  >([]);
  const [geminiResponse, setGeminiResponse] =
    useState<GeminiGenerateResponse | null>(null);

  const [generating, setGenerating] = useState<GenerateType | null>(null);
  const [draft, setDraft] = useState<GeneratedDraft | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [publishing, setPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedTopic = topics.find((t) => t.id === selectedTopicId);

  /* =====================================================
     RESET
  ===================================================== */

  const resetAll = () => {
    setFile(null);
    setChunkCount(0);
    setTopics([]);
    setSelectedTopicId("");
    setExtractedMaterials([]);
    setGeminiResponse(null);
    setDraft(null);
    setQuestionIndex(0);
    setPublishSuccess(false);
    setErrorMessage(null);
    setStep("upload");

    if (inputRef.current) inputRef.current.value = "";
  };

  /* =====================================================
     STEP 1 → UPLOAD FILE & PROSES DENGAN GEMINI API
  ===================================================== */

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    setFile(selected);
    setErrorMessage(null);
  };

  const handleProcessDocument = async () => {
    if (!file) return;

    setStep("processing");
    setErrorMessage(null);

    try {
      const response = await bankService.generateFromReference(file);
      setGeminiResponse(response);

      const result = response.result;

      if (
        result.status === "no_data" ||
        !result.data ||
        result.data.length === 0
      ) {
        setStep("not_found");
        return;
      }

      const rawData = result.data;
      const topicList: TopicDropdown[] = rawData.map((item, idx) => ({
        id: String(item.id ?? idx + 1),
        title: item.title,
      }));

      setExtractedMaterials(rawData);
      setTopics(topicList);
      setChunkCount(result.total_materi || topicList.length);

      if (topicList.length > 0) {
        setSelectedTopicId(topicList[0].id);
      }

      setStep("topic");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Gagal memproses dokumen dengan Gemini AI. Pastikan file PDF valid lalu coba lagi.";
      setErrorMessage(msg);
      setStep("upload");
    }
  };

  /* =====================================================
     STEP 3 → GENERATE MATERI / SOAL
  ===================================================== */

  const runGenerate = async (type: GenerateType) => {
    if (!selectedTopic || !file) return;

    setGenerating(type);
    setErrorMessage(null);

    try {
      const matchedItem = extractedMaterials.find(
        (m, idx) => String(m.id ?? idx + 1) === selectedTopicId,
      );

      if (!matchedItem) {
        throw new Error("Data materi untuk topik ini tidak ditemukan.");
      }

      const fileName = geminiResponse?.fileName || file.name;

      if (type === "material") {
        const source: GeneratedSource = {
          chapter: matchedItem.title,
          fileName,
          pageRange:
            matchedItem.existing_questions?.[0]?.reference ||
            "Dokumen Referensi",
        };

        const materialDraft: GeneratedMaterialDraft = {
          type: "material",
          title: matchedItem.title,
          description:
            matchedItem.description ||
            `Materi pembelajaran mengenai ${matchedItem.title}.`,
          content: matchedItem.subjects || `# ${matchedItem.title}\n\n`,
          startDate: new Date().toISOString().slice(0, 10),
          status: "active",
          source,
        };

        setDraft(materialDraft);
        setStep("preview");
        return;
      }

      // Type === "question"
      const allQuestions: GeminiQuestionItem[] = [
        ...(matchedItem.generated_questions || []),
        ...(matchedItem.existing_questions || []),
      ];

      if (allQuestions.length === 0) {
        // Fallback default question if none present in parsed data
        allQuestions.push({
          reference: "AI Generated",
          "sub-theme": matchedItem.title,
          judul: `Latihan ${matchedItem.title}`,
          soal: `Buatlah program Python yang menerapkan konsep "${matchedItem.title}".`,
          expected_output: "Output program sesuai spesifikasi.",
          hint1: "Pahami instruksi dan analisis alur program.",
          hint2: "Lengkapi kode yang rumpang.",
          hint3: "Tuliskan kode program secara terstruktur.",
        });
      }

      const currentQ = allQuestions[questionIndex % allQuestions.length];

      // Auto-match existing bank material if possible
      const matchedBankMaterial = materials.find(
        (m) =>
          m.title.toLowerCase().includes(matchedItem.title.toLowerCase()) ||
          matchedItem.title.toLowerCase().includes(m.title.toLowerCase()),
      );

      const assignedMaterialId =
        matchedBankMaterial?.id ||
        (materials.length > 0 ? materials[0].id : "");

      const source: GeneratedSource = {
        chapter: currentQ["sub-theme"] || matchedItem.title,
        fileName,
        pageRange: currentQ.reference || "AI Generated",
      };

      const questionDraft: GeneratedQuestionDraft = {
        type: "question",
        materialId: assignedMaterialId,
        title: currentQ.judul || `Latihan ${matchedItem.title}`,
        description: currentQ.soal || "",
        expectedOutput: currentQ.expected_output || "",
        hint1: currentQ.hint1 || "Gunakan konsep dasar Python.",
        hint2: currentQ.hint2 || "Lengkapi bagian kode yang diperlukan.",
        hint3: currentQ.hint3 || "Tuliskan implementasi kode lengkap.",
        status: "active",
        source,
      };

      setDraft(questionDraft);
      setStep("preview");
    } catch (err: any) {
      setErrorMessage(
        err?.message || "Gagal generate konten. Silakan coba lagi.",
      );
    } finally {
      setGenerating(null);
    }
  };

  const handleRegenerate = () => {
    if (!draft) return;
    if (draft.type === "question") {
      setQuestionIndex((prev) => prev + 1);
    }
    runGenerate(draft.type);
  };

  const handleBackToTopic = () => {
    setDraft(null);
    setErrorMessage(null);
    setStep("topic");
  };

  /* =====================================================
     STEP 4 → PUBLISH (SAVE TO DATABASE)
  ===================================================== */

  const handlePublish = async () => {
    if (!draft) return;

    setPublishing(true);
    setErrorMessage(null);

    try {
      const storeClassId = useClassStore.getState().selectedClassId;
      const activeClassId = selectedClassId || storeClassId || storage.getClass()[0]?.value;

      if (!activeClassId) {
        throw new Error(
          "Kelas belum dipilih. Silakan pilih kelas terlebih dahulu.",
        );
      }

      if (draft.type === "material") {
        await bankService.createMaterial(activeClassId, {
          title: draft.title,
          description: draft.description,
          content: draft.content,
          startDate: draft.startDate || new Date().toISOString().slice(0, 10),
          status: draft.status || "active",
        });
      } else {
        // Question
        let targetMaterialId = draft.materialId;

        if (!targetMaterialId) {
          // Look for matching material by title
          const matchedBankMaterial = materials.find(
            (m) =>
              m.title.toLowerCase().includes(draft.title.toLowerCase()) ||
              draft.title.toLowerCase().includes(m.title.toLowerCase()),
          );

          if (matchedBankMaterial) {
            targetMaterialId = matchedBankMaterial.id;
          } else if (materials.length > 0) {
            targetMaterialId = materials[0].id;
          } else {
            // Auto-create material if none exists in this class
            const topicTitle = selectedTopic?.title || draft.title;
            const newMaterial = await bankService.createMaterial(activeClassId, {
              title: topicTitle,
              description: `Materi pembelajaran mengenai ${topicTitle}.`,
              content: `# ${topicTitle}\n\n`,
              startDate: new Date().toISOString().slice(0, 10),
              status: "active",
            });
            targetMaterialId = newMaterial.id;
          }
        }

        if (!targetMaterialId) {
          throw new Error(
            "Topik Materi wajib dipilih untuk menghubungkan soal ini dengan Bank Materi.",
          );
        }

        await bankService.createQuestion({
          materialId: targetMaterialId,
          title: draft.title,
          description: draft.description,
          expectedOutput: draft.expectedOutput,
          hint1: draft.hint1,
          hint2: draft.hint2,
          hint3: draft.hint3,
          status: draft.status || "active",
        });
      }

      onPublished?.();
      setPublishSuccess(true);
    } catch (err: any) {
      console.error("Publish error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Gagal mempublikasikan hasil. Silakan coba lagi.";
      setErrorMessage(Array.isArray(msg) ? msg.join(", ") : msg);
    } finally {
      setPublishing(false);
    }
  };

  const handleGenerateAnother = () => {
    setDraft(null);
    setPublishSuccess(false);
    setErrorMessage(null);
    setStep("topic");
  };

  /* =====================================================
     RENDER
  ===================================================== */

  const materialDropdownItems = materials.map((m) => ({
    label: m.title,
    value: m.id,
  }));

  return (
    <Card className="p-7">
      {/* =================================================
          STEP: UPLOAD
      ================================================= */}

      {step === "upload" && (
        <>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-text">
              Upload Buku Referensi
            </h2>
            <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              <Sparkles size={13} /> Gemini AI
            </span>
          </div>

          <p className="mt-2 text-description">
            Unggah softfile buku (PDF), sistem akan mengekstrak materi Python
            dan membuat draf materi serta latihan soal secara otomatis.
          </p>

          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={handleFileChange}
          />

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
              Klik atau seret file PDF / DOCX ke sini
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

            {file && (
              <div
                className="
                  mt-4
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-border
                  bg-white
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-text
                "
                onClick={(e) => e.stopPropagation()}
              >
                <FileText size={16} className="text-description" />
                {file.name}
                <CheckCircle2 size={16} className="text-success" />
              </div>
            )}
          </div>

          {errorMessage && (
            <p className="mt-3 text-sm text-danger">{errorMessage}</p>
          )}

          {file && (
            <div className="flex justify-end w-full h-fit items-center mt-10">
              <Button
                className="bg-primary text-white hover:bg-primary/90"
                onClick={handleProcessDocument}
              >
                Proses Dokumen dengan Gemini AI →
              </Button>
            </div>
          )}
        </>
      )}

      {/* =================================================
          STEP: PROCESSING
      ================================================= */}

      {step === "processing" && (
        <div className="flex min-h-72 flex-col items-center justify-center gap-3 text-center">
          <Loader2 size={32} className="animate-spin text-primary" />

          <p className="text-sm font-semibold text-text">
            Memproses Dokumen dengan Gemini AI...
          </p>

          <p className="max-w-sm text-sm text-description">
            Sistem sedang membaca isi{" "}
            <span className="font-medium text-text">{file?.name}</span>,
            menyaring materi Python, serta menghasilkan draf materi & soal.
            Mohon tunggu sebentar.
          </p>
        </div>
      )}

      {/* =================================================
          STEP: MATERI PYTHON TIDAK DITEMUKAN
      ================================================= */}

      {step === "not_found" && (
        <div className="flex min-h-72 flex-col items-center justify-center gap-3 text-center">
          <AlertTriangle size={32} className="text-warning" />

          <h3 className="text-base font-bold text-text">
            Materi Python Tidak Ditemukan
          </h3>

          <p className="max-w-md text-sm text-description">
            Sistem sudah membaca{" "}
            <span className="font-semibold text-text">{file?.name}</span>, namun
            tidak menemukan materi yang berkaitan dengan Python di dalamnya.
            Silakan unggah buku referensi lain.
          </p>

          <Button className="mt-2" onClick={resetAll}>
            Upload File Lain
          </Button>
        </div>
      )}

      {/* =================================================
          STEP: PILIH TOPIK + GENERATE
      ================================================= */}

      {step === "topic" && (
        <div className="space-y-5">
          <div
            className="
              flex
              w-fit
              flex-wrap
              items-center
              gap-2
              rounded-full
              border
              border-success/30
              bg-success/10
              px-4
              py-2
              text-sm
              font-medium
              text-success
            "
          >
            <FileText size={16} />
            {file?.name}
            <span className="flex items-center gap-1">
              <CheckCircle2 size={16} />
              Terproses ({chunkCount} topik Python ditemukan)
            </span>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-text">
              Pilih Topik untuk Generate
            </label>

            <select
              value={selectedTopicId}
              onChange={(e) => setSelectedTopicId(e.target.value)}
              className="
                w-full
                rounded-lg
                border
                border-border
                px-4
                py-2.5
                text-sm
                text-text
                focus:border-primary
                focus:outline-none
                sm:w-80
              "
            >
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.title}
                </option>
              ))}
            </select>
          </div>

          {errorMessage && (
            <p className="text-sm text-danger">{errorMessage}</p>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={generating !== null}
              onClick={() => runGenerate("material")}
              className="
                flex
                items-center
                gap-2
                rounded-lg
                border
                border-border
                px-5
                py-2.5
                text-sm
                font-semibold
                text-text
                transition
                hover:border-primary
                hover:text-primary
                disabled:opacity-50
              "
            >
              {generating === "material" && (
                <Loader2 size={16} className="animate-spin" />
              )}
              Generate Materi
            </button>

            <button
              type="button"
              disabled={generating !== null}
              onClick={() => runGenerate("question")}
              className="
                flex
                items-center
                gap-2
                rounded-lg
                border
                border-border
                px-5
                py-2.5
                text-sm
                font-semibold
                text-text
                transition
                hover:border-primary
                hover:text-primary
                disabled:opacity-50
              "
            >
              {generating === "question" && (
                <Loader2 size={16} className="animate-spin" />
              )}
              Generate Soal
            </button>

            <button
              type="button"
              onClick={resetAll}
              className="
                ml-auto
                flex
                items-center
                gap-1.5
                text-sm
                font-medium
                text-description
                hover:text-text
              "
            >
              <ArrowLeft size={15} />
              Ganti File
            </button>
          </div>
        </div>
      )}

      {/* =================================================
          STEP: PREVIEW HASIL GENERATE
      ================================================= */}

      {step === "preview" && draft && !publishSuccess && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <span
              className="
                inline-flex
                w-fit
                items-center
                gap-1.5
                rounded-full
                bg-primary/10
                px-3
                py-1
                text-xs
                font-semibold
                text-primary
              "
            >
              <Sparkles size={13} /> Draf Hasil Gemini AI ·{" "}
              {draft.type === "material" ? "Materi" : "Soal"}
            </span>

            <button
              type="button"
              onClick={handleBackToTopic}
              className="
                flex
                items-center
                gap-1.5
                text-sm
                font-medium
                text-description
                hover:text-text
              "
            >
              <ArrowLeft size={15} />
              Kembali ke Topik
            </button>
          </div>

          {/* ===== PREVIEW MATERI ===== */}

          {draft.type === "material" && (
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-description">
                  Judul
                </p>
                <h3 className="text-xl font-bold text-text">{draft.title}</h3>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-description">
                  Deskripsi
                </p>
                <p className="mt-1 text-sm text-text">{draft.description}</p>
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-description">
                  Konten Materi
                </p>

                <div
                  className="
                    rounded-xl
                    border
                    border-border
                    bg-surface
                    px-6
                    py-5
                  "
                >
                  <div
                    className="
                      prose
                      prose-sm
                      w-full
                      text-text
                      prose-headings:text-text
                      prose-p:text-description
                      prose-strong:text-text
                      prose-code:text-primary
                    "
                  >
                    <ReactMarkdown
                      components={{
                        code({ children, className }) {
                          const isInline = !className;

                          if (isInline) {
                            return (
                              <code className="rounded-md bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-primary">
                                {children}
                              </code>
                            );
                          }

                          return (
                            <code className="block overflow-x-auto rounded-xl bg-gray-900 p-4 font-mono text-sm text-white">
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {draft.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== PREVIEW SOAL ===== */}

          {draft.type === "question" && (
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-description">
                  Hubungkan ke Topik Bank Materi
                </label>
                {materials.length > 0 ? (
                  <Dropdown
                    value={draft.materialId}
                    items={materialDropdownItems}
                    placeholder="Pilih materi untuk soal ini"
                    onChange={(value) =>
                      setDraft((prev) =>
                        prev && prev.type === "question"
                          ? { ...prev, materialId: value }
                          : prev,
                      )
                    }
                  />
                ) : (
                  <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 text-xs text-text">
                    Belum ada materi terdaftar di kelas ini. Topik baru{" "}
                    <span className="font-semibold text-primary">
                      "{selectedTopic?.title || draft.title}"
                    </span>{" "}
                    akan otomatis dibuatkan di Bank Materi saat dipublikasikan.
                  </div>
                )}
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-description">
                  Judul Soal
                </p>
                <h3 className="text-lg font-bold text-text">{draft.title}</h3>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-description">
                  Deskripsi Soal
                </p>
                <p className="mt-1 text-sm text-text">{draft.description}</p>
              </div>

              <div className="rounded-xl border border-border p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-description">
                  Output yang Diharapkan
                </p>
                <p className="mt-1 text-sm text-text">{draft.expectedOutput}</p>
              </div>

              <div className="space-y-2">
                <div className="rounded-lg bg-warning/10 px-4 py-3">
                  <p className="text-xs font-bold text-warning">
                    Hint 1 — Pseudocode
                  </p>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-text">
                    {draft.hint1}
                  </p>
                </div>

                <div className="rounded-lg bg-warning/10 px-4 py-3">
                  <p className="text-xs font-bold text-warning">
                    Hint 2 — Cloze Code
                  </p>
                  <pre className="mt-1 whitespace-pre-wrap font-mono text-sm text-text">
                    {draft.hint2}
                  </pre>
                </div>

                <div className="rounded-lg bg-warning/10 px-4 py-3">
                  <p className="text-xs font-bold text-warning">
                    Hint 3 — Basic Code
                  </p>
                  <pre className="mt-1 whitespace-pre-wrap font-mono text-sm text-text">
                    {draft.hint3}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* SUMBER RUJUKAN */}

          <div className="rounded-xl bg-primary/5 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-primary">
              Sumber Rujukan
            </p>

            <p className="mt-1 text-sm text-text">
              {draft.source.chapter} — {draft.source.fileName}, Ref:{" "}
              {draft.source.pageRange}
            </p>
          </div>

          {errorMessage && (
            <p className="text-sm text-danger">{errorMessage}</p>
          )}

          {/* ACTIONS */}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={generating !== null || publishing}
              onClick={handleRegenerate}
              className="
                flex
                items-center
                gap-2
                rounded-lg
                border
                border-border
                px-5
                py-2.5
                text-sm
                font-semibold
                text-text
                transition
                hover:border-primary
                hover:text-primary
                disabled:opacity-50
              "
            >
              {generating ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <RefreshCw size={16} />
              )}
              Generate Variasi Lain
            </button>

            <Button
              className="bg-primary text-white hover:bg-primary/90"
              disabled={publishing}
              onClick={handlePublish}
            >
              {publishing ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Menyimpan ke Database...
                </span>
              ) : (
                "Setujui & Publikasikan"
              )}
            </Button>
          </div>
        </div>
      )}

      {/* =================================================
          STEP: SUKSES PUBLIKASI
      ================================================= */}

      {step === "preview" && draft && publishSuccess && (
        <div className="flex min-h-72 flex-col items-center justify-center gap-3 text-center">
          <CheckCircle2 size={36} className="text-success" />

          <h3 className="text-base font-bold text-text">
            Berhasil Dipublikasikan
          </h3>

          <p className="max-w-sm text-sm text-description">
            {draft.type === "material" ? "Materi" : "Soal"} "{draft.title}"
            sudah ditambahkan ke Bank{" "}
            {draft.type === "material" ? "Materi" : "Soal"} database.
          </p>

          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={handleGenerateAnother}
              className="
                rounded-lg
                border
                border-border
                px-5
                py-2.5
                text-sm
                font-semibold
                text-text
                transition
                hover:border-primary
                hover:text-primary
              "
            >
              Generate Topik Lain
            </button>

            <Button
              className="bg-primary text-white hover:bg-primary/90"
              onClick={resetAll}
            >
              Upload File Baru
            </Button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      <AlertModal
        open={publishSuccess}
        title="Berhasil Dipublikasikan"
        description={`${draft?.type === "material" ? "Materi" : "Soal"} "${draft?.title || ""}" sudah berhasil ditambahkan ke Bank ${draft?.type === "material" ? "Materi" : "Soal"} database.`}
        type="success"
        onClose={resetAll}
      />
    </Card>
  );
}
