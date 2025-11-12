import NotificationModel from "@/models/Notification.model";
import { INotification, INotificationData } from "@/types/notification.types";
import {
  IPaginatedResponse,
  IPaginationOptions,
} from "@/types/pagination.types";
import ApiError from "@/utils/ApiError";
import PaginatedHelper from "@/utils/PaginatedResponse";
import { isValidObjectId } from "mongoose";

class NotificationService {
  async index(
    query: Record<string, any>,
    userId: string
  ): Promise<IPaginatedResponse<INotification>> {
    const options: IPaginationOptions =
      PaginatedHelper.extractPaginationParams(query);
    const filters = {
      $or: [{ userId }, { userId: null }],
    };

    const results = await PaginatedHelper.paginate(NotificationModel, {
      options,
      filter: filters,
    });

    return results;
  }

  async store(data: INotificationData) {
    const notification = await NotificationModel.create(data);
    await notification.save();

    return {
      data: notification.toJSON(),
    };
  }

  async readNotificaton(id?: string, userId?: string) {
    console.log(id);
    if (id) {
      console.log("inside");
      if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid Object ID");
      } else {
        const notification = await NotificationModel.findById(id);
        if (!notification) {
          throw new ApiError(404, "Notification not found");
        } else {
          if (notification.userId == null || notification.userId == userId) {
            notification.read = true;
            await notification.save();
            return notification;
          } else {
            throw new ApiError(400, "Unauthorized access to notification");
          }
        }
      }
    } else {
      const notifications = await NotificationModel.find({
        $or: [
          {
            userId: null,
          },
        ],
      });
      notifications.forEach(async (item) => {
        item.read = true;
        await item.save();
      });
      return notifications;
    }
  }
}

export default new NotificationService();
