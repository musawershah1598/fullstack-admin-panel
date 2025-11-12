import { Outlet } from "react-router";
import ThemeToggle from "~/components/theme-toggle";
import { useTheme } from "~/hooks/useTheme";

const GuestLayout = () => {
  useTheme();
  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-800">
      <div className="absolute top-8 left-8">
        <ThemeToggle />
      </div>
      <Outlet />
    </main>
  );
};

export default GuestLayout;
