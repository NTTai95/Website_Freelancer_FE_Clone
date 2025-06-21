import { AxiosResponse } from "axios";
import { apiPatch } from "./baseApi";
import { EndPoint } from "./endpoint";

export const apiActiveSkill = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiPatch<void>(EndPoint.Admin.Skill.ACTIVE.replace('{id}', id.toString()));
}

export const apiActiveMajor = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiPatch<void>(EndPoint.Admin.Major.ACTIVE.replace('{id}', id.toString()));
}

export const apiActiveLanguage = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiPatch<void>(EndPoint.Admin.Language.ACTIVE.replace('{id}', id.toString()));
}

export const apiPostPublicJob = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiPatch<void>(EndPoint.Job.POST_PUBLIC.replace('{id}', id.toString()));
}

export const apiPostPrivateJob = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiPatch<void>(EndPoint.Job.POST_PRIVATE.replace('{id}', id.toString()));
}

export const apiDeleteSkill = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiPatch<void>(EndPoint.Admin.Skill.ID.replace('{id}', id.toString()));
};

export const apiDeleteMajor = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiPatch<void>(EndPoint.Admin.Major.ID.replace('{id}', id.toString()));
};

export const apiDeleteLanguage = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiPatch<void>(EndPoint.Admin.Language.ID.replace('{id}', id.toString()));
};
