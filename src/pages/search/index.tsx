import ContentSearch from "@/contents/search";
import MainLayouts from "@/layouts/main";

const PagesSearch: React.FC = () => {
  return (
    <MainLayouts>
      <div className="mt-2">
        <ContentSearch />
      </div>
    </MainLayouts>
  );
};

export default PagesSearch;
