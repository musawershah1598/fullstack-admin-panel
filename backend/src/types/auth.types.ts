import { IUserResponse } from "./user.types";

export interface IRegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthResponse {
  user: IUserResponse;
  tokens: ITokens;
}

export interface IJwtPayload {
  userId: string;
  iat?: number;
  exp?: number;
}
