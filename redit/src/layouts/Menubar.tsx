import { Menubar as PMenubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import type { MenuItem } from "primereact/menuitem";

interface MenubarProps {
    onSignInClick?: () => void;
}

export default function Menubar({ onSignInClick }: MenubarProps) {
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
            <InputText
                placeholder="Search"
                type="text"
                className="w-8rem sm:w-auto"
            />
            <Button
                label="Sign In"
                severity="info"
                rounded
                onClick={onSignInClick}
            />
        </div>
    );

    return (
        <header className="w-full surface-800 shadow-2">
            <PMenubar
                model={items}
                start={start}
                end={end}
                className="w-full justify-content-between px-4 border-none"
            />
        </header>
    );
}
