import { AxiosResponse } from "axios";
import { apiPut } from "./baseApi";
import { EndPoint } from "./endpoint";
import { RequestForm } from "@/types/requests/form";
import dayjs from "dayjs";

export const apiUpdateSkill = async ({
  id,
  data,
}: {
  id: number;
  data: RequestForm.Skill;
}): Promise<AxiosResponse<void>> => {
  return await apiPut<void>(
    EndPoint.Admin.Skill.ID.replace("{id}", id.toString()),
    data
  );
};

export const apiUpdateMajor = async ({
  id,
  data,
}: {
  id: number;
  data: RequestForm.Major;
}): Promise<AxiosResponse<void>> => {
  return await apiPut<void>(
    EndPoint.Admin.Major.ID.replace("{id}", id.toString()),
    data
  );
};

export const apiUpdateLanguage = async ({
  id,
  data,
}: {
  id: number;
  data: RequestForm.Language;
}): Promise<AxiosResponse<void>> => {
  return await apiPut<void>(
    EndPoint.Admin.Language.ID.replace("{id}", id.toString()),
    data
  );
};

export const apiUpdateRole = async ({
  id,
  data,
}: {
  id: number;
  data: RequestForm.Role;
}): Promise<AxiosResponse<void>> => {
  return await apiPut<void>(
    EndPoint.Admin.Role.ID.replace("{id}", id.toString()),
    data
  );
};

export const apiUpdateJobStep1 = async ({
  id,
  data,
}: {
  id: number;
  data: RequestForm.JobStep1;
}): Promise<AxiosResponse<void>> => {
  return await apiPut<void>(
    EndPoint.Job.Step1.ID.replace("{id}", id.toString()),
    data
  );
};

export const apiUpdateJobStep2 = async ({
  id,
  data,
}: {
  id: number;
  data: RequestForm.JobStep2;
}): Promise<AxiosResponse<void>> => {
  return await apiPut<void>(
    EndPoint.Job.Step2.ID.replace("{id}", id.toString()),
    data
  );
};

export const apiUpdateJobStep3 = async ({
  id,
  data,
}: {
  id: number;
  data: RequestForm.JobStep3;
}): Promise<AxiosResponse<void>> => {
  return await apiPut<void>(
    EndPoint.Job.Step3.ID.replace("{id}", id.toString()),
    { ...data, closedAt: dayjs(data.closedAt).format("DD/MM/YYYY HH:mm:ss") }
  );
};

export const apiUpdateJobStep4 = async ({
  id,
  data,
}: {
  id: number;
  data: RequestForm.JobStep4;
}): Promise<AxiosResponse<void>> => {
  const formData = new FormData();
  formData.append("description", data.description);
  formData.append("document", data.document as File); // đảm bảo là File
  formData.append("isPublic", data.isPublic); // đảm bảo là File

  return await apiPut<void>(
    EndPoint.Job.Step4.ID.replace("{id}", id.toString()),
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
};

export const apiUpdateStaff = async ({
  id,
  data,
}: {
  id: number;
  data: RequestForm.Staff;
}): Promise<AxiosResponse<void>> => {
  return await apiPut<void>(
    EndPoint.Admin.Staff.ID.replace("{id}", id.toString()),
    { ...data, birthday: new Date(data.birthday).toLocaleDateString("en-GB") }
  );
};
