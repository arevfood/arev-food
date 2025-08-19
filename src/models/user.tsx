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

export interface UserMenstrualCycle {
  last_period_start_date: string;
  average_cycle_length: number;
  cycle_pattern: string;
  pms_intensity: number;
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
  menstrual_cycle: UserMenstrualCycle;
  createdAt: string;
  updatedAt: string;
}
