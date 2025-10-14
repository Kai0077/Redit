// pages/HomePage.tsx
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import Menubar from "../layouts/Menubar";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { getCurrentUser } from "../api/user-auth";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState<"login" | "signup">("login");
    const [currentUser, setCurrentUser] = useState(getCurrentUser());
    const navigate = useNavigate();

    // sync with localStorage on mount (optional)
    useEffect(() => setCurrentUser(getCurrentUser()), []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setCurrentUser(null);
        navigate("/");
    };

    return (
        <div className="flex flex-column min-h-screen">
            <Menubar
                currentUser={currentUser}
                onSignInClick={() => {
                    setFormType("login");
                    setShowForm(true);
                }}
                onLogout={handleLogout}
            />

            <Dialog
                visible={showForm}
                onHide={() => setShowForm(false)}
                dismissableMask
                closable
                modal
                style={{ width: formType === "signup" ? "46rem" : "26rem" }}
            >
                {formType === "login" ? (
                    <LoginForm
                        onSwitchForm={() => setFormType("signup")}
                        onLoggedIn={(user) => {
                            setCurrentUser(user);
                            setShowForm(false);
                            navigate("/profile");
                        }}
                    />
                ) : (
                    <SignupForm
                        onSwitchForm={() => setFormType("login")}
                    />
                )}
            </Dialog>
        </div>
    );
}
