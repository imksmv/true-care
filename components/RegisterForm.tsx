"use client";

import { Form, FormControl } from "@/components/ui/form";
import { GENDER_OPTIONS } from "@/constants";
import { createUser } from "@/lib/actions/patient.actions";
import { UserFormValidation } from "@/lib/validation";
import { User } from "@/types/index.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cake, Mail, Phone, SquareUser, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import CustomFormField from "./CustomFormField";
import { FormFieldType } from "./PatientForm";
import SubmitButton from "./SubmitButton";
import ModeToggle from "./ThemeToggle";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const RegisterForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: undefined,
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
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
    }

    setIsLoading(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="my-4 space-y-8">
        <section className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome, {user.name}!
            </h1>
            <p className="text-sm text-muted-foreground">
              Let us know more about yourself and your medical history.
            </p>
          </div>

          <ModeToggle />
        </section>

        <h2 className="border-b pb-2 text-2xl font-semibold tracking-tight">
          Personal Details
        </h2>

        <CustomFormField
          name="name"
          label="Full Name"
          placeholder="John Doe"
          icon={<SquareUser size={16} />}
          control={form.control}
          formFieldType={FormFieldType.INPUT}
        />

        <div className="column-layout">
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
        </div>

        <div className="column-layout">
          <CustomFormField
            name="birthDate"
            label="Date of Birth"
            icon={<Cake size={16} />}
            control={form.control}
            formFieldType={FormFieldType.DATE_PICKER}
          />

          <CustomFormField
            name="gender"
            label="Gender"
            icon={<Users size={16} />}
            control={form.control}
            formFieldType={FormFieldType.SKELETON}
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-10"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GENDER_OPTIONS.map((option) => (
                    <div
                      key={option}
                      className="flex items-center gap-2 rounded-md border border-dashed bg-muted p-3"
                    >
                      <RadioGroupItem
                        value={option}
                        id={option}
                        className="border border-dashed"
                      />
                      <Label htmlFor={option} className="cursor-pointer py-3">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>
        <div className="column-layout"></div>
        <div className="column-layout"></div>
        <div className="column-layout"></div>
        <SubmitButton className="w-full font-bold" isLoading={isLoading}>
          Get Started
        </SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
