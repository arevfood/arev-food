import ContentsFoodDetails from "@/contents/food-details";
import {useFood} from "@/hooks/data/food";
import MainLayouts from "@/layouts/main";
import { useParams } from "react-router";
import {useUser} from "@/hooks/data/user";
import {useFoodReason} from "@/hooks/data/food-reason";

const PageFoodDetails: React.FC = () => {
  const { id }: { id: string } = useParams();
  const { data: userDetail } = useUser();
  const { data: foodDetails } = useFood({ slug: id });
  const { data: foodReason } = useFoodReason(id, userDetail);

  return (
    <MainLayouts transparent fullWidth>
      {foodDetails && <ContentsFoodDetails data={foodDetails} reason={foodReason}/>}
    </MainLayouts>
  );
};

export default PageFoodDetails;
