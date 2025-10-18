import IconTitle from '@/components/common/icon-title'
import CustomImage from '@/components/common/image'
import TextDescription from '@/components/common/text-description'
import Card from '@/components/wrapper/card'
import { useFavorite } from '@/hooks/data/favorite'
import { FoodDetailsModel } from '@/models/food-details'
import { IonIcon } from '@ionic/react'
import { useParams } from 'react-router'
import { FoodReasonResponseModel } from '@/models/food-reason'

type propTypes = {
  data: FoodDetailsModel
  reason: FoodReasonResponseModel
}

const ContentsFoodDetails: React.FC<propTypes> = ({ data, reason }) => {
  const { id }: { id: string } = useParams()
  const { data: favoriteList, onFavorite } = useFavorite()
  const isFav = favoriteList?.findIndex((food) => food.id === id) !== -1

  const ContentItem = ({
    title,
    value,
    type = 'row',
  }: {
    title: string
    value: string
    type?: string
  }) => {
    return (
      <>
        <div
          className={`flex ${type === 'column' ? 'flex-col gap-2' : 'flex-row gap-4'} items-start justify-between text-black mb-6 last:mb-0`}
        >
          <div className="font-bold font-heading text-[16px] w-[50%]">{title}</div>
          <div
            className={`text-black/40 text-[14px] ${type === 'row' ? 'w-[50%] text-right' : ''}`}
          >
            {value}
          </div>
        </div>
      </>
    )
  }

  const ContentTitleFoodInsight = ({
    title,
    description,
  }: {
    title: string
    description: string
  }) => {
    return (
      <>
        <h5 className="!text-[1.25rem] !font-bold !font-heading text-black leading-none !m-0 !mb-2">
          {title}
        </h5>
        <p className="font-paragraph text-black/40 text-[14px]">{description}</p>
      </>
    )
  }

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
                <li key={index} className="font-paragraph text-black/40 text-[14px]">
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
      <div className="top-0 left-0 fixed w-full">
        <CustomImage image={data.image_url} />
      </div>
      <div className="rounded-tl-[24px] rounded-tr-[24px] bg-bg_color_1 px-4 py-6 mt-[180px] z-[10] relative">
        <div className="relative">
          <TextDescription
            title={data.name || 'Food Name'}
            description={data.description || 'Description of the food'}
            titleSize="large"
            withLinkRedirect={false}
          />
          <div className="absolute top-0 right-0" onClick={() => onFavorite({ food_id: id })}>
            <IonIcon
              icon="/icons/heart.svg"
              className={`${isFav ? 'text-[#FF2323]' : 'text-black_color/40'} text-[24px]`}
            />
          </div>
        </div>
        <div className="mt-8 p-[20px] bg-white rounded-[8px]">
          <ContentTitleFoodInsight
            title="Food Health Insights"
            description={reason.reasons[0].why}
          />
          <div className="mt-3">
            <div className="py-2 flex flex-col gap-4">
              <ContentFoodInsight
                title="Best Use"
                value={reason.reasons[0].best_use}
                icon="/icons/best-use-icon.svg"
              />
              <ContentFoodInsight
                title="Caution"
                value={reason.reasons[0].caution}
                icon="/icons/coution-icon.svg"
              />
              <ContentFoodInsight
                title="Evidence Grade"
                value={reason.reasons[0].evidence_grade}
                icon="/icons/evidence-grade-icon.svg"
              />
              <ContentFoodInsight
                title="Verdict"
                value={reason.reasons[0].verdict}
                icon="/icons/verdict-icon.svg"
              />
              <ContentFoodInsight
                title="General Benefit"
                value={reason.reasons[0].general_benefit.slice(0, 8)}
                icon="/icons/general-benefit-icon.svg"
              />
            </div>
          </div>
        </div>
        <div className="mt-8">
          <IconTitle icon="/icons/signal.svg" title="Health Benefit" />
          <div className="mt-4">
            <Card>
              <div className="py-6 px-4">
                {data.health_benefit.map((item, index) => {
                  return (
                    <div key={index} className="text-black mb-6 last:mb-0 flex gap-3 items-start">
                      <div>✔</div> <div className="self-center">{item}</div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
        </div>
        <div className="mt-8">
          <IconTitle icon="/icons/spoon-plate.svg" title="Better Ways to Eat" />
          <div className="mt-4">
            <Card>
              <div className="py-6 px-4">
                {data.better_way_to_eat.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="text-black mb-6 last:mb-0 capitalize flex gap-3 items-start"
                    >
                      <div>✔</div> <div className="self-center">{item}</div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
        </div>
        <div className="mt-8">
          <IconTitle icon="/icons/time-check.svg" title="Best Time to Eat" />
          <div className="mt-4">
            <Card>
              <div className="py-6 px-3">
                {data.best_time_to_eat.map((item, index) => {
                  return <ContentItem title={item.title} value={item.value} key={index} />
                })}
              </div>
            </Card>
          </div>
        </div>
        {data.nutritional_information?.length ? (
          <div className="mt-8">
            <IconTitle icon="/icons/pin.svg" title="Nutritional Information" />
            <div className="mt-4">
              <Card>
                <div className="py-6 px-4">
                  {data.nutritional_information
                    .filter((item) => Number(item.value) > 0)
                    .map((item, index) => {
                      return (
                        <ContentItem
                          title={item.title}
                          value={`${item.value}${item.unit} / 100g`}
                          key={index}
                        />
                      )
                    })}
                </div>
              </Card>
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default ContentsFoodDetails
