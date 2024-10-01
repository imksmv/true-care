import StatCard from "@/components/StatCard";
import { SETTINGS } from "@/lib/web.config";
import { CalendarCheck2, CalendarClock, CalendarX2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ControlPanel = () => {
  return (
    <div className="container flex max-w-7xl flex-col space-y-14">
      <header className="sticky z-20 flex items-center justify-between rounded-b-xl bg-secondary px-12 py-5">
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
            <h3 className="text-2xl font-semibold tracking-tight">
              {SETTINGS.name}
            </h3>
          </div>
        </Link>

        <p className="text-lg font-semibold">Control Panel</p>
      </header>

      <main className="flex flex-col items-center space-y-6 px-4">
        <section className="w-full">
          <h1 className="text-3xl">Welcome!</h1>
          <p>Start the day with managing new appointments</p>
        </section>

        <section className="flex w-full flex-col justify-between gap-5 sm:flex-row">
          <StatCard
            type="appointments"
            count={5}
            label="Scheduled appointments"
            icon={<CalendarCheck2 size={28} />}
          />
          <StatCard
            type="pending"
            count={10}
            label="Pending appointments"
            icon={<CalendarClock size={28} />}
          />
          <StatCard
            type="cancelled"
            count={2}
            label="Cancelled appointments"
            icon={<CalendarX2 size={28} />}
          />
        </section>
      </main>
    </div>
  );
};

export default ControlPanel;
