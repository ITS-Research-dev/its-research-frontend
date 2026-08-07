import ItemCard, { ItemIcon, ItemStatus } from "./ItemCard";

export interface Item {
  id: string;
  title: string;
  status: ItemStatus;
  icon?: ItemIcon;
  buttonText?: string;
  href: string;
}

interface ItemListProps {
  items: Item[];
}

export default function ItemList({ items }: ItemListProps) {
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
        />
      ))}
    </div>
  );
}
