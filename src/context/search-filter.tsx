/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react'

type SearchFilterContextType = {
  openFilter: boolean
  toggleFilter: () => void
  setOpenFilter: (val: boolean) => void
}

const SearchFilterContext = createContext<SearchFilterContextType>({
  openFilter: false,
  toggleFilter: () => {},
  setOpenFilter: () => {},
})

export function SearchFilterContextProvider(props: { children: React.ReactNode }) {
  const [openFilter, setOpenFilterState] = useState(false)

  const toggleFilter = () => {
    setOpenFilterState((prev) => !prev)
  }

  const setOpenFilter = (val: boolean) => {
    setOpenFilterState(val)
  }

  const context: SearchFilterContextType = {
    openFilter,
    toggleFilter,
    setOpenFilter,
  }

  return (
    <SearchFilterContext.Provider value={context}>{props.children}</SearchFilterContext.Provider>
  )
}

export default SearchFilterContextProvider

export const useSearchFilterCtx = () => useContext(SearchFilterContext)
