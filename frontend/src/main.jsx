import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PageRoutes } from "./routes.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PageRoutes />
    </BrowserRouter>
  </StrictMode>,
);
