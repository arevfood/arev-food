import ContentSearch from '@/contents/search'
import MainLayouts from '@/layouts/main'
import SearchFilterContextProvider, { useSearchFilterCtx } from '@/context/search-filter'

const SearchBody: React.FC = () => {
  const { openFilter } = useSearchFilterCtx()

  return (
    <div className={`mt-2 content-body-search ${openFilter ? 'overflow-hidden h-[82dvh]' : ''}`}>
      <ContentSearch />
    </div>
  )
}

const PagesSearch: React.FC = () => {
  return (
    <MainLayouts>
      <SearchFilterContextProvider>
        <SearchBody />
      </SearchFilterContextProvider>
    </MainLayouts>
  )
}

export default PagesSearch
