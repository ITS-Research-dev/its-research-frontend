import { CaseQuestion } from "@/types/case";

interface Props {
  question: CaseQuestion;
}

export default function QuestionCard({ question }: Props) {
  return (
    <div className="space-y-6">
      {/* Nomor Soal */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          Soal {question.order}
        </p>

        <h2 className="mt-2 text-2xl font-bold text-text">{question.title}</h2>
      </div>

      {/* Deskripsi */}
      <div>
        <h3 className="mb-2 text-base font-semibold text-text">
          Deskripsi Soal
        </h3>

        <p className="whitespace-pre-line leading-7 text-description">
          {question.description}
        </p>
      </div>

      {/* Output */}
      <div>
        <h3 className="mb-2 text-base font-semibold text-text">
          Output yang Diharapkan
        </h3>

        <div className="rounded-xl bg-[#E9F0F8] p-4">
          <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm text-[#2C5482]">
            {question.expectedOutput}
          </pre>
        </div>
      </div>
    </div>
  );
}
