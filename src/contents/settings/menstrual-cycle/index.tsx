import MainButton from "@/components/common/button";
import CustomInput from "@/components/common/input";
import CustomRadio from "@/components/common/radio";
import { useState } from "react";

const ContentsSettingsMenstrualCycle: React.FC = () => {
  const [isMenstrual, setIsMenstrual] = useState("");
  const handleMenstrualCycle = (value: string) => {
    setIsMenstrual(value);
  };
  return (
    <div className="mt-4">
      <div className="font-bold font-heading text-[22px] text-black leading-tight">
        Do You Want to Track Your <br /> Menstrual Cycle?
      </div>
      <div className="font-normal font-paragraph text-[14px] text-black mt-6">
        This helps us give personalized food, health, and cycle recommendations.
      </div>
      <div className="mt-4">
        <CustomRadio
          list={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
          onChange={handleMenstrualCycle}
        />
      </div>
      {isMenstrual === "yes" && (
        <div className="bg-white py-6 px-4 rounded-[8px] mt-10">
          <div className="font-bold font-heading text-[18px] text-black mb-4">
            🩸 Menstrual Details
          </div>
          <div>
            <CustomInput placeholder="Last Period Start Date" />
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
            <MainButton color="ORANGE">Complete Setup</MainButton>
          </div>
        </div>
      )}
      {isMenstrual === "no" && (
        <div className="bg-white py-6 px-4 rounded-[8px] mt-10">
          <div className="font-bold font-heading text-[18px] text-black">
            💬 Not Ready to Track Your Cycle?
          </div>
          <div className="mt-4 font-normal font-paragraph text-[14px] text-black/40">
            That’s totally fine! You can add your cycle details later in your
            profile, and we’ll still tailor your experience as much as possible.
          </div>
          <div className="mt-8">
            <MainButton color="ORANGE">Complete Setup</MainButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentsSettingsMenstrualCycle;
