"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BrainCircuit, CalendarClock, Lightbulb, Lock } from "lucide-react";

import { CompetencyScore } from "@/types/asessment";
import { CaseDetail as CaseDetailType } from "@/types/case";
import { QueueItem } from "@/types/queue";

import CaseHeader from "./CaseHeader";
import LeftPanel from "./LeftPanel";
import CodeEditor from "./CodeEditor";
import RightPanel from "./RightPanel";

import ConfirmModal from "../common/ConfirmModal";
import AlertModal from "../common/AlertModal";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

import caseService, { mapScoringToCompetencies } from "@/services/case.service";
import { mapPythonError } from "@/utils/errorMapper";

interface Props {
  detail: CaseDetailType;
  /** Opsional: callback untuk reload data dari parent (halaman siswa) setelah submit */
  onReload?: () => void;
}

interface QuestionResult {
  submitted: boolean;
  score: number;
  level: string;
  feedback: string;
  competencies: CompetencyScore[];
}

export default function CaseDetail({ detail, onReload }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const [questionResults, setQuestionResults] = useState<
    Record<string, QuestionResult>
  >({});

  const [running, setRunning] = useState(false);

  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const [showStartInfoModal, setShowStartInfoModal] = useState(false);

  const [failedRunCount, setFailedRunCount] = useState(0);

  const [openedHints, setOpenedHints] = useState<number[]>([]);

  const [alert, setAlert] = useState({
    open: false,
    title: "",
    description: "",
  });

  // ===== Submission Queue State =====
  const [submissionQueue, setSubmissionQueue] = useState<QueueItem[]>([]);
  const processingRef = useRef(false);

  useEffect(() => {
    // Inisialisasi jawaban dan hasil dari data API (question.submission)
    const initialAnswers: Record<string, string> = {};
    const initialResults: Record<string, QuestionResult> = {};
    const hasWorkedBefore = detail.questions.some(
      (q) => q.hasSubmitted || q.submission,
    );

    detail.questions.forEach((q) => {
      if (q.hasSubmitted && q.submission) {
        initialAnswers[q.id] = q.submission.code || q.starterCode;
        initialResults[q.id] = {
          submitted: true,
          score: q.submission.score,
          level: q.submission.level,
          feedback: q.submission.feedback,
          competencies: q.submission.aiScore
            ? mapScoringToCompetencies(q.submission.aiScore)
            : [],
        };
      } else {
        initialAnswers[q.id] = q.starterCode;
      }
    });

    setAnswers(initialAnswers);
    setQuestionResults(initialResults);
    setCurrentQuestion(0);
    setFailedRunCount(0);
    setOpenedHints([]);
    setShowSubmitModal(false);
    setShowStartInfoModal(!hasWorkedBefore);
    setSubmissionQueue([]);
    setAlert({ open: false, title: "", description: "" });
  }, [detail]);

  const question = detail.questions[currentQuestion];
  const total = detail.questions.length;
  const currentResult = questionResults[question.id];

  // ===== Retry access dari API — sumber kebenaran tunggal =====
  // allowRetry dan retryDeadline berasal langsung dari response API per soal.
  const apiAllowRetry = question.allowRetry === true;
  const apiRetryDeadline = question.retryDeadline ?? null;

  // Deadline sudah lewat?
  const isDeadlineExpired = useMemo(() => {
    if (!apiRetryDeadline) return false;
    return new Date(apiRetryDeadline) < new Date();
  }, [apiRetryDeadline]);

  // ===== Menentukan apakah editor terkunci =====
  // Editor terkunci jika:
  //   - Soal sudah disubmit (hasSubmitted/currentResult.submitted) DAN
  //   - Guru belum memberikan akses retry (allowRetry=false) ATAU deadline sudah lewat
  const isEditorLocked = useMemo(() => {
    const submitted = Boolean(currentResult?.submitted || question.hasSubmitted);
    if (!submitted) return false;
    // Jika guru sudah beri akses dan deadline masih berlaku → buka kunci
    if (apiAllowRetry && !isDeadlineExpired) return false;
    return true;
  }, [currentResult, question.hasSubmitted, apiAllowRetry, isDeadlineExpired]);

  const submittedQuestions = useMemo(() => {
    const resultIds = Object.keys(questionResults).filter(
      (id) => questionResults[id].submitted,
    );
    const queuedIds = submissionQueue
      .filter((i) => i.status === "queued" || i.status === "running")
      .map((i) => i.questionId);
    return [...new Set([...resultIds, ...queuedIds])];
  }, [questionResults, submissionQueue]);

  const isCurrentQueued = useMemo(
    () =>
      submissionQueue.some(
        (item) =>
          item.questionId === question.id &&
          (item.status === "queued" || item.status === "running"),
      ),
    [submissionQueue, question.id],
  );

  const hasRunningSubmission = useMemo(
    () => submissionQueue.some((item) => item.status === "running"),
    [submissionQueue],
  );

  const currentQueuePosition = useMemo(() => {
    const queuedItems = submissionQueue.filter((i) => i.status === "queued");
    const idx = queuedItems.findIndex((i) => i.questionId === question.id);
    return idx >= 0 ? idx + 1 : 0;
  }, [submissionQueue, question.id]);

  useEffect(() => {
    setFailedRunCount(0);
    setOpenedHints([]);
  }, [currentQuestion]);

  const handleCodeChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: value,
    }));
  };

  const handleRun = async (stdin?: string) => {
    setRunning(true);

    try {
      const result = await caseService.runCode({
        questionId: question.id,
        code: answers[question.id] ?? "",
        stdin,
      });

      if (result.stderr) {
        const error = mapPythonError(result.stderr);
        setAlert({
          open: true,
          title: error.title,
          description: error.description,
        });
        setFailedRunCount((prev) => Math.min(prev + 1, question.hints.length));
      }

      return {
        stdout: result.stdout,
        stderr: result.stderr,
      };
    } finally {
      setRunning(false);
    }
  };

  // ===== Queue Processor =====
  const currentRunningIdRef = useRef<string | null>(null);

  const processNextInQueue = useCallback(() => {
    if (processingRef.current) return;

    setSubmissionQueue((prev) => {
      const hasRunning = prev.some((i) => i.status === "running");
      if (hasRunning) return prev;

      const nextQueued = prev.find((i) => i.status === "queued");
      if (!nextQueued) return prev;

      processingRef.current = true;
      currentRunningIdRef.current = nextQueued.id;

      return prev.map((item) =>
        item.id === nextQueued.id
          ? { ...item, status: "running" as const, startedAt: Date.now() }
          : item,
      );
    });
  }, []);

  useEffect(() => {
    const runningItem = submissionQueue.find((i) => i.status === "running");

    if (
      !runningItem ||
      !processingRef.current ||
      runningItem.id !== currentRunningIdRef.current
    ) {
      return;
    }

    const itemToProcess = runningItem;
    const itemId = currentRunningIdRef.current;
    currentRunningIdRef.current = null;

    let cancelled = false;

    (async () => {
      try {
        const response = await caseService.submitCase(itemToProcess.payload);

        if (cancelled) return;

        const competencies = mapScoringToCompetencies(response.aiScore);

        const result: QuestionResult = {
          submitted: true,
          score: Math.round(response.overallScore),
          level: response.level,
          feedback: response.aiSuggestion,
          competencies,
        };

        setQuestionResults((prev) => ({
          ...prev,
          [itemToProcess.questionId]: result,
        }));

        setSubmissionQueue((prev) =>
          prev.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  status: "completed" as const,
                  completedAt: Date.now(),
                  result,
                }
              : item,
          ),
        );

        // Reload data detail dari API agar allowRetry/retryDeadline dan status ter-update
        onReload?.();
      } catch {
        if (cancelled) return;

        setSubmissionQueue((prev) =>
          prev.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  status: "failed" as const,
                  completedAt: Date.now(),
                  error:
                    "Terjadi kesalahan saat menilai jawaban. Pastikan server AI aktif dan coba lagi.",
                }
              : item,
          ),
        );
      } finally {
        if (!cancelled) {
          processingRef.current = false;
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [submissionQueue, onReload]);

  useEffect(() => {
    if (!processingRef.current) {
      const hasQueued = submissionQueue.some((i) => i.status === "queued");
      const hasRunning = submissionQueue.some((i) => i.status === "running");
      if (hasQueued && !hasRunning) {
        processNextInQueue();
      }
    }
  }, [submissionQueue, processNextInQueue]);

  // ===== Submit Handler =====
  const handleSubmit = () => {
    setShowSubmitModal(false);

    // Guard: editor harus terbuka (tidak terkunci)
    if (isEditorLocked) {
      setAlert({
        open: true,
        title: "Tidak Dapat Submit",
        description: "Editor terkunci. Menunggu guru memberikan akses coba ulang.",
      });
      return;
    }

    // Guard: cek deadline coba ulang
    if (apiAllowRetry && isDeadlineExpired) {
      setAlert({
        open: true,
        title: "Deadline Coba Ulang Telah Habis",
        description: apiRetryDeadline
          ? `Batas waktu coba ulang adalah ${new Date(apiRetryDeadline).toLocaleString("id-ID")}. Kamu tidak dapat submit lagi untuk soal ini.`
          : "Batas waktu pengerjaan ulang telah habis.",
      });
      return;
    }

    const newItem: QueueItem = {
      id: crypto.randomUUID(),
      questionId: question.id,
      questionTitle: `Soal ${question.order}`,
      questionIndex: currentQuestion,
      status: "queued",
      payload: {
        testId: question.id,
        soal: question.description,
        expectedOutput: question.expectedOutput,
        studentCode: answers[question.id] ?? "",
        hintUsage: openedHints.length,
      },
      submittedAt: Date.now(),
    };

    setSubmissionQueue((prev) => [
      ...prev.filter((item) => item.questionId !== question.id),
      newItem,
    ]);
  };

  // ===== Queue Navigation =====
  const handleQueueItemClick = (questionIndex: number) => {
    setCurrentQuestion(questionIndex);
  };

  const handleUseHint = () => {
    const nextHint = openedHints.length;
    if (nextHint >= question.hints.length) return;
    setOpenedHints((prev) => [...prev, nextHint]);
  };

  const handleAcceptStartInfo = () => {
    setShowStartInfoModal(false);
  };

  // ===== Deadline banner helper =====
  const formatDeadline = (iso: string) => {
    try {
      return new Date(iso).toLocaleString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      });
    } catch {
      return iso;
    }
  };

  return (
    <>
      <div className="space-y-8">
        <CaseHeader title={detail.title} />

        {/* ===== RETRY DEADLINE BANNER ===== */}
        {/* Ditampilkan hanya jika guru sudah berikan akses coba ulang */}
        {apiAllowRetry && apiRetryDeadline && (
          <div
            className={`flex items-start gap-3 rounded-xl border px-5 py-4 ${
              isDeadlineExpired
                ? "border-danger/30 bg-danger/5"
                : "border-warning/30 bg-warning/5"
            }`}
          >
            {isDeadlineExpired ? (
              <Lock size={18} className="mt-0.5 shrink-0 text-danger" />
            ) : (
              <CalendarClock size={18} className="mt-0.5 shrink-0 text-warning" />
            )}
            <div>
              <p className={`text-sm font-semibold ${isDeadlineExpired ? "text-danger" : "text-warning"}`}>
                {isDeadlineExpired
                  ? "Waktu Coba Ulang Telah Habis"
                  : "Akses Coba Ulang Diberikan"}
              </p>
              <p className="mt-0.5 text-xs text-description">
                {isDeadlineExpired
                  ? `Deadline ${formatDeadline(apiRetryDeadline)} sudah terlewati. Kamu tidak dapat submit lagi untuk soal ini.`
                  : `Deadline pengerjaan ulang: ${formatDeadline(apiRetryDeadline)}`}
              </p>
            </div>
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)_320px]">
          <LeftPanel
            question={question}
            questions={detail.questions}
            total={total}
            current={currentQuestion}
            submittedQuestions={submittedQuestions}
            onChange={setCurrentQuestion}
          />

          <CodeEditor
            code={answers[question.id] ?? ""}
            disabled={isCurrentQueued || isEditorLocked}
            isSubmitted={isEditorLocked}
            running={running}
            isAssessing={isCurrentQueued}
            hasQueuedSubmission={hasRunningSubmission}
            queuePosition={currentQueuePosition}
            retryStatus={
              isEditorLocked && !apiAllowRetry
                ? "none"
                : isEditorLocked && isDeadlineExpired
                  ? "none"
                  : apiAllowRetry && !isDeadlineExpired
                    ? "approved"
                    : "none"
            }
            onCodeChange={handleCodeChange}
            onRun={handleRun}
            onSubmit={() => setShowSubmitModal(true)}
          />

          <RightPanel
            hints={question.hints}
            result={currentResult}
            failedRunCount={failedRunCount}
            openedHints={openedHints}
            assessing={isCurrentQueued}
            queueItems={submissionQueue}
            onQueueItemClick={handleQueueItemClick}
            onUseHint={handleUseHint}
          />
        </div>
      </div>

      <ConfirmModal
        open={showSubmitModal}
        title={
          apiAllowRetry && !isDeadlineExpired
            ? "Submit Pengerjaan Ulang?"
            : currentResult?.submitted
              ? "Submit Ulang Jawaban?"
              : "Submit Jawaban?"
        }
        description={
          apiAllowRetry && !isDeadlineExpired
            ? "Kode kamu akan dinilai kembali oleh AI sebagai hasil pengerjaan ulang."
            : currentResult?.submitted
              ? "Kode kamu akan dinilai kembali oleh AI. Proses ini bisa membutuhkan waktu beberapa menit. Nilai terbaru akan disimpan ke sistem."
              : "Kode kamu akan dinilai oleh AI. Proses ini bisa membutuhkan waktu beberapa menit."
        }
        confirmText={
          apiAllowRetry && !isDeadlineExpired
            ? "Submit Ulang"
            : currentResult?.submitted
              ? "Submit Ulang & Nilai"
              : "Submit & Nilai"
        }
        cancelText="Batal"
        loading={false}
        onClose={() => setShowSubmitModal(false)}
        onConfirm={handleSubmit}
      />

      <Modal
        open={showStartInfoModal}
        onClose={() => setShowStartInfoModal(false)}
        title="Sebelum Mulai Mengerjakan"
        footer={
          <Button variant="primary" onClick={handleAcceptStartInfo}>
            Setuju dan Mulai
          </Button>
        }
      >
        <div className="space-y-5 text-description">
          <p>
            Dalam studi kasus ini kamu dapat menggunakan bantuan hint dan
            menerima feedback dari AI untuk memahami kualitas jawabanmu.
          </p>

          <div className="space-y-3">
            {/* Hint */}
            <div className="flex gap-3 rounded-xl bg-primary/5 p-4">
              <Lightbulb
                className="mt-0.5 shrink-0 text-primary"
                size={22}
              />

              <div className="w-full">
                <h3 className="font-semibold text-text">
                  Hint
                </h3>

                <p className="mt-1 text-sm">
                  Hint akan keluar saat kamu melakukan kesalahan
                  penulisan pada codingan. Penggunaan hint akan
                  tercatat dalam penilaian.
                </p>

                <div className="mt-3 space-y-2">
                  <p className="text-sm font-medium text-text">
                    Gunakan hint secara bertahap dan sesuai kebutuhan:
                  </p>

                  {/* Hint 1 */}
                  <div className="rounded-lg border border-primary/10 bg-white/50 p-3">
                    <p className="text-sm font-semibold text-text">
                      1. Hint Pseudocode
                    </p>

                    <p className="mt-1 text-xs leading-relaxed">
                      Menampilkan gambaran logika dan alur penyelesaian masalah secara garis besar.
                      Gunakan hint ini jika kamu masih kesulitan memahami
                    </p>
                  </div>

                  {/* Hint 2 */}
                  <div className="rounded-lg border border-primary/10 bg-white/50 p-3">
                    <p className="text-sm font-semibold text-text">
                      2. Hint Mengisi Blank Syntax
                    </p>

                    <p className="mt-1 text-xs leading-relaxed">
                      Menampilkan struktur sintaks dengan bagian rumpang/kosong yang perlu kamu isi.
                    </p>
                  </div>

                  {/* Hint 3 */}
                  <div className="rounded-lg border border-primary/10 bg-white/50 p-3">
                    <p className="text-sm font-semibold text-text">
                      3. Hint Meng-copy Jawaban Asli
                    </p>

                    <p className="mt-1 text-xs leading-relaxed">
                      Menampilkan kode solusi utuh yang dapat langsung disalin ke area pengerjaan.
                    </p>
                  </div>
                </div>

                <div className="mt-3 rounded-lg bg-primary/5 p-3">
                  <p className="text-xs leading-relaxed">
                    <span className="font-semibold text-text">
                      Tips:
                    </span>{" "}
                    Gunakan hint jika dibutuhkan, tapi jangan bergantung sepenuhnya pada hint.
                    Hint akan mempengaruhi level penilaian kamu, jadi gunakan secara bijak.
                  </p>
                </div>
              </div>
            </div>

            {/* Feedback AI */}
            <div className="flex gap-3 rounded-xl bg-secondary/5 p-4">
              <BrainCircuit
                className="mt-0.5 shrink-0 text-secondary"
                size={22}
              />

              <div>
                <h3 className="font-semibold text-text">
                  Feedback AI
                </h3>

                <p className="mt-1 text-sm">
                  Setelah jawaban dikirim, AI memberikan skor, analisis,
                  dan saran untuk membantu memperbaiki solusi kamu.
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm">
            Dengan memilih setuju, kamu siap mulai mengerjakan studi kasus.
          </p>
        </div>
      </Modal>

      <AlertModal
        open={alert.open}
        type="error"
        title={alert.title}
        description={alert.description}
        buttonText="Mengerti"
        onClose={() =>
          setAlert({
            open: false,
            title: "",
            description: "",
          })
        }
      />
    </>
  );
}
