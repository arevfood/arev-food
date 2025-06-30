import { IonImg } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "@ionic/react/css/ionic-swiper.css";
import { useState } from "react";
import MainButton from "@/components/common/button";
import { useHistory } from "react-router";

const ContentsWelcomeContent: React.FC = () => {
  const router = useHistory();
  const [activeSlide, setActiveSlide] = useState(0);
  return (
    <>
      <Swiper
        pagination={true}
        className="h-full"
        onSlideChange={(slider) => {
          setActiveSlide(slider.activeIndex);
        }}
      >
        <SwiperSlide>
          <IonImg
            src="/welcome-content.jpg"
            className="h-full object-cover object-left"
          />
          <div className="absolute top-0 w-full h-full bg-linear-to-b from-primary_color/0 to-primary_color" />
          <div className="absolute bottom-[75px] p-4 text-left text-white_color">
            <h1 className="mb-6 !font-bold">Discover Foods That Fit You</h1>
            <p className="mb-6">
              Get nutrition suggestions based on your body and health goals.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <IonImg
            src="/welcome-content.jpg"
            className="h-full object-cover object-center"
          />
          <div className="absolute top-0 w-full h-full bg-linear-to-b from-primary_color/0 to-primary_color" />
          <div className="absolute bottom-[75px] p-4 text-left text-white_color">
            <h1 className="mb-6 !font-bold">Smarter Food, Better Energy</h1>
            <p className="mb-6">
              Fuel your day with foods that help you stay energized, focused,
              and balanced.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <IonImg
            src="/welcome-content.jpg"
            className="h-full object-cover object-right"
          />
          <div className="absolute top-0 w-full h-full bg-linear-to-b from-primary_color/0 to-primary_color" />
          <div className="absolute bottom-[75px] p-4 text-left text-white_color">
            <h1 className="mb-6 !font-bold">Health Insights That Matter</h1>
            <p className="mb-6">
              Track your progress and get daily tips for feeling your best,
              every day.
            </p>
            <MainButton
              onClick={() => {
                router.replace("/login", { replace: true });
              }}
            >
              Start Your Journey
            </MainButton>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="absolute bottom-[35px] z-10 grid grid-cols-3 w-full h-[8px] gap-3 px-3">
        {Array.from({ length: 3 }).map((_item, index) => {
          return (
            <div
              className={`${
                index >= activeSlide + 1 ? "bg-white_color" : "bg-second_color"
              } rounded transition-all`}
            />
          );
        })}
      </div>
    </>
  );
};

export default ContentsWelcomeContent;
