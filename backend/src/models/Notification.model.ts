import { INotification } from "@/types/notification.types";
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema<INotification>(
  {
    userId: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    link: String,
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

notificationSchema.methods.toJSON = function () {
  return this.toObject();
};

export default mongoose.model<INotification>(
  "Notification",
  notificationSchema,
);
