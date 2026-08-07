import { CaseCardData, CaseItem } from "@/types/case";

export function mapToCaseCardData(item: CaseItem, index: number): CaseCardData {
  let status: CaseCardData["status"];

  if (index === 0) {
    status = "learning";
  } else if (index === 1) {
    status = "completed";
  } else {
    status = "locked";
  }

  return {
    id: item.id,
    title: item.title,
    status,
    icon: "code",
    href: `/student/case/${item.id}`,
  };
}
