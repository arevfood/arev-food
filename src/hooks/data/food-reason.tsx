import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/hooks/data/authentication'
import { FoodReasonResponseModel } from '@/models/food-reason'
import axios from 'axios'

const entity = 'food-reason'
const baseUrl = import.meta.env.VITE_AI_TOOLS_BASE_URL

export const useFoodReason = ({
  slug,
  metadata,
  type = 'recommend',
  enabled = true,
}: {
  slug?: string
  metadata?: { [key: string]: string | string[] }
  type?: 'avoid' | 'recommend'
  enabled?: boolean
}) => {
  const { session } = useAuth()

  const { data, isLoading } = useQuery<FoodReasonResponseModel | null>({
    enabled: !!enabled,
    queryKey: [entity, slug, session?.user?.uid],
    queryFn: async () => {
      if (!slug) return null

      const payload = {
        metadata: metadata,
        type: type,
      }

      const result = await axios.post<FoodReasonResponseModel>(
        `${baseUrl}/foods/${slug}/reason`,
        payload,
      )

      return result.data
    },
  })

  return {
    data,
    loading: isLoading,
  }
}
