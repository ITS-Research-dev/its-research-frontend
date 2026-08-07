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

  const submittedQuestions = useMemo(
    () =>
      Object.keys(questionResults).filter(
        (id) => questionResults[id].submitted,
      ),
    [questionResults],
  );

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

  const handleRun = async () => {
    setRunning(true);

    try {
      const result = await caseService.runCode({
        questionId: question.id,
        code: answers[question.id] ?? "",
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

  const handleSubmit = async () => {
    setShowSubmitModal(false);

    setRunning(true);

    try {
      const response = await caseService.submitCase();
      const score =
        response.score ??
        Math.round(
          response.competencies.reduce((acc, c) => acc + c.score, 0) /
            response.competencies.length,
        );

      setQuestionResults((prev) => ({
        ...prev,

        [question.id]: {
          submitted: true,
          score,
          level: response.level,
          feedback: response.feedback,
          competencies: response.competencies,
        },
      }));
    } finally {
      setRunning(false);
    }
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
            disabled={currentResult?.submitted ?? false}
            running={running}
            onCodeChange={handleCodeChange}
            onRun={handleRun}
            onSubmit={() => setShowSubmitModal(true)}
          />

          <RightPanel
            hints={question.hints}
            result={currentResult}
            failedRunCount={failedRunCount}
            openedHints={openedHints}
            onUseHint={handleUseHint}
          />
        </div>
      </div>

      <ConfirmModal
        open={showSubmitModal}
        title="Submit Jawaban?"
        description="Setelah jawaban disubmit, jawaban soal ini tidak dapat diubah kembali."
        confirmText="Submit"
        cancelText="Batal"
        loading={running}
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
