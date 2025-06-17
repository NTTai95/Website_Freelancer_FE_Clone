import { AxiosResponse } from "axios";
import { apiGet } from "./baseApi";
import { EndPoint } from "./endpoint";

export type FilterMap = Record<
    string,
    {
        value: string;
        label: string;
        count: number;
    }[]
>;

export const filterSkill = async (): Promise<AxiosResponse<FilterMap>> => {
    return await apiGet<FilterMap>(EndPoint.Admin.Skill.FILTER);
};

export const filterMajor = async (): Promise<AxiosResponse<FilterMap>> => {
    return await apiGet<FilterMap>(EndPoint.Admin.Major.FILTER);
};

export const filterLanguage = async (): Promise<AxiosResponse<FilterMap>> => {
    return await apiGet<FilterMap>(EndPoint.Admin.Language.FILTER);
};

export const filterRole = async (): Promise<AxiosResponse<FilterMap>> => {
    return await apiGet<FilterMap>(EndPoint.Admin.Role.FILTER);
};

export const filterJob = async (): Promise<AxiosResponse<FilterMap>> => {
    return await apiGet<FilterMap>(EndPoint.Job.FILTER);
};
