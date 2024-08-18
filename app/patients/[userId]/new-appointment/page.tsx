import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import { SearchParamProps } from "@/lib/types/index.types";
import { SETTINGS } from "@/lib/web.config";
import Image from "next/image";

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  return (
    <section className="h-full">
      <div className="grid h-full grid-cols-1 lg:grid-cols-2">
        <div className="container flex max-w-[36rem] flex-col justify-center">
          <div className="flex items-center gap-2">
            <Image
              priority
              className="h-8 w-8"
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
            />
            <h3 className="text-2xl font-semibold tracking-tight">
              {SETTINGS.name}
            </h3>
          </div>

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />

          <span className="text-sm">
            {new Date().getFullYear()} &copy; All Rights Reserved
          </span>
        </div>

        <div className="relative hidden h-full w-full lg:block">
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-tr from-primary/5 to-primary/15" />
          <Image
            priority
            className="h-screen w-full object-cover"
            src="/appointment.webp"
            alt="Appointment"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </section>
  );
};

export default NewAppointment;
