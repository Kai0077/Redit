import { useState } from "react";
import Menubar from "../layouts/Menubar";
import LoginForm from "../components/LoginForm";

export default function HomePage() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="flex flex-column min-h-screen">
            <Menubar onSignInClick={() => setShowLogin(true)} />
            
            <div className="flex flex-1 align-items-center justify-content-center">
                {showLogin && (
                    <div className="w-full md:w-8 flex justify-content-center">
                        <LoginForm />
                    </div>
                )}
            </div>
        </div>
    );
}