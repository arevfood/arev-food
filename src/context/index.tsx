import TemplateContextProvider from "./_example";
import FoodFilterContextProvider from "./food-filter";

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TemplateContextProvider>
      <FoodFilterContextProvider>{children}</FoodFilterContextProvider>
    </TemplateContextProvider>
  );
}
