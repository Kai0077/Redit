import { useRef, useState, useEffect } from "react";
import type { Menu } from "primereact/menu";
import * as React from "react";

export function usePopupMenu() {
    const menuRef = useRef<Menu>(null);
    const [visible, setVisible] = useState(false);

    const show = (event: React.MouseEvent) => {
        menuRef.current?.show(event);
        setVisible(true);
    };

    const hide = () => {
        menuRef.current?.hide({} as React.SyntheticEvent);
        setVisible(false);
    };

    const toggle = (event: React.MouseEvent) => {
        if (visible) hide();
        else show(event);
    };

    useEffect(() => {
        const handleClickOutside = () => {
            if (visible) hide();
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [visible]);

    return { menuRef, visible, show, hide, toggle };
}
