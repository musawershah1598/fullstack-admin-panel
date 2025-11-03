export type LoginFormProps = {
  email: string;
  password: string;
};

export type LoginResponse = {
  status: boolean | number;
  message: string;
  data?: ValidationErrorObj | LoginSuccessObj;
};

export type LoginSuccessResponse = {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

enum UserRole {
  "user",
  "admin",
}
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
