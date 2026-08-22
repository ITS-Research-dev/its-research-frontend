export type BankStatus = "active" | "inactive";

export interface BankMaterial {
  id: string;
  title: string;
  description: string;
  content: string;
  startDate: string;
  status: BankStatus;
}

export interface BankQuestion {
  id: string;
  materialId: string;
  title: string;
  description: string;
  expectedOutput: string;
  hint1: string;
  hint2: string;
  hint3: string;
  topic: {
    id: string;
    title: string;
  };
  status: BankStatus;
}

export interface TopicDropdown {
  id: string;
  title: string;
}
export interface BankData {
  topics?: TopicDropdown[];
  materials: BankMaterial[];
  questions: BankQuestion[];
}

export interface GeminiQuestionItem {
  reference?: string;
  "sub-theme"?: string;
  judul?: string;
  soal?: string;
  expected_output?: string;
  hint1?: string;
  hint2?: string;
  hint3?: string;
}

export interface GeminiMateriItem {
  id: number | string;
  title: string;
  description: string;
  subjects: string;
  existing_questions?: GeminiQuestionItem[];
  generated_questions?: GeminiQuestionItem[];
}

export interface GeminiGenerateResult {
  status: "success" | "no_data";
  message?: string;
  total_materi?: number;
  data?: GeminiMateriItem[];
}

export interface GeminiGenerateResponse {
  fileName: string;
  fileType: string;
  model: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
    thinkingTokens?: number;
    totalTokens: number;
  };
  cost?: {
    usd?: {
      input: number;
      output: number;
      total: number;
    };
    idr?: {
      input: number;
      output: number;
      total: number;
      formatted: string;
    };
    exchangeRate?: string;
    note?: string;
  };
  result: GeminiGenerateResult;
}
