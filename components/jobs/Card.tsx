import Link from "next/link";

import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { IJob } from "@/types/jobs";

interface Props extends IJob {
  muted?: boolean;
}

export const Card = ({ id, slug, jobFormat, isApplied, body }: Props) => {
  const { company, title, logo, text } = body;

  return (
    <li className="flex h-full items-stretch">
      <Link
        href={ROUTES.job(slug)}
        id={`job-${id}`}
        className={cn(
          "flex flex-col gap-1 rounded-2xl px-8 py-8 transition",
          "hover:bg-secondary-50 transition-shadow hover:shadow-[0_0_0_2px_var(--color-primary-100)]"
        )}
      >
        <span className="heading-h3 font-rubik flex items-center">
          {logo && <img src={logo} alt={`${company} icon`} className="mr-2 inline-flex max-w-[24px]" />}
          {company}

          {isApplied && (
            <ul className="ml-auto flex shrink-0 flex-wrap gap-1">
              <li className={cn("bg-success-main rounded-md px-2 py-1 text-xs text-white")}>Заявка подана</li>
            </ul>
          )}
        </span>
        <h2 className="heading-h2 text-primary-700 mb-1 leading-tight">{title}</h2>
        <ul className="mb-2 flex flex-wrap gap-1">
          {jobFormat?.map((tag, index) => (
            <li key={index} className={cn("bg-accent-50 text-primary-700 rounded-md px-2 py-1 text-xs")}>
              {tag}
            </li>
          ))}
        </ul>

        <p className="line-clamp-4">{text}</p>

        <div className="mt-2 flex flex-wrap gap-2 text-xs text-neutral-900">
          <span>2 години тому</span>
          <span>16 переглядів</span>
        </div>
      </Link>
    </li>
  );
};
