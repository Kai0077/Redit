import type { User } from "../../types/user";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import "../../assets/AdminUserCard.css";
import {usePopupMenu} from "../../hooks/usePopupMenu.ts";

interface AdminUserCardProps {
    user: User;
    onDelete?: (user: User) => void;
}

export default function AdminUserCard({ user, onDelete }: AdminUserCardProps) {
    const { menuRef, toggle, hide } = usePopupMenu();

    const menuItems = [
        {
            label: "Delete User",
            icon: "pi pi-trash",
            command: () => {
                onDelete?.(user);
                hide();
            },
        },
    ];

    return (
        <article className="user-card">
            <div className="user-card-content">
                <div className="user-info">
                    {user.profilePicture ? (
                        <Avatar
                            image={user.profilePicture}
                            shape="circle"
                            size="large"
                            className="user-avatar"
                        />
                    ) : (
                        <Avatar
                            label={user.username.charAt(0).toUpperCase()}
                            shape="circle"
                            size="large"
                            className="user-avatar"
                        />
                    )}
                    <span className="user-username">{user.username}</span>
                </div>

                <div className="user-options">
                    <Menu model={menuItems} popup ref={menuRef} />
                    <Button
                        icon="pi pi-ellipsis-h"
                        rounded
                        text
                        aria-label="Options"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggle(e);
                        }}
                    />
                </div>
            </div>
        </article>
    );
}