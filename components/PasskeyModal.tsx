"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { encryptPasskey } from "@/lib/utils";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PasskeyModal = () => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (passkey === process.env.NEXT_PUBLIC_CONTORL_PANEL_PASSKEY) {
      const encryptedPasskey = encryptPasskey(passkey);

      localStorage.setItem("accessKey", encryptedPasskey);

      setOpen(false);
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };

  const closeModal = () => {
    setOpen(false);
    router.push("/");
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            Access Verification
            <X
              className="cursor-pointer hover:text-muted-foreground"
              onClick={closeModal}
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the control panel, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPasskey(value)}
          >
            <InputOTPGroup className="flex w-full justify-between">
              <InputOTPSlot
                className="flex size-16 justify-center gap-4 rounded-lg border text-4xl font-bold"
                index={0}
              />
              <InputOTPSlot
                className="flex size-16 justify-center gap-4 rounded-lg border text-4xl font-bold"
                index={1}
              />
              <InputOTPSlot
                className="flex size-16 justify-center gap-4 rounded-lg border text-4xl font-bold"
                index={2}
              />
              <InputOTPSlot
                className="flex size-16 justify-center gap-4 rounded-lg border text-4xl font-bold"
                index={3}
              />
              <InputOTPSlot
                className="flex size-16 justify-center gap-4 rounded-lg border text-4xl font-bold"
                index={4}
              />
              <InputOTPSlot
                className="flex size-16 justify-center gap-4 rounded-lg border text-4xl font-bold"
                index={5}
              />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="flex items-center justify-center text-destructive">
              {error}
            </p>
          )}
        </>

        <AlertDialogFooter>
          <AlertDialogAction
            onClick={(e) => validatePasskey(e)}
            className="w-full"
          >
            Enter Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasskeyModal;
