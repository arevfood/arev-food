import { User } from "firebase/auth";

export interface UserSignup {
  email: string;
  password: string;
  fullname: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface SessionUser extends User {
  user: UserDataModel;
}

export interface UserDataModel {
  email: string;
  fullname: string;
  updatedAt: string;
  createdAt: string;
  uid: string;
}
