import { Status } from "@/lib/types/index.types";
import { CalendarCheck, CircleSlash, Hourglass } from "lucide-react";
import { Badge } from "./ui/badge";

const statusIcons: { [key in Status]: JSX.Element } = {
  scheduled: <CalendarCheck size={13} />,
  pending: <Hourglass size={13} />,
  cancelled: <CircleSlash size={13} />,
};

const statusVariants: {
  [key in Status]: "success" | "progress" | "destructive";
} = {
  scheduled: "success",
  pending: "progress",
  cancelled: "destructive",
};

const statusText: { [key in Status]: string } = {
  scheduled: "Scheduled",
  pending: "Pending",
  cancelled: "Cancelled",
};

const StatusBadge = ({ status }: { status: Status }) => {
  const icon = statusIcons[status];
  const variant = statusVariants[status];
  const text = statusText[status];

  return (
    <Badge variant={variant}>
      <div className="flex items-center gap-1">
        {icon}
        <span className="text-xs">{text}</span>
      </div>
    </Badge>
  );
};

export default StatusBadge;
