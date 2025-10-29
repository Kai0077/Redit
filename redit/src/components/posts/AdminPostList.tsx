// components/posts/AdminPostList.tsx
import { useRef } from "react";
import type { Post } from "../../types/post";
import AppToast, { type AppToastHandle } from "../../components/AppToast";
import PostCard from "./AdminPostCard";
import { useAllPosts } from "../../hooks/useAllPosts.ts"

export default function AdminPostList() {
    const toastRef = useRef<AppToastHandle>(null);
    const { data, isLoading, isError, error, isFetching, refetch } = useAllPosts();

    if (isLoading) return <div className="p-3 text-gray-400">Loading posts…</div>;
    if (isError) {
        return (
            <div className="p-3">
                <AppToast ref={toastRef}/>
                <p className="text-red-400">Failed to load posts: {(error as Error).message}</p>
                <button className="p-button p-component mt-2" onClick={() => refetch()}>Retry</button>
            </div>
        );
    }

    const posts = data ?? [];

    return (
        <div className="flex flex-column gap-3 p-3" style={{ opacity: isFetching ? 0.7 : 1 }}>
            <AppToast ref={toastRef} />
            {posts.length === 0 ? (
                <p className="text-gray-500">No posts found.</p>
            ) : (
                <div className="flex flex-column gap-3">
                    {posts.map((post: Post) => (
                        <PostCard key={post.id} post={post}/>
                    ))}
                </div>
            )}
        </div>
    );
}
