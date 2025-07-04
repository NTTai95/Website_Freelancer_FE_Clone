export interface Education {
    id: number;
    schoolName: string;
    degree: string;
    major: string;
    gpa?: number;
    startDate: string | Date;
    endDate?: string | Date | null;
    description?: string;
}

export interface EducationListProps {
    educations: Education[];
    onAdd: () => void;
    onEdit: (edu: Education) => void;
    onDelete: (id: number) => void;
}

export interface EducationItemProps {
    edu: Education;
    onEdit: () => void;
    onDelete: () => void;
}