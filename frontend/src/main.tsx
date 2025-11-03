import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router";
import router from "~/routes";
import { AlertContainer } from "~/components/alert-container";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AlertContainer />
    <RouterProvider router={router} />
  </StrictMode>
);
