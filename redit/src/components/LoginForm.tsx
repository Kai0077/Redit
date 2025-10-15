import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Divider} from "primereact/divider";
import {useRef, useState} from "react";
import type { LoginRequest, SignupResponse } from "../types/user.ts";
import {login} from "../api/user-auth.ts";
import AppToast, { type AppToastHandle } from "./AppToast";

interface LoginFormProps {
    onSwitchForm: () => void;
    onLoggedIn?: (user: SignupResponse) => void;
}

export default function LoginForm({onSwitchForm, onLoggedIn}: LoginFormProps) {
    const [form, setForm] = useState<LoginRequest>({ email: "", password: "" });
    const toastRef = useRef<AppToastHandle>(null);
    const [loading, setLoading] = useState(false);
    
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        setError(null);
        setLoading(true);

        try {
            const response = await login(form);
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));
            onLoggedIn?.(response.user);
            
        } catch (error: any) {
            const message = error?.response?.data?.message || "Login failed. Please check your credentials and try again.";
            toastRef.current?.showError(message);
        } finally {
            setLoading(false);
        }
    };

    const inputErrorClass = error
        ? "border-1 border-red-500 focus:border-red-500"
        : "border-transparent focus:border-blue-400";

    return (
        <div className="flex flex-column align-items-center justify-content-center w-full">
            <AppToast ref={toastRef} />
            <div className="p-4 w-20rem flex flex-column gap-4 surface-card">
                <h2 className="text-white text-center text-lg font-semibold mb-2">
                    Log In
                </h2>

                {/* Email */}
                <div className="flex flex-column gap-2">
                    <div className="flex align-items-center gap-1">
                        <label htmlFor="email" className="text-sm text-gray-300 ml-2">
                            Email
                        </label>
                        <span style={{color: "#FF4500"}}>*</span>
                    </div>
                    <InputText
                        id="email"
                        type="text"
                        placeholder="Email"
                        value={form.email}
                        onChange={(event) => setForm({...form, email: event.target.value})}
                        onKeyDown={(event) => event.key === "Enter" && handleLogin()}
                        className={`w-full text-gray-200 text-sm p-3 border-round-2xl ${inputErrorClass}`}
                        style={{
                            backgroundColor: "#2A3236",
                        }}
                    />
                </div>

                {/* Password */}
                <div className="flex flex-column gap-2">
                    <div className="flex align-items-center gap-1">
                        <label htmlFor="password" className="text-sm text-gray-300 ml-2">
                            Password
                        </label>
                        <span style={{color: "#FF4500"}}>*</span>
                    </div>
                    <InputText
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(event) => setForm({...form, password: event.target.value})}
                        onKeyDown={(event) => event.key === "Enter" && handleLogin()}
                        className={`w-full text-gray-200 text-sm p-3 border-round-2xl ${inputErrorClass}`}
                        style={{
                            backgroundColor: "#2A3236",
                        }}
                    />
                </div>

                {/* Login button */}
                <Button
                    label={loading ? "Logging in..." : "Log In"}
                    icon="pi pi-user"
                    loading={loading}
                    className="w-full text-white font-bold p-3 border-none border-round-2xl"
                    onClick={handleLogin}
                    disabled={loading}
                />

                <Divider align="center">
                    <span className="text-sm text-gray-400">OR</span>
                </Divider>

                <Button
                    type="submit"
                    label="Create a new account"
                    icon="pi pi-user-plus"
                    className="w-full text-white font-bold p-3 border-none border-round-2xl"
                    onClick={onSwitchForm}
                />
            </div>
        </div>
    );
}