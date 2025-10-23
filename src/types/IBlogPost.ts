export interface BlogPost {
    id: string;
    title: string;
    content: string;
    image?: string | null;
    created_at: string;
  }



  export interface IBlog  {
    _id: string;
    title: string;
    content: string;
    description: string;
    image: string;
    tags: string[];
    category: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}