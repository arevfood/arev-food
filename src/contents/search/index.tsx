import FoodCard from '@/components/common/food-card'
import IconTitle from '@/components/common/icon-title'
import SearchInput from '@/components/common/search-input'
import { useFoodFilterCtx } from '@/context/food-filter'
import { foodFilterData } from '@/data/food-filter'
import { useFavorite } from '@/hooks/data/favorite'
import { useFoods } from '@/hooks/data/food'
import { FoodQueryDataModel } from '@/models/food-query'
import { useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { useUser } from '@/hooks/data/user'
import { getAge } from '@/utils/generate-age'
import MainButton from '@/components/common/button'
import CardEmpty from '@/components/wrapper/card-empty'
import DiseaseCard from '@/components/common/disease-card'
import { useDiseases } from '@/hooks/data/disease'
import { FilterDiseaseModel } from '@/models/filter-list'
import CardLoading from '@/components/wrapper/card-loading'

const ContentSearch: React.FC = () => {
  const location = useLocation()
  const query = new URLSearchParams(location.search).get('query')
  const [isSearch, setIsSearch] = useState(!!query)
  const router = useHistory()
  const [isSearchTab, setIsSearchTab] = useState<boolean>(true)
  const { data: userDetail } = useUser()
  const [hideLoadMore, setHideLoadMore] = useState(false)
  const [showLoadMoreDisease, setShowLoadMoreDisease] = useState(false)
  const [isFilterMode, setIsFilterMode] = useState(false)
  const [paginationDisease, setPaginationDisease] = useState<number>(1)

  const {
    data: foodsData,
    onSearch: foodsSearch,
    onGetFoodRecommendation,
    loading: foodsLoading,
  } = useFoods({})

  const { data: diseasesData, onSearch: diseasesSearch, loading: diseasesLoading } = useDiseases({})
  const { data: favoriteData, onFavorite } = useFavorite()
  const { value: filterValue } = useFoodFilterCtx()

  const [searchResult, setSearchResult] = useState<FoodQueryDataModel[]>([])
  const [searchResultDisease, setSearchResultDisease] = useState<FilterDiseaseModel[]>([])

  const onResetPath = useCallback(() => {
    const params = new URLSearchParams(location.search)
    params.delete('query')
    router.push(`${location.pathname}?${params.toString()}`)
  }, [location, router])

  const handleSearchDisease = useCallback(
    async (search: string, recentPage?: number) => {
      const diseasesDataSearch = await diseasesSearch(search, recentPage)
      if (!recentPage) {
        setShowLoadMoreDisease(diseasesDataSearch.length >= 10)
      } else {
        setShowLoadMoreDisease(diseasesDataSearch.length > 0)
      }
      setSearchResultDisease((prev) =>
        recentPage ? [...prev, ...diseasesDataSearch] : diseasesDataSearch,
      )
      if (search) {
        setIsSearch(true)
      }
    },
    [diseasesSearch],
  )

  const handleSearch = useCallback(
    async (search: string, recentTemperature?: number) => {
      if (query && userDetail) {
        const temperature = recentTemperature || 0
        const data = await foodsSearch({
          metadata: {
            age: String(getAge(userDetail.dateBirth)),
            country: userDetail.country,
            city: userDetail.city,
            gender: userDetail.gender,
            height: String(userDetail.health.height),
            weight: String(userDetail.health.weight),
            blood_sugar_level: String(userDetail.health.blood_sugar_level),
            blood_pressure: userDetail.health.blood_pressure,
            dietary_preference: userDetail.health.dietary_preference,
            health_condition: userDetail.health.health_conditions
              .split(',')
              .map((condition: string) => condition.trim()),
            health_conditions: [search],
            lifestyle: userDetail.health.lifestyle,
          },
          query: search,
          temperature,
        })
        setSearchResult((prev) => {
          if (recentTemperature) {
            const tempData: FoodQueryDataModel[] = []
            for (let i = 0; i < data.length; i++) {
              const exists = prev.some((prevData) => prevData.id === data[i].id)
              if (!exists) {
                tempData.push(data[i])
              }
            }
            if (!tempData.length) {
              setHideLoadMore(true)
            }
            return [...prev, ...tempData]
          } else {
            setHideLoadMore(false)
            setIsFilterMode(false)
            return data
          }
        })
        if (data.length === 0) {
          setIsSearchTab(false)
          await handleSearchDisease(search)
        }
        setIsSearch(true)
      }
    },
    [foodsSearch, query, userDetail, handleSearchDisease],
  )

  const handleLoadMore = async () => {
    if (isSearchTab) {
      if (isFilterMode) {
        await handleFilter(1)
      } else {
        await handleSearch(query || '', 1)
      }
    } else {
      const nextPage = paginationDisease + 1
      setPaginationDisease(nextPage)
      await handleSearchDisease(query || '', nextPage)
    }
  }

  const handleFilter = useCallback(
    async (recentTemperature?: number) => {
      if (filterValue) {
        onResetPath()
        const temperature = recentTemperature || 0
        const data = await onGetFoodRecommendation({
          payload: filterValue,
          type: 'recommend',
          temperature,
        })
        setSearchResult((prev) => {
          if (recentTemperature) {
            const tempData: FoodQueryDataModel[] = []
            for (let i = 0; i < data.length; i++) {
              const exists = prev.some((prevData) => prevData.id === data[i].id)
              if (!exists) {
                tempData.push(data[i])
              }
            }
            if (!tempData.length) {
              setHideLoadMore(true)
            }
            return [...prev, ...tempData]
          } else {
            setHideLoadMore(false)
            setIsFilterMode(true)
            return data
          }
        })
        setIsSearch(true)
      }
    },
    [onResetPath, filterValue, onGetFoodRecommendation],
  )
  useEffect(() => {
    handleSearch(query || '')
    handleSearchDisease(query || '')
    setIsSearchTab(true)
  }, [query, handleSearch, handleSearchDisease])

  return (
    <>
      <div className="w-full flex items-center justify-center mb-2">
        <div className="w-fit p-1 bg-white_color rounded-full flex mb-2">
          <p
            className={`text-center py-2 px-5 rounded-full text-[0.913rem] ${isSearchTab ? 'text-white_color bg-primary_color' : 'text-black_color/[0.6] bg-transparent hover:bg-black_color/[0.04]'}`}
            onClick={() => setIsSearchTab(true)}
          >
            Food
          </p>
          <p
            className={`text-center py-2 px-5 rounded-full text-[0.913rem] ${!isSearchTab ? 'text-white_color bg-primary_color' : 'text-black_color/[0.6] bg-transparent hover:bg-black_color/[0.04]'}`}
            onClick={() => setIsSearchTab(false)}
          >
            Disease
          </p>
        </div>
      </div>

      <SearchInput
        filterList={foodFilterData}
        onFilter={() => {
          handleFilter()
        }}
        onReset={() => {
          setSearchResult([])
          setIsSearch(false)
          onResetPath()
          router.replace('/search')
        }}
      />

      {!isSearch && (
        <>
          <IconTitle
            title={isSearchTab ? 'Popular Result' : 'All Disease'}
            icon="/icons/search-love.svg"
          />
          <div className="grid grid-cols-2 gap-[16px] my-4">
            {isSearchTab &&
              foodsData &&
              foodsData.map((food, index) => {
                return (
                  <FoodCard
                    key={index}
                    slug={food.id}
                    image={food.image_url}
                    title={food.name}
                    description={food.food_details?.description || '-'}
                    isFav={
                      favoriteData?.findIndex((findFood) => findFood.id === food.id) !== -1 &&
                      Boolean(food.id)
                    }
                    onFavorite={() => onFavorite({ food_id: food.id })}
                    loading={foodsLoading}
                  />
                )
              })}
            {!isSearchTab &&
              diseasesData &&
              diseasesData.map((disease, index) => {
                return (
                  <DiseaseCard
                    key={index}
                    slug={disease.key}
                    title={disease.label}
                    description={disease.description || '-'}
                    loading={diseasesLoading}
                  />
                )
              })}
          </div>
        </>
      )}

      {isSearch && (
        <>
          <IconTitle
            title={query ? `Showing results for "${query}"` : 'Filtered results'}
            icon="/icons/search-love.svg"
          />
          {isSearchTab && (
            <div
              className={`grid gap-[16px] my-4 ${searchResult.length === 0 ? 'grid-cols-1' : 'grid-cols-2'}`}
            >
              {!foodsLoading && searchResult.length === 0 && (
                <CardEmpty title="No results for your search" />
              )}
              {searchResult.length > 0 &&
                searchResult.map((food, index) => (
                  <FoodCard
                    key={index}
                    slug={food.id}
                    image={food.image_url}
                    title={food.name}
                    description={food.food_details?.description || '-'}
                    loading={foodsLoading}
                  />
                ))}
            </div>
          )}

          {!isSearchTab && (
            <div
              className={`grid gap-[16px] my-4 ${searchResultDisease.length === 0 ? 'grid-cols-1' : 'grid-cols-2'}`}
            >
              {!diseasesLoading && searchResultDisease.length === 0 && (
                <CardEmpty title="No results for your search" />
              )}
              {searchResultDisease.length > 0 &&
                searchResultDisease.map((disease, index) => (
                  <DiseaseCard
                    key={index}
                    slug={disease.key}
                    title={disease.label}
                    description={disease.description || '-'}
                    loading={diseasesLoading}
                  />
                ))}
            </div>
          )}
        </>
      )}

      {isSearch && isSearchTab && !hideLoadMore && (
        <div className="w-fit mx-auto mt-8 mb-4">
          {foodsLoading && <CardLoading />}
          {!foodsLoading && (
            <MainButton color="ORANGE" onClick={handleLoadMore}>
              Load More
            </MainButton>
          )}
        </div>
      )}

      {isSearch && !isSearchTab && showLoadMoreDisease && (
        <div className="w-fit mx-auto mt-8 mb-4">
          {diseasesLoading && <CardLoading />}
          {!diseasesLoading && (
            <MainButton color="ORANGE" onClick={handleLoadMore}>
              Load More
            </MainButton>
          )}
        </div>
      )}
    </>
  )
}

export default ContentSearch
