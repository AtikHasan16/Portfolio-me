import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./Router/Router.jsx";
import { LanguageProvider } from "./Contexts/LanguageContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  </StrictMode>
);
