import StatCard from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import ModeToggle from "@/components/ThemeToggle";
import { getRecentAppointmentsList } from "@/lib/actions/appointment.actions";
import { Appointment } from "@/lib/types/appwrite.types";
import { SETTINGS } from "@/lib/web.config";
import { CalendarCheck2, CalendarClock, CalendarX2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ControlPanel = async () => {
  const appointments = await getRecentAppointmentsList();

  return (
    <div className="max-w-10xl container flex flex-col space-y-14">
      <header className="flex w-full items-center justify-between rounded-b-xl px-8 py-3">
        <Link className="cursor-pointer" href="/">
          <div className="flex items-center gap-2">
            <Image
              priority
              className="h-8 w-8"
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
            />
            <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
              {SETTINGS.name}
            </h3>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <p className="text-base font-semibold md:text-lg">Control Panel</p>
          <ModeToggle />
        </div>
      </header>

      <main className="flex flex-col items-center space-y-6 px-4">
        <section className="w-full">
          <h1 className="text-3xl">Welcome!</h1>
          <p>Start the day with managing new appointments</p>
        </section>

        <section className="flex w-full flex-col justify-between gap-5 sm:flex-row">
          <StatCard
            type="appointments"
            count={appointments?.scheduledCount}
            label="Scheduled appointments"
            icon={<CalendarCheck2 size={28} />}
          />
          <StatCard
            type="pending"
            count={appointments?.pendingCount}
            label="Pending appointments"
            icon={<CalendarClock size={28} />}
          />
          <StatCard
            type="cancelled"
            count={appointments?.cancelledCount}
            label="Cancelled appointments"
            icon={<CalendarX2 size={28} />}
          />
        </section>

        <DataTable
          columns={columns}
          data={appointments?.documents as Appointment[]}
        />
      </main>
    </div>
  );
};

export default ControlPanel;
