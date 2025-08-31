import ContentsFoodDetails from "@/contents/food-details";
import { useFood } from "@/hooks/data/food";
import MainLayouts from "@/layouts/main";
import { useParams } from "react-router";
import { useUser } from "@/hooks/data/user";
import { useFoodReason } from "@/hooks/data/food-reason";
import { useFoodFilterCtx } from "@/context/food-filter";

const PageFoodDetails: React.FC = () => {
  const { id }: { id: string } = useParams();
  const { data: userDetail } = useUser();
  const { data: foodDetails } = useFood({ slug: id });

  const { value: filterValue } = useFoodFilterCtx();

  const { data: foodReason } = useFoodReason({
    slug: id,
    metadata: filterValue
      ? filterValue
      : (userDetail?.health as unknown as { [key: string]: string }),
    type: "recommend",
  });

  return (
    <MainLayouts transparent fullWidth>
      {foodDetails && foodReason && (
        <ContentsFoodDetails data={foodDetails} reason={foodReason} />
      )}
    </MainLayouts>
  );
};

export default PageFoodDetails;
