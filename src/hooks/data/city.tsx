import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCountry = () => {
  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await axios.get(
        "https://countriesnow.space/api/v0.1/countries/positions"
      );
      const countryList = res.data.data.map(
        (country: { name: string }) => country.name
      );
      console.log(countryList);
      return countryList as string[];
    },
  });
  return { countries };
};
