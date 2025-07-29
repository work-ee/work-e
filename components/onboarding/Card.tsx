import Link from "next/link";

import { cn } from "@/lib/utils";

import { IJob } from "@/types/jobs";

interface Props extends IJob {
  muted?: boolean;
}

export const Card = ({ body, muted = false, slug, jobFormat }: Props) => {
  const { company, title: title, text } = body;

  return (
    <li className="flex h-full items-stretch">
      <Link
        href={`/jobs/${slug}`}
        className={cn(
          "bg-secondary-50 flex flex-col gap-1 rounded-2xl px-4 py-6 transition",
          muted
            ? "pointer-events-none blur-xs select-none"
            : "transition-shadow hover:shadow-[0_0_0_2px_var(--color-primary-100)]"
        )}
      >
        <span className="heading-h3 font-rubik">{company}</span>
        <h2 className="heading-h2 text-primary-700 leading-tight">{title}</h2>
        <div className="mb-2 flex flex-wrap gap-1">
          {jobFormat?.map((tag, index) => (
            <span key={index} className={cn("bg-accent-50 text-primary-700 rounded-full px-2 py-1 text-xs")}>
              {tag}
            </span>
          ))}
        </div>

        <p className="line-clamp-5">{text}</p>
      </Link>
    </li>
  );
};
