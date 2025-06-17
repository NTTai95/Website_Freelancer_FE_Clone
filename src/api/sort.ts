import { apiGet } from "./baseApi";
import { EndPoint } from "./endpoint";

export const apiSortSkill = async () => {
    return await apiGet<string[]>(EndPoint.Admin.Skill.SORT);
};

export const apiSortMajor = async () => {
    return await apiGet<string[]>(EndPoint.Admin.Major.SORT);
};

export const apiSortLanguage = async () => {
    return await apiGet<string[]>(EndPoint.Admin.Language.SORT);
};

export const apiSortRole = async () => {
    return await apiGet<string[]>(EndPoint.Admin.Role.SORT);
};

export const apiSortJob = async () => {
    return await apiGet<string[]>(EndPoint.Job.SORT);
};
