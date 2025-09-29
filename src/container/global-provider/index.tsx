import GlobalContextProvider from '@/context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
      },
    },
  })

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default GlobalProvider
