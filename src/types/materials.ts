export type MaterialStatus = "completed" | "learning" | "locked";
export type MaterialIcon = "book" | "code" | "brain" | "file";

export interface Material {
  title: string;
}

export interface MaterialItem extends Material {
  id: string;
  startDate: string;
}

export interface MaterialDetail extends Material {
  description: string;
  subject: string;
}

export interface MaterialCardData {
  id: string;
  title: string;
  status: MaterialStatus;
  icon: MaterialIcon;
  href: string;
}

export interface MaterialDetailView {
  title: string;
  description: string;
  subject: string;
}
