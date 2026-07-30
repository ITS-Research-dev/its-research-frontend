"use client";

import Button from "@/components/ui/Button";

interface MaterialFooterProps {
  buttonText?: string;

  onNext?: () => void;
}

export default function MaterialFooter({
  buttonText = "Lanjut ke Studi Kasus",
  onNext,
}: MaterialFooterProps) {
  return (
    <div className="mt-8 flex justify-end">
      <Button onClick={onNext} size="lg">
        {buttonText}
      </Button>
    </div>
  );
}
