import UserModel from "@/models/User.model";
import {
  IPaginatedResponse,
  IPaginationOptions,
} from "@/types/pagination.types";
import {
  IPasswordChangeInput,
  IProfileInput,
  IUser,
  IUserResponse,
  UserRole,
} from "@/types/user.types";
import ApiError from "@/utils/ApiError";
import PaginatedHelper from "@/utils/PaginatedResponse";

class UserService {
  async profileUpdate(
    userId: string | undefined,
    profileData: IProfileInput
  ): Promise<IUser> {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    user.firstName = profileData.firstName;
    user.lastName = profileData.lastName;
    if (user.role == UserRole.ADMIN) {
      user.role = profileData.role;
      user.isActive = profileData.status;
    }

    await user.save();

    return user;
  }

  async changePassword(
    userId: string | undefined,
    passwordData: IPasswordChangeInput
  ): Promise<IUserResponse> {
    const user = await UserModel.findById(userId).select("+password");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.comparePassword(
      passwordData.currentPassword
    );

    if (!isPasswordValid) {
      throw new ApiError(401, "Current Password is incorrect");
    }
    const isSameAsOld = await user.comparePassword(passwordData.newPassword);
    if (isSameAsOld) {
      throw new ApiError(
        400,
        "New password must be different than old password"
      );
    }

    user.password = passwordData.newPassword;
    await user.save();
    return user.toJSON();
  }

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
}

export default new UserService();
