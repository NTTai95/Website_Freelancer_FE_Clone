import { ResponseDetail } from "@/types/respones/detail";
import { apiGet } from "./baseApi";
import { EndPoint } from "./endpoint";
import { AxiosResponse } from "axios";

export const apiJobDetail = async (id: number): Promise<AxiosResponse<ResponseDetail.Job>> => {
    return await apiGet<ResponseDetail.Job>(EndPoint.Job.ID.replace('{id}', id.toString()));
};

export const apiSkillDetail = async (id: number): Promise<AxiosResponse<ResponseDetail.Skill>> => {
    return await apiGet<ResponseDetail.Skill>(EndPoint.Admin.Skill.ID.replace('{id}', id.toString()));
};

export const apiMajorDetail = async (id: number): Promise<AxiosResponse<ResponseDetail.Major>> => {
    return await apiGet<ResponseDetail.Major>(EndPoint.Admin.Major.ID.replace('{id}', id.toString()));
};

export const apiLanguageDetail = async (id: number): Promise<AxiosResponse<ResponseDetail.Language>> => {
    return await apiGet<ResponseDetail.Language>(EndPoint.Admin.Language.ID.replace('{id}', id.toString()));
};

export const apiRoleDetail = async (id: number): Promise<AxiosResponse<ResponseDetail.Role>> => {
    return await apiGet<ResponseDetail.Role>(EndPoint.Admin.Role.ID.replace('{id}', id.toString()));
};

export const apiStaffDetail = async (id: number): Promise<AxiosResponse<ResponseDetail.Staff>> => {
    return await apiGet<ResponseDetail.Staff>(EndPoint.Admin.Staff.ID.replace('{id}', id.toString()));
};