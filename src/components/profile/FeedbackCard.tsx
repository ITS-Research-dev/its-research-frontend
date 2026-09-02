import Card from "@/components/ui/Card";

import { MessageSquareQuote, MessageSquareOff } from "lucide-react";

interface Props {
  feedback?: string | null;
}

export default function FeedbackCard({ feedback }: Props) {
  return (
    <Card className="overflow-hidden border border-primary/10">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-primary/10 bg-primary/5 px-6 py-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
          <MessageSquareQuote size={22} className="text-primary" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text">Feedback</h2>

          <p className="text-sm text-description">
            Evaluasi hasil pengerjaan asesmen.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-6">
        {feedback ? (
          <div className="flex items-start gap-3 rounded-2xl bg-background p-5">
            <p className="leading-7 text-description">{feedback}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-surface/50 py-10">
            <h2 className="font-semibold text-xl text-text">
              Belum Ada Feedback
            </h2>
            <p className="text-md text-description">
              Feedback akan tersedia setelah dosen menilai hasil asesmen kamu.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
