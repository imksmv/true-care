import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { DOCTORS } from "@/lib/constans";
import { SearchParamProps } from "@/lib/types/index.types";
import { SETTINGS } from "@/lib/web.config";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Success = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const doctor = DOCTORS.find(
    (doc) => doc.name === appointment?.primaryPhysician,
  );

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <section className="flex items-center gap-2">
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
      </section>

      <section className="my-4 flex flex-col items-center justify-center">
        <h2 className="max-w-80 text-center text-2xl font-semibold tracking-tight">
          Your <span className="text-primary">appointment request</span> has
          been successfully submitted!
        </h2>

        <p className="mt-2 text-center text-sm text-muted-foreground">
          We will review your request and get back to you as soon as possible.
        </p>
      </section>

      <Separator className="my-4 w-[40rem]" />

      <section className="flex items-center gap-8">
        <p>Requested Details:</p>

        <div className="flex items-center gap-2">
          <Image src={doctor?.image!} alt={"Doctor"} width={30} height={30} />
          <p>Dr. {doctor?.name}</p>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={20} />
          <p>{format(new Date(appointment?.schedule), "PPP HH:mm")}</p>
        </div>
      </section>

      <Separator className="my-4 w-[40rem]" />

      <Button asChild>
        <Link href={`/patients/${userId}/new-appointment`}>
          New Appointment
        </Link>
      </Button>

      <span className="mb-4 mt-4 text-sm text-muted-foreground">
        {new Date().getFullYear()} &copy; All Rights Reserved
      </span>
    </div>
  );
};

export default Success;
