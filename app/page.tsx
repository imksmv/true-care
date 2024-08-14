import PatientForm from "@/layout/forms/PatientForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
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
            <h3 className="text-2xl font-semibold tracking-tight">True Care</h3>
          </div>

          <PatientForm />

          <div className="flex items-center justify-between text-sm">
            <span>{new Date().getFullYear()} &copy; All Rights Reserved</span>

            <Button asChild variant="link">
              <Link className="" href="/?admin=true">
                Control Panel
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative hidden h-full w-full lg:block">
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-tr from-primary/5 to-primary/15" />
          <Image
            priority
            className="h-full w-full object-cover"
            src="/onboarding.webp"
            alt="Hero"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
