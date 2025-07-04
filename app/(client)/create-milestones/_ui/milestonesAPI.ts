import { apiGet, apiPost, apiPut, apiDelete } from "@/api/baseApi";

export const fetchMilestones = async (jobId: number) => {
  const res = await apiGet(`/employer/jobs/${jobId}/milestones`);
  return res.data;
};

export const createMilestone = async (
  jobId: number,
  freelancerId: number,
  data: any
) => {
  return await apiPost(
    `/employer/jobs/${jobId}/milestones/${freelancerId}`,
    data
  );
};

export const updateMilestone = async (milestoneId: number, data: any) => {
  return await apiPut(`/employer/jobs/milestones/${milestoneId}`, data);
};

export const deleteMilestone = async (milestoneId: number) => {
  return await apiDelete(`/employer/jobs/milestones/${milestoneId}`);
};
