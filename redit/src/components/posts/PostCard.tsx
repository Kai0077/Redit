import type {Post} from "../../types/post";
import {Menu} from "primereact/menu";
import {Button} from "primereact/button";
import {usePopupMenu} from "../../hooks/usePopupMenu";
import "../../../styles/ScheduleTimer.css";
import {formatDateTime} from "../../utils/formatDateTime.ts";

interface PostCardProps {
    post: Post;
    onVote?: (value: 1 | -1) => void;
    isUpvoted?: boolean;
    isDownvoted?: boolean;
    onOpen?: () => void;

    onEdit?: (post: Post) => void;
    onDelete?: (post: Post) => void;
}

export default function PostCard({ post, onVote, isUpvoted, isDownvoted, onOpen, onEdit, onDelete }: PostCardProps) {
    const aura = post.aura ?? 0;
    const {menuRef, toggle} = usePopupMenu();

    const menuItems = [
        ...(onEdit
            ? [
                {
                    label: "Edit",
                    icon: "pi pi-pencil",
                    command: () => onEdit(post),
                },
            ]
            : []),
        ...(onDelete
            ? [
                {
                    label: "Delete",
                    icon: "pi pi-trash",
                    command: () => onDelete(post),
                },
            ]
            : []),
    ];

    return (
        <article className="post-card" role="article" onClick={onOpen}>
            {/* Header */}
            <header className="post-header">
                <div className="post-header-left">
                    <div className="community-icon"/>
                    <div className="community-info">
                        <div className="community-line">
                            {post.community && (
                                <span className="community-name">r/{post.community}</span>
                            )}
                            <span className="community-meta">• Posted by u/{post.originalPoster}</span>
                        </div>
                    </div>
                </div>

                <div className="post-header-right" onClick={(e) => e.stopPropagation()}>
                    {/* Show scheduled badge if not public post */}
                    {post.publishAt && !post.isPublic && (
                        <div className="scheduled-badge-header">
                            <i className="pi pi-clock" style={{marginRight: "0.4rem"}}></i>
                            <span>{formatDateTime(post.publishAt)}</span>
                        </div>
                    )}

                    {(onEdit || onDelete) && (
                        <>
                            <Menu model={menuItems} popup ref={menuRef}/>
                            <Button
                                icon="pi pi-ellipsis-h"
                                rounded
                                text
                                aria-label="Options"
                                className="options-btn"
                                onClick={(e) => toggle(e)}
                            />
                        </>
                    )}
                </div>
            </header>

            {/* Body */}
            <div className="post-body">
                <h2 className="post-title">{post.title}</h2>

                {post.description ? (
                    <div
                        className="post-description"
                        dangerouslySetInnerHTML={{__html: post.description}}
                    />
                ) : post.description ? (
                    <p className="post-description">{post.description}</p>
                ) : null}

                {post.embeds?.length ? (
                    <ul className="post-embeds">
                        {post.embeds.map((url) => (
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
            <footer className="post-footer" onClick={(e) => e.stopPropagation()}>
                <div className="post-actions-left">
                    <div className="vote-pill">
                        <i
                            className={`pi pi-arrow-up vote-icon ${isUpvoted ? "upvoted" : ""}`}
                            onClick={() => onVote?.(1)}
                        />
                        <span className="vote-count">{aura}</span>
                        <i
                            className={`pi pi-arrow-down vote-icon ${isDownvoted ? "downvoted" : ""}`}
                            onClick={() => onVote?.(-1)}
                        />
                    </div>

                    <button className="comment-btn">
                        <i className="pi pi-comment comment-icon"/>
                        <span>Comments</span>
                    </button>
                </div>

                <div className="post-actions-right">
                    <button className="icon-btn">
                        <i className="pi pi-share-alt"/>
                    </button>
                </div>
            </footer>
        </article>
    );
}
