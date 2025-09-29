import { FoodDetailsModel } from "@/models/food-details";
import { FoodQueryDataModel, FoodQueryPayloadModel } from "@/models/food-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCallback } from "react";

const entity = "food";
const queryKey = "foods";
const baseUrl = import.meta.env.VITE_AI_TOOLS_BASE_URL;

export const useFoods = ({
  limit = 10,
  page = 1,
}: {
  limit?: number;
  page?: number;
}) => {
  const queryClient = useQueryClient();
  const paginationQuery = `limit=${limit}&page=${page}`;

  const { data: data, isLoading: fetchLoading } = useQuery({
    queryKey: [queryKey, paginationQuery],
    queryFn: async () => {
      const result = await axios.get(`${baseUrl}/foods?${paginationQuery}`);
      return result.data.foods as FoodQueryDataModel[];
    },
  });

  const { mutateAsync: onSearch, isPending: onSearchLoading } = useMutation({
    mutationFn: useCallback(async (payload: FoodQueryPayloadModel) => {
      const result = await axios.post(`${baseUrl}/query`, payload);
      return result.data.foods as FoodQueryDataModel[];
    }, []),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      return result;
    },
    onError: () => {},
  });

  const {
    mutateAsync: onGetFoodRecommendation,
    isPending: onGetFoodRecommendationLoading,
  } = useMutation({
    mutationFn: useCallback(
      async ({
        payload,
        type = "recommend",
         temperature,
      }: {
        payload: { [key: string]: string | string[] };
        type?: "avoid" | "recommend";
          temperature?: number;
      }) => {
        const result = await axios.post(`${baseUrl}/query-by-user-info`, {
          type: type,
          temperature: temperature,
          metadata: payload,
        });
        return result.data.foods as FoodQueryDataModel[];
      },
      []
    ),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      return result;
    },
    onError: () => {},
  });

  return {
    data,
    loading: fetchLoading || onSearchLoading || onGetFoodRecommendationLoading,
    onSearch,
    onGetFoodRecommendation,
  };
};

export const useFood = ({ slug }: { slug?: string }) => {
  const { data: data, isLoading: fetchLoading } = useQuery({
    queryKey: [entity, slug],
    queryFn: async () => {
      const result = await axios.get(`${baseUrl}/foods/${slug}`);
      return result.data.food as FoodDetailsModel;
    },
    enabled: !!slug,
  });

  return { data, loading: fetchLoading };
};
