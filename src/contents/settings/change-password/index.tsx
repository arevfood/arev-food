import MainButton from "@/components/common/button";
import CustomInput from "@/components/common/input";

const ContentsSettingsChangePassword: React.FC = () => {
  return (
    <div className="mt-4">
      <div className="font-bold font-heading text-[22px] text-black">
        Change Password
      </div>
      <div className="mt-10">
        <div className="font-bold font-heading text-[18px] text-black">
          New Password
        </div>
        <div className="mt-6">
          <CustomInput placeholder="Enter New Password" />
        </div>
        <div className="mt-6">
          <CustomInput placeholder="Confirm New Password" />
        </div>
      </div>
      <div className="my-6">
        <MainButton color="ORANGE">Change Password</MainButton>
      </div>
    </div>
  );
};

export default ContentsSettingsChangePassword;
