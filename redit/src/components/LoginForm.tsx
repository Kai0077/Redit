import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";

export default function LoginForm() {
    return (
        <div className="flex flex-column align-items-center justify-content-center w-full">
            <div className="surface-card p-5 shadow-2 border-round w-20rem flex flex-column gap-4"
                 style={{ backgroundColor: "#1A1A1B" }}>
                <h2 className="text-white text-center text-lg font-semibold">Log In</h2>

                {/* Username */}
                <div className="flex flex-column gap-1">
                    <label htmlFor="username" className="text-sm text-gray-300">Username</label>
                    <InputText
                        id="username"
                        type="text"
                        placeholder="Email *"
                        className="w-full border-none text-white"
                        style={{
                            backgroundColor: "#272729",
                        }}
                    />
                </div>

                {/* Password */}
                <div className="flex flex-column gap-1">
                    <label htmlFor="password" className="text-sm text-gray-300">Password</label>
                    <InputText
                        id="password"
                        type="password"
                        placeholder="Password *"
                        className="w-full border-none text-white"
                        style={{
                            backgroundColor: "#272729",
                        }}
                    />
                </div>

                {/* Login button */}
                <Button
                    label="Log In"
                    icon="pi pi-user"
                    className="w-full border-none text-white font-bold"
                />

                <Divider align="center">
                    <span className="text-sm text-gray-400">OR</span>
                </Divider>

                {/* Signup button */}
                <Button
                    label="Sign Up"
                    icon="pi pi-user-plus"
                    className="w-full border-none text-white font-bold"
                />
            </div>
        </div>
    );
}