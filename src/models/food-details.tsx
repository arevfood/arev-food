export interface FoodDetailsModel {
  title: string;
  description: string;
  nutritional_information: { title: string; value: string }[];
  health_benefit: { label: string }[];
  better_way_to_eat: { label: string }[];
  best_time_to_eat: { title: string; value: string }[];
}
