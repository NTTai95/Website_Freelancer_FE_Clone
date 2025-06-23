export namespace ResponseDetail {
    export interface User {
        id: number;
        fullName: string;
        email: string;
        phone: string;
        joinedAt: string;
        status: string;
        birthday: string;
        role: { id: number, name: string };
    }

    export interface Staff extends User {
        password: string;
    }

    export interface Client extends User {
        isMale: boolean;
        avatar: string;
        bio: string;
        requtation: number;
    }

    export interface Freelancer extends Client {
    }
    export interface Employer extends Client {
    }

    export interface Skill {
        id: number;
        name: string;
        description: string;
        status: string;
        createdAt: string;
        major: { id: number, name: string };
        countJobs: number;
        countFreelancers: number;
    }

    export interface Major {
        id: number;
        name: string;
        description: string;
        status: string;
        createdAt: string;
        skills: { id: number, name: string }[];
        countJobs: number;
    }

    export interface Language {
        id: number;
        name: string;
        iso: string;
        status: string;
        createdAt: string;
        countJobs: number;
        countFreelancers: number;
    }

    export interface Job {
        id: number;
        employerAvatar: string;
        employerFullName: string;
        employerAge: number;
        isMale: boolean;
        employerRequtation: number;
        title: string;
        description: string;
        countApply: number;
        budget: number;
        durationHours: number;
        postedAt: string;
        document: string;
        skills: { id: number, name: string }[];
        languages: { id: number, name: string }[];
        major: { id: number, name: string };
    }

    export interface MeAdmin {
        id: number;
        fullName: string;
        email: string;
        phone: string;
        joinedAt: string;
        birthday: string;
    }

    export interface MeClient {
        id: number;
        fullName: string;
        email: string;
        phone: string;
        isMale: boolean;
        avatar: string
        joinedAt: string
        requtation: number;
        birthday: number;
    }

    export interface Role {
        id: number;
        name: string;
        description: string;
        code: string;
        permissions: { id: number, name: string }[];
    }
}