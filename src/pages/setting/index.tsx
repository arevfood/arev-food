import ContentsSettings from "@/contents/settings";
import MainLayouts from "@/layouts/main";

const PagesSetting: React.FC = () => {
  return (
    <MainLayouts>
      <div className="mt-4">
        <ContentsSettings />
      </div>
    </MainLayouts>
  );
};

export default PagesSetting;
