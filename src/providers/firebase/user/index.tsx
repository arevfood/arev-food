import { UserSignup } from "@/models/user";
import { firebaseAuth, firebaseDb } from "@/utils/connections/firebase";
import { errorHandler } from "@/utils/error-handler";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const FIREBASE_SIGNUP = async ({
  email,
  password,
  fullname,
}: UserSignup) => {
  try {
    const user = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    const docRef = doc(firebaseDb, "users", user.user.uid);
    await setDoc(doc(firebaseDb, "users", user.user.uid), {
      email: email,
      fullname: fullname,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const userData = await getDoc(docRef);
    const result = userData.data();
    console.log("result", result);

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
