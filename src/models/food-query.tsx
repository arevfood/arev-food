export interface FoodQueryPayloadModel {
  query: string;
  query_type?: "food" | "concept";
  metadata?: {
    [key: string]: string | string[];
  };
}

export interface FoodQueryDataModel {
  id: string;
  name: string;
  image_url: string;
  food_details?: FoodDetailsQueryDataModel;
}

export interface FoodDetailsQueryDataModel {
  name: string;
  description: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;
  origin?: string[];
  common_uses?: string[];
  image_url?: string;
  id: string;
}
