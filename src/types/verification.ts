export type VerificationStatus = "Perlu Verifikasi" | "Selesai";

export interface VerificationDimension {
  name: string;
  aiScore: number;
  teacherScore: number;
}

export interface VerificationItem {
  id: string;

  studentName: string;

  questionTitle: string;

  userAnswer?: string;

  code?: string;

  aiScore: number;

  status: VerificationStatus;

  aiNote: string;

  teacherNote?: string;

  className?: string;

  studentId?: string;

  questionId?: string;

  createdAt?: string;

  dimensions: VerificationDimension[];
}

export interface VerificationDetail extends VerificationItem {
  finalScores: VerificationDimension[];

  aiAccuracy: number;
}
