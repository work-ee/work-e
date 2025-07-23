import React from "react";

import { ArrowRightSvg } from "@/components/icons";

import { cn } from "@/lib/utils";

import { JobListProps } from "@/types/jobs";

import { Card } from "./Card";

export const CardList = ({ length = 6, muted = false, moreBtn = false, data, ...props }: JobListProps) => {
  return (
    <>
      <ul className={cn("grid grid-cols-3 gap-4 text-left", props.className)} {...props}>
        {data?.slice(0, length).map((item) => (
          <Card
            key={item.id}
            id={item.id}
            company={item.company}
            title={item.title}
            logo={item.logo}
            body={item.body}
            muted={muted}
          />
        ))}
      </ul>

      {moreBtn && (
        <div className="hover:bg-secondary-50 ml-4 flex cursor-pointer items-center rounded-2xl px-4 py-6 transition">
          <a href="#">
            <ArrowRightSvg />
          </a>
        </div>
      )}
    </>
  );
};
