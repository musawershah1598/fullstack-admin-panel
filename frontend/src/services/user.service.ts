import { apiFetch } from "~/lib/api";
import { getQueryParams } from "~/lib/utils";
import type { ApiResponse } from "~/types/default.type";

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
