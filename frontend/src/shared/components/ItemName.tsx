interface ItemNameProps {
  name: string;
}

export const ItemName = ({ name }: ItemNameProps) => {
  return (
    <div className="min-h-[24px] flex items-center">
      <div className="font-semibold">{name}</div>
    </div>
  );
};
