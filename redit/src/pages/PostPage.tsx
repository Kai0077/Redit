// pages/PostPage.tsx
import { useState, useRef } from "react";
import { Editor } from "primereact/editor";
import type { EditorTextChangeEvent } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import Menubar from "../layouts/Menubar";
import { createPost } from "../api/post-auth";
import type { CreatePostResponse } from "../types/post";
import { useNavigate } from "react-router-dom";

function isHtmlBlank(html: string) {
    return html === "" || html === "<p><br></p>" || html.replace(/<[^>]*>/g, "").trim() === "";
}

export default function PostPage() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const toast = useRef<Toast>(null);
    const navigate = useNavigate();

    const onPublish = async () => {
        if (!title.trim()) {
            toast.current?.show({ severity: "warn", summary: "Missing title", detail: "Please add a title." });
            return;
        }
        if (isHtmlBlank(text)) {
            toast.current?.show({ severity: "warn", summary: "Missing content", detail: "Please add a description." });
            return;
        }

        try {
            setLoading(true);
            const payload = {
                title: title.trim(),
                description: text, // HTML
            };
            const created: CreatePostResponse = await createPost(payload);
            toast.current?.show({ severity: "success", summary: "Posted!", detail: `Post #${created.id} created.` });
            setTimeout(() => navigate("/profile"), 600);
        } catch (e: any) {
            const msg = e?.response?.data?.message || "Failed to create post.";
            toast.current?.show({ severity: "error", summary: "Error", detail: msg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Menubar />
            <Toast ref={toast} />

            <div className="postcard-center">
                <div className="postcard-wrap">
                    {/* Title */}
                    <div className="postcard-title">
                        <label htmlFor="post-title" className="postcard-title-label" />
                        <InputText
                            id="post-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className="w-full"
                            maxLength={120}
                        />
                        <small className="postcard-title-hint">{title.length}/120</small>
                    </div>

                    {/* Rich text */}
                    <Editor
                        value={text}
                        onTextChange={(e: EditorTextChangeEvent) => setText(e.htmlValue ?? "")}
                        style={{ height: "320px" }}
                        className="post-editor mt-3"
                        placeholder="Write your post…"
                    />

                    {/* Publish */}
                    <div className="mt-4">
                        <Button
                            label={loading ? "Publishing…" : "Publish"}
                            icon="pi pi-send"
                            loading={loading}
                            onClick={onPublish}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}