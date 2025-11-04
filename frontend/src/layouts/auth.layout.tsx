import { Navigate, Outlet } from "react-router";
import LeftBarComponent from "~/components/leftbar";
import TopBarComponent from "~/components/topbar";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { Spinner } from "~/components/ui/spinner";
import { useAuth } from "~/hooks/useAuth";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Spinner className="size-16 text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={"/pages/auth/login"} replace />;
  } else {
    return (
      <main className="min-h-screen bg-gray-50">
        <SidebarProvider>
          <LeftBarComponent />

          <SidebarInset className="bg-gray-50">
            <TopBarComponent />
            <div className="p-8">
              <Outlet />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </main>
    );
  }
};

export default AuthLayout;
