import MainNotification from "@/components/common/notifications";
import { SessionUser, UserLogin, UserSignup } from "@/models/user";
import { FIREBASE_SIGNUP } from "@/providers/firebase/user";
import { firebaseAuth, googleProvider } from "@/utils/connections/firebase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { useCallback } from "react";
import { Capacitor } from "@capacitor/core";

const entity = "session";
const queryKey = "sessions";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const { data: data, isLoading: fetchLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
          unsubscribe();
          if (user) {
            const token = await user.getIdToken();
            resolve({ user, token });
          } else {
            resolve(null);
          }
        });
      });
    },
  });

  const { mutateAsync: onSignin, isPending: onSigninLoading } = useMutation({
    mutationFn: useCallback(async (payload: UserLogin) => {
      const session = await signInWithEmailAndPassword(
          firebaseAuth,
          payload.email,
          payload.password
      );
      return session;
    }, []),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      MainNotification({ type: "success", entity: entity, action: "signin" });
      return result;
    },
    onError: () => {
      MainNotification({ type: "error", entity: entity, action: "signin" });
    },
  });

  const { mutateAsync: onSignup, isPending: onSignupLoading } = useMutation({
    mutationFn: useCallback(async (payload: UserSignup) => {
      const result = await FIREBASE_SIGNUP({
        email: payload.email,
        password: payload.password,
        fullname: payload.fullname,
      });
      return result;
    }, []),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      MainNotification({ type: "success", entity: entity, action: "signin" });
      return result;
    },
    onError: () => {
      MainNotification({ type: "error", entity: entity, action: "signin" });
    },
  });

  const { mutateAsync: onSignOut, isPending: onSignOutLoading } = useMutation({
    mutationFn: useCallback(async () => {
      const session = await signOut(firebaseAuth);
      return session;
    }, []),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      MainNotification({ type: "success", entity: entity, action: "signout" });
      return result;
    },
    onError: () => {
      MainNotification({ type: "error", entity: entity, action: "signout" });
    },
  });

  const { mutateAsync: loginWithGoogle, isPending: onGoogleLoading } = useMutation({
    mutationFn: useCallback(async () => {
      let result;
      if (Capacitor.isNativePlatform()) {
        result = await signInWithRedirect(firebaseAuth, googleProvider);
      } else {
        result = await signInWithPopup(firebaseAuth, googleProvider);
      }

      return result.user;
    }, []),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      MainNotification({ type: "success", entity: entity, action: "signin" });
      return result;
    },
    onError: () => {
      MainNotification({ type: "error", entity: entity, action: "signin" });
    },
  });

  return {
    session: data as SessionUser,
    loading:
        fetchLoading ||
        onSigninLoading ||
        onSignOutLoading ||
        onSignupLoading ||
        onGoogleLoading,
    onSignin,
    onSignOut,
    onSignup,
    loginWithGoogle,
  };
};