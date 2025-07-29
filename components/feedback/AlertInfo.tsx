"use client";

import { useCallback, useEffect } from "react";

import { Wallet } from "lucide-react";
import { toast } from "sonner";

import { Backdrop } from "@/components/feedback/Backdrop";

import { SpriteSvg } from "../icons/SpriteSvg";
import { Button } from "../ui";

interface Props {
  showOnMount?: boolean;
  backdrop?: boolean;
  title?: string;
  text?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const AlertInfo = ({
  showOnMount = false,
  title,
  text,
  buttonText,
  onButtonClick,
  backdrop = false,
}: Props): null => {
  const handleClick = useCallback(() => {
    toast.custom(
      (t) => (
        <>
          {backdrop && <Backdrop />}
          <div className="flex overflow-hidden rounded-2xl bg-white p-6 drop-shadow-lg transition-all hover:scale-[1.01]">
            <div className="relative">
              <button
                className="absolute right-0 mb-auto cursor-pointer p-1 transition-transform duration-200 ease-in-out hover:scale-110"
                onClick={() => toast.dismiss(t)}
              >
                <SpriteSvg id="icon-close" className="fill-primary-300 h-6 w-6" />
                <span className="sr-only">Close</span>
              </button>

              <b className="heading-h3 mb-4 flex pr-8">{title}</b>

              <p>{text}</p>

              <div className="mt-6 flex gap-6">
                <Button className="w-full justify-center" onClick={onButtonClick}>
                  <Wallet />
                  <span>{buttonText}</span>
                </Button>
              </div>
            </div>
          </div>
        </>
      ),
      { duration: Infinity, style: { width: "420px" } }
    );
  }, [backdrop, buttonText, onButtonClick, text, title]);

  useEffect(() => {
    if (showOnMount) {
      const timer = setTimeout(handleClick, 300);
      return () => clearTimeout(timer);
    }
  }, [showOnMount, handleClick]);

  return null;
};
