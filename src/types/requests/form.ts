export namespace RequestForm {
    export interface Certification {
        name: string;
        issueBy: string;
        issueDate?: string;
        expiredDate?: string;
        link?: string;
        fontImage?: File;
        backImage?: File;
    }

    export interface Contact {
        title: string;
        content: string;
    }

    export interface Education {
        school: string;
        degree: string;
        major: string;
        gpa: number;
        startDate: string;
        endDate: string;
        description?: string;
    }

    export interface Report {
        title: string;
        content: string;
        reportId: number;
    }

    export interface RequestPayment {
        amount: number;
    }

    export interface Register {
        email: string;
        password: string;
        fullName: string;
        isMale: boolean;
        birthday: string;
    }

    export interface Login {
        email: string;
        password: string;
    }

    export interface Skill {
        name: string;
        description: string;
        majorId: number;
    }

    export interface Major {
        name: string;
        description: string;
    }

    export interface Language {
        name: string;
        iso: string;
    }

    export interface JobStep1 {
        title: string;
        major: number;
    }

    export interface JobStep2 {
        skillIds: number[];
        languageIds: number[];
    }

    export interface JobStep3 {
        budget: number;
        durationHours: number;
        closeAt: string;
    }

    export interface JobStep4 {
        description: string;
        document?: File;
    }

    export interface Apply {
        content: string;
        bidAmount: number;
        estimatedHours: number;
    }

    export interface Milestone {
        percent: number;
        content: string;
        startAt: string;
        durationHours: number;
        document?: File;
    }

    export interface Dispute {
        reason: string;
        milestoneId: number;
    }

    export interface Resolve {
        resolution: string;
    }

    export interface Review {
        content: string;
        rating: number;
    }

    export interface Admin {
        fullName: string;
        permissonIds?: number[];
        email: string;
        password: string;
        phone?: string;
    }

    export interface Role {
        name: string;
        description: string;
        permissionIds: number[];
    }
}