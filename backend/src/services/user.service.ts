import UserModel from "@/models/User.model";
import {
  IPaginatedResponse,
  IPaginationOptions,
} from "@/types/pagination.types";
import { IUser } from "@/types/user.types";
import ApiError from "@/utils/ApiError";
import PaginatedHelper from "@/utils/PaginatedResponse";
import mongoose, { isValidObjectId } from "mongoose";

class UserService {
  // fetch users
  async fetchUsers(
    query: Record<string, any>
  ): Promise<IPaginatedResponse<IUser>> {
    const options: IPaginationOptions =
      PaginatedHelper.extractPaginationParams(query);
    const filter: any = {};
    if (query.role) {
      filter.role = query.role;
    }
    if (query.isActive !== undefined) {
      filter.isActive = query.isActive === "true";
    }
    const results = await PaginatedHelper.paginate(UserModel, {
      options,
      filter,
      select: "-password -refreshToken",
    });
    return results;
  }

  async deleteUser(id: string) {
    if (isValidObjectId(id)) {
      const user = await UserModel.findById(id);
      if (!user) {
        throw new ApiError(404, "User not found");
      } else {
        await user.deleteOne();
      }
    } else {
      throw new ApiError(400, "Invalid Object ID");
    }
  }
}

export default new UserService();
