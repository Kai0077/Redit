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
    community: string | null;
    embeds: string[];
    status: PostStatus;
    isPublic: boolean;
    publishAt: string | null;
}

export type PostCreateDTO = {
    title: string;
    descriptionHtml: string;
    isPublic?: boolean;
    publishAt?: string | null;
};

export type PostUpdateDTO = {
    title: string;
    description: string;
}

export type CreatePostResponse = Post;
export type GetAllPostsResponse = Post[];