import BaseApi from "../baseApi";
import { FilterPageUser } from "../../types/respones/filter";
import { PageUser } from "../../types/respones/page";

interface ParamBase {
    page?: number;
    size?: number;
    keyword?: string;
    sort?: String
}

class User extends BaseApi {
    async getPage(params?: ParamBase & { role?: number; status?: string }) {
        return this.get<PageUser>("/admin/users", { params });
    }

    async getFilter() {
        return this.get<FilterPageUser>("/admin/users/filter")
    }
}

class PageApi extends BaseApi {
    user = new User();
}

export const pageApi = new PageApi();