import Card from "@/components/wrapper/card";
import { IonIcon, IonImg, IonRouterLink } from "@ionic/react";
import TextDescription from "@/components/common/text-description";
import FoodCardSkeleton from "./skeleton";

type propTypes = {
  image: string;
  title: string;
  description: string;
  isFav?: boolean;
  onFavorite?: () => void;
  slug: string;
  loading?: boolean;
};

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
        <div className="relative">
          <div className="absolute top-[8px] right-[8px] z-10">
            <IonIcon
              src="/icons/heart.svg"
              className={`${
                isFav ? "text-[#FF2323]" : "text-black_color/40"
              } text-[24px]`}
              onClick={() => {
                onFavorite?.();
              }}
            />
          </div>
          <IonRouterLink routerLink={`/food/${slug}`}>
            <Card className="cursor-pointer h-full">
              <div className="relative">
                <IonImg src={image} className="object-cover h-[125px] w-full" />
              </div>
              <div className="py-4 px-3 text-left">
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
  );
};

export default FoodCard;
