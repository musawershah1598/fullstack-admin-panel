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
  ): Promise<IPaginatedResponse<INotification>> {
    const options: IPaginationOptions =
      PaginatedHelper.extractPaginationParams(query);

    const results = await PaginatedHelper.paginate(NotificationModel, {
      options,
      filter: {},
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

  async readNotificaton(id: string) {
    if (isValidObjectId(id)) {
      const notification = await NotificationModel.findById(id);
      if (!notification) {
        throw new ApiError(404, "Notification not found");
      } else {
        notification.read = true;
        await notification.save();
        return notification;
      }
    } else {
      throw new ApiError(400, "Invalid Object ID");
    }
  }
}

export default new NotificationService();
