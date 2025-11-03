import { useAuthStore } from "~/store/auth.store";
import { authService } from "~/services/auth.service";
import { useEffect } from "react";

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, setLoading } = useAuthStore();

  useEffect(() => {
    // Check authentication on mount
    const checkAuth = async () => {
      setLoading(true);
      await authService.getCurrentUser();
      setLoading(false);
    };

    checkAuth();
  }, [setLoading]);

  return {
    user,
    isAuthenticated,
    isLoading,
    logout: authService.logout,
  };
};
