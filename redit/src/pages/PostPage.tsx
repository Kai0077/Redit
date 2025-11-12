import {useState, useRef} from "react";
import {Editor} from "primereact/editor";
import type {EditorTextChangeEvent} from "primereact/editor";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import Menubar from "../layouts/Menubar";
import {createPost} from "../api/post-auth";
import type {CreatePostResponse} from "../types/post";
import {useNavigate} from "react-router-dom";
import {Calendar} from "primereact/calendar";
import "../../styles/CalendarTheme.css";
import {formatDateTime} from "../utils/formatDateTime.ts";

function isHtmlBlank(html: string) {
    return html === "" || html === "<p><br></p>" || html.replace(/<[^>]*>/g, "").trim() === "";
}

export default function PostPage() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [publishAt, setPublishAt] = useState<Date | null>(null);

    const [loading, setLoading] = useState(false);

    const toast = useRef<Toast>(null);
    const navigate = useNavigate();

    const onPublish = async () => {
        if (!title.trim()) {
            toast.current?.show({severity: "warn", summary: "Missing title", detail: "Please add a title."});
            return;
        }
        if (isHtmlBlank(text)) {
            toast.current?.show({severity: "warn", summary: "Missing content", detail: "Please add a description."});
            return;
        }

        try {
            setLoading(true);
            const payload = {
                title: title.trim(),
                descriptionHtml: text,
                publishAt: publishAt ? publishAt.toISOString() : null,
                isPublic: !publishAt,
            };

            const created: CreatePostResponse = await createPost(payload);

            toast.current?.show({
                severity: "success",
                summary: publishAt ? "Scheduled!" : "Posted!",
                detail: publishAt
                    ? `Post scheduled for ${formatDateTime(publishAt)}`
                    : `Post #${created.title} created.`,
            });

            setTimeout(() => navigate("/profile"), 600);
        } catch (e: any) {
            const msg = e?.response?.data?.message || "Failed to create post.";
            toast.current?.show({severity: "error", summary: "Error", detail: msg});
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Menubar/>
            <Toast ref={toast}/>

            <div className="postcard-center">
                <div className="postcard-wrap">
                    {/* Title */}
                    <div className="postcard-title">
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

                    {/* Text editor */}
                    <Editor
                        value={text}
                        onTextChange={(e: EditorTextChangeEvent) => setText(e.htmlValue ?? "")}
                        style={{height: "320px"}}
                        className="post-editor mt-3"
                        placeholder="Write your post…"
                    />

                    <div className="mt-5 flex flex-col sm:flex-row sm:items-end gap-3">
                        <div className="flex flex-col sm:flex-1">
                            <Calendar
                                id="publishAt"
                                value={publishAt}
                                onChange={(e) => setPublishAt(e.value as Date)}
                                showTime
                                hourFormat="24"
                                minDate={new Date()}
                                showIcon
                                placeholder="Now"
                                className="custom-calendar"
                                readOnlyInput
                            />
                        </div>

                        <Button
                            label={loading ? "Publishing…" : "Publish"}
                            icon={"pi pi-send"}
                            loading={loading}
                            onClick={onPublish}
                            style={{
                                background: "#d6400b",
                                border: "none",
                                height: "2.8rem",
                                minWidth: "9rem",
                                alignSelf: "end",
                            }}
                            className="text-white font-semibold"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}