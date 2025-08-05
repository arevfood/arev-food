import ContentsFoodDetails from "@/contents/food-details";
import { useFood } from "@/hooks/data/food";
import MainLayouts from "@/layouts/main";
import { useParams } from "react-router";

const PageFoodDetails: React.FC = () => {
  const { id }: { id: string } = useParams();
  const { data: foodDetails } = useFood({ slug: id });

  return (
    <MainLayouts transparent fullWidth>
      {foodDetails && <ContentsFoodDetails data={foodDetails} />}
    </MainLayouts>
  );
};

export default PageFoodDetails;
