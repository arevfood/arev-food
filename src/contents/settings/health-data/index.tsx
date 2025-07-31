import MainButton from "@/components/common/button";
import CustomInput from "@/components/common/input";

const ContentsSettingsHealthData: React.FC = () => {
  return (
    <div className="mt-4">
      <div className="font-bold font-heading text-[22px] text-black">
        Edit Health Data
      </div>
      <div className="mt-10">
        <div className="font-bold font-heading text-[18px] text-black">
          Physical Details
        </div>
        <div className="mt-6">
          <CustomInput placeholder="Height" />
        </div>
        <div className="mt-6">
          <CustomInput placeholder="Weight" />
        </div>
      </div>
      <div className="mt-10">
        <div className="font-bold font-heading text-[18px] text-black">
          Health Information
        </div>
        <div className="mt-6">
          <CustomInput placeholder="Blood Sugar Level" />
        </div>
        <div className="mt-6">
          <CustomInput placeholder="Blood Pressure" />
        </div>
        <div className="mt-6">
          <CustomInput placeholder="Health Conditions" />
        </div>
      </div>
      <div className="mt-10">
        <div className="font-bold font-heading text-[18px] text-black">
          Dietary Preference
        </div>
        <div className="mt-6">
          <CustomInput placeholder="Diet Type" />
        </div>
      </div>
      <div className="my-6">
        <MainButton color="ORANGE">Save Changes</MainButton>
      </div>
    </div>
  );
};

export default ContentsSettingsHealthData;
