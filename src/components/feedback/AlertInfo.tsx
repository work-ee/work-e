"use client";

import { useCallback, useEffect } from "react";

import { Wallet } from "lucide-react";
import { toast } from "sonner";

import { Backdrop } from "@/components/feedback/Backdrop";
import { SpriteSvg } from "@/components/icons/SpriteSvg";
import { Button } from "@/components/ui";

interface Props {
  showOnMount?: boolean;
  backdrop?: boolean;
  title?: string;
  text?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  onClose?: () => void;
}

export const AlertInfo = ({
  showOnMount = false,
  title,
  text,
  buttonText,
  onButtonClick,
  onClose,
  backdrop = false,
}: Props): null => {
  const handleClick = useCallback(() => {
    toast.custom(
      (t) => (
        <>
          {backdrop && <Backdrop />}
          <div className="relative flex rounded-2xl bg-white p-6 drop-shadow-lg transition-all hover:scale-[1.01]">
            <button
              className="absolute top-5 right-5 mb-auto cursor-pointer rounded-xs p-1 opacity-70 transition-all duration-200 ease-in-out hover:scale-110 hover:opacity-100 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-8"
              onClick={() => {
                toast.dismiss(t);
                onClose?.();
              }}
            >
              <SpriteSvg id="icon-close" className="fill-primary-300" />
              <span className="sr-only">Close</span>
            </button>

            <div className="flex flex-col gap-4">
              <b className="heading-h3 flex pr-8">{title}</b>

              <p>{text}</p>

              <div className="mt-2 flex flex-wrap gap-2">
                <Button
                  className="w-full justify-center"
                  onClick={() => {
                    toast.dismiss(t);
                    onButtonClick?.();
                    onClose?.();
                  }}
                >
                  <Wallet />
                  <span>{buttonText}</span>
                </Button>
              </div>
            </div>
          </div>
        </>
      ),
      { duration: Infinity, style: { maxWidth: "420px" } }
    );
  }, [title, text, buttonText, onButtonClick, onClose, backdrop]);

  useEffect(() => {
    if (showOnMount) {
      const timer = setTimeout(handleClick, 300);
      return () => clearTimeout(timer);
    }
  }, [showOnMount, handleClick]);

  return null;
};
