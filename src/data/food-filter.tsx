import { FilterListModel } from "@/models/filter-list";

export const foodFilterData: FilterListModel[] = [
  {
    label: "Health Conditions",
    key: "health_conditions",
    items: [
      { key: "low_sodium", label: "Low Sodium" },
      { key: "gluten_free", label: "Gluten-Free" },
      { key: "heart_healthy", label: "Heart-Healthy" },
      { key: "diabetes_friendly", label: "Diabetes-Friendly" },
      { key: "iron_rich", label: "Iron Rich" },
    ],
  },
  {
    label: "Disease Management",
    key: "disease_management",
    items: [
      { key: "hypertension", label: "Hypertension" },
      { key: "cholesterol", label: "High Cholesterol" },
      { key: "pcos", label: "PCOS" },
      { key: "thyroid", label: "Thyroid Issues" },
      { key: "kidney_disease", label: "Kidney Disease" },
      { key: "celiac", label: "Celiac Disease" },
    ],
  },
  {
    label: "Dietary Preference",
    key: "dietary_preference",
    items: [
      { key: "balanced_diet", label: "Balanced Diet" },
      { key: "vegan", label: "Vegan" },
      { key: "vegetarian", label: "Vegetarian" },
      { key: "keto", label: "Keto" },
      { key: "paleo", label: "Paleo" },
      { key: "low_fodmap", label: "Low FODMAP" },
    ],
  },
  {
    label: "Macronutrient Focus",
    key: "macronutrient_focus",
    items: [
      { key: "high_protein", label: "High Protein" },
      { key: "low_carb", label: "Low Carb" },
      { key: "low_fat", label: "Low Fat" },
      { key: "high_fiber", label: "High Fiber" },
    ],
  },
  {
    label: "Food Category",
    key: "food_category",
    items: [
      { key: "fruits", label: "Fruits" },
      { key: "vegetables", label: "Vegetables" },
      { key: "grains", label: "Grains" },
      { key: "meat", label: "Meat" },
      { key: "seafood", label: "Seafood" },
      { key: "dairy", label: "Dairy" },
    ],
  },
  {
    label: "Cuisine Type",
    key: "cuisine_type",
    items: [
      { key: "indonesian", label: "Indonesian" },
      { key: "japanese", label: "Japanese" },
      { key: "italian", label: "Italian" },
      { key: "mexican", label: "Mexican" },
      { key: "indian", label: "Indian" },
      { key: "mediterranean", label: "Mediterranean" },
    ],
  },
  {
    label: "Allergens",
    key: "allergens",
    items: [
      { key: "nut_free", label: "Nut-Free" },
      { key: "dairy_free", label: "Dairy-Free" },
      { key: "soy_free", label: "Soy-Free" },
      { key: "shellfish_free", label: "Shellfish-Free" },
    ],
  },
  {
    label: "Meal Type",
    key: "meal_type",
    items: [
      { key: "breakfast", label: "Breakfast" },
      { key: "lunch", label: "Lunch" },
      { key: "dinner", label: "Dinner" },
      { key: "snack", label: "Snack" },
      { key: "dessert", label: "Dessert" },
    ],
  },
  {
    label: "Cooking Method",
    key: "cooking_method",
    items: [
      { key: "grilled", label: "Grilled" },
      { key: "steamed", label: "Steamed" },
      { key: "baked", label: "Baked" },
      { key: "fried", label: "Fried" },
      { key: "raw", label: "Raw" },
    ],
  },
  {
    label: "Flavor Profile",
    key: "flavor_profile",
    items: [
      { key: "spicy", label: "Spicy" },
      { key: "sweet", label: "Sweet" },
      { key: "sour", label: "Sour" },
      { key: "umami", label: "Umami" },
      { key: "savory", label: "Savory" },
    ],
  },
  {
    label: "Lifestyle Goal",
    key: "lifestyle_goal",
    items: [
      { key: "weight_loss", label: "Weight Loss" },
      { key: "muscle_gain", label: "Muscle Gain" },
      { key: "energy_boost", label: "Energy Boost" },
      { key: "detox", label: "Detox" },
    ],
  },
];
