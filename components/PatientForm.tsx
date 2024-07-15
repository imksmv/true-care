"use client";

import { Form } from "@/components/ui/form";
import { UserFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import CustomFormField from "./CustomFormField";
import SubmitButton from "./SubmitButton";
import router from "next/navigation";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phone_input",
  CHECKBOX = "checkbox",
  DATE_PICKER = "date_picker",
  SELECT = "select",
  SCELETON = "skeleton",
}

const PatientForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async ({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      // const userData = { name, email, phone };
      // const user await createUser(userData);
      // if(user) router.push(`/patient/${user.$id}/register`);
      // TODO: Add success toast
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="my-4 space-y-6">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            Welcome back! 👋
          </h2>
          <p className="text-sm text-muted-foreground">
            Schedule your appointment.
          </p>
        </div>

        <CustomFormField
          name="name"
          label="Full Name"
          placeholder="John Doe"
          icon={<User size={16} />}
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

        <SubmitButton className="w-full" isLoading={isLoading}>
          Submit
        </SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
