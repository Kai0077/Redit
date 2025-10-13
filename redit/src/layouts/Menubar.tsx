import { Menubar as PMenubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import type { MenuItem } from "primereact/menuitem";

export default function Menubar({ onSignUpClick }: { onSignUpClick?: () => void }) {
    const items: MenuItem[] = [
        { label: "Home", icon: "pi pi-home" },
    ];

    const start = (
        <img
            alt="logo"
            src="https://primefaces.org/cdn/primereact/images/logo.png"
            height={40}
            className="mr-2"
        />
    );

    const end = (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
            <Button
                label="Sign Up"
                severity="info"
                rounded
                onClick={onSignUpClick}
            />
        </div>
    );

    return (
        <div className="card w-full">
            <PMenubar model={items} start={start} end={end} />
        </div>
    );
}
