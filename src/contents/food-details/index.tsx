import IconTitle from "@/components/common/icon-title";
import CustomImage from "@/components/common/image";
import TextDescription from "@/components/common/text-description";
import Card from "@/components/wrapper/card";
import { useFavorite } from "@/hooks/data/favorite";
import { FoodDetailsModel } from "@/models/food-details";
import { IonIcon } from "@ionic/react";
import { useParams } from "react-router";
import {FoodReasonResponseModel} from "@/models/food-reason";

type propTypes = {
  data: FoodDetailsModel;
  reason: FoodReasonResponseModel;
};

const ContentsFoodDetails: React.FC<propTypes> = ({ data, reason }) => {
  const { id }: { id: string } = useParams();
  const { data: favoriteList, onFavorite } = useFavorite();
  const isFav = favoriteList?.findIndex((food) => food.id === id) !== -1;

  const ContentItem = ({ title, value, type = 'row' }: { title: string; value: string; type?: string; }) => {
    return (
      <>
        <div className={`flex ${type === 'column' ? 'flex-col gap-2' : 'flex-row gap-4'} items-start justify-between text-black mb-6 last:mb-0`}>
          <div className="font-bold font-heading text-[16px] w-[50%]">
            {title}
          </div>
          <div className={`text-black/40 text-[14px] ${type === 'row' ? 'w-[50%] text-right' : ''}`}>
            {value}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="top-0 left-0 fixed">
        <CustomImage image={data.image_url} />
      </div>
      <div className="rounded-tl-[24px] rounded-tr-[24px] bg-bg_color_1 px-4 py-6 mt-[180px] z-[10] relative">
        <div className="relative">
          <TextDescription
            title={data.name || "Food Name"}
            description={data.description || "Description of the food"}
            titleSize="large"
          />
          <div
            className="absolute top-0 right-0"
            onClick={() => onFavorite({ food_id: id })}
          >
            <IonIcon
              icon="/icons/heart.svg"
              className={`${
                isFav ? "text-[#FF2323]" : "text-black_color/40"
              } text-[24px]`}
            />
          </div>
        </div>
        <div className="mt-8 p-[20px] bg-white border border-black/[0.12] rounded-[8px]">
          <h5 className="!text-[1.25rem] !font-bold !font-heading text-black leading-none !m-0 !mb-2">Food Health Insights</h5>
          <p className="font-paragraph text-black/40 text-[14px]">{reason.reasons[0].why}</p>
          <div className="mt-4 border border-black/[0.12] rounded-[8px]">
            <div className="py-6 px-3">
              <ContentItem
                  title="Best Use"
                  value={reason.reasons[0].best_use}
              />
              <ContentItem
                  title="Caution"
                  value={reason.reasons[0].caution}
              />
              <ContentItem
                  title="Evidence Grade"
                  value={reason.reasons[0].evidence_grade}
              />
              <ContentItem
                  title="Verdict"
                  value={reason.reasons[0].verdict}
              />
            </div>
          </div>
        </div>
        <div className="mt-8">
          <IconTitle icon="/icons/pin.svg" title="Nutritional Information" />
          <div className="mt-4">
            <Card>
              <div className="py-6 px-4">
                {data.nutritional_information.map((item, index) => {
                  return (
                    <ContentItem
                      title={item.title}
                      value={`${item.value}${item.unit} / 100g`}
                      key={index}
                    />
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
        <div className="mt-8">
          <IconTitle icon="/icons/signal.svg" title="Health Benefit" />
          <div className="mt-4">
            <Card>
              <div className="py-6 px-4">
                {data.health_benefit.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="text-black mb-6 last:mb-0 flex gap-3 items-start"
                    >
                      <div>✔</div> <div className="self-center">{item}</div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
        <div className="mt-8">
          <IconTitle icon="/icons/spoon-plate.svg" title="Better Ways to Eat" />
          <div className="mt-4">
            <Card>
              <div className="py-6 px-4">
                {data.better_way_to_eat.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="text-black mb-6 last:mb-0 capitalize flex gap-3 items-start"
                    >
                      <div>✔</div> <div className="self-center">{item}</div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
        <div className="mt-8">
          <IconTitle icon="/icons/time-check.svg" title="Best Time to Eat" />
          <div className="mt-4">
            <Card>
              <div className="py-6 px-3">
                {data.best_time_to_eat.map((item, index) => {
                  return (
                    <ContentItem
                      title={item.title}
                      value={item.value}
                      key={index}
                    />
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentsFoodDetails;
