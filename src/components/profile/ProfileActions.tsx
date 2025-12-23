"use client";

import { useEffect } from "react";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useFormStatus } from "react-dom";

import { ModalAlertDelProfile } from "@/components/feedback";
import { Button } from "@/components/ui";

import { cn } from "@/lib/utils";

interface ProfileActionsProps {
  message: { type: "success" | "error"; text: string } | null;
  setMessage: React.Dispatch<React.SetStateAction<{ type: "success" | "error"; text: string } | null>>;
}
export function ProfileActions({ message, setMessage }: ProfileActionsProps) {
  const { pending } = useFormStatus();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  return (
    <div className="relative mt-4 flex items-center justify-between gap-4">
      <Button disabled={pending}>{pending ? "Збереження..." : "Зберегти зміни"}</Button>

      {message && (
        <div
          className={cn(
            "rounded-md p-4 transition-all duration-300",
            message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
          )}
          style={{
            opacity: message ? 1 : 0,
          }}
        >
          {message.text}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <button
          type="button"
          aria-label="Sign out"
          className="input-text text-primary-500 flex cursor-pointer items-center gap-1 p-1"
          onClick={() => signOut({ callbackUrl: "/sign-in" })}
        >
          <LogOut className="h-4 w-4" />
          <span>Вийти з акаунта</span>
        </button>

        <ModalAlertDelProfile />
      </div>
    </div>
  );
}
