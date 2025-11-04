import { useAuthStore } from "~/store/auth.store";
import { authService } from "~/services/auth.service";
import { useEffect } from "react";

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, setLoading } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      // Only check auth if we have a token
      const { accessToken, user: currentUser } = useAuthStore.getState();

      if (!accessToken) {
        setLoading(false);
        return;
      }

      if (currentUser) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        await authService.getCurrentUser();
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    logout: authService.logout,
  };
};
