import { useQuery } from "@tanstack/react-query";
import { getAge } from "@/utils/generate-age";
import { useAuth } from "@/hooks/data/authentication";
import { UserDataModel } from "@/models/user";
import { FoodReasonResponseModel } from "@/models/food-reason";
import axios from "axios";

const entity = "food-reason";
const baseUrl = import.meta.env.VITE_AI_TOOLS_BASE_URL;

export const useFoodReason = (slug?: string, userDetail?: UserDataModel) => {
    const { session } = useAuth();

    const { data, isLoading } = useQuery<FoodReasonResponseModel | null>({
        enabled: !!slug && !!userDetail?.health,
        queryKey: [entity, slug, session?.user?.uid],
        queryFn: async () => {
            if (!slug || !userDetail?.health) return null;

            const payload = {
                metadata: {
                    health_condition: userDetail.health.health_conditions
                        .split(",")
                        .map((condition: string) => condition.trim()),
                    height: String(userDetail.health.height),
                    weight: String(userDetail.health.weight),
                    blood_sugar_level: String(userDetail.health.blood_sugar_level),
                    blood_pressure: userDetail.health.blood_pressure,
                    dietary_preference: userDetail.health.dietary_preference,
                    lifestyle: userDetail.health.lifestyle,
                    age: String(getAge(userDetail.dateBirth)),
                    country: userDetail.country,
                    city: userDetail.city,
                    gender: userDetail.gender,
                },
                type: "recommend",
            };

            const result = await axios.post<FoodReasonResponseModel>(
                `${baseUrl}/foods/${slug}/reason`,
                payload,
                { headers: { "Content-Type": "application/json" } }
            );

            return result.data;
        },
    });

    return {
        data,
        loading: isLoading,
    };
};