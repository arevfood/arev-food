import { UserSignup } from "@/models/user";
import { firebaseAuth, firebaseDb } from "@/utils/connections/firebase";
import { errorHandler } from "@/utils/error-handler";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";

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

export const FIREBASE_GET_USER_BY_ID = async ({ id }: { id: string }) => {
  try {
    const docRef = doc(firebaseDb, "users", id);
    const userData = await getDoc(docRef);
    const result = userData.data();
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

export const FIREBASE_UPDATE_USER = async ({
  id,
  payload,
}: {
  id: string;
  payload: { [key: string]: string };
}) => {
  try {
    const docRef = doc(firebaseDb, "users", id);
    await setDoc(doc(firebaseDb, "users", id), {
      ...docRef,
      ...payload,
      updatedAt: new Date().toISOString(),
    });

    const userData = await getDoc(docRef);
    const result = userData.data();
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

export const FIREBASE_DELETE_USER = async ({ id }: { id: string }) => {
  try {
    const docRef = doc(firebaseDb, "users", id);
    await deleteDoc(docRef);
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
