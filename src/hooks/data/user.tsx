import { FIREBASE_GET_USER_BY_ID, FIREBASE_UPDATE_USER } from '@/providers/firebase/user'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from './authentication'
import { UserDataModel } from '@/models/user'
import { useCallback } from 'react'
import { uploadImageToStorage } from '@/utils/upload-image'
import { useToastAlert } from '@/hooks/ui/toast-alert'
import { GeneralKeyValue } from '@/models/general-key-value'

const entity = 'user'
export const useUser = () => {
  const queryClient = useQueryClient()
  const { session } = useAuth()
  const { showToast } = useToastAlert()

  const { data: data, isLoading: fetchLoading } = useQuery({
    queryKey: [entity, session.user.uid],
    queryFn: async () => {
      const result = await FIREBASE_GET_USER_BY_ID({ id: session.user.uid })
      return result as UserDataModel
    },
  })

  const { mutateAsync: onUpdate, isPending: onUpdateLoading } = useMutation({
    mutationFn: useCallback(
      async ({ payload, file }: { payload: GeneralKeyValue<string>; file?: File | null }) => {
        const finalPayload = { ...payload }

        if (file) {
          finalPayload.photoUrl = await uploadImageToStorage(file, `users/${file.name}`)
        }

        return await FIREBASE_UPDATE_USER({
          id: session.user.uid,
          payload: finalPayload,
        })
      },
      [session.user.uid],
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [entity, session.user.uid] })
      queryClient.invalidateQueries({ queryKey: ['user'] })
      showToast({
        header: 'Cycle Saved',
        message: 'Your menstrual cycle data has been updated.',
        type: 'success',
      })
    },
    onError: () => {
      showToast({
        header: 'Setup menstrual cycle failed!',
        message: 'Couldn’t update cycle data. Please try again.',
        type: 'error',
      })
    },
  })

  return {
    data,
    loading: fetchLoading || onUpdateLoading,
    onUpdate,
  }
}
