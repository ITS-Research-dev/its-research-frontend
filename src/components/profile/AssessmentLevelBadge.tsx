import Badge from "@/components/ui/Badge";

interface Props {
  level: string;
}

export default function AssessmentLevelBadge({ level }: Props) {
  let variant: "primary" | "secondary" | "success" | "warning" | "danger" =
    "secondary";

  switch (level) {
    case "Novice":
      variant = "danger";
      break;

    case "Advanced Beginner":
      variant = "warning";
      break;

    case "Competent":
      variant = "primary";
      break;

    case "Proficient":
      variant = "success";
      break;
  }

  return <Badge variant={variant}>{level}</Badge>;
}
