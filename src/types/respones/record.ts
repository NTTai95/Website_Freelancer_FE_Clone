export interface RecordUser {
    id: number;
    avatar: string;
    fullName: string;
    email: string;
    status: "ACTIVE" | "DISABLED";
    role: string;
    joinDate: string;
    gender: string;
    age: number;
}