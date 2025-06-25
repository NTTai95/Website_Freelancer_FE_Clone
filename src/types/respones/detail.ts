export namespace ResponseDetail {
    export interface User {
        id: number;
        fullName: string;
        email: string;
        phone: string;
        gender: string;
        avatar: string
        joinedAt: string
        requtation: number;
        status: string;
        birthday: number;
        age: number;
    }

    export interface Freelancer extends User {
        bio: string;

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
        countApplies: number;
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
}