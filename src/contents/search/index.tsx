import FoodCard from "@/components/common/food-card";
import IconTitle from "@/components/common/icon-title";
import SearchInput from "@/components/common/search-input";
import { FilterListModel } from "@/models/filter-list";
import { useLocation } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";

const ContentSearch: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const filterList: FilterListModel[] = [
    {
      label: "Health Conditions",
      key: "health_conditions",
      items: [
        { key: "diabetes_friendly", label: "Diabetes-Friendly" },
        { key: "iron_rich", label: "Iron Rich" },
      ],
    },
    {
      label: "Food Category",
      key: "food_category",
      items: [
        { label: "Fruits", key: "fruits" },
        { label: "Vegetable", key: "vegetable" },
      ],
    },
    {
      label: "Dietary Preference",
      key: "dietary_preference",
      items: [
        { label: "Balanced Diet", key: "balanced_diet" },
        { label: "Vegan", key: "vegan" },
      ],
    },
  ];

  return (
    <>
      <SearchInput filterList={filterList} />
      {!query && (
        <>
          <IconTitle title="Popular Result" icon="/icons/search-love.svg" />
          <div className="mt-4">
            <Swiper
              slidesPerView={2.2}
              spaceBetween={16}
              centeredSlides={false}
            >
              <SwiperSlide>
                <FoodCard
                  slug="raw-almonds-1"
                  image="/images/food-01.jpg"
                  title="Raw Almonds"
                  description="Naturally nutrient-dense and perfect for snacking. Great source of vitamin E and healthy fats."
                />
              </SwiperSlide>
              <SwiperSlide>
                <FoodCard
                  slug="raw-almonds-2"
                  image="/images/food-01.jpg"
                  title="Raw Almonds"
                  description="Naturally nutrient-dense and perfect for snacking. Great source of vitamin E and healthy fats."
                />
              </SwiperSlide>
              <SwiperSlide>
                <FoodCard
                  slug="raw-almonds-3"
                  image="/images/food-01.jpg"
                  title="Raw Almonds"
                  description="Naturally nutrient-dense and perfect for snacking. Great source of vitamin E and healthy fats."
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </>
      )}

      {query && (
        <div className="grid grid-cols-2 gap-4 pb-6">
          <FoodCard
            slug="raw-almonds-1"
            image="/images/food-01.jpg"
            title="Raw Almonds"
            description="Naturally nutrient-dense and perfect for snacking. Great source of vitamin E and healthy fats."
          />
          <FoodCard
            slug="raw-almonds-2"
            image="/images/food-01.jpg"
            title="Raw Almonds"
            description="Naturally nutrient-dense and perfect for snacking. Great source of vitamin E and healthy fats."
          />
          <FoodCard
            slug="raw-almonds-3"
            image="/images/food-01.jpg"
            title="Raw Almonds"
            description="Naturally nutrient-dense and perfect for snacking. Great source of vitamin E and healthy fats."
          />
          <FoodCard
            slug="raw-almonds-3"
            image="/images/food-01.jpg"
            title="Raw Almonds"
            description="Naturally nutrient-dense and perfect for snacking. Great source of vitamin E and healthy fats."
          />
          <FoodCard
            slug="raw-almonds-3"
            image="/images/food-01.jpg"
            title="Raw Almonds"
            description="Naturally nutrient-dense and perfect for snacking. Great source of vitamin E and healthy fats."
          />
          <FoodCard
            slug="raw-almonds-3"
            image="/images/food-01.jpg"
            title="Raw Almonds"
            description="Naturally nutrient-dense and perfect for snacking. Great source of vitamin E and healthy fats."
          />
        </div>
      )}
    </>
  );
};

export default ContentSearch;
