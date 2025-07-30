import { Wallet } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";

import { MagicSvg } from "../icons";
import { Button } from "../ui";

export function ModalCheckSkills() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button className="mt-6 justify-center">
          <Mail />
          Подати заявку
        </Button> */}
        <Button className="btn-sm">
          <MagicSvg />
          <span>Порівняти навички</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-2xl bg-white transition-all hover:scale-[1.01] sm:max-w-lg">
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
            className="btn-sm justify-center sm:w-auto"
          >
            Порівняти
          </Button>

          <Button onClick={() => alert('Done "Оформити передплату"')} className="btn-sm justify-center sm:w-auto">
            <Wallet />
            <span>Оформити передплату</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
