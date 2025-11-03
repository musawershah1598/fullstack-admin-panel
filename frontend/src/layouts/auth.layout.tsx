import { Navigate, Outlet } from "react-router";
import { Spinner } from "~/components/ui/spinner";
import { useAuth } from "~/hooks/useAuth";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Spinner className="size-16 text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    <Navigate to={"/pages/auth/login"} replace />;
  } else {
    return (
      <main className="min-h-screen bg-gray-100">
        <Outlet />
      </main>
    );
  }
};

export default AuthLayout;
