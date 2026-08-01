import Card from "@/components/ui/Card";

interface MaterialContentProps {
  children: React.ReactNode;
}

export default function MaterialContent({ children }: MaterialContentProps) {
  return (
    <Card className="mt-8 p-8">
      <div className="prose prose-base max-w-none">{children}</div>
    </Card>
  );
}
