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
    community: string | null; // backend may return null if profile post
    embeds: string[];         // backend returns an array (can be empty)
    status: PostStatus;
}

export type PostCreateDTO = {
    title: string;
    descriptionHtml: string; // HTML
};

export type PostUpdateDTO = {
    title: string;
    description: string;
}

export type CreatePostResponse = Post;
export type GetAllPostsResponse = Post[];