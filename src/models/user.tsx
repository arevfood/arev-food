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
  uid: string;
  email: string;
  fullname: string;
  phoneNumber: string;
  dateBirth: string;
  gender: string;
  country: string;
  city: string;
  photoUrl: string;
  createdAt: string;
  updatedAt: string;
}
