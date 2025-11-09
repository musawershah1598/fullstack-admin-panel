import { createBrowserRouter } from "react-router";

// components
import App from "./App.tsx";
import LoginPage from "~/pages/auth/login.tsx";
import GuestLayout from "~/layouts/guest.layout.tsx";
import AuthLayout from "~/layouts/auth.layout.tsx";
import DashboardPage from "~/pages/dashboard/index.tsx";
import { LayoutDashboard, User, Users, type LucideIcon } from "lucide-react";
import { UserRole } from "~/types/user.type.ts";

import ProfilePage from "~/pages/dashboard/settings/profile.tsx";
import UsersPage from "~/pages/dashboard/settings/users.tsx";

const admin: Array<UserRole> = [UserRole.ADMIN, UserRole.USER];
const onlyAdmin: Array<UserRole> = [UserRole.ADMIN];
// const user = [UserRole.USER];

export type Routes = {
  key: string;
  title: string;
  path: string;
  type: Array<UserRole>;
  status: boolean;
  children: Array<{
    key: string;
    title: string;
    icon: LucideIcon;
    path: string;
    type: Array<UserRole>;
    status: boolean;
  }>;
};

export const adminRoutes: Routes[] = [
  {
    key: "dashboard",
    title: "Dashboard",
    path: "dashboard",
    type: admin,
    status: true,
    children: [
      {
        key: "overview",
        title: "Overview",
        icon: LayoutDashboard,
        path: "/overview",
        type: admin,
        status: true,
      },
    ],
  },
  {
    key: "settings",
    title: "Settings",
    path: "settings",
    type: admin,
    status: true,
    children: [
      {
        key: "user-list",
        title: "User List",
        icon: Users,
        path: "/users",
        type: onlyAdmin,
        status: true,
      },
      {
        key: "profile",
        title: "Profile",
        icon: User,
        path: "/profile",
        type: admin,
        status: true,
      },
    ],
  },
];

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
        children: [{ path: "overview", Component: DashboardPage }],
      },
      {
        path: "pages/settings",
        children: [
          { path: "users", Component: UsersPage },
          { path: "profile", Component: ProfilePage },
        ],
      },
    ],
  },
]);
export default router;
