import { useEffect, useRef, useState } from "react";
import {deletePost, getAllPosts} from "../../api/post-auth.ts";
import type { Post } from "../../types/post";
import AppToast, { type AppToastHandle } from "../../components/AppToast";
import PostCard from "./AdminPostCard.tsx";

export default function AdminPostList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const toastRef = useRef<AppToastHandle>(null);

    useEffect(() => {
        loadPosts();
    }, []);
    
    const loadPosts = async () => {
        setLoading(true);
        try {
            const data = await getAllPosts();
            setPosts(data);
        } catch (error: any) {
            const message = error.response?.data?.message || error.message || "Failed to load posts.";
            toastRef.current?.showError(message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleDelete = async (post: Post) => {
        try {
            await deletePost(post.id);
            setPosts((prevState) => prevState.filter((existingPost) => existingPost.id !== post.id));
            toastRef.current?.showSuccess("Post deleted successfully.");
        } catch (error: any) {
            const message = 
                error.response?.data?.message ||
                error.message ||
                "Unauthorized: You are not allowed to perform this action.";
            toastRef.current?.showError(message);
        }
    };
    
    return (
        <div className="flex flex-column gap-3 p-3">
            <AppToast ref={toastRef}/>
            
            {loading ? (
                <p className="text-gray-400">Loading posts...</p>
            ) : posts.length === 0 ? (
                <p className="text-gray-500">No posts found.</p>
            ) : (
                <div className="flex flex-column gap-3">
                    {posts.map((post) => (
                        <PostCard 
                            key={post.id} 
                            post={post}
                            onDelete={() => handleDelete(post)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
} 