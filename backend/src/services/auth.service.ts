import jwt from "jsonwebtoken";
import User from "@/models/User.model";
import ApiError from "@/utils/ApiError";
import config from "@/config/env";
import {
  IRegisterInput,
  IAuthResponse,
  ITokens,
  IJwtPayload,
} from "@/types/auth.types";
import {
  IPasswordChangeInput,
  IProfileInput,
  IUser,
  IUserResponse,
  UserRole,
} from "@/types/user.types";
import UserModel from "@/models/User.model";

class AuthService {
  private generateTokens(userId: string): ITokens {
    const accessToken = jwt.sign({ userId }, config.jwt.secret, {
      expiresIn: config.jwt.accessExpiration,
    });

    const refreshToken = jwt.sign({ userId }, config.jwt.secret, {
      expiresIn: config.jwt.refreshExpiration,
    });

    return { accessToken, refreshToken };
  }

  async register(userData: IRegisterInput): Promise<IAuthResponse> {
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      throw new ApiError(409, "Email already registered");
    }

    const user = await User.create(userData);
    const tokens = this.generateTokens(user._id);

    user.refreshToken = tokens.refreshToken;
    await user.save();

    return {
      user: user.toJSON(),
      tokens,
    };
  }

  async login(email: string, password: string): Promise<IAuthResponse> {
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError(401, "Invalid email or password");
    }

    if (!user.isActive) {
      throw new ApiError(403, "Account is deactivated");
    }

    const tokens = this.generateTokens(user._id);

    user.refreshToken = tokens.refreshToken;
    user.lastLogin = new Date();
    await user.save();

    return {
      user: user.toJSON(),
      tokens,
    };
  }

  async refreshToken(refreshToken: string): Promise<ITokens> {
    try {
      const decoded = jwt.verify(
        refreshToken,
        config.jwt.secret
      ) as IJwtPayload;
      const user = await User.findById(decoded.userId);

      if (!user || user.refreshToken !== refreshToken) {
        throw new ApiError(401, "Invalid refresh token");
      }

      const tokens = this.generateTokens(user._id);
      user.refreshToken = tokens.refreshToken;
      await user.save();

      return tokens;
    } catch (error) {
      throw new ApiError(401, "Invalid refresh token");
    }
  }

  async logout(userId: string): Promise<void> {
    await User.findByIdAndUpdate(userId, { refreshToken: null });
  }

  async user(token: string): Promise<IUserResponse> {
    const decoded = jwt.verify(token, config.jwt.secret) as IJwtPayload;
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new ApiError(401, "Invalid access token.");
    } else {
      return user.toJSON();
    }
  }

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
}

export default new AuthService();
