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
    <li className="h-full flex items-stretch">
      <a
        href="#"
        className={cn(
          "flex flex-col gap-1 px-4 py-6 rounded-2xl text-primary-700 bg-secondary-50 transition",
          muted ? "blur-xs select-none pointer-events-none" : "hover:shadow-md"
        )}
      >
        <span className="heading-h3 font-rubik">{header}</span>
        <h2 className="heading-h2 text-primary-700 leading-tight">{title}</h2>
        <div className="flex gap-1 mb-2 flex-wrap">
          {body?.tags?.map((tag, index) => (
            <span key={index} className={clsx("px-2 py-1 text-xs rounded-full bg-primary-50 text-primary-700")}>
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
        <div className="flex items-center ml-4 cursor-pointer hover:bg-secondary-50 rounded-2xl transition px-4 py-6">
          <a href="#">
            <ArrowRightSvg />
          </a>
        </div>
      )}
    </>
  );
};
