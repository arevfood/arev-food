import FoodCard from "@/components/common/food-card";
import HealthData from "@/components/common/health-data";
import IconTitle from "@/components/common/icon-title";
import ProfileBox from "@/components/common/profile-box";
import UserInfo from "@/components/common/user-info";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useFavorite } from "@/hooks/data/favorite";
import { useUser } from "@/hooks/data/user";
import {useFoods} from "@/hooks/data/food";
import {capitalize} from "@/utils/capitalize-text";
import {getAge} from "@/utils/generate-age";
import CardEmpty from "@/components/wrapper/card-empty";
import {FoodQueryDataModel} from "@/models/food-query";
import {useEffect, useState} from "react";

type propTypes = {};

const ContentsHome: React.FC<propTypes> = () => {
  const { data: userDetail } = useUser();
  const { data: favoriteList, onFavorite } = useFavorite();
    const { onGetFoodRecommendation } = useFoods({});
    const [foodRecommendationList, setFoodRecommendationList] = useState<FoodQueryDataModel[]>([]);
  const isHaveRecommendationFood = !!userDetail?.dateBirth && !!userDetail?.gender && !!userDetail?.health;

    const userProfile = userDetail
        ? {
            name: userDetail.fullname || "-",
            gender: userDetail.gender || "-",
            age: userDetail?.dateBirth ? `${getAge(userDetail.dateBirth)} years old` : "-",
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
      { title: "Height", value: "175 cm" },
      { title: "Weight", value: "72 kg" },
    ],
    additional: [
      { title: "Health Conditions", value: "None" },
      { title: "Dietary Preference", value: "Balanced Diet" },
    ],
  };

    useEffect(() => {
        const fetchData = async () => {
            if (!userDetail?.dateBirth || !userDetail?.gender || !userDetail?.health) return;

            try {
                const foods = await onGetFoodRecommendation({
                    age: String(getAge(userDetail.dateBirth)),
                    dietary_preference: userDetail.health.dietary_preference,
                    gender: userDetail.gender,
                    health_condition: userDetail.health.health_conditions
                        .split(",")
                        .map((condition: string) => condition.trim()),
                    lifestyle: userDetail.health.lifestyle,
                });

                setFoodRecommendationList(foods || []);
            } catch (error) {
                console.error(error);
            } finally {
                console.log(foodRecommendationList)
            }
        };

        fetchData();
    }, [userDetail]);

    return (
    <>
      <div className="mt-2">
        <ProfileBox {...userProfile} gender={userProfile.gender}/>
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
          link={isHaveRecommendationFood || foodRecommendationList.length !== 0 ? '/recommendation' : ''}
        />
      </div>
      <div className="mt-4">
          {!isHaveRecommendationFood || foodRecommendationList.length === 0 ? (
              <CardEmpty title="No Recommendation Food Data"/>
          ) : (
              <Swiper slidesPerView={2.2} spaceBetween={16} centeredSlides={false}>
                  {foodRecommendationList &&
                      foodRecommendationList.map((item) => {
                          return (
                              <SwiperSlide>
                                  <FoodCard
                                      slug={item.id}
                                      image={item.image_url || ""}
                                      title={item.name}
                                      description={item.description || ""}
                                      onFavorite={() => onGetFoodRecommendation({ food_id: item.id })}
                                      isFav
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
          link="/favorite"
        />
      </div>
      <div className="mt-4 mb-6">
          {!favoriteList ? (
              <CardEmpty title="No Favorite Food Data"/>
          ) : (
            <Swiper slidesPerView={2.2} spaceBetween={16} centeredSlides={false}>
              {favoriteList.map((item) => {
                  return (
                    <SwiperSlide>
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
