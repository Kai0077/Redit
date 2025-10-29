import { useEffect, useRef, useState } from "react";
import { getAllUsers, deleteUser } from "../../api/user-auth.ts";
import type { User } from "../../types/user";
import AppToast, { type AppToastHandle } from "../../components/AppToast";
import AdminUserCard from "./AdminUserCard";

export default function AdminUserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const toastRef = useRef<AppToastHandle>(null);

    useEffect(() => {
        loadUsers();
    }, []);
    
    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (error: any) {
            const message =
                error.response?.data?.message || 
                error.message || 
                "Failed to load users.";
            toastRef.current?.showError(message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleDelete = async (user: User) => {
        try {
            await deleteUser(user.username);
            setUsers((prevState) => prevState.filter((existingUser) => existingUser.username !== user.username));
            toastRef.current?.showSuccess("User deleted successfully.");
        } catch (error: any) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Unauthorized: You are not allowed to perform this action.";
            toastRef.current?.showError(message);
        }
    };
    
    return (
        <div className="flex flex-column gap-3 p-3">
            <AppToast ref={toastRef}/>

            {loading ? (
                <p className="text-gray-400">Loading users...</p>
            ) : users.length === 0 ? (
                <p className="text-gray-500">No users found.</p>
            ) : (
                <div className="flex flex-column gap-3">
                    {users.map((user) => (
                        <AdminUserCard
                            key={user.username}
                            user={user}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
} 