// components/TabBar.tsx
import { useEffect, useRef, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

import AppToast, { type AppToastHandle } from "../components/AppToast";
import { getMyPosts } from "../api/post-auth";
import type { Post } from "../types/post";

// If you want to reuse AdminPostCard for normal users:
import PostCard from "../components/posts/AdminPostCard";
// If you have a separate normal PostCard, swap the import:
// import PostCard from "../components/posts/PostCard";

export default function TabBar() {
    const navigate = useNavigate();

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const toastRef = useRef<AppToastHandle>(null);

    useEffect(() => {
        void loadPosts();
    }, []);

    const loadPosts = async () => {
        setLoading(true);
        try {
            const data = await getMyPosts(); // <-- user’s own posts
            setPosts(data);
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to load posts.";
            toastRef.current?.showError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tabbar-wrap">
            <TabView className="tabbar">
                <TabPanel header="Posts">
                    {/* Toolbar */}
                    <div className="tabbar-toolbar">
                        <Button
                            label="Create Post"
                            icon="pi pi-plus"
                            rounded
                            className="tabbar-create-post"
                            onClick={() => navigate("/post")}
                        />
                    </div>

                    {/* Gray content box with vertical list */}
                    <div className="tabbar-content p-3">
                        <AppToast ref={toastRef} />

                        {loading ? (
                            <p className="text-500 m-0">Loading posts…</p>
                        ) : posts.length === 0 ? (
                            <p className="text-500 m-0">You haven’t posted anything yet.</p>
                        ) : (
                            <div
                                className="flex flex-column gap-3"
                                style={{
                                    // keep posts stacked and scrollable inside the gray box
                                    maxHeight: "calc(100vh - 240px)",
                                    overflowY: "auto",
                                }}
                            >
                                {posts.map((post) => (
                                    <PostCard key={post.id} post={post} />
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
        </div>
    );
}