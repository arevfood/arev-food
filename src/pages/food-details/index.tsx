import ContentsFoodDetails from "@/contents/food-details";
import MainLayouts from "@/layouts/main";
import { FoodDetailsModel } from "@/models/food-details";
import { useParams } from "react-router";

const PageFoodDetails: React.FC = () => {
  const params = useParams();

  const sampleData: FoodDetailsModel = {
    title: "Raw Almond",
    description:
      "Naturally nutrient-dense and perfect for snacking. Great source of vitamin E and healthy fats.",
    nutritional_information: [
      { title: "Calories", value: "190kcal" },
      { title: "Protein", value: "2g" },
      { title: "Carbs", value: "2g" },
    ],
    health_benefit: [
      { label: "Supports heart health" },
      { label: "Rich in healthy fats" },
      { label: "Helps regulate blood sugar" },
    ],
    best_time_to_eat: [
      { title: "Morning", value: "Boosts energy" },
      { title: "Lunch/Dinner", value: "Pairs well with meals" },
      { title: "Snack", value: "Keeps you full" },
    ],
    better_way_to_eat: [
      { label: "Soaked overnight for easier digestion" },
      { label: "Blended into smoothies for energy" },
      { label: "Sprinkled on salads for crunch" },
    ],
  };

  console.log("params", params);
  return (
    <MainLayouts transparent fullWidth>
      <ContentsFoodDetails data={sampleData} />
    </MainLayouts>
  );
};

export default PageFoodDetails;
