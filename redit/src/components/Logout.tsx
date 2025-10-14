// src/pages/Logout.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout as apiLogout } from "../api/user-auth";
import type { LogoutRequest } from "../types/user";
import type { SignupResponse } from "../types/user";

type LogoutProps = { redirectTo?: string };

export default function Logout({ redirectTo = "/" }: LogoutProps) {
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        (async () => {
            try {
                // Read user from localStorage to get the username
                const raw = localStorage.getItem("user");
                const user: SignupResponse | null = raw ? JSON.parse(raw) : null;
                const username = user?.username;

                if (username) {
                    const body: LogoutRequest = { username };
                    await apiLogout(body); // server + local cleanup happens in helper
                } else {
                    // If we somehow don't have a user, still clear local and continue
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    window.dispatchEvent(new Event("auth:changed"));
                }
            } catch {
                // Ignore API errors; local cleanup already handled in helper/finally
            } finally {
                if (isMounted) navigate(redirectTo, { replace: true });
            }
        })();

        return () => { isMounted = false; };
    }, [navigate, redirectTo]);

    return (
        <div className="flex align-items-center justify-content-center" style={{ minHeight: "40vh" }}>
            <div className="text-center">
                <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }} />
                <p className="mt-3 text-gray-300">Logging you out…</p>
            </div>
        </div>
    );
}
