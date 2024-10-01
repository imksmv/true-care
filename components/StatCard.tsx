interface Props {
  count?: number;
  label: string;
  type: "appointments" | "pending" | "cancelled";
  icon: string;
}

const StatCard = ({ count = 0, label, type, icon }: Props) => {
  return (
    <div className="flex flex-1 flex-col gap-6 rounded-2xl bg-cover p-6 shadow-lg">
      asds
    </div>
  );
};

export default StatCard;
