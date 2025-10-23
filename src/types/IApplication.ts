import { ICareers } from "./ICareers";

export interface IApplication {
    _id: string;
    name: string;
    email: string;
    phone: string;
    resumeLink: string;
    // coverLetter: string;
    jobId: ICareers;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    isDeleted: boolean;
}