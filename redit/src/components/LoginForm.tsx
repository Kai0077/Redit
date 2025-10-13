import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";

interface LoginFormProps {
    onSwitchForm: () => void;
}

export default function LoginForm({ onSwitchForm }: LoginFormProps) {
    return (
        <div className="flex flex-column align-items-center justify-content-center w-full">
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
                        <span style={{ color: "#FF4500" }}>*</span>
                    </div>
                    <InputText
                        id="email"
                        type="text"
                        placeholder="Email"
                        className="w-full text-gray-200 text-sm p-3 border-round-2xl"
                    />
                </div>

                {/* Password */}
                <div className="flex flex-column gap-2">
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

                {/* Login button */}
                <Button
                    label="Log In"
                    icon="pi pi-user"
                    className="w-full text-white font-bold p-3 border-none border-round-2xl"
                />

                <Divider align="center">
                    <span className="text-sm text-gray-400">OR</span>
                </Divider>

                <Button
                    label="Create a new account"
                    icon="pi pi-user-plus"
                    className="w-full text-white font-bold p-3 border-none border-round-2xl"
                    onClick={onSwitchForm}
                />
            </div>
        </div>
    );
}