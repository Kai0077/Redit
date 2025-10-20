import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../api/user-auth";
import * as React from "react";
import type {AccountRole} from "../types/user.ts";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: AccountRole.User | AccountRole.SuperUser;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
    const user = getCurrentUser();
    
    if (!user) {
        return <Navigate to="/" replace />;
    }
    
    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}