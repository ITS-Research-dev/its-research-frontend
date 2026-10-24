export type VerificationStatus =
  | "Perlu di verifikasi"
  | "Selesai dikerjakan ulang"
  | "Sedang dikerjakan ulang"
  | "Sudah di Verifikasi";

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

  /** Apakah siswa diizinkan coba ulang */
  allowRetry?: boolean;

  /** Deadline coba ulang dalam ISO string */
  retryDeadline?: string | null;
}

export interface VerificationDetail extends VerificationItem {
  finalScores: VerificationDimension[];

  aiAccuracy: number;
}
