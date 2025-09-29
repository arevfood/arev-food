/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react'

const FoodFilterContext = createContext<{
  value: { [key: string]: string | string[] }
  setValue: (value: { [key: string]: string | string[] }) => void
}>({
  value: {},
  setValue: function (_value) {},
})

export function FoodFilterContextProvider(props: { children: React.ReactNode }) {
  const [value, setValue] = useState({})
  function handleSetValue(value: { [key: string]: string | string[] }) {
    setValue(value)
  }

  const context = {
    value: value,
    setValue: handleSetValue,
  }

  return <FoodFilterContext.Provider value={context}>{props.children}</FoodFilterContext.Provider>
}
export default FoodFilterContextProvider

export const useFoodFilterCtx = () => useContext(FoodFilterContext)
