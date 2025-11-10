import { apiFetch } from "~/lib/api";
import { useAuthStore } from "~/store/auth.store";
import type { ApiResponse, ValidationErrorObj } from "~/types/default.type";
import type {
  LoginFormProps,
  LoginResponse,
  LoginSuccessResponse,
  PasswordFormProps,
  ProfileFormProps,
  User,
} from "~/types/user.type";

export const authService = {
  async login(data: LoginFormProps): Promise<LoginResponse> {
    try {
      const res = await apiFetch(`/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
        skipAuth: true,
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
      const refreshToken = useAuthStore.getState().refreshToken;

      if (!token) {
        useAuthStore.getState().clearAuth();
        return null;
      }

      if (!refreshToken) {
        useAuthStore.getState().clearAuth();
        return null;
      }

      const res = await apiFetch("/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const body = await res.json();

      if (!body.success) {
        useAuthStore.getState().clearAuth();
        return null;
      }

      useAuthStore.getState().setAuth(body.data as User, token, refreshToken);
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

      await apiFetch("/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      useAuthStore.getState().clearAuth();
    } catch (error) {
      console.error("Logout error:", error);
      // Clear auth even if request fails
      useAuthStore.getState().clearAuth();
    }
  },

  async refreshToken(): Promise<string | null> {
    try {
      const res = await apiFetch("/auth/refresh-token", {
        method: "POST",
        credentials: "include", // Send cookies
      });

      const body = await res.json();

      if (!body.success) {
        useAuthStore.getState().clearAuth();
        return null;
      }

      useAuthStore
        .getState()
        .setAuth(body.data.user, body.data.accessToken, body.data.refreshToken);
      return body.data.accessToken;
    } catch (error) {
      console.error("Refresh token error:", error);
      useAuthStore.getState().clearAuth();
      return null;
    }
  },

  async updateProfile(data: ProfileFormProps): Promise<ApiResponse> {
    try {
      const res = await apiFetch("/auth/update-profile", {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const body = await res.json();
      if (body.statusCode == 422) {
        return { status: 422, message: "Validation failed", data: body.data };
      }
      if (body.statusCode == 200) {
        return { status: true, message: body.message, data: body.data };
      } else {
        return { status: false, message: body.message };
      }
    } catch (error) {
      return { status: false, message: "Internal Server Error" };
    }
  },

  async changePassword(data: PasswordFormProps): Promise<ApiResponse> {
    try {
      const res = await apiFetch("/auth/change-password", {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const body = await res.json();
      if (body.statusCode == 422) {
        return { status: 422, message: "Validation failed", data: body.data };
      }
      if (body.statusCode == 200) {
        return { status: true, message: body.message, data: body.data };
      } else {
        return { status: false, message: body.message };
      }
    } catch (error) {
      return { status: false, message: "Internal Server Error" };
    }
  },
};
