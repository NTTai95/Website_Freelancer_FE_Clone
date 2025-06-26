import { Status } from "../status";

export namespace ResponseDetail {
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
    avatar: string;
    joinedAt: string;
    requtation: number;
    birthday: string;
  }

  export interface Job {
    id: number;
    employerAvatar: string;
    employerFullName: string;
    employerAge: number;
    isMale: boolean;
    employerReputation: number;
    title: string;
    description: string;
    countApplies: number;
    budget: number;
    durationHours: number;
    postedAt: string;
    closedAt: string;
    document: string;
    skillsName: string[]; // hoặc { id: number; name: string }[] nếu BE trả như vậy
    languagesName: string[];
    majorName: string;
  }

  export interface Client {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    birthday: string;
    joinedAt: string;
    avatar: string;
    isMale: boolean;
    bio: string;
    status: Status.User;
    role: Role;
    reputation: number;
  }

  export interface Employer extends Client { }

  export interface Freelancer extends Client {
    balance: number;
    certifications: Certification[];
    educations: Education[];
    skills: Skill[];
    languages: Language[];
  }

  export interface Certification {
    id: number;
    name: string;
    issueBy: string;
    issueDate: string;
    expiryDate: string;
    link: string;
    frontImage: string;
    backImage: string;
    status: Status.Certification;
  }

  export interface Language {
    id: number;
    name: string;
    iso: string;
    status: Status.Language;
  }

  export interface Education {
    id: number;
    schoolName: string;
    degree: string;
    major: string;
    gpa: number;
    startDate: string;
    endDate: string;
    description: string;
  }

  export interface Skill {
    id: number;
    name: string;
    description: string;
    status: Status.Skill;
  }

  export interface Major {
    id: number;
    name: string;
    description: string;
    status: Status.Major;
  }

  export interface Role {
    id: number;
    name: string;
    description: string;
  }
}
