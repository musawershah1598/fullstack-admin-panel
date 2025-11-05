import { apiFetch } from "~/lib/api";
import type { ApiResponse } from "~/types/default.type";
import type { PasswordFormProps, ProfileFormProps } from "~/types/user.type";

export const userService = {
  async updateProfile(data: ProfileFormProps): Promise<ApiResponse> {
    try {
      const res = await apiFetch("/user/update-profile", {
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
      const res = await apiFetch("/user/change-password", {
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
