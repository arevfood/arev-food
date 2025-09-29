import { useQuery } from '@tanstack/react-query'
import { useFoods } from '@/hooks/data/food'
import { FoodQueryDataModel } from '@/models/food-query'
import { getAge } from '@/utils/generate-age'
import { useAuth } from '@/hooks/data/authentication'
import { UserDataModel } from '@/models/user'

const entity = 'avoid'

export const useAvoid = (userDetail?: UserDataModel) => {
  const { onGetFoodRecommendation } = useFoods({})
  const { session } = useAuth()

  const { data, isLoading } = useQuery({
    enabled: !!userDetail?.health,
    queryKey: [entity, session?.user?.uid],
    queryFn: async () => {
      if (!userDetail?.health) return []

      const foods = await onGetFoodRecommendation({
        payload: {
          age: String(getAge(userDetail.dateBirth)),
          country: userDetail.country,
          city: userDetail.city,
          gender: userDetail.gender,
          height: String(userDetail.health.height),
          weight: String(userDetail.health.weight),
          blood_sugar_level: String(userDetail.health.blood_sugar_level),
          blood_pressure: userDetail.health.blood_pressure,
          dietary_preference: userDetail.health.dietary_preference,
          health_condition: userDetail.health.health_conditions
            .split(',')
            .map((condition: string) => condition.trim()),
          lifestyle: userDetail.health.lifestyle,
        },
        type: entity,
      })

      return foods as FoodQueryDataModel[]
    },
  })

  return {
    data,
    loading: isLoading,
  }
}
