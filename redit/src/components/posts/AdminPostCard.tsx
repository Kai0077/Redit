import type { Post } from "../../types/post";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { useRef } from "react";

interface AdminPostCardProps {
    post: Post;
    onVote?: (value: 1 | -1) => void;
    isUpvoted?: boolean;
    isDownvoted?: boolean;
    onOpen?: () => void;
    onEdit?: (post: Post) => void;
    onDelete?: (post: Post) => void;
}

export default function AdminPostCard({
                                          post,
                                          onVote,
                                          isUpvoted,
                                          isDownvoted,
                                          onOpen,
                                          onEdit,
                                          onDelete,
                                      }: AdminPostCardProps) {
    const aura = post.aura ?? 0;
    const menuRef = useRef<Menu>(null);

    const menuItems = [
        {
            label: "Edit",
            icon: "pi pi-pencil",
            command: () => onEdit?.(post),
        },
        {
            label: "Delete",
            icon: "pi pi-trash",
            command: () => onDelete?.(post),
        },
    ];

    return (
        <article className="post-card" role="article">
            {/* Header */}
            <header className="post-header">
                <div className="post-header-left">
                    <div className="community-icon" />
                    <div className="community-info">
                        <div className="community-line">
                            {post.community && (
                                <span className="community-name">
                                    r/{post.community}
                                </span>
                            )}
                            <span className="community-meta">
                                • Posted by u/{post.originalPoster}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Options menu button */}
                <div className="options-menu">
                    <Menu model={menuItems} popup ref={menuRef} />
                    <Button
                        icon="pi pi-ellipsis-h"
                        rounded
                        text
                        aria-label="Options"
                        className="options-btn"
                        onClick={(e) => menuRef.current?.toggle(e)}
                    />
                </div>
            </header>

            {/* Body */}
            <div className="post-body" onClick={onOpen}>
                <h2 className="post-title">{post.title}</h2>

                {post.description && (
                    <p className="post-description">{post.description}</p>
                )}

                {post.embeds?.length ? (
                    <ul className="post-embeds">
                        {post.embeds.map((url: string) => (
                            <li key={url}>
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="post-embed-link"
                                >
                                    {url}
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>

            {/* Footer */}
            <footer className="post-footer">
                <div className="post-actions-left">
                    {/* Vote pill */}
                    <div className="vote-pill">
                        <i
                            className={`pi pi-arrow-up vote-icon ${
                                isUpvoted ? "upvoted" : ""
                            }`}
                            onClick={(e) => {
                                e.stopPropagation();
                                onVote?.(1);
                            }}
                        />
                        <span className="vote-count">{aura}</span>
                        <i
                            className={`pi pi-arrow-down vote-icon ${
                                isDownvoted ? "downvoted" : ""
                            }`}
                            onClick={(e) => {
                                e.stopPropagation();
                                onVote?.(-1);
                            }}
                        />
                    </div>

                    {/* Comments */}
                    <button className="comment-btn">
                        <i className="pi pi-comment comment-icon" />
                        <span>Comments</span>
                    </button>
                </div>

                <div className="post-actions-right">
                    <button className="icon-btn">
                        <i className="pi pi-share-alt" />
                    </button>
                </div>
            </footer>
        </article>
    );
}