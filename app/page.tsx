import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
  return (
    <section>
      <div className="grid h-screen grid-cols-1 lg:grid-cols-2">
        <div className="container flex max-w-[36rem] flex-col justify-center">
          <div className="flex items-center gap-2">
            <Image
              className="h-8 w-8"
              src="/logo.png"
              alt="Logo"
              width={1000}
              height={1000}
            />
            <h3 className="text-xl font-semibold tracking-tight">True Care</h3>
          </div>

          {/* TODO: Forms */}

          <div className="flex items-center justify-between text-sm">
            <span>{new Date().getFullYear()} &copy; All Rights Reserved</span>

            <Button asChild variant="link">
              <Link className="" href="/?admin=true">
                Control Panel Access
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative hidden h-full w-full lg:block">
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-tr from-primary/15 to-primary/25" />
          <Image
            priority
            className="h-full w-full object-cover"
            src="/hero.webp"
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
