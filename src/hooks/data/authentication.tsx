import MainNotification from "@/components/common/notifications";
import { UserLogin } from "@/models/user";
import { firebaseAuth } from "@/utils/connections/firebase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useCallback } from "react";

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

  return {
    session: data,
    loading: fetchLoading || onSigninLoading || onSignOutLoading,
    onSignin,
    onSignOut,
  };
};
