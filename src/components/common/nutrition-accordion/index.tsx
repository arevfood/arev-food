import IconTitle from '@/components/common/icon-title'
import { IonIcon } from '@ionic/react'
import Card from '@/components/wrapper/card'
import { primaryNutrient } from '@/hooks/data/primary-nutrient'
import { FoodDetailsModel } from '@/models/food-details'
import ContentItem from '@/components/common/content-item'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const NutritionAccordion: React.FC<{
  data: FoodDetailsModel['nutritional_information']
  type: 'primary' | 'secondary' | 'default'
}> = ({ data, type }) => {
  const [expand, setExpand] = useState(false)

  const parseNutritionInfo =
    data &&
    Object.values(
      data
        .map((item) => {
          if (item.title.includes('MUFA') || item.title.includes('PUFA')) {
            return {
              title: 'Healthy Fats',
              value: item.value,
              unit: item.unit,
            }
          }

          if (item.title.includes('SFA')) {
            return {
              title: 'Saturated Fats',
              value: item.value,
              unit: item.unit,
            }
          }

          if (item.title.toLowerCase().includes('carbohydrate')) {
            return {
              title: 'Carbohydrates',
              value: item.value,
              unit: item.unit,
            }
          }

          return {
            title: item.title,
            value: item.value,
            unit: item.unit,
          }
        })
        .reduce(
          (acc, item) => {
            if (!acc[item.title]) {
              acc[item.title] = { ...item }
            } else {
              acc[item.title].value = (Number(acc[item.title].value) + Number(item.value)).toFixed(
                2,
              )
            }
            return acc
          },
          {} as Record<string, { title: string; value: number | string; unit: string }>,
        ),
    )

  const showNutrientConfig = {
    primary: {
      icon: '/icons/food-health-insight.svg',
      title: 'Primary Nutritional Information',
      data: parseNutritionInfo?.filter((item) =>
        primaryNutrient.some((nutrient) => item.title.toLowerCase().includes(nutrient)),
      ),
    },
    secondary: {
      icon: '/icons/pin.svg',
      title: 'Secondary Nutritional Information',
      data: parseNutritionInfo?.filter(
        (item) => !primaryNutrient.some((nutrient) => item.title.toLowerCase().includes(nutrient)),
      ),
    },
    default: {
      icon: '/icons/food-health-insight.svg',
      title: 'Nutritional Information',
      data: parseNutritionInfo,
    },
  }

  const showNutrient = showNutrientConfig[type]

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between" onClick={() => setExpand(!expand)}>
        <IconTitle icon={showNutrient.icon} title={showNutrient.title} />
        <motion.div
          className="rotate-270"
          animate={{ rotate: expand ? 360 : 270 }}
          transition={{ duration: 0.3 }}
        >
          <IonIcon icon="/icons/chevron-left.svg" className="text-[12px]" />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        <motion.div
          className={'mt-4 overflow-hidden'}
          animate={{ height: expand ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <div className="py-6 px-4">
              {showNutrient &&
                showNutrient.data
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
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default NutritionAccordion
