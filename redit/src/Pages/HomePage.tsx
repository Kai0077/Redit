import { useState } from "react";
import { Dialog } from "primereact/dialog";
import Menubar from "../layouts/Menubar";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

export default function HomePage() {
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState<"login" | "signup">("login");

    return (
        <div className="flex flex-column min-h-screen">
            <Menubar
                onSignUpClick={() => {
                    setFormType("login");
                    setShowForm(true);
                }}
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
                    <LoginForm onSwitchForm={() => setFormType("signup")} />
                ) : (
                    <SignupForm onSwitchForm={() => setFormType("login")} />
                )}
            </Dialog>
        </div>
    );
}