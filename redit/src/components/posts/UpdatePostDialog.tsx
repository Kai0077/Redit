import { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import type { Post } from "../../types/post";
import { updatePost } from "../../api/post-auth";

type UpdatePostDialogProps = {
    visible: boolean;
    post: Post | null;
    onClose: () => void;                       // close without saving
    onSaved: (updated: Post) => void;          // parent updates its list
};

export default function UpdatePostDialog({ visible, post, onClose, onSaved }: UpdatePostDialogProps) {
    const toastRef = useRef<Toast>(null);
    const [title, setTitle] = useState("");
    const [html, setHtml] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!post) return;
        setTitle(post.title ?? "");
        setHtml((post as any).descriptionHtml ?? post.description ?? "");
    }, [post]);

    const handleSave = async () => {
        if (!post) return;
        if (!title.trim()) {
            toastRef.current?.show({ severity: "warn", summary: "Missing title", detail: "Title is required." });
            return;
        }
        try {
            setSaving(true);
            const updated = await updatePost(post.id, {
                title: title.trim(),
                description: html, // send HTML; backend converts to plain if needed
            });
            toastRef.current?.show({ severity: "success", summary: "Saved", detail: "Post updated." });
            onSaved(updated);
            onClose();
        } catch (e: any) {
            const msg = e?.response?.data?.message || e?.message || "Failed to update post.";
            toastRef.current?.show({ severity: "error", summary: "Error", detail: msg });
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog
            header="Edit Post"
            visible={visible}
            style={{ width: "42rem", maxWidth: "95vw" }}
            modal
            onHide={onClose}
        >
            <Toast ref={toastRef} />

            <div className="flex flex-column gap-3">
        <span className="p-float-label">
          <InputText
              id="upd-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
              maxLength={120}
          />
          <label htmlFor="upd-title">Title</label>
        </span>

                <Editor
                    value={html}
                    onTextChange={(e) => setHtml(e.htmlValue ?? "")}
                    style={{ height: 300 }}
                    className="mt-1"
                    placeholder="Edit your post…"
                />

                <div className="flex gap-2 justify-end mt-2">
                    <Button label="Cancel" text onClick={onClose} />
                    <Button label={saving ? "Saving…" : "Save"} onClick={handleSave} loading={saving} />
                </div>
            </div>
        </Dialog>
    );
}
