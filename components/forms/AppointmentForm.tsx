"use client";

import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import ModeToggle from "@/components/ThemeToggle";
import { Form } from "@/components/ui/form";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "@/lib/enums";
import { UserFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, SquareUser } from "lucide-react";
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

        <CustomFormField
          name="name"
          label="Full Name"
          placeholder="John Doe"
          icon={<SquareUser size={16} />}
          control={form.control}
          formFieldType={FormFieldType.INPUT}
        />

        <CustomFormField
          name="email"
          label="Email"
          placeholder="johndoe@example.com"
          icon={<Mail size={16} />}
          control={form.control}
          formFieldType={FormFieldType.INPUT}
        />

        <CustomFormField
          name="phone"
          label="Phone Number"
          icon={<Phone size={16} />}
          control={form.control}
          formFieldType={FormFieldType.PHONE_INPUT}
        />

        <SubmitButton className="w-full font-bold" isLoading={isLoading}>
          Get Started
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
