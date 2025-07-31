import MainButton from "@/components/common/button";
import CustomInput from "@/components/common/input";
import takePhoto from "@/utils/take-photo";
import { IonImg } from "@ionic/react";

const ContentsSettingsProfile: React.FC = () => {
  return (
    <div>
      <div className="font-bold font-heading text-[22px] text-black">
        Edit Profile
      </div>
      <div className="mx-auto flex items-center justify-center mt-10">
        <div
          onClick={() => {
            takePhoto();
          }}
          className="relative w-fit rounded-full overflow-hidden"
        >
          <IonImg
            src="/images/user-placeholder.png"
            className="w-[100px] h-[100px] rounded-full bg-[#FDEAC5] flex items-center justify-center relative"
            style={{ borderRadius: "100%" }}
          />
        </div>
      </div>
      <div className="mt-10">
        <div className="font-bold font-heading text-[18px] text-black">
          Personal Information
        </div>
        <div className="mt-6">
          <CustomInput placeholder="Full Name" />
        </div>
        <div className="mt-6">
          <CustomInput placeholder="Email" />
        </div>
        <div className="mt-6">
          <CustomInput placeholder="Phone Number" />
        </div>
      </div>
      <div className="mt-4">
        <div className="font-bold font-heading text-[18px] text-black">
          Basic Details
        </div>
        <div className="mt-6">
          <CustomInput placeholder="Date of Birth" />
        </div>
        <div className="mt-6">
          <CustomInput placeholder="Gender" />
        </div>
      </div>
      <div className="mt-4">
        <div className="font-bold font-heading text-[18px] text-black">
          Location
        </div>
        <div className="mt-6">
          <CustomInput placeholder="Country" />
        </div>
        <div className="mt-6">
          <CustomInput placeholder="City" />
        </div>
      </div>
      <div className="my-6">
        <MainButton color="ORANGE">Save Changes</MainButton>
      </div>
    </div>
  );
};

export default ContentsSettingsProfile;
