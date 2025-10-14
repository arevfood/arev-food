import { IonIcon, IonImg } from '@ionic/react'
import CustomInput from '../input'
import { useState, useEffect, useRef, useCallback } from 'react'
import { v4 as uuid } from 'uuid'
import { FilterListModel } from '@/models/filter-list'
import CustomCheckbox from '@/components/common/checkbox'
import MainButton from '@/components/common/button'
import { useLocation, useHistory } from 'react-router'
import { useFoodFilterCtx } from '@/context/food-filter'
import { useSearchFilterCtx } from '@/context/search-filter'
import { diseaseSearch } from '@/hooks/data/disease-search'
import { useFoods } from '@/hooks/data/food'
import { FoodQueryDataModel } from '@/models/food-query'
import debounce from 'lodash/debounce'

type propTypes = {
  filterList: FilterListModel[]
  onFilter?: () => void
  onReset?: () => void
}

const SearchInput: React.FC<propTypes> = ({ filterList, onFilter, onReset }) => {
  const router = useHistory()
  const location = useLocation()
  const { setValue: setFilterValue } = useFoodFilterCtx()
  const { openFilter, setOpenFilter } = useSearchFilterCtx()

  const { onSearch: onSearchFood } = useFoods({})

  const [searchInput, setSearchInput] = useState('')
  const [diseaseSuggestions, setDiseaseSuggestions] = useState<string[]>([])
  const [foodSuggestions, setFoodSuggestions] = useState<FoodQueryDataModel[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const [selectedFilter, setSelectedFilter] = useState<{
    [key: string]: string[]
  }>({ health_conditions: [] })

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectFilter = ({ key, value }: { key: string; value: string }) => {
    const newSelectedFilter = { ...selectedFilter }
    newSelectedFilter[key] = [...(newSelectedFilter[key] || [])]

    if (newSelectedFilter[key].includes(value)) {
      newSelectedFilter[key] = newSelectedFilter[key].filter((item) => item !== value)
    } else {
      newSelectedFilter[key].push(value)
    }

    setSelectedFilter(newSelectedFilter)
    setFilterValue(newSelectedFilter)
  }

  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      const diseaseResults = diseaseSearch(value).map((d) => d.label)
      setDiseaseSuggestions(Array.from(new Set(diseaseResults)))

      try {
        const foods = await onSearchFood({
          query: value,
        })
        setFoodSuggestions(foods || [])
      } catch {
        setFoodSuggestions([])
      }
    }, 400),
    [],
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchInput(value)
    if (value.trim()) {
      setShowSuggestions(true)
      debouncedSearch(value)
    } else {
      setShowSuggestions(false)
      setDiseaseSuggestions([])
      setFoodSuggestions([])
    }
  }

  const handleSearchQuery = (value?: string) => {
    const query = (value !== undefined ? value : searchInput).trim()

    if (!query) {
      const params = new URLSearchParams(location.search)
      params.delete('query')
      router.push({
        pathname: location.pathname,
        search: `?${params.toString()}`,
      })
      setShowSuggestions(false)
      return
    }

    const searchParams = new URLSearchParams(location.search)
    searchParams.set('query', query)
    router.push({
      pathname: location.pathname,
      search: `?${searchParams.toString()}`,
    })

    setSearchInput(query)
    setShowSuggestions(false)
  }

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchQuery()
    }
  }

  const handleSelectSuggestion = (item: string) => {
    handleSearchQuery(item)
  }

  const handleResetFilter = () => {
    setSelectedFilter({ health_conditions: [] })
    setFilterValue({})
    setOpenFilter(false)
    setSearchInput('')
    setDiseaseSuggestions([])
    setFoodSuggestions([])
    setShowSuggestions(false)
    onReset?.()
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative">
        <CustomInput
          icon="/icons/search.svg"
          iconClass="text-[20px] text-black/[0.42] pr-2.5"
          inputClass="!pr-[48px]"
          placeholder="Search diseases or foods..."
          value={searchInput}
          onChange={handleChange}
          onKeyDown={handleSearch}
          disabled={openFilter}
        />
        <div
          className={`absolute w-[40px] h-[40px] rounded-full -translate-y-1/2 top-1/2 right-[6px] flex items-center justify-center bg-primary_color ${
            openFilter ? 'contrast-200' : ''
          }`}
        >
          <IonIcon
            icon="/icons/filter.svg"
            className="text-[18px] text-white_color"
            onClick={() => {
              setOpenFilter(!openFilter)
              setShowSuggestions(false)
            }}
          />
        </div>
      </div>

      {showSuggestions && (diseaseSuggestions.length > 0 || foodSuggestions.length > 0) && (
        <ul className="absolute w-full bg-white -mt-1 rounded-[6px] shadow-lg max-h-72 overflow-y-auto z-[100] py-2">
          {diseaseSuggestions.length > 0 && (
            <>
              <li className="px-4 py-2 text-[0.913rem] text-black_color font-medium border-b border-black_color/[0.12] flex items-center">
                Disease Suggestions{' '}
                <span className="text-black_color/[0.42] text-[0.813rem] ml-auto font-normal">
                  {diseaseSuggestions.length} found.
                </span>
              </li>
              {diseaseSuggestions.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    handleSelectSuggestion(item)
                    setShowSuggestions(false)
                  }}
                  className="px-4 py-2 cursor-pointer text-[0.913rem] text-black_color/[0.62] hover:bg-black_color/[0.04] hover:text-black"
                >
                  {item}
                </li>
              ))}
            </>
          )}
          {foodSuggestions.length > 0 && (
            <>
              <li
                className={`px-4 py-2 text-[0.913rem] text-black_color font-medium border-b border-black_color/[0.12] flex items-center ${diseaseSuggestions.length > 0 ? 'border-t mt-4' : ''}`}
              >
                Food Suggestions{' '}
                <span className="text-black_color/[0.42] text-[0.813rem] ml-auto font-normal">
                  {foodSuggestions.length} found.
                </span>
              </li>
              {foodSuggestions.map((food) => (
                <li
                  key={food.id}
                  onClick={() => handleSelectSuggestion(food.name)}
                  className="px-4 py-2 cursor-pointer text-[0.913rem] text-black_color/[0.62] hover:bg-black_color/[0.04] hover:text-black flex items-center gap-2"
                >
                  <IonImg
                    src={food.image_url}
                    alt={food.name}
                    className="w-8 h-8 !rounded-[4px] object-cover overflow-hidden"
                  />
                  {food.name}
                </li>
              ))}
            </>
          )}
        </ul>
      )}

      {openFilter && (
        <div className="px-4 bg-white text-black rounded-[8px] absolute w-full z-[100] overflow-y-scroll">
          <div className="relative">
            <div className="h-[calc(50vh_+_10px)] overflow-y-scroll pt-6">
              {filterList.map((item) => {
                return (
                  <div key={uuid()} className="mb-6">
                    <div className="font-heading font-bold mb-2">{item.label}</div>
                    <div className="flex flex-wrap gap-4">
                      {item.items.map((list) => {
                        return (
                          <CustomCheckbox
                            key={list.key}
                            label={list.label}
                            checked={selectedFilter[item.key]?.includes(list.key) || false}
                            onChange={() => {
                              handleSelectFilter({
                                key: item.key,
                                value: list.key,
                              })
                            }}
                          />
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex flex-wrap gap-4 flex-col py-6">
              <MainButton
                color="ORANGE"
                onClick={() => {
                  setOpenFilter(false)
                  handleSearchQuery()
                  setSearchInput('')
                  onFilter?.()
                }}
              >
                Apply Filter
              </MainButton>
              <MainButton
                color="ORANGE_OUTLINE"
                onClick={() => {
                  handleResetFilter()
                }}
              >
                Clear Filter
              </MainButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchInput
