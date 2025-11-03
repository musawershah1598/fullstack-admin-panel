import { createBrowserRouter } from "react-router";

// components
import App from "./App.tsx";
import LoginPage from "~/pages/auth/login.tsx";
import GuestLayout from "~/layouts/guest.layout.tsx";
import AuthLayout from "~/layouts/auth.layout.tsx";
import DashboardPage from "~/pages/dashboard/index.tsx";

const router = createBrowserRouter([
  {
    Component: GuestLayout,
    children: [
      {
        index: true,
        Component: App,
      },
      {
        path: "pages/auth",
        children: [{ path: "login", Component: LoginPage }],
      },
    ],
  },
  {
    Component: AuthLayout,
    children: [
      {
        path: "pages/dashboard",
        children: [{ index: true, Component: DashboardPage }],
      },
    ],
  },
]);
export default router;
