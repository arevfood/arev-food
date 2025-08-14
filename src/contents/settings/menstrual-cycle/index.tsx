import MainButton from "@/components/common/button";
import CustomInput from "@/components/common/input";
import {SubmitHandler, useForm} from "react-hook-form";
// import CustomRadio from "@/components/common/radio";
// import { useState } from "react";

type inputProps = {
    last_period_start_date: string;
    average_cycle_length: number;
    cycle_pattern?: string;
    pms_intensity?: number;
};

const ContentsSettingsMenstrualCycle: React.FC = () => {
  // const [isMenstrual, setIsMenstrual] = useState("");
  // const handleMenstrualCycle = (value: string) => {
  //   setIsMenstrual(value);
  // };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<inputProps>();

    const onSubmit: SubmitHandler<inputProps> = async (data) => {
        console.log(data)
    };

  return (
    <div className="mt-4">
        <form className="bg-white py-6 px-4 rounded-[8px]" onSubmit={handleSubmit(onSubmit)}>
            <div className="font-bold font-heading text-[18px] text-black mb-4">
                🩸 Menstrual Details
            </div>
            <div>
                <CustomInput
                    {...register("last_period_start_date", {
                        required: "Please choose last period!"
                    })}
                    placeholder="Last Period Start Date"
                    type="date"
                    errorMessage={errors.last_period_start_date?.message}
                />
            </div>
            <div>
                <CustomInput
                    {...register("average_cycle_length", {
                        required: "Please enter average cycle!"
                    })}
                    placeholder="Average Cycle Length"
                    type="number"
                    errorMessage={errors.average_cycle_length?.message}
                />
            </div>
            <div>
                <CustomInput
                    {...register("cycle_pattern")}
                    placeholder="Cycle Pattern (Opsional)"
                    type="text"
                    errorMessage={errors.cycle_pattern?.message}
                />
            </div>
            <div>
                <CustomInput
                    {...register("pms_intensity")}
                    placeholder="PMS Intensity (Optional)"
                    type="number"
                    errorMessage={errors.pms_intensity?.message}
                />
            </div>
            <div className="mt-8">
                <MainButton color="ORANGE" onClick={() => handleSubmit(onSubmit)()}>Complete Setup</MainButton>
            </div>
        </form>

      {/*<div className="font-bold font-heading text-[22px] text-black leading-tight">*/}
      {/*  Do You Want to Track Your <br /> Menstrual Cycle?*/}
      {/*</div>*/}
      {/*<div className="font-normal font-paragraph text-[14px] text-black mt-6">*/}
      {/*  This helps us give personalized food, health, and cycle recommendations.*/}
      {/*</div>*/}
      {/*<div className="mt-4">*/}
      {/*  <CustomRadio*/}
      {/*    list={[*/}
      {/*      { value: "yes", label: "Yes" },*/}
      {/*      { value: "no", label: "No" },*/}
      {/*    ]}*/}
      {/*    onChange={handleMenstrualCycle}*/}
      {/*  />*/}
      {/*</div>*/}
      {/*{isMenstrual === "yes" && (*/}
      {/*  <div className="bg-white py-6 px-4 rounded-[8px] mt-10">*/}
      {/*    <div className="font-bold font-heading text-[18px] text-black mb-4">*/}
      {/*      🩸 Menstrual Details*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <CustomInput placeholder="Last Period Start Date" />*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <CustomInput placeholder="Average Cycle Length" />*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <CustomInput placeholder="Cycle Pattern (Optional)" />*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <CustomInput placeholder="PMS Intensity (Optional)" />*/}
      {/*    </div>*/}
      {/*    <div className="mt-8">*/}
      {/*      <MainButton color="ORANGE">Complete Setup</MainButton>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*{isMenstrual === "no" && (*/}
      {/*  <div className="bg-white py-6 px-4 rounded-[8px] mt-10">*/}
      {/*    <div className="font-bold font-heading text-[18px] text-black">*/}
      {/*      💬 Not Ready to Track Your Cycle?*/}
      {/*    </div>*/}
      {/*    <div className="mt-4 font-normal font-paragraph text-[14px] text-black/40">*/}
      {/*      That’s totally fine! You can add your cycle details later in your*/}
      {/*      profile, and we’ll still tailor your experience as much as possible.*/}
      {/*    </div>*/}
      {/*    <div className="mt-8">*/}
      {/*      <MainButton color="ORANGE">Complete Setup</MainButton>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
};

export default ContentsSettingsMenstrualCycle;
