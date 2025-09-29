export interface FoodDetailsModel {
  name: string
  description: string
  image_url: string
  nutritional_information: { title: string; value: string; unit: string }[]
  health_benefit: string[]
  better_way_to_eat: string[]
  best_time_to_eat: { title: string; value: string }[]
}
