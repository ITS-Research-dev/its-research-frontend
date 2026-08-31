export type CaseStatus = "completed" | "learning" | "locked";
export type CaseIcon = "book" | "code" | "brain" | "file";

/* ===========================
 * Case List
 * =========================== */
export interface Case {
  title: string;
}

export interface CaseItem extends Case {
  id: string;
  totalTest: number;
  startDate: string;
}

export interface CaseCardData {
  id: string;
  title: string;
  status: CaseStatus;
  icon: CaseIcon;
  href: string;
}

export interface CaseQuestion {
  id: string;
  order: number;
  title: string;
  description: string;
  expectedOutput: string;
  starterCode: string;
  hints: string[];
}

/* ===========================
 * Detail Case
 * =========================== */
export interface CaseDetail extends Case {
  id: string;
  topic: string;
  description: string;
  status: CaseStatus;
  questions: CaseQuestion[];
}

/* ===========================
 * SANDBOX
 * =========================== */
export interface RunCodePayload {
  questionId: string;
  code: string;
  stdin?: string;
}

export interface RunCodeResponse {
  stdout: string;
  stderr: string;
  exitCode: number;
}

export interface RunHistory {
  id: string;
  time: string;
  success: boolean;
  message: string;
}
