export interface JobProps {
  id: number;
  company: string;
  title: string;
  logo: string;
  body: {
    isApplied?: boolean;
    tags?: string[];
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
