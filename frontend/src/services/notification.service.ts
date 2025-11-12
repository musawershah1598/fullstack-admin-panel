import { apiFetch } from "~/lib/api";
import { getQueryParams } from "~/lib/utils";
import type { ApiResponse } from "~/types/default.type";

export const notificationService = {
  async index(filters?: object): Promise<ApiResponse> {
    try {
      const query = getQueryParams(filters || {}).toString();

      const res = await apiFetch(`/notification?${query}`, {
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

  async readNotification(id?: string): Promise<ApiResponse> {
    console.log(id);
    try {
      const res = await apiFetch(
        `/notification/read-notification${id ? "?id=" + id : ""}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
};
