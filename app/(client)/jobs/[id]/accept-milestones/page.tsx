"use client";
import AcceptMilestones from "./_ui/AcceptMilestones";
import { MilestoneProvider } from "./_ui/ContextMilestone";

export default function Page() {
  return (
    <MilestoneProvider>
      <AcceptMilestones />
    </MilestoneProvider>
  )
}
