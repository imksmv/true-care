"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField from "./CustomFormField";
import { User, Mail, Phone } from "lucide-react";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phone_input",
  CHECKBOX = "checkbox",
  DATE_PICKER = "date_picker",
  SELECT = "select",
  SCELETON = "skeleton",
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
});

const PatientForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default PatientForm;
