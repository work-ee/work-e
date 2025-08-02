import { Wallet } from "lucide-react";

import { MagicSvg } from "@/components/icons";
import { Button } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";

export const ModalCheckSkills = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="btn-sm w-full">
          <MagicSvg />
          <span>Порівняти навички</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-2xl bg-white p-8 transition-all hover:scale-[1.01] sm:max-w-xl">
        <DialogHeader className="gap-4">
          <DialogTitle className="flex pr-8">Доступно лише 3 перевірки</DialogTitle>
          <DialogDescription>
            Функція перевірки доступна лише тричі в безкоштовній версії. Щоб користуватись без обмежень — активуй
            передплату.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-2">
          <Button
            onClick={() => alert('Done "Порівняти"')}
            variant="secondary"
            className="btn-sm w-full min-w-fit justify-center"
          >
            Порівняти
          </Button>

          <Button
            onClick={() => alert('Done "Оформити передплату"')}
            className="btn-sm w-full min-w-fit justify-center"
          >
            <Wallet />
            <span>Оформити передплату</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
