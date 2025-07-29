type JobFormat = "full-time" | "part-time" | "contract" | "internship" | "remote" | "on-site";

interface IJobBody {
  company: string;
  title: string;
  text: string;
  logo: string;
  url?: string;
  location?: string;
  salary?: string;
}

export interface IJob {
  id: number;
  slug: string;
  body: IJobBody;
  isApplied?: boolean;
  postedAt?: string;
  jobFormat?: JobFormat[];
  type?: string[];
}

export interface IJobList extends React.HTMLAttributes<HTMLUListElement> {
  length?: number;
  children?: React.ReactNode;
  moreBtn?: boolean;
  muted?: boolean;
  data?: IJob[];
  onListClick?: React.MouseEventHandler<HTMLUListElement>;
}
