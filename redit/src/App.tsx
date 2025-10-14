import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
