import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AuthProvider";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const container = document.getElementById("root");

const root = createRoot(container);
root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
