import { apiFetch } from "~/lib/api";
import { getQueryParams } from "~/lib/utils";
import type { ApiResponse } from "~/types/default.type";
import type { ProfileFormProps } from "~/types/user.type";

export const userService = {
  async fetchUser(filters?: object): Promise<ApiResponse> {
    try {
      const query = getQueryParams(filters || {}).toString();

      const res = await apiFetch(`/user?${query}`, {
        method: "GET",
      });
      const data = await res.json();
      if (data.statusCode == 200) {
        return { status: true, message: data.message, data };
      } else {
        return { status: false, message: data.message };
      }
    } catch (error) {
      return { status: false, message: "Internal Server Error" };
    }
  },

  async updateUser(id: string, data: ProfileFormProps): Promise<ApiResponse> {
    try {
      const res = await apiFetch(`/user/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
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

  async deleteUser(id: string): Promise<ApiResponse> {
    try {
      const res = await apiFetch(`/user/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.statusCode == 200) {
        return { status: true, message: data.message };
      } else {
        return { status: false, message: data.message };
      }
    } catch (error) {
      return { status: false, message: "Internal Server Error" };
    }
  },
};
