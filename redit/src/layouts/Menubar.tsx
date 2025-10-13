import { Menubar as PMenubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";
import type { MenuItem } from "primereact/menuitem";
import {Button} from "primereact/button";

export default function Menubar() {
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
            <Button label="Sign In" severity="info" rounded />
        </div>
    );

    return (
        <div className="card">
            <PMenubar model={items} start={start} end={end} />
        </div>
    );
}