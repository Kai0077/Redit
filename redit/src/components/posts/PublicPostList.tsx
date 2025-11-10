import { useEffect, useRef, useState } from "react";
import type { Post } from "../../types/post";
import { getAllPostsPublic } from "../../api/post-auth";
import AppToast, { type AppToastHandle } from "../../components/AppToast";
import PublicPostCard from "./PublicPostCard";

export default function PublicPostList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const toastRef = useRef<AppToastHandle>(null);

    const fetchPosts = async () => {
        try {
            const data = await getAllPostsPublic();
            setPosts(data);
        } catch (err: any) {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to load posts.";
            toastRef.current?.showError(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-column gap-3 p-3">
                <AppToast ref={toastRef} />
                <p className="text-gray-400">Loading posts…</p>
            </div>
        );
    }

    return (
        <div className="flex flex-column gap-3 p-3">
            <AppToast ref={toastRef} />

            {posts.length === 0 ? (
                <p className="text-gray-500">No posts found.</p>
            ) : (
                <div className="flex flex-column gap-3">
                    {posts.map((post) => (
                        <PublicPostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}