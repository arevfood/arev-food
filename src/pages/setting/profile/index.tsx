import ContentsSettingsProfile from "@/contents/settings/profile";
import MainLayouts from "@/layouts/main";

const PagesSettingProfile: React.FC = () => {
  return (
    <MainLayouts>
      <div className="mt-4">
        <ContentsSettingsProfile />
      </div>
    </MainLayouts>
  );
};

export default PagesSettingProfile;
