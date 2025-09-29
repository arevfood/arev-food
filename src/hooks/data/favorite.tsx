import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from './authentication'
import {
  FIREBASE_ADD_OR_REMOVE_FAVORITE,
  FIREBASE_GET_FAVORITE_LIST,
} from '@/providers/firebase/favorite'
import MainNotification from '@/components/common/notifications'
import { useCallback } from 'react'
import { FoodDetailsQueryDataModel } from '@/models/food-query'

const entity = 'favorite'
export const useFavorite = () => {
  const queryClient = useQueryClient()
  const { session } = useAuth()

  const { data: data, isLoading: fetchLoading } = useQuery({
    queryKey: [entity, session.user.uid],
    queryFn: async () => {
      const result = await FIREBASE_GET_FAVORITE_LIST({
        user_id: session.user.uid,
      })
      return result as FoodDetailsQueryDataModel[]
    },
  })

  const { mutateAsync: onFavorite, isPending: onFavoriteLoading } = useMutation({
    mutationFn: useCallback(
      async ({ food_id }: { food_id: string }) => {
        const result = await FIREBASE_ADD_OR_REMOVE_FAVORITE({
          user_id: session.user.uid,
          food_id,
        })
        return result
      },
      [session.user.uid],
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [entity, session.user.uid] })
      queryClient.invalidateQueries({ queryKey: ['user'] })
      MainNotification({ type: 'success', entity: entity, action: 'signin' })
    },
    onError: () => {
      MainNotification({ type: 'error', entity: entity, action: 'signin' })
    },
  })

  return {
    data,
    loading: fetchLoading || onFavoriteLoading,
    onFavorite,
  }
}
