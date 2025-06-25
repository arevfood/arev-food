import { UserSignup } from "@/models/user";
import { firebaseAuth } from "@/utils/connections/firebase";
import { errorHandler } from "@/utils/error-handler";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const FIREBASE_SIGNUP = async ({ email, password }: UserSignup) => {
  try {
    const result = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    return result;
  } catch (error) {
    if (error instanceof Error) {
      errorHandler({
        code: 500,
        details: error.message,
        error: "INTERNAL_SERVER_ERROR",
        error_code: "FIREBASE_SIGNUP_ERROR",
      });
    }
  }
};
