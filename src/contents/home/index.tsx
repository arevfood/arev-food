import FoodCard from "@/components/common/food-card";
import HealthData from "@/components/common/health-data";
import IconTitle from "@/components/common/icon-title";
import ProfileBox from "@/components/common/profile-box";
import UserInfo from "@/components/common/user-info";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useFavorite } from "@/hooks/data/favorite";
import { useUser } from "@/hooks/data/user";
import { useFoods } from "@/hooks/data/food";
import { capitalize } from "@/utils/capitalize-text";
import { getAge } from "@/utils/generate-age";
import CardEmpty from "@/components/wrapper/card-empty";
import { FoodQueryDataModel } from "@/models/food-query";
import { useEffect, useState } from "react";

type propTypes = {};

const ContentsHome: React.FC<propTypes> = () => {
  const { data: userDetail } = useUser();
  const { data: favoriteList, onFavorite } = useFavorite();
  const { onGetFoodRecommendation } = useFoods({});
  const [foodRecommendationList, setFoodRecommendationList] = useState<
    FoodQueryDataModel[]
  >([]);
  const isHaveRecommendationFood = !!userDetail?.health;

  const userProfile = userDetail
    ? {
        name: userDetail.fullname || "-",
        gender: userDetail.gender || "-",
        age: userDetail?.dateBirth
          ? `${getAge(userDetail.dateBirth)} years old`
          : "-",
        image: "/images/sample-user.jpg",
      }
    : {
        name: "-",
        gender: "-",
        age: "-",
        image: "/images/sample-user.jpg",
      };

  const userInfo = {
    info: [
      { title: "Gender", value: capitalize(userProfile.gender) },
      {
        title: "Height",
        value: userDetail?.health?.height
          ? userDetail?.health?.height + " Cm"
          : "-",
      },
      {
        title: "Weight",
        value: userDetail?.health?.weight
          ? userDetail?.health?.weight + " Kg"
          : "-",
      },
    ],
    additional: [
      {
        title: "Health Conditions",
        value: userDetail?.health?.health_conditions
          ? capitalize(userDetail?.health?.health_conditions)
          : "None",
      },
      {
        title: "Dietary Preference",
        value: userDetail?.health?.dietary_preference
          ? capitalize(userDetail?.health?.dietary_preference)
          : "None",
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!userDetail?.health) return;

      try {
        const foods = await onGetFoodRecommendation({
          payload: {
            age: String(getAge(userDetail.dateBirth)),
            country: userDetail.country,
            city: userDetail.city,
            gender: userDetail.gender,
            height: String(userDetail.health.height),
            weight: String(userDetail.health.weight),
            blood_sugar_level: String(userDetail.health.blood_sugar_level),
            blood_pressure: userDetail.health.blood_pressure,
            dietary_preference: userDetail.health.dietary_preference,
            health_condition: userDetail.health.health_conditions
              .split(",")
              .map((condition: string) => condition.trim()),
            lifestyle: userDetail.health.lifestyle,
          },
          type: "recommend",
        });

        setFoodRecommendationList(foods || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userDetail, onGetFoodRecommendation]);

  return (
    <>
      <div className="mt-2">
        <ProfileBox
          {...userProfile}
          gender={userProfile.gender}
          image={userDetail?.photoUrl}
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
      {!!userDetail?.health?.blood_sugar_level &&
        !!userDetail?.health?.blood_pressure && (
          <>
            <div className="mt-6">
              <IconTitle title="Health Data" icon="/icons/health-data.svg" />
            </div>
            <div className="grid grid-cols-2 gap-[16px] mt-4">
              <HealthData
                title="Blood Sugar Level"
                value={userDetail?.health.blood_sugar_level}
                unit="mg/dL"
                image="/images/blood-sugar-level.jpg"
              />
              <HealthData
                title="Blood Pressure"
                value={userDetail?.health.blood_pressure}
                unit="mmHg"
                image="/images/blood-pressure.jpg"
              />
            </div>
          </>
        )}
      <div className="mt-6">
        <IconTitle
          title="Recommendation Food"
          icon="/icons/meat.svg"
          link={
            isHaveRecommendationFood || foodRecommendationList.length !== 0
              ? "/recommendation"
              : ""
          }
        />
      </div>
      <div className="mt-4">
        {!isHaveRecommendationFood || foodRecommendationList.length === 0 ? (
          <CardEmpty title="No Recommendation Food Data" />
        ) : (
          <Swiper slidesPerView={2.2} spaceBetween={12} centeredSlides={false}>
            {foodRecommendationList &&
              foodRecommendationList.map((item) => {
                return (
                  <SwiperSlide className="!h-[180px]">
                    <FoodCard
                      slug={item.id}
                      image={item.image_url || ""}
                      title={item.name}
                      description={item.food_details?.description || ""}
                      onFavorite={() =>
                        onGetFoodRecommendation({
                          payload: { food_id: item.id },
                          type: "recommend",
                        })
                      }
                      isFav={
                          favoriteList?.findIndex(
                              (findFood) => findFood.id === item.id
                          ) !== -1 && !!item.id
                      }
                    />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        )}
      </div>
      <div className="mt-6">
        <IconTitle
          title="Favorite Food"
          icon="/icons/thumbs-up.svg"
          link={favoriteList && favoriteList.length > 0 ? "/favorite" : ""}
        />
      </div>
      <div className="mt-4 mb-6">
        {!favoriteList || favoriteList.length === 0 ? (
          <CardEmpty title="No Favorite Food Data" />
        ) : (
        <Swiper slidesPerView={2.2} spaceBetween={12} centeredSlides={false}>
            {favoriteList.map((item) => {
              return (
              <SwiperSlide className="!h-[180px]">
                  <FoodCard
                    slug={item.id}
                    image={item.image_url || ""}
                    title={item.name}
                    description={item.description}
                    onFavorite={() => onFavorite({ food_id: item.id })}
                    isFav
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </>
  );
};

export default ContentsHome;
