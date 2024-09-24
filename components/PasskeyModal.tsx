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
import { decryptPasskey, encryptPasskey } from "@/lib/utils";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PasskeyModal = () => {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(true);
  const [enteredKey, setEnteredKey] = useState("");
  const [error, setError] = useState("");

  const encryptedPasskey = localStorage.getItem("accessKey");

  useEffect(() => {
    const encryptedKey = encryptedPasskey && decryptPasskey(encryptedPasskey);

    if (path) {
      if (encryptedKey === process.env.NEXT_PUBLIC_CONTORL_PANEL_PASSKEY) {
        setOpen(false);
        router.push("/control-panel");
      } else {
        setOpen(true);
      }
    }
  }, [encryptedPasskey]);

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (enteredKey === process.env.NEXT_PUBLIC_CONTORL_PANEL_PASSKEY) {
      const encryptedPasskey = encryptPasskey(enteredKey);

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
            value={enteredKey}
            onChange={(value) => setEnteredKey(value)}
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
