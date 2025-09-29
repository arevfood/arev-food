import Card from '@/components/wrapper/card'
import { IonIcon, IonRouterLink } from '@ionic/react'
import TextDescription from '@/components/common/text-description'
import FoodCardSkeleton from './skeleton'
import CustomImage from '@/components/common/image'

type propTypes = {
  image: string
  title: string
  description: string
  isFav?: boolean
  onFavorite?: () => void
  slug: string
  loading?: boolean
}

const FoodCard: React.FC<propTypes> = ({
  image,
  title,
  description,
  isFav = false,
  loading = false,
  onFavorite,
  slug,
}) => {
  return (
    <>
      {loading && <FoodCardSkeleton />}
      {!loading && (
        <div className="relative w-full h-full">
          <div className="absolute top-[8px] right-[8px] z-1">
            <IonIcon
              src="/icons/heart.svg"
              className={`${isFav ? 'text-[#FF2323]' : 'text-black_color/40'} text-[24px]`}
              onClick={() => {
                onFavorite?.()
              }}
            />
          </div>
          <IonRouterLink routerLink={`/food/${slug}`}>
            <Card className="cursor-pointer h-full">
              <div className="relative aspect-video w-full">
                <CustomImage image={image} />
              </div>
              <div className="p-3 text-left h-[102px]">
                <TextDescription
                  title={title}
                  description={description}
                  ellipsisDescription
                  ellipsisTitle
                />
              </div>
            </Card>
          </IonRouterLink>
        </div>
      )}
    </>
  )
}

export default FoodCard
