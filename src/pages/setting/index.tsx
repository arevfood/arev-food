import ContentsSettings from "@/contents/settings";
import MainLayouts from "@/layouts/main";

const PagesSetting: React.FC = () => {
  return (
    <MainLayouts fullWidth={true}>
      <div className="px-4 mt-4 flex flex-col gap-4">
        <ContentsSettings />
      </div>
    </MainLayouts>
  );
};

export default PagesSetting;
