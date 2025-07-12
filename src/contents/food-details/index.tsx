import IconTitle from "@/components/common/icon-title";
import TextDescription from "@/components/common/text-description";
import Card from "@/components/wrapper/card";
import { FoodDetailsModel } from "@/models/food-details";
import { IonIcon, IonImg } from "@ionic/react";

type propTypes = {
  isFav?: boolean;
  data: FoodDetailsModel;
};

const ContentsFoodDetails: React.FC<propTypes> = ({ isFav, data }) => {
  const ContentItem = ({ title, value }: { title: string; value: string }) => {
    return (
      <>
        <div className="flex justify-between text-black mb-6 last:mb-0">
          <div className="font-bold font-heading text-[16px]">{title}</div>
          <div className="text-black/40 text-[14px]">{value}</div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="top-0 left-0 fixed">
        <IonImg src="/images/food-01.jpg" />
      </div>
      <div className="rounded-tl-[24px] rounded-tr-[24px] bg-bg_color_1 px-8 py-6 mt-[180px] z-[10] relative">
        <div className="relative">
          <TextDescription
            title={data.title || "Food Name"}
            description={data.description || "Description of the food"}
            titleSize="large"
          />
          <div className="absolute top-0 right-0">
            <IonIcon
              icon="/icons/heart.svg"
              className={`${
                isFav ? "text-[#FF2323]" : "text-black_color/40"
              } text-[24px]`}
            />
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
                      value={item.value}
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
                    <div key={index} className="text-black mb-6 last:mb-0">
                      ✔ {item.label}
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
                    <div key={index} className="text-black mb-6 last:mb-0">
                      ✔ {item.label}
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
