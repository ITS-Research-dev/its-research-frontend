import { CaseCardData, CaseIcon, CaseItem, CaseStatus } from "@/types/case";

const ICONS: CaseIcon[] = ["book", "code", "brain", "file"];

function getStatus(startDate: string): CaseStatus {
  const start = new Date(startDate);
  const now = new Date();

  const startDay = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  );
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (startDay < today) return "completed";
  if (startDay.getTime() === today.getTime()) return "learning";
  return "locked";
}

function getIconById(id: string): CaseIcon {
  const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return ICONS[hash % ICONS.length];
}

export function mapToCaseCardData(item: CaseItem): CaseCardData {
  return {
    id: item.id,
    title: item.title,
    status: getStatus(item.startDate),
    icon: getIconById(item.id),
    href: `/student/case/${item.id}`,
  };
}