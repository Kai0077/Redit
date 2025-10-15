import { useRef, useState } from "react";
import { signup } from "../api/user-auth.ts";
import type { SignupRequest } from "../types/user.ts";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import AppToast, { type AppToastHandle } from "./AppToast";

interface SignupFormProps {
    onSwitchForm: () => void;
    onSignedUp?: () => void;
}

interface SignupFormState extends SignupRequest {
    confirmPassword: string;
}

export default function SignupForm({ onSwitchForm, onSignedUp }: SignupFormProps) {
    const [form, setForm] = useState<SignupFormState>({
        username: "",
        name: "",
        age: 0,
        email: "",
        password: "",
        confirmPassword: "",
    });
    const toastRef = useRef<AppToastHandle>(null);

    const passwordsMatch = form.password === form.confirmPassword || !form.confirmPassword;

    // Validation
    const isAgeValid = Number.isInteger(form.age) && form.age >= 13;
    const isPasswordValid = (form.password?.length ?? 0) >= 8;
    const emailsLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    const hasUsername = form.username.trim().length > 0;
    const passwordsMatchStrict =
        form.confirmPassword.length > 0 && form.password === form.confirmPassword;

    const invalid = !(
        isAgeValid &&
        isPasswordValid &&
        emailsLooksValid &&
        hasUsername &&
        passwordsMatchStrict
    );

    const handleSignup = async () => {
        if (invalid) {
            const errors: string[] = [];
            if (!hasUsername) errors.push("Username is required.");
            if (!emailsLooksValid) errors.push("Please enter a valid email address.");
            if (!isAgeValid) errors.push("You must be at least 13 years old.");
            if (!isPasswordValid) errors.push("Password must be at least 8 characters.");
            if (!passwordsMatchStrict) errors.push("Passwords do not match.");

            if (errors.length === 1) {
                toastRef.current?.showError(errors[0]);
            } else {
                toastRef.current?.showError("You have more than one invalid input.");
            }
            return;
        }

        try {
            const result = await signup({
                username: form.username,
                name: form.name,
                age: form.age,
                email: form.email,
                password: form.password,
            });

            toastRef.current?.showSuccess("Successfully created account!");
            console.log("Signup successful:", result.email);

            setTimeout(() => {
                onSignedUp?.();
            }, 1000);
        } catch (error: any) {
            const status = error?.response?.status;
            const message: string =
                error?.response?.data?.message || "Something went wrong!";
            console.log("--------------------------------------------------------------------------------------");
            console.log(status, message);

            if (status === 400) {
                if (/username/i.test(message)) {
                    toastRef.current?.showError("Username is already taken.");
                } else if (/email/i.test(message)) {
                    toastRef.current?.showError("Email is already in use.");
                } else {
                    toastRef.current?.showError("Account already exists.");
                }
            } else {
                toastRef.current?.showError(message);
            }

            console.error(error?.response?.data || error?.message);
        }
    };

    return (
        <div className="flex flex-column align-items-center justify-content-center w-full">
            <AppToast ref={toastRef} />
            <div className="p-4 flex flex-column gap-4 surface-card">
                <h2 className="text-white text-center text-lg font-semibold mb-2">
                    Sign Up
                </h2>

                <div className="flex justify-content-between gap-4 w-full">
                    {/* LEFT column */}
                    <div className="flex flex-column gap-3" style={{ width: "48%" }}>
                        {/* Username */}
                        <div>
                            <div className="flex align-items-center gap-1">
                                <label htmlFor="username" className="text-sm text-gray-300 ml-2">
                                    Username
                                </label>
                                <span style={{ color: "#FF4500" }}>*</span>
                            </div>
                            <InputText
                                id="username"
                                placeholder="Username"
                                className="w-full text-gray-200 text-sm p-3 border-round-2xl"
                                onChange={(event) =>
                                    setForm({ ...form, username: event.target.value })
                                }
                            />
                        </div>

                        {/* Name */}
                        <div>
                            <div className="flex align-items-center gap-1">
                                <label htmlFor="name" className="text-sm text-gray-300 ml-2">
                                    Name
                                </label>
                                <span style={{ color: "#FF4500" }}>*</span>
                            </div>
                            <InputText
                                id="name"
                                placeholder="Name"
                                className="w-full text-gray-200 text-sm p-3 border-round-2xl"
                                onChange={(event) =>
                                    setForm({ ...form, name: event.target.value })
                                }
                            />
                        </div>

                        {/* Age */}
                        <div>
                            <div className="flex align-items-center gap-1">
                                <label htmlFor="age" className="text-sm text-gray-300 ml-2">
                                    Age
                                </label>
                                <span style={{ color: "#FF4500" }}>*</span>
                            </div>
                            <InputNumber
                                id="age"
                                placeholder="Age"
                                className="w-full text-gray-200 text-sm border-round-2xl"
                                inputStyle={{
                                    backgroundColor: "#2A3236",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "1rem",
                                    padding: "1rem 1rem",
                                    fontSize: "0.875rem",
                                }}
                                onChange={(event) =>
                                    setForm({ ...form, age: event.value || 0 })
                                }
                            />
                        </div>
                    </div>

                    {/* RIGHT column */}
                    <div className="flex flex-column gap-3" style={{ width: "48%" }}>
                        {/* Email */}
                        <div>
                            <div className="flex align-items-center gap-1">
                                <label htmlFor="email" className="text-sm text-gray-300 ml-2">
                                    Email
                                </label>
                                <span style={{ color: "#FF4500" }}>*</span>
                            </div>
                            <InputText
                                id="email"
                                placeholder="Email"
                                className="w-full text-gray-200 text-sm p-3 border-round-2xl"
                                onChange={(event) =>
                                    setForm({ ...form, email: event.target.value })
                                }
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex align-items-center gap-1">
                                <label htmlFor="password" className="text-sm text-gray-300 ml-2">
                                    Password
                                </label>
                                <span style={{ color: "#FF4500" }}>*</span>
                            </div>
                            <InputText
                                id="password"
                                type="password"
                                placeholder="Password"
                                className={`w-full text-gray-200 text-sm p-3 border-round-2xl ${
                                    !passwordsMatch ? "border-red-500" : ""
                                }`}
                                onChange={(event) =>
                                    setForm({ ...form, password: event.target.value })
                                }
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <div className="flex align-items-center gap-1">
                                <label htmlFor="confirm" className="text-sm text-gray-300 ml-2">
                                    Confirm Password
                                </label>
                                <span style={{ color: "#FF4500" }}>*</span>
                            </div>
                            <InputText
                                id="confirm"
                                type="password"
                                placeholder="Confirm Password"
                                className={`w-full text-gray-200 text-sm p-3 border-round-2xl ${
                                    !passwordsMatch ? "border-red-500" : ""
                                }`}
                                onChange={(event) =>
                                    setForm({ ...form, confirmPassword: event.target.value })
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* Sign Up Button */}
                <Button
                    label="Sign Up"
                    icon="pi pi-user-plus"
                    className="w-full text-white font-bold p-3 border-none border-round-2xl"
                    onClick={handleSignup}
                />

                <Divider align="center">
                    <span className="text-sm text-gray-400">OR</span>
                </Divider>

                <Button
                    label="Already have an account?"
                    icon="pi pi-sign-in"
                    className="w-full text-white font-bold p-3 border-none border-round-2xl"
                    onClick={onSwitchForm}
                />
            </div>
        </div>
    );
}