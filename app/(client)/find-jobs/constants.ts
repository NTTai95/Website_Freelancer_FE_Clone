export interface Job {
  id: string;
  avatar: string;
  posterName: string;
  title: string;
  description: string;
  skills: string[];
  budget: number;
  duration: string;
  deadline: string;
  applicants: number;
  postedDate: string;
}

export interface JobFilters {
  skills: string[];
  fields: string[];
  maxDuration: number | null;
  budget?: [number, number];
}

export interface JobCardProps {
  job: Job;
  highlight: string;
}

export interface SidebarFilterProps {
  onFilterChange: (filters: {
    skills: string[];
    fields: string[];
    maxDuration: number | null;
    budget?: [number, number];
  }) => void;
}
