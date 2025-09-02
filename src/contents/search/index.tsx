import FoodCard from "@/components/common/food-card";
import IconTitle from "@/components/common/icon-title";
import SearchInput from "@/components/common/search-input";
import { useFoodFilterCtx } from "@/context/food-filter";
import { foodFilterData } from "@/data/food-filter";
import { useFavorite } from "@/hooks/data/favorite";
import { useFoods } from "@/hooks/data/food";
import { FoodQueryDataModel } from "@/models/food-query";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";

const ContentSearch: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [isSearch, setIsSearch] = useState(!!query);

  const {
    data: foodsData,
    onSearch,
    onGetFoodRecommendation,
    loading: foodsLoading,
  } = useFoods({});
  const { data: favoriteData, onFavorite } = useFavorite();
  const { value: filterValue } = useFoodFilterCtx();

  const [searchResult, setSearchResult] = useState<FoodQueryDataModel[]>([]);
  const handleSearch = useCallback(
    async (search: string) => {
      if (query) {
        const data = await onSearch({
          query: search,
          query_type: "concept",
        });
        setSearchResult(data);
        setIsSearch(true);
      }
    },
    [onSearch, query]
  );

  const handleFilter = useCallback(async () => {
    if (filterValue) {
      const data = await onGetFoodRecommendation({
        payload: filterValue,
        type: "recommend",
      });
      setSearchResult(data);
      setIsSearch(true);
    }
  }, [filterValue, onGetFoodRecommendation]);

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
    setIsSearch(!!(query && query.trim().length > 0));
  }, [handleSearch, query]);

  return (
    <>
      <SearchInput
        filterList={foodFilterData}
        onFilter={() => {
          handleFilter();
        }}
        onReset={() => {
          setSearchResult([]);
          setIsSearch(false);
        }}
      />
      {!isSearch && (
        <>
          <IconTitle title="Popular Result" icon="/icons/search-love.svg"/>
          <div className="grid grid-cols-2 gap-[16px] my-4">
            {foodsData &&
                foodsData.map((food, index) => {
                  return (
                      <FoodCard
                          key={index}
                          slug={food.id}
                          image={food.image_url}
                          title={food.name}
                          description={food.food_details?.description || "-"}
                          isFav={
                              favoriteData?.findIndex(
                                  (findFood) => findFood.id === food.id
                              ) !== -1 && Boolean(food.id)
                          }
                          onFavorite={() => onFavorite({ food_id: food.id })}
                          loading={foodsLoading}
                      />
                  );
                })}
          </div>
        </>
      )}

      {isSearch && (
        <>
          <IconTitle title={`Showing results for "${query}"`} icon="/icons/search-love.svg" />
          <div className="grid grid-cols-2 gap-[16px] my-4">
            {searchResult.map((food) => {
              return (
                <FoodCard
                  slug={food.id}
                  image={food.image_url}
                  title={food.name}
                  description={food.food_details?.description || "-"}
                  loading={foodsLoading}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default ContentSearch;
