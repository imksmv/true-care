"use client";

import { Form, FormControl, FormItem } from "@/components/ui/form";
import { DOCTORS, GENDER_OPTIONS } from "@/constants";
import { createUser } from "@/lib/actions/patient.actions";
import { cn } from "@/lib/utils";
import { UserFormValidation } from "@/lib/validation";
import { User } from "@/types/index.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  BookUser,
  BriefcaseBusiness,
  Cake,
  Mail,
  MapPinned,
  Phone,
  SquareUser,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import CustomFormField from "./CustomFormField";
import { FormFieldType } from "./PatientForm";
import SubmitButton from "./SubmitButton";
import ModeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { SelectItem } from "./ui/select";

const RegisterForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      toast.success(
        `Great start, ${user.name}! Now let's add some more details.`,
      );
    }
  }, [user]);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
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
        <div className="flex items-center justify-between">
          <section>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Welcome, {user.name}!
              </h1>
              <p className="text-sm text-muted-foreground">
                Let us know more about yourself and your medical history.
              </p>
            </div>
          </section>

          <ModeToggle />
        </div>

        <section>
          <h2 className="h2">Personal Details</h2>
        </section>

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
            formFieldType={FormFieldType.SKELETON}
            renderDatePicker={(field) => (
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
                        format(field.value, "PPP")
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
                </PopoverContent>
              </Popover>
            )}
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
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex h-10 space-x-2"
                >
                  {GENDER_OPTIONS.map((option) => (
                    <FormItem
                      key={option}
                      className="flex w-fit items-center space-x-2 space-y-0 rounded-md"
                    >
                      <FormControl>
                        <RadioGroupItem
                          value={option}
                          id={option}
                          className="rounded-none border border-dashed"
                        />
                      </FormControl>
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="column-layout">
          <CustomFormField
            name="address"
            label="Address"
            placeholder="123 Main St."
            icon={<MapPinned size={16} />}
            control={form.control}
            formFieldType={FormFieldType.INPUT}
          />

          <CustomFormField
            name="occupation"
            label="Occupation"
            placeholder="Software Engineer"
            icon={<BriefcaseBusiness size={16} />}
            control={form.control}
            formFieldType={FormFieldType.INPUT}
          />
        </div>

        <div className="column-layout">
          <CustomFormField
            name="emergencyContactName"
            label="Emergency Contact Name"
            placeholder="Guardian's Name"
            icon={<BookUser size={16} />}
            control={form.control}
            formFieldType={FormFieldType.INPUT}
          />

          <CustomFormField
            name="emergencyContactNumber"
            label="Emergency Contact Number"
            icon={<Phone size={16} />}
            control={form.control}
            formFieldType={FormFieldType.PHONE_INPUT}
          />
        </div>

        <section>
          <h2 className="h2">Medical Information</h2>
        </section>

        <CustomFormField
          name="primaryPhysician"
          label="Primary Physician"
          placeholder="Select a physician"
          control={form.control}
          formFieldType={FormFieldType.SELECT}
        >
          {DOCTORS.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
              <div className="flex items-center gap-2">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={26}
                  height={26}
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <SubmitButton className="w-full font-bold" isLoading={isLoading}>
          Continue
        </SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
