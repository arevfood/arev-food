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

export interface UserHealth {
  height: number;
  weight: number;
  blood_sugar_level: number;
  blood_pressure: string;
  health_conditions: string;
  diet_type: string;
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
  health: UserHealth;
  createdAt: string;
  updatedAt: string;
}
