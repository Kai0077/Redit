import { useState } from "react";
import { Editor } from "primereact/editor";
import type { EditorTextChangeEvent } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import Menubar from "../layouts/Menubar";

export default function PostPage() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    return (
        <>
            <Menubar />
            <div className="postcard-center">
                <div className="postcard-wrap">
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

                    <Editor
                        value={text}
                        onTextChange={(e: EditorTextChangeEvent) => setText(e.htmlValue ?? "")}
                        style={{ height: "320px"}}
                        className="post-editor"
                        placeholder="Enter text"
                    />
                </div>
            </div>
        </>
    );
}
