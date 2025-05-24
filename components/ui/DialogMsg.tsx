"use client";

import { useEffect } from "react";

import { toast } from "sonner";

interface Props {
  showOnMount?: boolean;
}

export const DialogMsg = ({ showOnMount = false }: Props): null => {
  const handleClick = () => {
    toast.custom(
      (t) => (
        <div className="bg-white flex rounded-2xl overflow-hidden shadow-[0px_0px_4px_2px_var(--color-neutral-200)] p-6">
          <div>
            <b className="mb-2 flex">Додайте Linkedin</b>
            <p>
              Без Linkedin нам важко зрозуміти твій досвід. Додай його, коли будеш готовий — це відкриє більше
              релевантних вакансій!
            </p>

            <div className="flex gap-6 mt-4 text-xl">
              <a href="#" className="p-2 flex underline underline-offset-2">
                <b>Linkedln</b>
              </a>
              <a href="#" className="p-2 flex">
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
      ),
      { duration: Infinity }
    );
  };

  useEffect(() => {
    if (showOnMount) {
      const timer = setTimeout(handleClick, 300);
      return () => clearTimeout(timer);
    }
  }, [showOnMount]);

  return null;

  // return (
  //   <Button onClick={handleClick} variant="secondary">
  //     Показати повідомлення
  //   </Button>
  // );
};
