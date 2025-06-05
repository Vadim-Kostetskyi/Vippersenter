import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./translations/i18n.ts";
import App from "./pages/App.tsx";
import "./styles/index.scss";
import { Provider } from "react-redux";
import { store } from "storeRedux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
