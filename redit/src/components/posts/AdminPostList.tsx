// components/posts/AdminPostList.tsx
import { useRef } from "react";
import type { Post } from "../../types/post";
import AppToast, { type AppToastHandle } from "../../components/AppToast";
import PostCard from "./AdminPostCard";
import { useAllPosts, adminAllPostsKey } from "../../hooks/useAllPosts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../../api/post-auth";

export default function AdminPostList() {
    const toastRef = useRef<AppToastHandle>(null);
    const qc = useQueryClient();

    // Load all posts (React Query)
    const { data, isLoading, isError, error, isFetching, refetch } = useAllPosts();
    const posts = data ?? [];

    // Delete mutation -> invalidate list on success
    const delMut = useMutation({
        mutationFn: (postId: number) => deletePost(postId),
        onSuccess: async () => {
            // ensure fresh data after delete (works with staleTime/gcTime)
            await qc.invalidateQueries({ queryKey: adminAllPostsKey });
            toastRef.current?.showSuccess("Post deleted successfully.");
        },
        onError: (err: any) => {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Unauthorized: You are not allowed to perform this action.";
            toastRef.current?.showError(message);
        },
    });

    const handleDelete = (post: Post) => {
        delMut.mutate(post.id);
    };

    if (isLoading) {
        return (
            <div className="flex flex-column gap-3 p-3">
                <AppToast ref={toastRef} />
                <p className="text-gray-400">Loading posts…</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-column gap-3 p-3">
                <AppToast ref={toastRef} />
                <p className="text-red-400">Failed to load posts: {(error as Error).message}</p>
                <button className="p-button p-component mt-2" onClick={() => refetch()}>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-column gap-3 p-3" style={{ opacity: isFetching || delMut.isPending ? 0.7 : 1 }}>
            <AppToast ref={toastRef} />
            {posts.length === 0 ? (
                <p className="text-gray-500">No posts found.</p>
            ) : (
                <div className="flex flex-column gap-3">
                    {posts.map((post: Post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            onDelete={handleDelete} // keep AdminPostCard menu behavior
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
