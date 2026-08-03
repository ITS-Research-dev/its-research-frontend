// utils/materialMapper.ts
import { MaterialItem } from "@/types/materials";
import { MaterialCardData, MaterialStatus, MaterialIcon } from "@/types/materials";

const ICONS: MaterialIcon[] = ["book", "code", "brain", "file"];

function getStatus(startDate: string): MaterialStatus {
  const start = new Date(startDate);
  const now = new Date();

  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (startDay < today) return "completed";
  if (startDay.getTime() === today.getTime()) return "learning";
  return "locked";
}

function getIconById(id: string): MaterialIcon {
  const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return ICONS[hash % ICONS.length];
}

export function mapToCardData(item: MaterialItem): MaterialCardData {
  return {
    id: item.id,
    title: item.title,
    status: getStatus(item.startDate),
    icon: getIconById(item.id),
  };
}