import { AxiosResponse } from "axios";
import { apiPatch } from "./baseApi";
import { EndPoint } from "./endpoint";

export const activeSkill = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiPatch<void>(EndPoint.Admin.Skill.ACTIVE.replace('{id}', id.toString()));
}

export const activeMajor = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiPatch<void>(EndPoint.Admin.Major.ACTIVE.replace('{id}', id.toString()));
}

export const activeLanguage = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiPatch<void>(EndPoint.Admin.Language.ACTIVE.replace('{id}', id.toString()));
}

export const postPublicJob = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiPatch<void>(EndPoint.Job.POST_PUBLIC.replace('{id}', id.toString()));
}

export const postPrivateJob = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiPatch<void>(EndPoint.Job.POST_PRIVATE.replace('{id}', id.toString()));
}