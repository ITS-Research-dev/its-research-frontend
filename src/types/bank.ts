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
  topics: TopicDropdown[];
  materials: BankMaterial[];
  questions: BankQuestion[];
}
