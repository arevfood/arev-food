import Card from "@/components/wrapper/card";
import { IonIcon, IonImg, IonRouterLink } from "@ionic/react";
import TextDescription from "@/components/common/text-description";
import FoodCardSkeleton from "./skeleton";

type propTypes = {
  image: string;
  title: string;
  description: string;
  isFav?: boolean;
  slug: string;
  loading?: boolean;
};

const FoodCard: React.FC<propTypes> = ({
  image,
  title,
  description,
  isFav = false,
  loading = false,
  slug,
}) => {
  return (
    <>
      {loading && <FoodCardSkeleton />}
      {!loading && (
        <IonRouterLink routerLink={`/food/${slug}`}>
          <Card className="cursor-pointer h-full">
            <div className="relative">
              <IonImg src={image} className="object-cover h-[125px] w-full" />
              <div className="absolute top-[8px] right-[8px]">
                <IonIcon
                  src="/icons/heart.svg"
                  className={`${
                    isFav ? "text-[#FF2323]" : "text-black_color/40"
                  } text-[24px]`}
                />
              </div>
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
      )}
    </>
  );
};

export default FoodCard;
