import { useEffect, useMemo, useState } from "react";
import TabBar from "../components/TabBar";
import Menubar, { type AppUser } from "../layouts/Menubar";
import { getCurrentUser } from "../api/user-auth";
import type { SignupResponse } from "../types/user";

export default function ProfilePage() {
    const [rawUser, setRawUser] = useState<SignupResponse | null>(() => getCurrentUser());

    useEffect(() => {
        const sync = () => setRawUser(getCurrentUser());
        window.addEventListener("storage", sync);
        window.addEventListener("auth:changed", sync);
        return () => {
            window.removeEventListener("storage", sync);
            window.removeEventListener("auth:changed", sync);
        };
    }, []);

    const currentUser: AppUser | null = useMemo(() => {
        if (!rawUser) return null;
        return { username: rawUser.username, email: rawUser.email, name: rawUser.name };
    }, [rawUser]);

    const headerTitle = currentUser?.username ?? "Profile";

    return (
        <>
            <Menubar />
            <div className="p-4">
                <h2 className="text-white">@{headerTitle}</h2>
                <TabBar />
            </div>
        </>
    );
}
