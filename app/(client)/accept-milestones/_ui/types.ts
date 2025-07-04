// 📁 app/(client)/accept-milestones/_ui/types.ts
export type MilestoneStatus =
  | "pending"
  | "doing"
  | "done"
  | "rejected"
  | "unpaid";

export interface Milestone {
  milestoneId: number;
  content: string;
  startAt: string;
  endAt: string;
  percent: number;
  document: string;
  status: MilestoneStatus;
}
