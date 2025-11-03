import { useAuthStore } from "~/store/auth.store";
import type { ValidationErrorObj } from "~/types/default";
import type {
  LoginFormProps,
  LoginResponse,
  LoginSuccessResponse,
  User,
} from "~/types/user";

export const authService = {
  async login(data: LoginFormProps): Promise<LoginResponse> {
    try {
      const res = await fetch(`/api/v1/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const body = await res.json();
      if (body.statusCode == 422) {
        return {
          status: 422,
          message: body.message,
          data: body.data as ValidationErrorObj,
        };
      }
      if (body.statusCode == 200) {
        return {
          status: true,
          message: body.message,
          data: body.data as LoginSuccessResponse,
        };
      } else {
        return { status: false, message: body.message };
      }
    } catch (error) {
      return { status: false, message: "Internal Server Error" };
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = useAuthStore.getState().accessToken;

      if (!token) {
        useAuthStore.getState().clearAuth();
        return null;
      }

      const res = await fetch("/api/v1/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const body = await res.json();

      if (!body.success) {
        useAuthStore.getState().clearAuth();
        return null;
      }

      useAuthStore.getState().setAuth(body.data as User, token);
      return body.data as User;
    } catch (error) {
      console.error("Get current user error:", error);
      useAuthStore.getState().clearAuth();
      return null;
    }
  },

  async logout() {
    try {
      const token = useAuthStore.getState().accessToken;

      await fetch("/api/v1/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      useAuthStore.getState().clearAuth();
    } catch (error) {
      console.error("Logout error:", error);
      // Clear auth even if request fails
      useAuthStore.getState().clearAuth();
    }
  },

  async refreshToken() {
    try {
      const res = await fetch("/api/v1/auth/refresh", {
        method: "POST",
        credentials: "include", // Send cookies
      });

      const body = await res.json();

      if (!body.success) {
        useAuthStore.getState().clearAuth();
        return null;
      }

      useAuthStore.getState().setAuth(body.data.user, body.data.accessToken);
      return body.data.accessToken;
    } catch (error) {
      console.error("Refresh token error:", error);
      useAuthStore.getState().clearAuth();
      return null;
    }
  },
};
