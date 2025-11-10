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
}

export type PostCreateDTO = {
    title: string;
    descriptionHtml: string;
};

export type CreatePostResponse = Post;
export type GetAllPostsResponse = Post[];