export interface ICareers {
    _id: string;
    title: string;
    position: string;
    description: string;
    documentLink: string;
    location: string;
    requirements: string[];
    salaryRange: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    isDeleted: boolean;
}