import { ResponseDetail } from "@/types/respones/detail";
import { apiGet } from "./baseApi";
import { EndPoint } from "./endpoint";
import { AxiosResponse } from "axios";

export const jobDetail = async (id: number): Promise<AxiosResponse<ResponseDetail.Job>> => {
    return await apiGet<ResponseDetail.Job>(EndPoint.Job.ID.replace('{id}', id.toString()));
};