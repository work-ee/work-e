export interface JobProps {
  id: number;
  slug: string;
  isApplied?: boolean;
  tags?: string[];
  body: {
    company: string;
    title: string;
    logo: string;
    text?: string;
  };
}

export interface JobListProps extends React.HTMLAttributes<HTMLUListElement> {
  length?: number;
  children?: React.ReactNode;
  moreBtn?: boolean;
  muted?: boolean;
  data?: JobProps[];
  onClick?: React.MouseEventHandler<HTMLUListElement>;
}
