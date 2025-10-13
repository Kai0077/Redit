import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";

interface SignupFormProps {
    onSwitchForm: () => void;
}

export default function SignupForm({ onSwitchForm }: SignupFormProps) {
    return (
        <div className="flex flex-column align-items-center justify-content-center w-full">
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
                                className="w-full text-gray-200 text-sm p-3 border-round-2xl"
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
                                className="w-full text-gray-200 text-sm p-3 border-round-2xl"
                            />
                        </div>
                    </div>
                </div>

                {/* Sign Up Button */}
                <Button
                    label="Sign Up"
                    icon="pi pi-user-plus"
                    className="w-full text-white font-bold p-3 border-none border-round-2xl"
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