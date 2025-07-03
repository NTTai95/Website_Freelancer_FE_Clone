import { AxiosResponse } from "axios";
import { EndPoint } from "./endpoint";
import { ResponseDetail } from "@/types/respones/detail";
import { apiGet, apiPatch } from "./baseApi";

export const apiJobDetail = async (id: number): Promise<AxiosResponse<ResponseDetail.Job>> => {
    return await apiGet<ResponseDetail.Job>(EndPoint.Job.PUBLIC.replace('{id}', id.toString()));
};

export const apiJobApplies = async (jobId: number): Promise<ResponseDetail.JobApplies> => {
  const response = await apiGet<ResponseDetail.JobApplies>(`/jobs/${jobId}/applies`);
  return response.data;
};

export const apiSelectFreelancer = async (jobId: number, applyId: number): Promise<ResponseDetail.SelectFreelancerResponse> => {
  const response = await apiPatch<ResponseDetail.SelectFreelancerResponse>(`/jobs/${jobId}/select-freelancer/${applyId}`);
  return response.data;
};

export const apiRejectApply = async (jobId: number, applyId: number): Promise<void> => {
  await apiPatch(`/jobs/${jobId}/reject-apply/${applyId}`);
};

export const apiMilestoneDetail = async (jobId: number, milestoneId: number): Promise<ResponseDetail.MilestoneDetailResponse> => {
  const response = await apiGet<ResponseDetail.MilestoneDetailResponse>(`/jobs/${jobId}/milestones/${milestoneId}`);
  return response.data;
};

export const apiJobMilestones = async (jobId: number): Promise<ResponseDetail.MilestoneListResponse> => {
  const response = await apiGet<ResponseDetail.MilestoneListResponse>(`/jobs/${jobId}/milestones`);
  return response.data;
};