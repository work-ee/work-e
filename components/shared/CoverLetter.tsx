import React from "react";

import { Textarea } from "../ui/shadcn/textarea";

export const CoverLetter = () => {
  return (
    <section className="section">
      <h3 className="heading-h3 neutral-900 mb-1">Мотиваційний лист</h3>
      <p className="text-micro neutral-900 mb-4">
        3-4 речення, що пояснюють, чому ви є ідеальним кандидатом на конкретну вакансію
      </p>
      <Textarea className="w-[920px] h-[241px] gap-3 pt-2.5 pr-8 pb-8 pl-8 rounded-lg border border-secondary-300 resize-none focus:outline-none active:outline-none text-primary-100" />
    </section>
  );
};
