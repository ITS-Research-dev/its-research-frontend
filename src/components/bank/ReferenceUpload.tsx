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
} from "lucide-react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import { TopicDropdown } from "@/types/bank";
import { MaterialFormData } from "@/components/bank/MaterialFormModal";
import { QuestionFormData } from "@/components/bank/QuestionFormModal";

/* =====================================================
   TYPE LOKAL (khusus alur reference → generate)
   -----------------------------------------------------
   Draft mengikuti bentuk MaterialFormData / QuestionFormData
   persis, supaya nanti tinggal dioper langsung ke
   bankService.createMaterial / createQuestion tanpa mapping
   ulang. "source" & "type" hanya metadata tambahan untuk UI.
===================================================== */

type Step =
  | "upload" // pilih & proses file
  | "processing" // ekstrak dokumen (simulasi)
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

/* =====================================================
   MOCK DATA & MOCK API
   -----------------------------------------------------
   TODO: ganti dengan endpoint asli (process reference,
   generate, publish) begitu backend-nya siap.
===================================================== */

const MOCK_TOPICS: TopicDropdown[] = [
  { id: "t1", title: "Variabel & Tipe Data" },
  { id: "t2", title: "Struktur Kontrol (if/else)" },
  { id: "t3", title: "Perulangan (Loop)" },
  { id: "t4", title: "Fungsi (Function)" },
  { id: "t5", title: "List & Dictionary" },
];

function mockProcessReference(file: File): Promise<{
  status: "processed" | "not_found";
  chunkCount: number;
  topics: TopicDropdown[];
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isPython = file.name.toLowerCase().includes("python");

      if (!isPython) {
        resolve({ status: "not_found", chunkCount: 0, topics: [] });
        return;
      }

      resolve({ status: "processed", chunkCount: 48, topics: MOCK_TOPICS });
    }, 1200);
  });
}

function mockGenerate(
  type: GenerateType,
  topic: TopicDropdown,
  fileName: string,
): Promise<GeneratedDraft> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const source: GeneratedSource = {
        chapter: `Bab 4, "Struktur Kontrol Program"`,
        fileName,
        pageRange: "62–68",
      };

      if (type === "material") {
        const draft: GeneratedMaterialDraft = {
          type: "material",
          title: `${topic.title} dalam Python`,
          description:
            "Siswa mampu memahami konsep dasar dan menerapkannya dalam kode Python.",
          content: `# ${topic.title} dalam Python

${topic.title} memungkinkan program mengambil keputusan atau menjalankan instruksi secara terstruktur.

## Contoh Kode

\`\`\`python
if nilai >= 75:
    print("Lulus")
else:
    print("Belum lulus")
\`\`\`

Pada contoh di atas, program akan mencetak **"Lulus"** jika \`nilai\` lebih besar atau sama dengan 75, dan **"Belum lulus"** jika sebaliknya.`,
          startDate: new Date().toISOString().slice(0, 10),
          status: "active",
          source,
        };

        resolve(draft);
        return;
      }

      const questionDraft: GeneratedQuestionDraft = {
        type: "question",
        materialId: "",
        title: `Latihan ${topic.title}`,
        description: `Buatlah program Python yang menerapkan konsep "${topic.title}" untuk mengecek kelulusan siswa berdasarkan nilai yang diinput.`,
        expectedOutput: "Lulus / Belum lulus",
        hint1:
          "Bandingkan nilai siswa dengan batas kelulusan menggunakan struktur if/else.",
        hint2: "if nilai ___ 75:\n    print(___)\nelse:\n    print(___)",
        hint3:
          'if nilai >= 75:\n    print("Lulus")\nelse:\n    print("Belum lulus")',
        status: "active",
        source,
      };

      resolve(questionDraft);
    }, 1200);
  });
}

function mockPublish(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 800));
}

/* =====================================================
   COMPONENT
===================================================== */

