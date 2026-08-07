"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ChevronDown, ChevronRight, Lightbulb } from "lucide-react";

interface Props {
  hints: string[];

  failedRunCount: number;

  openedHints: number[];

  disabled?: boolean;

  onUseHint: () => void;
}

export default function HintSection({
  hints,
  failedRunCount,
  openedHints,
  disabled = false,
  onUseHint,
}: Props) {
  const [expandedHint, setExpandedHint] = useState<number | null>(null);

  useEffect(() => {
    if (openedHints.length === 0) {
      setExpandedHint(null);
      return;
    }

    setExpandedHint(openedHints[openedHints.length - 1]);
  }, [openedHints]);

  const toggle = (index: number) => {
    setExpandedHint((prev) => (prev === index ? null : index));
  };

  const canOpenNextHint =
    failedRunCount > openedHints.length && openedHints.length < hints.length;

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2">
        <Lightbulb size={20} className="text-warning" />

        <h3 className="text-lg font-bold text-text">Hint</h3>
        <p className="text-sm text-description">
          {openedHints.length} / {hints.length} Hint Digunakan
        </p>
      </div>

      <div className="mt-5 space-y-3">
        {openedHints.length === 0 && (
          <div
            className="
      rounded-xl
      border
      border-dashed
      border-border
      p-5
      text-center overflow-hidden
transition-all
duration-300
ease-in-out
    "
          >
            <Lightbulb className="mx-auto mb-3 text-warning" size={28} />

            <p className="text-sm text-description">
              Hint akan tersedia apabila uji coba kode gagal.
            </p>
          </div>
        )}

        {openedHints.map((hintIndex) => {
          const isExpanded = expandedHint === hintIndex;

          return (
            <div key={hintIndex} className="rounded-xl border border-border">
              <button
                onClick={() => toggle(hintIndex)}
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  px-4
                  py-3
                "
              >
                <span className="font-medium text-text">
                  Hint {hintIndex + 1}
                </span>

                {isExpanded ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>

              {isExpanded && (
                <div className="border-t border-border px-4 py-3">
                  <p className="text-sm leading-7 text-description">
                    {hints[hintIndex]}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {canOpenNextHint && (
        <Button
          className="mt-5 w-full"
          variant="outline"
          disabled={disabled}
          onClick={onUseHint}
        >
          Gunakan Hint {openedHints.length + 1}
        </Button>
      )}
    </Card>
  );
}
