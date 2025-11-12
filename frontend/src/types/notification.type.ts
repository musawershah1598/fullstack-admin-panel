import type { ApiQueryParams } from "~/types/default.type";

export type Notification = {
  _id: string;
  userId: string | null;
  title: string;
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
};
export type NotificationQueryParams = ApiQueryParams & {
  read?: string;
  sortBy?: string;
};
