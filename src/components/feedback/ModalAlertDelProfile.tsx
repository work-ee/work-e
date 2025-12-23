import { Trash } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/shadcn/alert-dialog";

export const ModalAlertDelProfile = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button type="button" className="input-text text-error-main flex cursor-pointer items-center gap-1 p-1">
          <Trash className="h-4 w-4" />
          <span>Видалити акаунт</span>
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-2xl bg-white transition-all hover:scale-[1.01] sm:max-w-sm">
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle className="text-error-main heading-h3 text-center">Видалити акаунт?</AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base text-neutral-800">
            Ви дійсно хочете видалити свій акаунт?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel asChild className="h-13 flex-1 text-xl hover:bg-inherit">
            <Button variant="secondary">Ні</Button>
          </AlertDialogCancel>
          <AlertDialogAction
            asChild
            className="h-13 flex-1 border-red-800 bg-red-500 text-xl hover:border-red-800 hover:bg-red-600"
          >
            <Button onClick={() => alert('Done "ВИДАЛЕН"')}>Так</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
