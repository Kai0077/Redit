import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Logout from "./components/Logout.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import {AccountRole} from "./types/user.ts";
import PostPage from "./pages/PostPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

function App() {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: 10,
                        staleTime: 10_000, // 10 seconds.
                        gcTime: 5 * 60_000, // Cache time.
                        refetchOnWindowFocus: true,
                        refetchOnReconnect: true,
                        refetchOnMount: true,
                    },
                },
            })
    );
    return (
        <QueryClientProvider client={queryClient}>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post" element={<PostPage />} />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin"
                element={
                    <ProtectedRoute requiredRole={AccountRole.SuperUser}>
                        <AdminPage />
                    </ProtectedRoute>
                }
            >
            </Route>

            <Route path="/" element={<Logout />} />
        </Routes>
            </QueryClientProvider>
    );
}

export default App;
