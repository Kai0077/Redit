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
export type PostCreateDTO = {
    title: string;
    description: string;   // required (you said title + description are required)
};
export type CreatePostResponse = Post;

export type GetAllPostsResponse = Post[];