import { useEffect, useMemo, useState, useCallback } from "react";
import { Menubar as PMenubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import type { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout as apiLogout } from "../api/user-auth";
import type { SignupResponse } from "../types/user";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm"; // <-- add this

export default function Menubar() {
    const navigate = useNavigate();

    // auth state
    const [rawUser, setRawUser] = useState<SignupResponse | null>(() => getCurrentUser());
    useEffect(() => {
        const sync = () => setRawUser(getCurrentUser());
        window.addEventListener("auth:changed", sync);
        window.addEventListener("storage", sync);
        return () => {
            window.removeEventListener("auth:changed", sync);
            window.removeEventListener("storage", sync);
        };
    }, []);

    const currentUser = useMemo(() => {
        if (!rawUser) return null;
        return { username: rawUser.username, email: rawUser.email, name: rawUser.name };
    }, [rawUser]);

    const items: MenuItem[] = [{ label: "Home", icon: "pi pi-home", command: () => navigate("/") }];

    // ---- Auth modal (no URL change) ----
    const [authOpen, setAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState<"login" | "signup">("login");

    const handleSignInClick = useCallback(() => {
        setAuthMode("login");
        setAuthOpen(true);
    }, []);

    const handleLoggedIn = useCallback(() => {
        setAuthOpen(false);
        setRawUser(getCurrentUser());
        window.dispatchEvent(new Event("auth:changed"));
    }, []);

    // ---- Logout ----
    const handleLogout = useCallback(async () => {
        try {
            const username = currentUser?.username ?? getCurrentUser()?.username;
            if (username) {
                await apiLogout({ username });
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.dispatchEvent(new Event("auth:changed"));
            }
        } catch {
            // ignore
        } finally {
            navigate("/", { replace: true });
        }
    }, [currentUser?.username, navigate]);

    const start = (
        <img
            alt="logo"
            src="https://primefaces.org/cdn/primereact/images/logo.png"
            height={36}
            className="mr-2"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
        />
    );

    const end = currentUser ? (
        <div className="flex align-items-center gap-2">
            <Button label="Profile" icon="pi pi-user" rounded severity="info" onClick={() => navigate("/profile")} />
            <Button label="Logout" icon="pi pi-sign-out" rounded severity="secondary" onClick={handleLogout} />
        </div>
    ) : (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
            <Button label="Sign In" severity="info" rounded onClick={handleSignInClick} />
        </div>
    );

    return (
        <>
            <div className="card w-full">
                <PMenubar model={items} start={start} end={end} style={{ backgroundColor: "#0E1113", border: "none" }} />
            </div>

            {/* Auth modal */}
            <Dialog
                visible={authOpen}
                onHide={() => setAuthOpen(false)}
                dismissableMask
                draggable={false}
                style={{ width: authMode === "login" ? "28rem" : "40rem" }}
                className="auth-dialog"
            >
                {authMode === "login" ? (
                    <LoginForm
                        onSwitchForm={() => setAuthMode("signup")}
                        onLoggedIn={handleLoggedIn}
                    />
                ) : (
                    <SignupForm onSwitchForm={() => setAuthMode("login")} />
                )}
            </Dialog>
        </>
    );
}
