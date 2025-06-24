import { RequestForm } from "@/types/requests/form";
import { apiGet } from "./baseApi";
import { AxiosResponse } from "axios";
import { EndPoint } from "./endpoint";


export const apiJobDetail = async (id: number): Promise<AxiosResponse<RequestForm.JobStep1>> => {
    return await apiGet<RequestForm.JobStep1>(EndPoint.Job.ID.replace('{id}', id.toString()));
};