import { AxiosResponse } from "axios";
import { apiGet } from "./baseApi";
import { EndPoint } from "./endpoint";

export interface FieldValidation {
    field: string;
    rules: {
        type: string;
        value: any;
        message: string;
    }[];
}

export const metaRulesLogin = async (): Promise<AxiosResponse<FieldValidation[]>> => {
    return await apiGet<FieldValidation[]>(EndPoint.Auth.LOGIN_VALIDATION);
};

export const metaRulesRegister = async (): Promise<AxiosResponse<FieldValidation[]>> => {
    return await apiGet<FieldValidation[]>(EndPoint.Auth.REGISTER_VALIDATION);
};

export const metaRulesSkill = async (): Promise<AxiosResponse<FieldValidation[]>> => {
    return await apiGet<FieldValidation[]>(EndPoint.Admin.Skill.VALIDATION);
};

export const metaRulesMajor = async (): Promise<AxiosResponse<FieldValidation[]>> => {
    return await apiGet<FieldValidation[]>(EndPoint.Admin.Major.VALIDATION);
};

export const metaRulesLanguage = async (): Promise<AxiosResponse<FieldValidation[]>> => {
    return await apiGet<FieldValidation[]>(EndPoint.Admin.Language.VALIDATION);
};

export const unique = async (endpoint: string, value: string): Promise<AxiosResponse<boolean>> => {
    return await apiGet<boolean>(endpoint, { params: { value } });
}