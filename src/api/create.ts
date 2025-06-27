// apis/createApis.ts

import { AxiosResponse } from "axios";
import { apiPost } from "./baseApi";
import { EndPoint } from "./endpoint";
import { RequestForm } from "@/types/requests/form";

// Trả về void vì backend dùng ResponseEntity.noContent()

export const apiCreateMajor = async (data: RequestForm.Major) => {
  return await apiPost<void>(EndPoint.Admin.Major.BASE, data);
};

export const apiCreateSkill = async (
  data: RequestForm.Skill
): Promise<AxiosResponse<void>> => {
  return await apiPost<void>(EndPoint.Admin.Skill.BASE, data);
};

export const apiCreateLanguage = async (
  data: RequestForm.Language
): Promise<AxiosResponse<void>> => {
  return await apiPost<void>(EndPoint.Admin.Language.BASE, data);
};

export const apiCreateRole = async (
  data: RequestForm.Role
): Promise<AxiosResponse<void>> => {
  return await apiPost<void>(EndPoint.Admin.Role.BASE, data);
};

export const apiCreateJob = async (
  data: RequestForm.JobStep1
): Promise<AxiosResponse<number>> => {
  return await apiPost<number>(EndPoint.Job.BASE, data);
};

export const apiCreateStaff = async (
  data: RequestForm.Staff
): Promise<AxiosResponse<void>> => {
  return await apiPost<void>(EndPoint.Admin.Staff.BASE, {
    ...data,
    birthday: new Date(data.birthday).toLocaleDateString("en-GB"),
  });
};
