import FoodCard from '@/components/common/food-card'
import IconTitle from '@/components/common/icon-title'
import { IonImg, IonSpinner } from '@ionic/react'
import { useFoods } from '@/hooks/data/food'
import { useEffect, useState } from 'react'
import { FoodQueryDataModel } from '@/models/food-query'
import MainButton from '@/components/common/button'
import { useUser } from '@/hooks/data/user'
import { getAge } from '@/utils/generate-age'

type propTypes = {}

const ContentRecommend: React.FC<propTypes> = () => {
  const [page, setPage] = useState(1)
  const [allFoods, setAllFoods] = useState<FoodQueryDataModel[]>([])
  const [loadMore, setLoadMore] = useState(true)
  const limit = 10

  const { onGetFoodRecommendation, loading } = useFoods({})
  const { data: userDetail } = useUser()

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!userDetail?.health) return

      try {
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
            limit: String(limit),
            page: String(page),
          },
          type: 'recommend',
        })

        setAllFoods((prev) => [...prev, ...foods])
        if (foods.length < limit) {
          setLoadMore(false)
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchRecommendations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, userDetail])

  const handleLoadMore = () => {
    setPage((prev) => prev + 1)
  }

  return (
    <>
      <div className="top-0 left-0 fixed">
        <IonImg src="/images/recommend-banner.jpg" />
      </div>
      <div className="rounded-tl-[24px] rounded-tr-[24px] bg-bg_color_1 px-4 py-6 mt-[180px] z-[10] relative">
        <div className="relative">
          <IconTitle
            title="Recommended Food"
            description="These foods are tailored to your health goals and preferences."
            icon="/icons/meat.svg"
          />
          {allFoods ? (
            <>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {allFoods &&
                  allFoods.map((item) => {
                    return (
                      <FoodCard
                        slug={item.id}
                        image={item.image_url || ''}
                        title={item.name}
                        description={item.food_details?.description || ''}
                        onFavorite={() =>
                          onGetFoodRecommendation({
                            payload: { food_id: item.id },
                            type: 'recommend',
                          })
                        }
                        isFav
                      />
                    )
                  })}
              </div>
              {loadMore && (
                <div className="w-fit mx-auto mt-4">
                  <MainButton color="ORANGE" onClick={handleLoadMore} isDisabled={loading}>
                    {loading ? (
                      <div className="flex items-center gap-2">
                        Loading...
                        <IonSpinner
                          name="crescent"
                          className="text-white w-[20px] h-[20px] ms-[6px]"
                        />
                      </div>
                    ) : (
                      'Load More'
                    )}
                  </MainButton>
                </div>
              )}
            </>
          ) : (
            <IonSpinner
              name="crescent"
              className="text-black/[0.42] w-[32px] h-[32px] ms-[6px] mx-auto"
            />
          )}
        </div>
      </div>
    </>
  )
}

export default ContentRecommend
