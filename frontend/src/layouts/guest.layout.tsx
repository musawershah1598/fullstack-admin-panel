import { Outlet } from "react-router";
import { useTheme } from "~/hooks/useTheme";

const GuestLayout = () => {
  useTheme();
  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-800">
      <Outlet />
    </main>
  );
};

export default GuestLayout;
