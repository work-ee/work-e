import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { ModalAlertDelProfile } from "@/components/feedback";
import { Button } from "@/components/ui";

interface ProfileActionsProps {
  isPending: boolean;
  message: { type: "success" | "error"; text: string } | null;
}
export function ProfileActions({ isPending, message }: ProfileActionsProps) {
  return (
    <div className="relative mt-4 flex items-center justify-between gap-4">
      <Button disabled={isPending}>{isPending ? "Збереження..." : "Зберегти зміни"}</Button>

      {message && (
        <div
          className={`rounded-md p-4 ${message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
        >
          {message.text}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <button
          type="button"
          aria-label="Війти з акаунта"
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
