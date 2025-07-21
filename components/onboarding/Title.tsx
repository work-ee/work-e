import React from "react";

export const Title = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div>
      <h1 className="heading-h1 mb-4">{title}</h1>
      <div className="mx-auto mb-12 max-w-[990px]">
        <p className="mb-4 text-xl font-black">{subtitle}</p>
      </div>
    </div>
  );
};
