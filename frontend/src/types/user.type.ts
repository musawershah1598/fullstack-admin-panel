import type { ValidationErrorObj } from "~/types/default.type";

export type LoginFormProps = {
  email: string;
  password: string;
};

export type LoginSuccessResponse = {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

export type LoginResponse = {
  status: boolean | number;
  message: string;
  data?: ValidationErrorObj | LoginSuccessResponse;
};

export const UserRole = {
  USER: "user",
  ADMIN: "admin",
} as const;

// Add this type definition
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
