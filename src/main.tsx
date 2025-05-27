import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./translations/i18n.ts";
import App from "./pages/App.tsx";
import "./styles/index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
