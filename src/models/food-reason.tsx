export interface FoodReasonModel {
  verdict: string;
  why: string;
  best_use: string;
  caution: string;
  evidence_grade: string;
}

export interface FoodReasonResponseModel {
  reasons: FoodReasonModel[];
  status: string;
  message: string | null;
}

export interface FoodReasonPayload {
  metadata: {
    age: string;
    country: string;
    city: string;
    gender: string;
    height: string;
    weight: string;
    blood_sugar_level: string;
    blood_pressure: string;
    dietary_preference: string;
    health_condition: string[];
    lifestyle: string;
  };
  type: string;
}