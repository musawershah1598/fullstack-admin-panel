import { Document } from "mongoose";

export interface INotification extends Document {
  userId: string; // null for all user
  title: string;
  message: string;
  link: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}
