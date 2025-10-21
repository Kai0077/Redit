import type { Post } from "../../types/post";

interface PostCardProps {
    post: Post;
    onVote?: (value: 1 | -1) => void;
    isUpvoted?: boolean;
    isDownvoted?: boolean;
    onOpen?: () => void;
}

/** Tiny helper: get visible text content from HTML */
function htmlText(html: string | null | undefined): string {
    if (!html) return "";
    const div = document.createElement("div");
    div.innerHTML = html;
    return (div.textContent || "").trim();
}

export default function PostCard({
                                     post,
                                     onVote,
                                     isUpvoted,
                                     isDownvoted,
                                     onOpen,
                                 }: PostCardProps) {
    const aura = post.aura ?? 0;

    // Compute once, BEFORE return
    const hasDesc = !!htmlText(post.description);

    return (
        <article className="post-card" role="article" onClick={onOpen}>
            {/* Header */}
            <header className="post-header">
                <div className="post-header-left">
                    <div className="community-icon" />
                    <div className="community-info">
                        <div className="community-line">
                            {post.community && (
                                <span className="community-name">r/{post.community}</span>
                            )}
                            <span className="community-meta">
                • Posted by u/{post.originalPoster}
              </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Body */}
            <div className="post-body">
                <h2 className="post-title">{post.title}</h2>

                {hasDesc && (
                    <div className="post-description">
                        {htmlText(post.description)}
                    </div>
                )}

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
            <footer className="post-footer">
                <div className="post-actions-left">
                    <div className="vote-pill">
                        <i
                            className={`pi pi-arrow-up vote-icon ${isUpvoted ? "upvoted" : ""}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                onVote?.(1);
                            }}
                        />
                        <span className="vote-count">{aura}</span>
                        <i
                            className={`pi pi-arrow-down vote-icon ${isDownvoted ? "downvoted" : ""}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                onVote?.(-1);
                            }}
                        />
                    </div>

                    <button className="comment-btn" onClick={(e) => e.stopPropagation()}>
                        <i className="pi pi-comment comment-icon" />
                        <span>Comments</span>
                    </button>
                </div>

                <div className="post-actions-right">
                    <button className="icon-btn" onClick={(e) => e.stopPropagation()}>
                        <i className="pi pi-share-alt" />
                    </button>
                </div>
            </footer>
        </article>
    );
}
