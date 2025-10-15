export enum PostStatus {
    Active = "Active",
    Archived = "Archived",
}

export interface Post {
    id: number;
    title: string;
    description: string;
    aura: number;
    originalPoster: string;
    community: string;
    embeds: string[];
    status: PostStatus;
}

export type GetAllPostsResponse = Post[];