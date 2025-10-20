import { useState } from "react";
import { Button } from "primereact/button";
import { createPost } from "../../api/post-auth.ts";
import type { CreatePostResponse } from "../../types/post.ts";

function isHtmlBlank(html: string) {
    return (
        html === "" ||
        html === "<p><br></p>" ||
        html.replace(/<[^>]*>/g, "").trim() === ""
    );
}

export default function CreatePost({
                                       title,
                                       descriptionHtml,                  // Editor HTML
                                       onSuccess,
                                       onError,
                                   }: {
    title: string;
    descriptionHtml?: string | null;
    onSuccess?: (post: CreatePostResponse) => void;
    onError?: (message: string) => void;
}) {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        const clean = descriptionHtml ?? "";

        if (!title.trim()) {
            onError?.("Please add a title.");
            return;
        }
        if (isHtmlBlank(clean)) {
            onError?.("Please add a description.");
            return;
        }

        try {
            setLoading(true);
            const created = await createPost({
                title: title.trim(),
                description: clean, // send HTML; change to plaintext if backend expects it
            });
            onSuccess?.(created);
        } catch (e: any) {
            onError?.(e?.response?.data?.message || "Failed to create post.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            label={loading ? "Publishing…" : "Publish"}
            icon="pi pi-send"
            loading={loading}
            onClick={handleClick}
        />
    );
}
