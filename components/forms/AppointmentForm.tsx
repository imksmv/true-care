"use client";

import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import ModeToggle from "@/components/ThemeToggle";
import { TimePickerInput } from "@/components/TimePickerInput";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectItem } from "@/components/ui/select";
import { createAppointment } from "@/lib/actions/appointment.actions";
import { DOCTORS } from "@/lib/constans";
import { FormFieldType } from "@/lib/enums";
import { Status } from "@/lib/types/index.types";
import { cn } from "@/lib/utils";
import { getAppointmentSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarClock, ClipboardPenLine, UserSearch } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const AppointmentForm = ({
  type,
  userId,
  patientId,
}: {
  type: "create" | "cancel" | "schedule";
  userId: string;
  patientId: string | undefined;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>,
  ) => {
    setIsLoading(true);

    let status;
    switch (type) {
      case "cancel":
        status = "cancelled";
        break;

      case "schedule":
        status = "scheduled";
        break;

      default:
        status = "pending";
        break;
    }

    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason,
          note: values.note,
          status: status as Status,
        };

        const appointment = await createAppointment(appointmentData);

        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`,
          );
        }
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
      setIsLoading(false);
    }
  };

  let buttonLabel;

  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;

    case "create":
      buttonLabel = "Create Appointment";
      break;

    default:
      buttonLabel = "Schedule Appointment";
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="my-4 space-y-6">
        <div className="flex items-center justify-between">
          <section>
            <h1 className="text-3xl font-semibold tracking-tight">
              New Appointment
            </h1>
            <p className="text-sm text-muted-foreground">
              Make a new appointment in 10 seconds
            </p>
          </section>

          <ModeToggle />
        </div>

        {type !== "cancel" && (
          <>
            <CustomFormField
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
              icon={<UserSearch size={16} />}
              control={form.control}
              formFieldType={FormFieldType.SELECT}
            >
              {DOCTORS.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex items-center gap-2">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={20}
                      height={20}
                      priority
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              name="schedule"
              label="Appointment date"
              icon={<CalendarClock size={16} />}
              control={form.control}
              formFieldType={FormFieldType.SKELETON}
              renderSkeleton={(field) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start pl-3 font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP HH:mm")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      captionLayout="dropdown-buttons"
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                    />
                    <div className="flex justify-center border-t border-border p-3">
                      <TimePickerInput
                        setDate={field.onChange}
                        date={field.value}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            />

            <div className="column-layout">
              <CustomFormField
                name="reason"
                label="Reason for appointment"
                placeholder="Add reason for appointment"
                icon={<ClipboardPenLine size={16} />}
                control={form.control}
                formFieldType={FormFieldType.TEXTAREA}
              />

              <CustomFormField
                name="notes"
                label="Notes"
                placeholder="Add notes"
                icon={<ClipboardPenLine size={16} />}
                control={form.control}
                formFieldType={FormFieldType.TEXTAREA}
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Add reason for cancellation"
            icon={<ClipboardPenLine size={16} />}
            control={form.control}
            formFieldType={FormFieldType.TEXTAREA}
          />
        )}

        <SubmitButton
          className={cn(
            "w-full font-bold",
            type === "cancel" ? "bg-destructive" : "bg-primary",
          )}
          isLoading={isLoading}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
