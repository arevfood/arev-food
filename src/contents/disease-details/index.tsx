import IconTitle from '@/components/common/icon-title'
import TextDescription from '@/components/common/text-description'
import Card from '@/components/wrapper/card'
import { IonIcon, IonImg } from '@ionic/react'
import { DiseaseDetailsModel } from '@/models/disease-details'
import { useFoods } from '@/hooks/data/food'
import { useCallback, useEffect, useState } from 'react'
import { FoodQueryDataModel } from '@/models/food-query'
import FoodCard from '@/components/common/food-card'
import CardEmpty from '@/components/wrapper/card-empty'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useFavorite } from '@/hooks/data/favorite'
import { useHistory } from 'react-router'

type propTypes = {
  data: DiseaseDetailsModel
}

const ContentsDiseaseDetails: React.FC<propTypes> = ({ data }) => {
  const router = useHistory()
  const [foodRecommendation, setFoodRecommendation] = useState<FoodQueryDataModel[]>([])

  const { onSearch: searchFood } = useFoods({})
  const { data: favoriteList, onFavorite } = useFavorite()

  const getFoodRecommendation = useCallback(async () => {
    const result = await searchFood({ query: `${data.name}`, query_type: 'concept' })
    setFoodRecommendation(result)
  }, [data.name, searchFood])

  useEffect(() => {
    getFoodRecommendation()
  }, [getFoodRecommendation])

  const ContentFoodInsight = ({
    title,
    value,
    icon,
  }: {
    title: string
    value: string | string[]
    icon: string
  }) => {
    return (
      <>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-[32px] h-[32px] rounded-full bg-[#FF6223]/[0.12] flex items-center justify-center">
              <IonIcon icon={icon} className="text-[16px]" />
            </div>
            <h6 className="!font-bold !font-heading text-black !m-0">{title}</h6>
          </div>
          {Array.isArray(value) ? (
            <ul className="!mt-0 list-disc ml-[16px]">
              {value.map((item, index) => (
                <li key={index} className="font-paragraph text-black/40 text-[14px] capitalize">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-paragraph text-black/40 text-[14px] !mt-0">{value}</p>
          )}
        </div>
      </>
    )
  }

  return (
    <>
      <div className="px-4 py-4">
        <div className="relative">
          <TextDescription
            title={data.name.replaceAll('_', ' ')}
            description={data.description}
            titleSize="large"
            withLinkRedirect={false}
          />
        </div>
        <div className="mt-6 py-[12px] px-[20px] bg-white rounded-[8px]">
          <div className="py-2 flex flex-col gap-4">
            <ContentFoodInsight
              title="Causes"
              value={data.indicator}
              icon="/icons/coution-icon.svg"
            />
          </div>
        </div>
        <div className="mt-6">
          <IconTitle icon="/icons/spoon-plate.svg" title="Suggestion Foods" />
          <div className="mt-4">
            <Card>
              <div className="py-4 px-4">
                {data.recommendation_food.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="text-black mb-3 last:mb-0 capitalize flex gap-3 items-center justify-between"
                      onClick={() => router.push(`/search?query=${item}&type=concept`)}
                    >
                      <div className="flex items-start gap-2">
                        <div>✔</div> <div className="self-center capitalize">{item}</div>
                      </div>
                      <div className="font-paragraph text-primary_color text-[13px] flex items-center gap-[8px]">
                        <IonImg src="/icons/arrow-right-primary.svg" className="w-[20px]" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
        </div>
        <div className="mt-6">
          <IconTitle icon="/icons/pin.svg" title="Recommended Nutrients" />
          <div className="mt-4">
            <Card>
              <div className="py-4 px-4">
                {data.recommendation_nutrient.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="text-black mb-3 last:mb-0 capitalize flex gap-3 items-center justify-between"
                      onClick={() => router.push(`/search?query=${item}&type=concept`)}
                    >
                      <div className="flex items-start gap-2">
                        <div>✔</div> <div className="self-center capitalize">{item}</div>
                      </div>
                      <div className="font-paragraph text-primary_color text-[13px] flex items-center gap-[8px]">
                        <IonImg src="/icons/arrow-right-primary.svg" className="w-[20px]" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
        </div>
        <div className="mt-6">
          <IconTitle title="Food Recommendations" icon="/icons/meat.svg" />
        </div>
        <div className="mt-4">
          {foodRecommendation.length === 0 && (
            <CardEmpty title="Your personalized food matches will appear here once we know you better." />
          )}
          {foodRecommendation.length > 0 && (
            <Swiper slidesPerView={2.2} spaceBetween={12} centeredSlides={false}>
              {foodRecommendation.map((item) => (
                <SwiperSlide key={item.id} className="!min-h-[200px]">
                  <FoodCard
                    slug={item.id}
                    image={item.image_url || ''}
                    title={item.name}
                    description={item.food_details?.description || ''}
                    onFavorite={() => onFavorite({ food_id: item.id })}
                    isFav={
                      favoriteList?.findIndex((findFood) => findFood.id === item.id) !== -1 &&
                      !!item.id
                    }
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </>
  )
}

export default ContentsDiseaseDetails
