import { apiDelete } from './baseApi';
import { EndPoint } from './endpoint';
import { AxiosResponse } from 'axios';

export const deleteSkill = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiDelete<void>(EndPoint.Admin.Skill.ID.replace('{id}', id.toString()));
};

export const deleteMajor = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiDelete<void>(EndPoint.Admin.Major.ID.replace('{id}', id.toString()));
};

export const deleteLanguage = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiDelete<void>(EndPoint.Admin.Language.ID.replace('{id}', id.toString()));
};
