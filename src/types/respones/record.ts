import { Status } from "../status";

export namespace ResponseRecord {
    export interface Skill {
        id: number;
        name: string;
        description: string;
        status: Status.Skill.ACTIVE;
        createdAt: string;
        majorName: string;
    }

    export interface Major {
        id: number;
        name: string;
        description: string;
        status: Status.Major.ACTIVE;
        createdAt: string;
        skillCount: number;
    }

    export interface Language {
        id: number;
        name: string;
        iso: string;
        status: Status.Language.ACTIVE;
        createdAt: string;
    }

    export interface Staff {
        id: number;
        fullName: string;
        email: string;
        status: Status.User.ACTIVE;
        role: {
            id: number;
            name: string;
            code: string;
        }
        joinedAt: string;
        isMale: boolean;
        birthday: string;
    }

    export interface Client extends Staff {
        avatar: string;
    }

    export interface Role {
        id: number;
        name: string;
        code: string;
        description: string;
        countUsers: number;
    }

    export interface Job {
        id: number;
        employerAvatar: string;
        employerFullName: string;
        title: string;
        description: string;
        budget: number;
        postedAt: string;
        closeAt: string;
        durationHours: number;
        countApply: number;
        skills: { id: number, name: string }[];
        languages: { id: number, name: string }[];
        major: { id: number, name: string };
    }
}