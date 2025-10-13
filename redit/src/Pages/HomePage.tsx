import { useState } from "react";
import { Dialog } from "primereact/dialog";
import Menubar from "../layouts/Menubar";
import LoginForm from "../components/LoginForm";

export default function HomePage() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="flex flex-column min-h-screen">
            <Menubar onSignInClick={() => setShowLogin(true)} />

            <div className="flex flex-1 align-items-center justify-content-center" />

            <Dialog
                visible={showLogin}
                onHide={() => setShowLogin(false)}
                dismissableMask
                closable
                modal
                style={{ width: "26rem" }}
            >
                <LoginForm />
            </Dialog>
        </div>
    );
}