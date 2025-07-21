import React from "react";

import clsx from "clsx";

import { ArrowRightSvg } from "@/components/icons";

import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLLIElement> {
  header: string;
  title: string;
  body: {
    tags?: string[];
    text?: string;
  };
  muted?: boolean;
}

interface CardListProps extends React.HTMLAttributes<HTMLUListElement> {
  length?: number;
  cardData?: CardProps[];
  children?: React.ReactNode;
  moreBtn?: boolean;
  muted?: boolean;
  onClick?: React.MouseEventHandler<HTMLUListElement>;
}

const tempData = [
  {
    header: "Genesis",
    title: "UX/UI Designer",
    body: {
      tags: ["Віддалено", "Віддалено", "Віддалено", "Віддалено", "Часткова зайнятість"],
      text: "Impedit suscipit iste est ut quod. Voluptas et fugit ducimus ut veniam in perferendis voluptas a. Quidem labore occaecati ipsum similique. Rerum voluptatem sit fugiat optio aliquam.",
    },
  },
  {
    header: "Hue",
    title: "UX/UI Designer",
    body: {
      tags: ["Віддалено", "Повна зайнятість"],
      text: "Impedit suscipit iste est ut quod. Voluptas et fugit ducimus ut veniam in perferendis voluptas a. Quidem labore occaecati ipsum similique. Rerum voluptatem sit fugiat optio aliquam.",
    },
  },
  {
    header: "Sigma Software",
    title: "Software Engineer",
    body: {
      tags: ["Віддалено", "Повна зайнятість"],
      text: "Impedit suscipit iste est ut quod. Voluptas et fugit ducimus ut veniam in perferendis voluptas a. Quidem labore occaecati ipsum similique. Rerum voluptatem sit fugiat optio aliquam.",
    },
  },
  {
    header: "SoftServe",
    title: "Dev Ops Engineer",
    body: {
      tags: ["Віддалено", "Повна зайнятість"],
      text: "Impedit suscipit iste est ut quod. Voluptas et fugit ducimus ut veniam in perferendis voluptas a. Quidem labore occaecati ipsum similique. Rerum voluptatem sit fugiat optio aliquam.",
    },
  },
];

const Card = ({ title, header, body, muted = false }: CardProps) => {
  return (
    <li className="flex h-full items-stretch">
      <a
        href="#"
        className={cn(
          "text-primary-700 bg-secondary-50 flex flex-col gap-1 rounded-2xl px-4 py-6 transition",
          muted ? "pointer-events-none blur-xs select-none" : "hover:shadow-md"
        )}
      >
        <span className="heading-h3 font-rubik">{header}</span>
        <h2 className="heading-h2 text-primary-700 leading-tight">{title}</h2>
        <div className="mb-2 flex flex-wrap gap-1">
          {body?.tags?.map((tag, index) => (
            <span key={index} className={clsx("bg-primary-50 text-primary-700 rounded-full px-2 py-1 text-xs")}>
              {tag}
            </span>
          ))}
        </div>
        <p>{body?.text}</p>
      </a>
    </li>
  );
};

export const CardList = ({
  length = 3,
  muted = false,
  moreBtn = false,
  cardData = tempData,
  ...props
}: CardListProps) => {
  return (
    <>
      <ul className={cn("grid grid-cols-3 gap-4 text-left", props.className)}>
        {cardData.slice(0, length).map((item, index) => (
          <Card key={index} header={item.header} title={item.title} body={item.body} muted={muted} />
        ))}
        {length === 0 && <li className="text-center text-gray-500">No cards available...</li>}
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
