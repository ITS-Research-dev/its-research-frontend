import ItemCard, { ItemIcon, ItemStatus } from "./ItemCard";

export interface Item {
  id: string;
  title: string;
  status: ItemStatus;
  icon?: ItemIcon;
  buttonText?: string;
  href: string;
  totalTest?: number;
  submittedCount?: number;
  progressMessage?: string;
  showProgress?: boolean;
}

interface ItemListProps {
  items: Item[];
  showProgress?: boolean;
}

export default function ItemList({ items, showProgress }: ItemListProps) {
  return (
    <div className="space-y-5">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          id={item.id}
          title={item.title}
          status={item.status}
          icon={item.icon}
          buttonText={item.buttonText}
          href={item.href}
          totalTest={item.totalTest}
          submittedCount={item.submittedCount}
          progressMessage={item.progressMessage}
          showProgress={item.showProgress ?? showProgress ?? false}
        />
      ))}
    </div>
  );
}
