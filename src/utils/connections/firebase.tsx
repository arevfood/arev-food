import { FirebaseOptions, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  Auth,
  browserLocalPersistence,
  getAuth,
  indexedDBLocalPersistence,
  initializeAuth,
  setPersistence,
  GoogleAuthProvider,
    FacebookAuthProvider
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { Capacitor } from "@capacitor/core";

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

let auth: Auth;
if (Capacitor.isNativePlatform()) {
  auth = initializeAuth(firebaseApp, {
    persistence: indexedDBLocalPersistence,
  });
  console.log("[Firebase] 📱 Auth set up for IndexedDB (mobile).");
} else {
  auth = getAuth(firebaseApp);
  setPersistence(auth, browserLocalPersistence)
      .then(() => {
        console.log("[Firebase] 🌐 Auth set up for localStorage (web).");
      })
      .catch((error) => {
        console.error("Error while configuring Firebase Auth persistence:", error);
      });
}

export const firebaseAppInstance = firebaseApp;
export const firebaseDb = getFirestore(firebaseApp);
export const firebaseAuth = auth;
export const firebaseStorage = getStorage(firebaseApp);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();