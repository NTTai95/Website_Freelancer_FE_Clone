// 📁 app/(client)/accept-milestones/_ui/milestoneApi.ts
import { apiGet, apiPut } from "@/api/baseApi";

export async function fetchMilestones(jobId: number) {
  const res = await apiGet(`/freelancer/milestones/job/${jobId}`);
  return res.data;
}

export async function respondToMilestone(milestoneId: number, accepted: boolean) {
  return apiPut(`/freelancer/milestones/${milestoneId}/response`, { accepted });
}

export async function respondToMultipleMilestones(milestoneIds: number[], accepted: boolean) {
  return Promise.all(
    milestoneIds.map((id) =>
      apiPut(`/freelancer/milestones/${id}/response`, { accepted })
    )
  );
}
