export namespace ResponseRecord {
    export interface Skill {
        id: number;
        name: string;
        description: string;
        status: "ACTIVE" | "DELETE";
        createdAt: string;
        majorName: string;
    }

    export interface Major {
        id: number;
        name: string;
        description: string;
        status: "ACTIVE" | "DELETE";
        createdAt: string;
        skillCount: number;
    }

    export interface Language {
        id: number;
        name: string;
        iso: string;
        status: "ACTIVE" | "DELETE";
        createdAt: string;
    }

    export interface User {
        id: number;
        avatar: string;
        fullName: string;
        email: string;
        status: "ACTIVE" | "DISABLED" | "LOCKED";
        nameRole: string;
        joinedAt: string;

    }

    export interface RecordUser {
        id: number;
        avatar: string;
        fullName: string;
        email: string;
        status: "ACTIVE" | "DISABLED";
        role: string;
        joinedAt: string;
        gender: string;
        age: number;
    }

    export interface Role {
        id: number;
        name: string;
        code: string;
        description: string;
        countUser: number;
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