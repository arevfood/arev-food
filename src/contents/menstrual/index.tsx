import MainButton from "@/components/common/button";
import FoodCard from "@/components/common/food-card";
import IconTitle from "@/components/common/icon-title";
import CustomInput from "@/components/common/input";
import MenstrualBanner from "@/components/common/menstrual-banner";
import Card from "@/components/wrapper/card";
import YellowBox from "@/components/wrapper/yellow-box";
import { Swiper, SwiperSlide } from "swiper/react";
import {useUser} from "@/hooks/data/user";
import {useToastAlert} from "@/hooks/ui/toast-alert";
import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect} from "react";
import {cyclePatternOptions} from "@/data/cycle-pattern";
import CustomSelect from "@/components/common/select-option";
import {pmsIntensityOptions} from "@/data/pms-intensity";
import {IonSpinner} from "@ionic/react";
import {useFoods} from "@/hooks/data/food";
import CardEmpty from "@/components/wrapper/card-empty";
import { getMenstrualPhase } from "@/utils/calculate-menstrual-phase";
import { useRecommendation } from "@/hooks/data/recommendation";

type inputProps = {
  menstrual_cycle: {
    last_period_start_date: string;
    average_cycle_length: number;
    cycle_pattern?: string;
    pms_intensity?: string;
  }
};

const ContentMenstrual: React.FC = () => {
  const { data: userDetail, onUpdate } = useUser();
  const { showToast } = useToastAlert();
  const { onGetFoodRecommendation } = useFoods({});
  const phaseInfo = userDetail?.menstrual_cycle
      ? getMenstrualPhase({
        lastPeriod: userDetail.menstrual_cycle.last_period_start_date,
        cycleLength: userDetail.menstrual_cycle.average_cycle_length
      }) : null;
  const { data: foodRecommendations, loading } = useRecommendation(userDetail);
  const isHaveRecommendationFood = !!userDetail?.health;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<inputProps>();

  const onSubmit: SubmitHandler<inputProps> = async (data) => {
    const filteredPayload = {
      menstrual_cycle: Object.entries(data.menstrual_cycle).reduce<Record<string, any>>(
          (acc, [key, value]) => {
            if (value !== "" && value != null) {
              acc[key] = value;
            }
            return acc;
          }, {}
      ),
    };

    const result = await onUpdate({ payload: filteredPayload });

    if (!result) {
      showToast("Setup menstrual cycle failed!", "error");
      return;
    }

    showToast("Setup menstrual cycle successful!", "success");
  };

  useEffect(() => {
    if (userDetail) {
      setValue("menstrual_cycle.last_period_start_date", userDetail.menstrual_cycle?.last_period_start_date);
      setValue("menstrual_cycle.average_cycle_length", userDetail.menstrual_cycle?.average_cycle_length);
      setValue("menstrual_cycle.cycle_pattern", userDetail.menstrual_cycle?.cycle_pattern);
      setValue("menstrual_cycle.pms_intensity", userDetail.menstrual_cycle?.pms_intensity);
    }
  }, [userDetail, setValue]);

  return (
    <div>
      <div className="mt-6">
        <IconTitle title="Menstrual" icon="/icons/calender-clock.svg" />
      </div>
      <div className="mt-4">
        <MenstrualBanner
            title="Current Phase"
            subtitle={phaseInfo?.phase}
            description={`*Days Until Next Period: ${phaseInfo?.daysUntilNext} Days`}
        />
      </div>
      <div className="mt-6">
        <IconTitle
          title="Recommendation Food"
          icon="/icons/meat.svg"
          link={isHaveRecommendationFood || (foodRecommendations?.length ?? 0) !== 0 ? '/recommendation' : ''}
        />
      </div>
      <div className="mt-4">
        {loading ? (
            <div className="w-full h-[160px] flex items-center justify-center text-center">
              <IonSpinner name="crescent" style={{ "--color": "var(--color-black_color)", opacity: 0.62, } as React.CSSProperties}/>
            </div>
        ) : !isHaveRecommendationFood || (foodRecommendations?.length ?? 0) === 0 ? (
            <CardEmpty title="No Recommendation Food Data"/>
        ) : (
            <Swiper slidesPerView={2.2} spaceBetween={16} centeredSlides={false}>
              {foodRecommendations &&
                  foodRecommendations.map((foodRecommendation) => {
                    return (
                        <SwiperSlide>
                          <FoodCard
                              slug={foodRecommendation.id}
                              image={foodRecommendation.image_url || ""}
                              title={foodRecommendation.name}
                              description={foodRecommendation.food_details?.description || ""}
                              onFavorite={() => onGetFoodRecommendation({ food_id: foodRecommendation.id })}
                              isFav
                          />
                        </SwiperSlide>
                    );
                  })}
            </Swiper>
        )}
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
      <form className="mt-4 mb-10" onSubmit={handleSubmit(onSubmit)}>
        <Card className="p-4">
          <div>
            <CustomInput
                {...register("menstrual_cycle.last_period_start_date", {
                  required: "Please choose last period!"
                })}
                placeholder="Last Period Start Date"
                type="date"
                errorMessage={errors.menstrual_cycle?.last_period_start_date?.message}
            />
          </div>
          <div>
            <CustomInput
                {...register("menstrual_cycle.average_cycle_length", {
                  required: "Please enter average cycle!"
                })}
                placeholder="Average Cycle Length"
                type="number"
                errorMessage={errors.menstrual_cycle?.average_cycle_length?.message}
            />
          </div>
          <div>
            <CustomSelect
                label="Cycle Pattern (Optional)"
                placeholder="Choose cycle pattern"
                value={watch("menstrual_cycle.cycle_pattern")}
                options={cyclePatternOptions}
                onChange={(val) => setValue("menstrual_cycle.cycle_pattern", val)}
                errorMessage={errors.menstrual_cycle?.cycle_pattern?.message}
            />
          </div>
          <div>
            <CustomSelect
                label="PMS Intensity (Optional)"
                placeholder="Choose pms intensity"
                value={watch("menstrual_cycle.pms_intensity")}
                options={pmsIntensityOptions}
                onChange={(val) => setValue("menstrual_cycle.pms_intensity", val)}
                errorMessage={errors.menstrual_cycle?.pms_intensity?.message}
            />
          </div>
          <div className="mt-8">
            <MainButton
                color="ORANGE"
                onClick={() => {
                  handleSubmit(onSubmit)();
                }}
                isDisabled={loading}
            >
              {loading ? (
                  <div className="flex items-center gap-2">
                    Updating Menstrual Cycle...
                    <IonSpinner
                        name="crescent"
                        className="text-white w-[20px] h-[20px] ms-[6px]"
                    />
                  </div>
              ) : (
                  "Update Menstrual Cycle"
              )}
            </MainButton>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default ContentMenstrual;
