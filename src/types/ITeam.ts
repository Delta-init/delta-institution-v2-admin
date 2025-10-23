export interface ITeam {
    _id: string;
    name: string;
    image: string;
    position: string;
    isActive: boolean;
    isDeleted: boolean;
    showingPosition?: number;
    createdAt: Date;
    updatedAt: Date;
}