export default function ReferenceUpload() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<Step>("upload");

  const [file, setFile] = useState<File | null>(null);
  const [chunkCount, setChunkCount] = useState(0);
  const [topics, setTopics] = useState<TopicDropdown[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<string>("");

  const [generating, setGenerating] = useState<GenerateType | null>(null);
  const [draft, setDraft] = useState<GeneratedDraft | null>(null);

  const [publishing, setPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedTopic = topics.find((t) => t.id === selectedTopicId);

  /* =====================================================
     RESET (dipakai di beberapa titik)
  ===================================================== */

  const resetAll = () => {
    setFile(null);
    setChunkCount(0);
    setTopics([]);
    setSelectedTopicId("");
    setDraft(null);
    setPublishSuccess(false);
    setErrorMessage(null);
    setStep("upload");

    if (inputRef.current) inputRef.current.value = "";
  };

  /* =====================================================
     STEP 1 → UPLOAD FILE
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
      const result = await mockProcessReference(file);

      setChunkCount(result.chunkCount);
      setTopics(result.topics);

      if (result.status === "not_found" || result.topics.length === 0) {
        setStep("not_found");
        return;
      }

      setSelectedTopicId(result.topics[0].id);
      setStep("topic");
    } catch {
      setErrorMessage(
        "Gagal memproses dokumen. Pastikan file PDF valid lalu coba lagi.",
      );
      setStep("upload");
    }
  };

  /* =====================================================
     STEP 3 → GENERATE
  ===================================================== */

  const runGenerate = async (type: GenerateType) => {
    if (!selectedTopic || !file) return;

    setGenerating(type);
    setErrorMessage(null);

    try {
      const result = await mockGenerate(type, selectedTopic, file.name);

      setDraft(result);
      setStep("preview");
    } catch {
      setErrorMessage("Gagal generate konten. Silakan coba lagi.");
    } finally {
      setGenerating(null);
    }
  };

  const handleRegenerate = () => {
    if (draft) runGenerate(draft.type);
  };

  const handleBackToTopic = () => {
    setDraft(null);
    setErrorMessage(null);
    setStep("topic");
  };

  /* =====================================================
     STEP 4 → PUBLISH
  ===================================================== */

  const handlePublish = async () => {
    if (!draft) return;

    setPublishing(true);
    setErrorMessage(null);

    try {
      /*
       * TODO: ganti dengan bankService.createMaterial(classId, draft)
       * atau bankService.createQuestion(draft) — bentuk draft sudah
       * mengikuti MaterialFormData / QuestionFormData jadi tinggal
       * dioper langsung (buang field "type" & "source").
       */

      await mockPublish();

      setPublishSuccess(true);
    } catch {
      setErrorMessage("Gagal mempublikasikan hasil. Silakan coba lagi.");
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

  return (
    <Card className="p-7">
      {/* =================================================
          STEP: UPLOAD
      ================================================= */}

      {step === "upload" && (
        <>
          <h2 className="text-lg font-bold text-text">Upload Buku Referensi</h2>

          <p className="mt-2 text-description">
            Unggah softfile buku (PDF), sistem akan mengekstrak dan menyimpannya
            sebagai basis rujukan.
          </p>

          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
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
            <Button
              className="mt-5 bg-primary text-white hover:bg-primary/90"
              onClick={handleProcessDocument}
            >
              Proses Dokumen →
            </Button>
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
            Memproses Dokumen...
          </p>

          <p className="max-w-sm text-sm text-description">
            Sistem sedang membaca dan mengekstrak isi{" "}
            <span className="font-medium text-text">{file?.name}</span>. Mohon
            tunggu sebentar.
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
              Terproses ({chunkCount} chunk tersimpan)
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
              Draf Hasil Generate ·{" "}
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

          {/* ===== PREVIEW MATERI (mengikuti field MaterialFormData) ===== */}

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
                      max-w-none
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

          {/* ===== PREVIEW SOAL (mengikuti field QuestionFormData) ===== */}

          {draft.type === "question" && (
            <div className="space-y-4">
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
              {draft.source.chapter} — {draft.source.fileName}, hal.{" "}
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
              Generate Ulang
            </button>

            <Button
              className="bg-primary text-white hover:bg-primary/90"
              disabled={publishing}
              onClick={handlePublish}
            >
              {publishing ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Menyimpan...
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
            {draft.type === "material" ? "Materi" : "Soal"}.
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
    </Card>
  );
}
