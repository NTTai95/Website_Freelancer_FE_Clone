// apis/createApis.ts

import { AxiosResponse } from "axios";
import { apiPost } from "./baseApi";
import { EndPoint } from "./endpoint";
import { RequestForm } from "@/types/requests/form";

// Trả về void vì backend dùng ResponseEntity.noContent()

export const createMajor = async (data: RequestForm.Major) => {
    return await apiPost<void>(EndPoint.Admin.Major.BASE, data);
};

export const createSkill = async (data: RequestForm.Skill): Promise<AxiosResponse<void>> => {
    return await apiPost<void>(EndPoint.Admin.Skill.BASE, data);
};

export const createLanguage = async (data: RequestForm.Language): Promise<AxiosResponse<void>> => {
    return await apiPost<void>(EndPoint.Admin.Language.BASE, data);
};

export const createRole = async (data: RequestForm.Role): Promise<AxiosResponse<void>> => {
    return await apiPost<void>(EndPoint.Admin.Role.BASE, data);
};

export const createJob = async (data: RequestForm.JobStep1): Promise<AxiosResponse<void>> => {
    return await apiPost<void>(EndPoint.Job.BASE, data);
};
