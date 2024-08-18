"use client";

import CustomFormField from "@/components/CustomFormField";
import FileUploader from "@/components/FileUploader";
import SubmitButton from "@/components/SubmitButton";
import ModeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import { registerPatient } from "@/lib/actions/patient.actions";
import {
  DOCTORS,
  GENDER_OPTIONS,
  IDENTIFICATION_TYPES,
  PATIENT_FORM_DEFAULT_VALUES,
} from "@/lib/constans";
import { FormFieldType } from "@/lib/enums";
import { User } from "@/lib/types/index.types";
import { capitalise, cn } from "@/lib/utils";
import { PatientFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  BookUser,
  BriefcaseBusiness,
  Cake,
  ClipboardPenLine,
  ClipboardPlus,
  File,
  FileDigit,
  FileInput,
  Mail,
  MapPinned,
  Phone,
  ShieldPlus,
  SquareUser,
  Users,
  UserSearch,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PATIENT_FORM_DEFAULT_VALUES,
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);

    let formData;

    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }
    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };

      //@ts-ignore
      const patient = await registerPatient(patientData);

      if (patient) router.push(`/patients/${user.$id}/new-appointment`);
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
                Additional Details
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
                  className="flex h-10 justify-between"
                >
                  {GENDER_OPTIONS.map((option) => (
                    <FormItem
                      key={option}
                      className="flex items-center space-x-1 space-y-0 rounded-md border px-2"
                    >
                      <FormControl>
                        <RadioGroupItem
                          value={option}
                          id={option}
                          className="rounded-none"
                        />
                      </FormControl>
                      <Label htmlFor={option} className="cursor-pointer">
                        {capitalise(option)}
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
                  width={26}
                  height={26}
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <div className="column-layout">
          <CustomFormField
            name="insuranceProvider"
            label="Insurance Provider"
            placeholder="Cigna, Bupa"
            icon={<ShieldPlus size={16} />}
            control={form.control}
            formFieldType={FormFieldType.INPUT}
          />

          <CustomFormField
            name="insurancePolicyNumber"
            label="Insurance Policy Number"
            placeholder="UK123456789"
            icon={<ClipboardPlus size={16} />}
            control={form.control}
            formFieldType={FormFieldType.INPUT}
          />
        </div>

        <div className="column-layout">
          <CustomFormField
            name="allergies"
            label="Allergies (if applicable)"
            placeholder="Peanuts, Penicillin, Pollen"
            icon={<ClipboardPenLine size={16} />}
            control={form.control}
            formFieldType={FormFieldType.TEXTAREA}
          />

          <CustomFormField
            name="currentMedication"
            label="Current Medication (if applicable)"
            placeholder="Ibuprofen 200mg, Paracetamol 500mg"
            icon={<ClipboardPenLine size={16} />}
            control={form.control}
            formFieldType={FormFieldType.TEXTAREA}
          />
        </div>

        <div className="column-layout">
          <CustomFormField
            name="familyMedicalHistory"
            label="Family Medical History"
            placeholder="Diabetes, Heart disease"
            icon={<ClipboardPenLine size={16} />}
            control={form.control}
            formFieldType={FormFieldType.TEXTAREA}
          />

          <CustomFormField
            name="pastMedicalHistory"
            label="Past Medical History"
            placeholder="Appendectomy, Tonsillectomy"
            icon={<ClipboardPenLine size={16} />}
            control={form.control}
            formFieldType={FormFieldType.TEXTAREA}
          />
        </div>

        <section>
          <h2 className="h2">Identification and Verification</h2>
        </section>

        <CustomFormField
          name="identificationType"
          label="Identification Type"
          placeholder="Select an identification type"
          icon={<File size={16} />}
          control={form.control}
          formFieldType={FormFieldType.SELECT}
        >
          {IDENTIFICATION_TYPES.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          name="identificationNumber"
          label="Identification Number"
          placeholder="1234567890"
          icon={<FileDigit size={16} />}
          control={form.control}
          formFieldType={FormFieldType.INPUT}
        />

        <CustomFormField
          name="identificationDocument"
          label="Scanned Copy of Identification Document"
          icon={<FileInput size={16} />}
          control={form.control}
          formFieldType={FormFieldType.SKELETON}
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <section>
          <h2 className="h2">Consent and Privacy</h2>
        </section>

        <CustomFormField
          name="treatmentConsent"
          label="I consent to treatment"
          control={form.control}
          formFieldType={FormFieldType.CHECKBOX}
        />
        <CustomFormField
          name="disclosureConsent"
          label="I consent to Disclosure of Information"
          control={form.control}
          formFieldType={FormFieldType.CHECKBOX}
        />
        <CustomFormField
          name="privacyConsent"
          label="I consent to Privacy Policy"
          control={form.control}
          formFieldType={FormFieldType.CHECKBOX}
        />

        <SubmitButton className="w-full font-bold" isLoading={isLoading}>
          Continue
        </SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
