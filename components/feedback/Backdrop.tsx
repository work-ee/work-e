"use client";

import { useEffect, useState } from "react";

import { clsx } from "clsx";
import { createPortal } from "react-dom";

export const Backdrop = () => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timeout = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className={clsx("fixed inset-0 z-[9998] bg-black transition duration-300", visible ? "opacity-50" : "opacity-0")}
      aria-hidden="true"
    />,
    document.body
  );
};
