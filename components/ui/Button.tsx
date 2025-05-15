import React from "react";

export const Button = ({ children }: { children: React.ReactNode }) => {
  return <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white">{children}</button>;
};
