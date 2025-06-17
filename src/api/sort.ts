import { apiGet } from "./baseApi";
import { EndPoint } from "./endpoint";

export const sortSkill = async () => {
    return await apiGet<string[]>(EndPoint.Admin.Skill.SORT);
};

export const sortMajor = async () => {
    return await apiGet<string[]>(EndPoint.Admin.Major.SORT);
};

export const sortLanguage = async () => {
    return await apiGet<string[]>(EndPoint.Admin.Language.SORT);
};

export const sortRole = async () => {
    return await apiGet<string[]>(EndPoint.Admin.Role.SORT);
};

export const sortJob = async () => {
    return await apiGet<string[]>(EndPoint.Job.SORT);
};
