import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import Routes from "./router/Routes.tsx";
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthContextProvider>
            <Routes></Routes>
        </AuthContextProvider>
    </StrictMode>
);
