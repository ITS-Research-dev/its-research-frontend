import Card from "@/components/ui/Card";

interface Competency {
  name: string;
  score: number;
}

interface Props {
  competencies: Competency[];
}

function scoreColor(score: number) {
  if (score >= 85) {
    return {
      text: "text-success",
      bg: "bg-success",
    };
  }

  if (score >= 70) {
    return {
      text: "text-warning",
      bg: "bg-warning",
    };
  }

  return {
    text: "text-danger",
    bg: "bg-danger",
  };
}

export default function CompetencyResult({ competencies }: Props) {
  return (
    <Card className="p-7">
      <div>
        <h2 className="text-xl font-bold text-text">Kompetensi yang Dinilai</h2>

        <p className="mt-1 text-description">
          Hasil penilaian pada setiap aspek kompetensi.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {competencies.map((item) => {
          const color = scoreColor(item.score);

          return (
            <div key={item.name}>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold text-text">{item.name}</h3>

                <span className={`font-bold ${color.text}`}>{item.score}%</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-border">
                <div
                  className={`${color.bg} h-full rounded-full transition-all duration-500`}
                  style={{
                    width: `${item.score}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
