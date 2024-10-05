import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Appointment } from "@/lib/types/appwrite.types";
import { Status } from "@/lib/types/index.types";
import { useState } from "react";
import AppointmentForm from "./forms/AppointmentForm";
import { Button } from "./ui/button";

const AppointmentModal = ({
  type,
  status,
  userId,
  patientId,
  appointment,
}: {
  type: "schedule" | "cancel";
  status?: Status;
  userId: string;
  patientId: string;
  appointment?: Appointment;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant={type === "schedule" ? "outline" : "destructive"}
          disabled={status === "cancelled"}
          className="capitalize"
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
          <DialogDescription>
            Please fill in the folling details to {type} the appointment.
          </DialogDescription>
        </DialogHeader>

        <AppointmentForm
          type={type}
          userId={userId}
          patientId={patientId}
          appointment={appointment}
          setIsOpen={setIsOpen}
          noPopover
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
