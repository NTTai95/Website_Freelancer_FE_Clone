
export namespace RequestPage {
    interface PageBase {
        page?: number;
        size?: number;
        sortType?: 'asc' | 'desc' | 'ascend' | 'descend';
    }

    export interface Skill extends PageBase {
        majorId?: number;
        status?: 'ACTIVE' | 'DELETE';
        sortField?: 'id' | 'name' | 'createdAt';
    }

    export interface Major extends PageBase {
        status?: 'ACTIVE' | 'DELETE';
        sortField?: 'id' | 'name' | 'createdAt';
    }

    export interface Language extends PageBase {
        status?: 'ACTIVE' | 'DELETE';
        sortField?: 'name' | 'iso' | 'createdAt';
    }

    export interface User extends PageBase {
        roleId?: number;
        status?: 'ACTIVE' | 'DISABLED' | 'LOCKED';
        sortField?: 'id' | 'birthday' | 'joinedAt';
    }

    export interface Role extends PageBase {
        sortField?: 'id' | 'name';
    }

    export interface Job extends PageBase {
        skillIds?: number[];
        languageIds?: number[];
        minBudget?: number;
        maxBudget?: number;
        majorId?: number;
        maxDurationHours?: number;
        sortField?: 'id' | 'budget' | 'durationHours' | 'postedAt' | 'closedAt';
    }
}


