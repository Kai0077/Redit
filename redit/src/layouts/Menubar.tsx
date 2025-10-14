import { Menubar as PMenubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import type { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";

export interface AppUser {
    username: string;
    email: string;
    name?: string;
}

export default function Menubar({
                                    currentUser,
                                    onSignInClick,
                                    onLogout,
                                }: {
    currentUser: AppUser | null;
    onSignInClick: () => void;
    onLogout: () => void;
}) {
    const navigate = useNavigate();

    const items: MenuItem[] = [
        { label: "Home", icon: "pi pi-home", command: () => navigate("/") },
        { label: "Profile", icon: "pi pi-user", command: () => navigate("/profile") },
    ];

    const start = (
        <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height={36} className="mr-2" />
    );

    const end = currentUser ? (
        <div className="flex align-items-center gap-2">
      <span className="text-sm text-gray-300 hidden sm:block">
        Hi, {currentUser.name ?? currentUser.username}
      </span>
            <Button label="Profile" icon="pi pi-user" rounded severity="info" onClick={() => navigate("/profile")} />
            <Button label="Logout" icon="pi pi-sign-out" rounded severity="secondary" onClick={onLogout} />
        </div>
    ) : (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
            <Button label="Sign In" severity="info" rounded onClick={onSignInClick} />
        </div>
    );

    return (
        <div className="card w-full">
            <PMenubar
                model={items}
                start={start}
                end={end}
                style={{ backgroundColor: "#0E1113", border: "none" }}
            />
        </div>
    );
}
