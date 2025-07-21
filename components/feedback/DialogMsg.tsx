"use client";

import React from "react";

import { toast } from "sonner";

import { Backdrop } from "@/components/feedback/Backdrop";

interface Props {
  showOnMount?: boolean;
  backdrop?: boolean;
}

export const DialogMsg = ({ showOnMount = false, backdrop = false }: Props): null => {
  const handleClick = React.useCallback(() => {
    toast.custom(
      (t) => (
        <>
          {backdrop && <Backdrop />}
          <div className="flex overflow-hidden rounded-2xl bg-white p-6 shadow-[0px_0px_2px_1px_var(--color-neutral-200)]">
            <div>
              <b className="mb-2 flex text-xl">Додайте Linkedin</b>
              <p>
                Без Linkedin нам важко зрозуміти твій досвід. Додай його, коли будеш готовий — це відкриє більше
                релевантних вакансій!
              </p>

              <div className="mt-4 flex gap-6 text-xl">
                <a href="#" className="flex p-2 underline underline-offset-2">
                  <b>Linkedln</b>
                </a>
                <a href="#" className="flex p-2">
                  <b>Немає LinkedIn</b>
                </a>
              </div>
            </div>

            <button className="mb-auto cursor-pointer p-2" onClick={() => toast.dismiss(t)}>
              <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.9 14L0.5 12.6L6.1 7L0.5 1.4L1.9 0L7.5 5.6L13.1 0L14.5 1.4L8.9 7L14.5 12.6L13.1 14L7.5 8.4L1.9 14Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
        </>
      ),
      { duration: Infinity }
    );
  }, [backdrop]);

  React.useEffect(() => {
    if (showOnMount) {
      const timer = setTimeout(handleClick, 300);
      return () => clearTimeout(timer);
    }
  }, [showOnMount, handleClick]);

  return null;
};
