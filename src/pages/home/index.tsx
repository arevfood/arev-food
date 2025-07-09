import FoodCard from "@/components/common/food-card";
import HealthData from "@/components/common/health-data";
import IconTitle from "@/components/common/icon-title";
import ProfileBox from "@/components/common/profile-box";
import UserInfo from "@/components/common/user-info";
import MainLayouts from "@/layouts/main";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const PagesHome: React.FC = () => {
  const userProfile = {
    name: "Jessica M. Tan",
    age: 28,
    image: "/images/sample-user.jpg",
    isFemale: true,
  };

  const userInfo = {
    info: [
      { title: "Gender", value: "Female" },
      { title: "Height", value: "175 cm" },
      { title: "Weight", value: "72 kg" },
    ],
    additional: [
      { title: "Health Conditions", value: "None" },
      { title: "Dietary Preference", value: "Balanced Diet" },
    ],
  };

  return (
    <MainLayouts>
      <div className="mt-2">
        <ProfileBox {...userProfile} />
      </div>
      <div className="mt-6">
        <IconTitle title="User Info" icon="/icons/user.svg" />
      </div>
      <div className="mt-4">
        <UserInfo
          userInfo={userInfo.info}
          additionalInfo={userInfo.additional}
        />
      </div>
      <div className="mt-6">
        <IconTitle title="Health Data" icon="/icons/health-data.svg" />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <HealthData
          title="Blood Sugar Level"
          value="98"
          unit="mg/dL"
          image="/images/health-condition.jpg"
        />
        <HealthData
          title="Blood Sugar Level"
          value="98"
          unit="mg/dL"
          image="/images/health-condition.jpg"
        />
      </div>
      <div className="mt-6">
        <IconTitle
          title="Recommendation Food"
          icon="/icons/meat.svg"
          link="/recommendation"
        />
      </div>
      <div className="mt-4">
        <Swiper slidesPerView={2.2} spaceBetween={16} centeredSlides={false}>
          <SwiperSlide>
            <FoodCard
              image="/images/food-01.jpg"
              title="Raw Almonds"
              description="Naturally nutrient-dense and perfect for snacking. Great source of vitamin E and healthy fats."
            />
          </SwiperSlide>
          <SwiperSlide>
            <FoodCard
              image="/images/food-01.jpg"
              title="Raw Almonds"
              description="Naturally nutrient-dense and perfect for snacking. Great source of vitamin E and healthy fats."
            />
          </SwiperSlide>
          <SwiperSlide>
            <FoodCard
              image="/images/food-01.jpg"
              title="Raw Almonds"
              description="Naturally nutrient-dense and perfect for snacking. Great source of vitamin E and healthy fats."
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="mt-6">
        <IconTitle
          title="Favorite Food"
          icon="/icons/thumbs-up.svg"
          link="/favorite"
        />
      </div>
      <div className="mt-4 mb-6">
        <Swiper slidesPerView={2.2} spaceBetween={16} centeredSlides={false}>
          <SwiperSlide>
            <FoodCard
              image="/images/food-01.jpg"
              title="Raw Almonds"
              description="Naturally nutrient-dense and perfect for snacking. Great source of vitamin E and healthy fats."
              isFav
            />
          </SwiperSlide>
          <SwiperSlide>
            <FoodCard
              image="/images/food-01.jpg"
              title="Raw Almonds"
              description="Naturally nutrient-dense and perfect for snacking. Great source of vitamin E and healthy fats."
              isFav
            />
          </SwiperSlide>
          <SwiperSlide>
            <FoodCard
              image="/images/food-01.jpg"
              title="Raw Almonds"
              description="Naturally nutrient-dense and perfect for snacking. Great source of vitamin E and healthy fats."
              isFav
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </MainLayouts>
  );
};

export default PagesHome;
