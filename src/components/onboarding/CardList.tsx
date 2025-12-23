import Link from "next/link";

import { ArrowRightSvg } from "@/components/icons";

import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { IJobList } from "@/types/jobs";

import { Card } from "./Card";

export const CardList = ({ length = 3, muted = false, moreBtn = false, data = [], ...props }: IJobList) => {
  return (
    <div className="mt-12 flex items-stretch">
      <ul className={cn("grid grid-cols-3 gap-4 text-left", props.className)}>
        {data.slice(0, length).map((item) => (
          <Card key={item.id} id={item.id} slug={item.slug} body={item.body} muted={muted} jobFormat={item.jobFormat} />
        ))}

        {length === 0 && <li className="text-center text-gray-500">No cards available...</li>}
      </ul>

      {moreBtn && (
        <Link
          href={ROUTES.jobs}
          className="hover:bg-secondary-50 ml-4 flex cursor-pointer items-center rounded-2xl px-4 py-6 transition-shadow hover:shadow-[0_0_0_2px_var(--color-primary-100)]"
        >
          <ArrowRightSvg />
        </Link>
      )}
    </div>
  );
};
