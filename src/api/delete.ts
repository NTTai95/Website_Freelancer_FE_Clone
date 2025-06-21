import { apiDelete } from './baseApi';
import { EndPoint } from './endpoint';
import { AxiosResponse } from 'axios';

export const apiPermanentlyDeleteSkill = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiDelete<void>(EndPoint.Admin.Skill.PERMANENTLY_DELETE.replace('{id}', id.toString()));
}

export const apiPermanentlyDeleteMajor = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiDelete<void>(EndPoint.Admin.Major.PERMANENTLY_DELETE.replace('{id}', id.toString()));
}

export const apiPermanentlyDeleteLanguage = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiDelete<void>(EndPoint.Admin.Language.PERMANENTLY_DELETE.replace('{id}', id.toString()));
}