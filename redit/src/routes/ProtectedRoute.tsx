import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../api/user-auth";
import * as React from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const user = getCurrentUser();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}