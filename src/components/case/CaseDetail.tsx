"use client";

import { useEffect, useMemo, useState } from "react";

import { CompetencyScore } from "@/types/asessment";
import { CaseDetail as CaseDetailType, RunHistory } from "@/types/case";

import CaseHeader from "./CaseHeader";
import LeftPanel from "./LeftPanel";
import CodeEditor from "./CodeEditor";
import RightPanel from "./RightPanel";

import ConfirmModal from "../common/ConfirmModal";
import AlertModal from "../common/AlertModal";

import caseService from "@/services/case.service";
import { mapPythonError } from "@/utils/errorMapper";
import { useSubmissionQueue } from "@/hooks/useSubmissionQueue";

interface Props {
  detail: CaseDetailType;
}

interface QuestionResult {
  submitted: boolean;
  score: number;
  level: string;
  feedback: string;
  competencies: CompetencyScore[];
}

export default function CaseDetail({ detail }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const [questionResults, setQuestionResults] = useState<
    Record<string, QuestionResult>
  >({});

  const [runHistory] = useState<RunHistory[]>([]);

  const [running, setRunning] = useState(false);

  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const [failedRunCount, setFailedRunCount] = useState(0);

  const [openedHints, setOpenedHints] = useState<number[]>([]);

  const [alert, setAlert] = useState({
    open: false,
    title: "",
    description: "",
  });

  // ===== Question ID → Index map (for the queue hook) =====
  const questionIdToIndex = useMemo(() => {
    const map: Record<string, number> = {};
    detail.questions.forEach((q, i) => {
      map[q.id] = i;
    });
    return map;
  }, [detail.questions]);

  // ===== Backend Submission Queue (replaces local queue state) =====
  const {
    items: submissionQueue,
    submit: submitToQueue,
    isQueued,
    getPosition,
    hasRunning: hasRunningSubmission,
  } = useSubmissionQueue(questionIdToIndex);

  // Sync completed queue items → questionResults
  useEffect(() => {
    for (const item of submissionQueue) {
      if (item.status === "completed" && item.result && !questionResults[item.questionId]) {
        setQuestionResults((prev) => ({
          ...prev,
          [item.questionId]: item.result!,
        }));
      }
    }
  }, [submissionQueue, questionResults]);

  useEffect(() => {
    const initialAnswers: Record<string, string> = {};

    detail.questions.forEach((question) => {
      initialAnswers[question.id] = question.starterCode;
    });

    setAnswers(initialAnswers);

    setQuestionResults({});

    setCurrentQuestion(0);

    setFailedRunCount(0);

    setOpenedHints([]);

    setShowSubmitModal(false);

    setAlert({
      open: false,
      title: "",
      description: "",
    });
  }, [detail]);

  const question = detail.questions[currentQuestion];

  const total = detail.questions.length;

  const currentResult = questionResults[question.id];

  const submittedQuestions = useMemo(() => {
    const resultIds = Object.keys(questionResults).filter(
      (id) => questionResults[id].submitted,
    );
    const queuedIds = submissionQueue
      .filter((i) => i.status === "queued" || i.status === "running")
      .map((i) => i.questionId);
    return [...new Set([...resultIds, ...queuedIds])];
  }, [questionResults, submissionQueue]);

  // Check if current question is already submitted (either has result or is in queue)
  const isCurrentQueued = isQueued(question.id);

  const isCurrentSubmitted = currentResult?.submitted || isCurrentQueued;

  // Get queue position for the current question (0 if not in queue)
  const currentQueuePosition = getPosition(question.id);

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

  // ===== Submit Handler (now submits to backend queue) =====
  const handleSubmit = async () => {
    setShowSubmitModal(false);

    try {
      await submitToQueue(
        {
          soal: question.description,
          expectedOutput: question.expectedOutput,
          studentCode: answers[question.id] ?? "",
          hintUsage: openedHints.length,
          testId: question.id,
          questionTitle: `Soal ${question.order}`,
        },
        currentQuestion,
      );
    } catch (e) {
      console.error("Failed to submit to queue:", e);
      setAlert({
        open: true,
        title: "Gagal Submit",
        description:
          "Terjadi kesalahan saat mengirim jawaban ke antrian. Silakan coba lagi.",
      });
    }
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

  return (
    <>
      <div className="space-y-8">
        <CaseHeader title={detail.title} />

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
            disabled={isCurrentSubmitted}
            running={running}
            hasQueuedSubmission={hasRunningSubmission}
            queuePosition={currentQueuePosition}
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
        title="Submit Jawaban?"
        description="Kode kamu akan dinilai oleh AI. Proses ini bisa membutuhkan waktu beberapa menit. Setelah disubmit, jawaban tidak dapat diubah kembali."
        confirmText="Submit & Nilai"
        cancelText="Batal"
        loading={false}
        onClose={() => setShowSubmitModal(false)}
        onConfirm={handleSubmit}
      />

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
