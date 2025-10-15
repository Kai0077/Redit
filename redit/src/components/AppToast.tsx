import { Toast } from "primereact/toast";
import { useRef, useImperativeHandle, forwardRef } from "react";

export type AppToastHandle = {
    showError: (message: string) => void;
    showSuccess: (message: string) => void;
    showInfo: (message: string) => void;
};

const AppToast = forwardRef<AppToastHandle>((_, ref) => {
    const toastRef = useRef<Toast>(null);

    useImperativeHandle(ref, () => ({
        showError: (message: string) => {
            toastRef.current?.show({
                severity: "error",
                summary: "Error",
                detail: message,
                life: 4000,
            });
        },
        showSuccess: (message: string) => {
            toastRef.current?.show({
                severity: "success",
                summary: "Success",
                detail: message,
                life: 4000,
            });
        },
        showInfo: (message: string) => {
            toastRef.current?.show({
                severity: "info",
                summary: "Info",
                detail: message,
                life: 4000,
            });
        },
    }));

    return <Toast ref={toastRef} position="top-right" />;
});

export default AppToast;
