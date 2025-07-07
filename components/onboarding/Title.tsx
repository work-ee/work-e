import React from "react";

export const Title = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div>
      <h1 className="heading-h1 mb-4">{title}</h1>
      <div className="max-w-[990px] mx-auto mb-12">
        <p className="text-xl font-black mb-4">{subtitle}</p>
      </div>
    </div>
  );
};
