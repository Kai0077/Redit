// components/CreatePost.tsx
import { useState } from "react";
import { Button } from "primereact/button";
import { createPost } from "../../api/post-auth"; // <- your API client
import type { CreatePostResponse } from "../../types/post";

// --- helper (module scope) ---
function htmlText(html: string | null | undefined): string {
    if (!html) return "";
    const div = document.createElement("div");
    div.innerHTML = html;
    return (div.textContent || "").trim();
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
        const textOnly = htmlText(clean);

        if (!title.trim()) {
            onError?.("Please add a title.");
            return;
        }
        if (!textOnly) {
            onError?.("Please add a description.");
            return;
        }

        try {
            setLoading(true);
            // send HTML (or send textOnly if your API wants plaintext)
            const created = await createPost({
                title: title.trim(),
                description: clean,
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
