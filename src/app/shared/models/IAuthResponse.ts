import { User } from "../interfaces/user-model";

export interface IAuthResponse {
    token: string;
    user: User;
  }