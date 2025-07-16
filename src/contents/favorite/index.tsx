import FoodCard from "@/components/common/food-card";
import IconTitle from "@/components/common/icon-title";
import { IonImg } from "@ionic/react";

type propTypes = {};

const ContentsFavorite: React.FC<propTypes> = () => {
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
            <FoodCard
              slug="raw-almonds-2"
              image="/images/food-01.jpg"
              title="Raw Almonds"
              description="Naturally nutrient-dense and perfect for snacking. Great source of vitamin E and healthy fats."
              isFav
            />
            <FoodCard
              slug="raw-almonds-2"
              image="/images/food-01.jpg"
              title="Raw Almonds"
              description="Naturally nutrient-dense and perfect for snacking. Great source of vitamin E and healthy fats."
              isFav
            />
            <FoodCard
              slug="raw-almonds-2"
              image="/images/food-01.jpg"
              title="Raw Almonds"
              description="Naturally nutrient-dense and perfect for snacking. Great source of vitamin E and healthy fats."
              isFav
            />
            <FoodCard
              slug="raw-almonds-2"
              image="/images/food-01.jpg"
              title="Raw Almonds"
              description="Naturally nutrient-dense and perfect for snacking. Great source of vitamin E and healthy fats."
              isFav
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentsFavorite;
