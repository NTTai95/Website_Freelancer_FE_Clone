import { AxiosResponse } from "axios";
import { apiPut } from "./baseApi";
import { EndPoint } from "./endpoint";
import { RequestForm } from "@/types/requests/form";

export const updateSkill = async (id: number, data: RequestForm.Skill): Promise<AxiosResponse<void>> => {
    return await apiPut<void>(EndPoint.Admin.Skill.ID.replace("{id}", id.toString()), data);
};

export const updateMajor = async (id: number, data: RequestForm.Major): Promise<AxiosResponse<void>> => {
    return await apiPut<void>(EndPoint.Admin.Major.ID.replace("{id}", id.toString()), data);
};

export const updateLanguage = async (id: number, data: RequestForm.Language): Promise<AxiosResponse<void>> => {
    return await apiPut<void>(EndPoint.Admin.Language.ID.replace("{id}", id.toString()), data);
};

export const updateRole = async (id: number, data: RequestForm.Role): Promise<AxiosResponse<void>> => {
    return await apiPut<void>(EndPoint.Admin.Role.ID.replace("{id}", id.toString()), data);
};

export const updateJobStep1 = async (id: number, data: RequestForm.JobStep1): Promise<AxiosResponse<void>> => {
    return await apiPut<void>(EndPoint.Job.Step1.ID.replace("{id}", id.toString()), data);
};

export const updateJobStep2 = async (id: number, data: RequestForm.JobStep2): Promise<AxiosResponse<void>> => {
    return await apiPut<void>(EndPoint.Job.Step2.ID.replace("{id}", id.toString()), data);
};

export const updateJobStep3 = async (id: number, data: RequestForm.JobStep3): Promise<AxiosResponse<void>> => {
    return await apiPut<void>(EndPoint.Job.Step3.ID.replace("{id}", id.toString()), data);
};

export const updateJobStep4 = async (id: number, data: RequestForm.JobStep4): Promise<AxiosResponse<void>> => {
    return await apiPut<void>(EndPoint.Job.Step4.ID.replace("{id}", id.toString()), data);
};
