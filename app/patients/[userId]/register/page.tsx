import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import { SearchParamProps, User } from "@/lib/types/index.types";
import { SETTINGS } from "@/lib/web.config";
import Image from "next/image";

const RegisterPage = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  return (
    <section className="h-full">
      <div className="grid h-full grid-cols-1 lg:grid-cols-2">
        <div className="container flex max-w-[36rem] flex-col justify-center">
          <div className="mt-4 flex items-center gap-2">
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

          <RegisterForm user={user as User} />

          <span className="mb-4 text-sm">
            {new Date().getFullYear()} &copy; All Rights Reserved
          </span>
        </div>

        <div className="relative hidden h-full w-full lg:block">
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-tr from-primary/5 to-primary/15" />
          <Image
            priority
            className="h-full w-full object-cover"
            src="/register.webp"
            alt="Register"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
