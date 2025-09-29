import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useCountry = () => {
  const { data: countries } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const res = await axios.get('https://countriesnow.space/api/v0.1/countries/positions')
      const countryList = res.data.data.map((country: { name: string }) => country.name)
      return countryList as string[]
    },
  })
  return { countries }
}

export const useCity = ({ country }: { country: string }) => {
  const { data: cities } = useQuery({
    queryKey: ['cities', country],
    queryFn: async () => {
      const res = await axios.post('https://countriesnow.space/api/v0.1/countries/cities', {
        country,
      })
      const data = Array.isArray(res.data.data) ? res.data.data : []
      return data as string[]
    },
    enabled: !!country,
  })
  return { cities }
}
