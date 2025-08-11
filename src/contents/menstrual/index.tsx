import MainButton from "@/components/common/button";
import FoodCard from "@/components/common/food-card";
import IconTitle from "@/components/common/icon-title";
import CustomInput from "@/components/common/input";
import MenstrualBanner from "@/components/common/menstrual-banner";
import Card from "@/components/wrapper/card";
import YellowBox from "@/components/wrapper/yellow-box";
import { Swiper, SwiperSlide } from "swiper/react";

const ContentMenstrual: React.FC = () => {
  return (
    <div>
      <div className="mt-6">
        <IconTitle title="Menstrual" icon="/icons/calender-clock.svg" />
      </div>
      <div className="mt-4">
        <MenstrualBanner />
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
        <IconTitle title="Food to Avoid" icon="/icons/stop.svg" />
      </div>
      <div className="mt-4">
        <Card className="p-4">
          <YellowBox>
            <div className="p-4 text-black">
              *These foods may increase discomfort or disrupt hormonal balance
              during this phase. Try limiting them to feel your best.
            </div>
          </YellowBox>
          <div className="mt-4 space-y-4 text-black">
            <div className="flex items-center gap-2">
              <div className="text-[#FF5722]">❌</div>
              <div>Processed sugar – Can spike estrogen too much</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-[#FF5722]">❌</div>
              <div>Too much caffeine – May affect hormone balance</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-[#FF5722]">❌</div>
              <div>Refined carbs – Can mess with gut balance</div>
            </div>
          </div>
          <div className="text-black mt-4">
            <div className="font-bold font-heading text-[22px]">
              What to Avoid Right Now
            </div>
            <ol className="mt-4 list-decimal list-outside pl-4 space-y-4">
              <li className="font-semibold text-[16px]">
                Refined Sugar <br />{" "}
                <div className="text-[14px] font-paragraph font-normal text-black/40">
                  Can worsen mood swings and spike blood sugar, leading to
                  energy crashes.
                </div>
              </li>
              <li className="font-semibold text-[16px]">
                Refined Sugar <br />{" "}
                <div className="text-[14px] font-paragraph font-normal text-black/40">
                  Can worsen mood swings and spike blood sugar, leading to
                  energy crashes.
                </div>
              </li>
              <li className="font-semibold text-[16px]">
                Refined Sugar <br />{" "}
                <div className="text-[14px] font-paragraph font-normal text-black/40">
                  Can worsen mood swings and spike blood sugar, leading to
                  energy crashes.
                </div>
              </li>
            </ol>
          </div>
          <div className="mt-6">
            <YellowBox>
              <div className="p-4 text-black">
                <div className="font-bold font-heading text-[22px]">
                  Helpful Tip
                </div>
                <div>
                  Try soothing teas like peppermint or lemon balm to help ease
                  cravings and calm your system.
                </div>
              </div>
            </YellowBox>
          </div>
        </Card>
      </div>
      <div className="mt-6">
        <IconTitle title="Update Menstrual Cycle" icon="/icons/calender.svg" />
      </div>
      <div className="mt-4 mb-10">
        <Card className="p-4">
          <div>
            <CustomInput placeholder="Start of Current Period" />
          </div>
          <div>
            <CustomInput placeholder="Average Cycle Length" />
          </div>
          <div>
            <CustomInput placeholder="Cycle Pattern (Optional)" />
          </div>
          <div>
            <CustomInput placeholder="PMS Intensity (Optional)" />
          </div>
          <div className="mt-8">
            <MainButton color="ORANGE">Update Menstrual Cycle</MainButton>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContentMenstrual;
