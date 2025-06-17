import { ResponseList } from '@/types/respones/list';
import { apiGet } from './baseApi';
import { EndPoint } from './endpoint';
import { AxiosResponse } from 'axios';

export const listLanguage = async (): Promise<AxiosResponse<ResponseList.Language[]>> => {
    return await apiGet<ResponseList.Language[]>(EndPoint.List.LANGUAGE);
};

export const listSkill = async (): Promise<AxiosResponse<ResponseList.Skill[]>> => {
    return await apiGet<ResponseList.Skill[]>(EndPoint.List.SKILL);
};

export const listMajor = async (): Promise<AxiosResponse<ResponseList.Major[]>> => {
    return await apiGet<ResponseList.Major[]>(EndPoint.List.MAJOR);
};

export const listRole = async (): Promise<AxiosResponse<ResponseList.Role[]>> => {
    return await apiGet<ResponseList.Role[]>(EndPoint.List.ROLE);
};

export const listPermission = async (): Promise<AxiosResponse<ResponseList.Permission[]>> => {
    return await apiGet<ResponseList.Permission[]>(EndPoint.List.PERMISSION);
};
