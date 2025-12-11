import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PageRoutes } from "./routes.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

<<<<<<< HEAD
createRoot(document.getElementById('root')).render(
  <StrictMode> {/*layout*/}
=======
createRoot(document.getElementById("root")).render(
  <StrictMode>
>>>>>>> 0841ecc4288a8d8b88eb8261a4336fac298f16bd
    <BrowserRouter>
      <PageRoutes />
    </BrowserRouter>
  </StrictMode>,
);
