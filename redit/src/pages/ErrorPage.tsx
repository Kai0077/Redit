import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "primereact/button";

type Props = { status?: 404 | 500; message?: string };

export default function ErrorPage(props: Props) {
    const state = (useLocation().state as Props) || {};
    const status = props.status ?? state.status ?? 500;
    const message = props.message ?? state.message;

    const title = status === 404 ? "Page not found" : "Server error";
    const desc =
        status === 404
            ? "We couldn't find that page."
            : message ?? "Something broke on our side. Please try again.";
    const navigate = useNavigate();

    return (
        <div style={{ padding: 24, textAlign: "center", color: "#e5e7eb" }}>
            <h1 style={{ fontSize: 24, marginBottom: 8 }}>{title}</h1>
            <p style={{ opacity: 0.85 }}>Code: {status}</p>
            <p style={{ marginTop: 8 }}>{desc}</p>
            <div style={{ marginTop: 16 }}>
                <Button
                    onClick={() => navigate("/")}
                >Go home</Button>
            </div>
        </div>
    );
}