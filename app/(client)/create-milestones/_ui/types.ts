export interface EmloyerMilestones {
  milestoneId?: number;
  content: string;
  startAt: string;
  endAt: string;
  percent: number;
  document: string;
  status?: string;
  disputed?: boolean;
  isOverdue?: boolean;
  amount?: number;
}
