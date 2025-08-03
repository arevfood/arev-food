import FoodCard from "@/components/common/food-card";
import IconTitle from "@/components/common/icon-title";
import { useFavorite } from "@/hooks/data/favorite";
import { IonImg } from "@ionic/react";

type propTypes = {};

const ContentsFavorite: React.FC<propTypes> = () => {
  const { data: favoriteList, onFavorite } = useFavorite();

  return (
    <>
      <div className="top-0 left-0 fixed">
        <IonImg src="/images/favorite-banner.jpg" />
      </div>
      <div className="rounded-tl-[24px] rounded-tr-[24px] bg-bg_color_1 px-4 py-6 mt-[180px] z-[10] relative">
        <div className="relative">
          <IconTitle
            title="Foods You Love"
            description="Your personal list of saved favorites, tailored to you."
            icon="/icons/thumbs-up.svg"
          />
          <div className="grid grid-cols-2 gap-4 mt-4">
            {favoriteList &&
              favoriteList.map((food) => {
                return (
                  <FoodCard
                    slug={food.id}
                    image={food.image_url || ""}
                    title={food.name}
                    description={food.description}
                    onFavorite={() => onFavorite({ food_id: food.id })}
                    isFav
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentsFavorite;
