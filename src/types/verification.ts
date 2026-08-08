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
  aiScore: number;
  status: VerificationStatus;

  aiNote: string;

  dimensions: VerificationDimension[];

  teacherNote?: string;
}

export interface VerificationDetail extends VerificationItem {
  finalScores: VerificationDimension[];
  aiAccuracy: number;
}
