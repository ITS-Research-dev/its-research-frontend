interface MaterialHeaderProps {
  title: string;
  description?: string;
}

export default function MaterialHeader({
  title,
  description,
}: MaterialHeaderProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold text-text">{title}</h1>

      {description && (
        <p className="max-w-3xl text-description leading-7">{description}</p>
      )}
    </div>
  );
}
