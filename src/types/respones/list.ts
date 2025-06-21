export namespace ResponseList {
    export interface Language {
        id: number;
        name: string;
        iso: string;
    }

    export interface Skill {
        id: number;
        name: string;
        description: string;
    }

    export interface Major {
        id: number;
        name: string;
        description: string;
    }

    export interface Role {
        id: number;
        name: string;
        code: string;
        description: string;
    }

    export interface Permission {
        id: number;
        name: string;
        description: string;
        code: string;
    }
}