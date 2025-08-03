import {
  FIREBASE_GET_USER_BY_ID,
  FIREBASE_UPDATE_USER,
} from "@/providers/firebase/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./authentication";
import { UserDataModel } from "@/models/user";
import { useCallback } from "react";
import MainNotification from "@/components/common/notifications";

const entity = "user";
export const useUser = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  const { data: data, isLoading: fetchLoading } = useQuery({
    queryKey: [entity, session.user.uid],
    queryFn: async () => {
      const result = await FIREBASE_GET_USER_BY_ID({ id: session.user.uid });
      return result as UserDataModel;
    },
  });

  const { mutateAsync: onUpdate, isPending: onUpdateLoading } = useMutation({
    mutationFn: useCallback(
      async ({ payload }: { payload: { [key: string]: string } }) => {
        const result = await FIREBASE_UPDATE_USER({
          id: session.user.uid,
          payload: payload,
        });
        return result;
      },
      [session.user.uid]
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [entity, session.user.uid] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      MainNotification({ type: "success", entity: entity, action: "signin" });
    },
    onError: () => {
      MainNotification({ type: "error", entity: entity, action: "signin" });
    },
  });

  return {
    data,
    loading: fetchLoading || onUpdateLoading,
    onUpdate,
  };
};
