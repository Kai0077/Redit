// hooks/useAllPosts.ts
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../api/post-auth";
import type { Post, GetAllPostsResponse } from "../types/post";

const adminAllPostsKey = ["admin", "posts", "all"] as const;

export function useAllPosts() {
    return useQuery({
        queryKey: adminAllPostsKey,
        queryFn: async () => {
            const data: GetAllPostsResponse = await getAllPosts();
            // If your API returns { items: Post[] }, then return data.items.
            // If it returns Post[], return data directly.
            return (Array.isArray(data) ? data : (data as any).items) as Post[];
        },
    });
}

export { adminAllPostsKey };
