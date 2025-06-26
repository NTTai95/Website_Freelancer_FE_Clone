import { RequestForm } from "@/types/requests/form";
import { apiGet } from "./baseApi";
import { AxiosResponse } from "axios";
import { EndPoint } from "./endpoint";
import { ResponseDetail } from "@/types/respones/detail";

export const apiJobDetail = async (id: number): Promise<AxiosResponse<ResponseDetail.Job>> => {
    return await apiGet<ResponseDetail.Job>(EndPoint.Job.PUBLIC.replace('{id}', id.toString()));
};