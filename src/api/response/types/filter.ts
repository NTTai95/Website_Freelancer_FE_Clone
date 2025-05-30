interface FilterItem {
    id: number;
    name: string;
}

export interface FilterPageUser {
    role: FilterItem[];
    status: string[];
}