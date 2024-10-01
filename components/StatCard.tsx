import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  count?: number;
  label: string;
  type: "appointments" | "pending" | "cancelled";
  icon: React.ReactNode;
}

const StatCard = ({ count = 0, label, type, icon }: Props) => {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col gap-4 rounded-2xl p-6 shadow-lg",
        type === "cancelled" && "border border-destructive",
        type === "pending" && "border-progress border",
        type === "appointments" && "border-success border",
      )}
    >
      <div className="flex items-center gap-4">
        {icon}
        <h2 className="text-3xl font-bold">{count}</h2>
      </div>

      <p className="text-muted-foreground">{label}</p>
    </div>
  );
};

export default StatCard;
