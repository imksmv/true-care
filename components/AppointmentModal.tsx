import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Appointment } from "@/lib/types/appwrite.types";
import { useState } from "react";
import AppointmentForm from "./forms/AppointmentForm";
import { Button } from "./ui/button";

const AppointmentModal = ({
  type,
  userId,
  patientId,
  appointment,
}: {
  type: "schedule" | "cancel";
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
          className="capitalize"
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-[28rem]">
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
