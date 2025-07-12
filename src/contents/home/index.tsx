import FoodCard from "@/components/common/food-card";
import HealthData from "@/components/common/health-data";
import IconTitle from "@/components/common/icon-title";
import ProfileBox from "@/components/common/profile-box";
import UserInfo from "@/components/common/user-info";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { userInfoModel, userProfileModel } from "@/models/home";

type propTypes = {
  userProfile: userProfileModel;
  userInfo: userInfoModel;
};

const ContentsHome: React.FC<propTypes> = ({ userProfile, userInfo }) => {
  return (
    <>
      <div className="mt-2">
        <ProfileBox
          {...userProfile}
          isFemale={userProfile.active_menstrual_cycle}
        />
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
              slug="raw-almonds-1"
              image="/images/food-01.jpg"
              title="Raw Almonds"
              description="Naturally nutrient-dense and perfect for snacking. Great source of vitamin E and healthy fats."
              isFav
            />
          </SwiperSlide>
          <SwiperSlide>
            <FoodCard
              slug="raw-almonds-2"
              image="/images/food-01.jpg"
              title="Raw Almonds"
              description="Naturally nutrient-dense and perfect for snacking. Great source of vitamin E and healthy fats."
              isFav
            />
          </SwiperSlide>
          <SwiperSlide>
            <FoodCard
              slug="raw-almonds-3"
              image="/images/food-01.jpg"
              title="Raw Almonds"
              description="Naturally nutrient-dense and perfect for snacking. Great source of vitamin E and healthy fats."
              isFav
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default ContentsHome;
