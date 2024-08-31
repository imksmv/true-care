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
import { createUser } from "@/lib/actions/patient.actions";
import { DOCTORS } from "@/lib/constans";
import { FormFieldType } from "@/lib/enums";
import { cn } from "@/lib/utils";
import { UserFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarClock, UserSearch } from "lucide-react";
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
  type: "create" | "cancel";
  userId: string;
  patientId: string;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const newUser = await createUser(user);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register?new=true`);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
      setIsLoading(false);
    }
  };

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
        )}

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
                      format(field.value, "PPP HH:mm a")
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

        <SubmitButton className="w-full font-bold" isLoading={isLoading}>
          Continue
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
