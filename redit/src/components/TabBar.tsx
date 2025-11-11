import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import AppToast, { type AppToastHandle } from "./AppToast";
import type { Post } from "../types/post";
import { getMyPosts, deletePost } from "../api/post-auth";
import PostCard from "./posts/PostCard";
import UpdatePostDialog from "./posts/UpdatePostDialog";

export default function TabBar() {
    const navigate = useNavigate();

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const toastRef = useRef<AppToastHandle>(null);

    const [editOpen, setEditOpen] = useState(false);
    const [editing, setEditing] = useState<Post | null>(null);

    useEffect(() => {
        void loadPosts();
    }, []);

    const loadPosts = async () => {
        setLoading(true);
        try {
            const data = await getMyPosts();
            setPosts(data);
        } catch (error: any) {
            const message = error?.response?.data?.message || error?.message || "Failed to load posts.";
            toastRef.current?.showError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (post: Post) => {
        setEditing(post);
        setEditOpen(true);
    };

    // Replace the updated post locally after save
    const handleSaved = (updated: Post) => {
        setPosts(prev => prev.map(p => (p.id === updated.id ? { ...p, ...updated } : p)));
        toastRef.current?.showSuccess("Post updated.");
    };

    // Owner delete
    const handleDelete = async (post: Post) => {
        try {
            await deletePost(post.id); // backend should enforce owner-or-superuser
            setPosts(prev => prev.filter(p => p.id !== post.id));
            toastRef.current?.showSuccess("Post deleted.");
        } catch (e: any) {
            const msg = e?.response?.data?.message || e?.message || "Failed to delete post.";
            toastRef.current?.showError(msg);
        }
    };

    return (
        <div className="tabbar-wrap">
            <TabView className="tabbar">
                <TabPanel header="Posts">
                    <div className="tabbar-toolbar">
                        <Button
                            label="Create Post"
                            icon="pi pi-plus"
                            rounded
                            className="tabbar-create-post"
                            onClick={() => navigate("/post")}
                        />
                    </div>

                    <div className="tabbar-content p-3">
                        <AppToast ref={toastRef} />

                        {loading ? (
                            <p className="text-500 m-0">Loading posts…</p>
                        ) : posts.length === 0 ? (
                            <p className="text-500 m-0">You haven’t posted anything yet.</p>
                        ) : (
                            <div
                                className="flex flex-column gap-3"
                                style={{ maxHeight: "calc(100vh - 240px)", overflowY: "auto" }}
                            >
                                {posts.map(post => (
                                    <PostCard
                                        key={post.id}
                                        post={post}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </TabPanel>

                <TabPanel header="Comments">
                    <div className="tabbar-content p-3">{/* TODO: comments list */}</div>
                </TabPanel>

                <TabPanel header="Communities">
                    <div className="tabbar-content p-3">{/* TODO: communities list */}</div>
                </TabPanel>
            </TabView>
            <UpdatePostDialog
                visible={editOpen}
                post={editing}
                onClose={() => setEditOpen(false)}
                onSaved={handleSaved}
            />
        </div>
    );
}
