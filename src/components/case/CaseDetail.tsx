"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { CompetencyScore } from "@/types/asessment";
import { CaseDetail as CaseDetailType, RunHistory } from "@/types/case";
import { QueueItem } from "@/types/queue";

import CaseHeader from "./CaseHeader";
import LeftPanel from "./LeftPanel";
import CodeEditor from "./CodeEditor";
import RightPanel from "./RightPanel";

import ConfirmModal from "../common/ConfirmModal";
import AlertModal from "../common/AlertModal";

import caseService, { mapScoringToCompetencies } from "@/services/case.service";
import { mapPythonError } from "@/utils/errorMapper";

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

  // ===== Submission Queue State =====
  const [submissionQueue, setSubmissionQueue] = useState<QueueItem[]>([]);
  const processingRef = useRef(false);

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

    setSubmissionQueue([]);

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
  const isCurrentQueued = useMemo(
    () =>
      submissionQueue.some(
        (item) =>
          item.questionId === question.id &&
          (item.status === "queued" || item.status === "running"),
      ),
    [submissionQueue, question.id],
  );

  const isCurrentSubmitted = currentResult?.submitted || isCurrentQueued;

  // Check if there's a running submission (for submit button label)
  const hasRunningSubmission = useMemo(
    () => submissionQueue.some((item) => item.status === "running"),
    [submissionQueue],
  );

  // Get queue position for the current question (0 if not in queue)
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

  // Effect to process the running item — only fires when currentRunningIdRef changes
  useEffect(() => {
    const runningItem = submissionQueue.find((i) => i.status === "running");

    // Only process if there's a running item and it matches our tracked ID
    if (
      !runningItem ||
      !processingRef.current ||
      runningItem.id !== currentRunningIdRef.current
    ) {
      return;
    }

    // Prevent re-processing: clear the ref immediately so subsequent
    // renders of this effect won't re-trigger for the same item
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

        // Store result in questionResults
        setQuestionResults((prev) => ({
          ...prev,
          [itemToProcess.questionId]: result,
        }));

        // Mark queue item as completed
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
      } catch {
        if (cancelled) return;

        // Mark queue item as failed
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
  }, [submissionQueue]);

  // When a submission finishes, check if there's more to process
  useEffect(() => {
    if (!processingRef.current) {
      const hasQueued = submissionQueue.some((i) => i.status === "queued");
      const hasRunning = submissionQueue.some((i) => i.status === "running");
      if (hasQueued && !hasRunning) {
        processNextInQueue();
      }
    }
  }, [submissionQueue, processNextInQueue]);

  // ===== Submit Handler (now queues instead of blocking) =====
  const handleSubmit = () => {
    setShowSubmitModal(false);

    const newItem: QueueItem = {
      id: crypto.randomUUID(),
      questionId: question.id,
      questionTitle: `Soal ${question.order}`,
      questionIndex: currentQuestion,
      status: "queued",
      payload: {
        soal: question.description,
        expectedOutput: question.expectedOutput,
        studentCode: answers[question.id] ?? "",
        hintUsage: openedHints.length,
      },
      submittedAt: Date.now(),
    };

    setSubmissionQueue((prev) => [...prev, newItem]);
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
