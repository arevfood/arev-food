import { IonIcon } from "@ionic/react";
import CustomInput from "../input";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { FilterListModel } from "@/models/filter-list";
import CustomCheckbox from "@/components/common/checkbox";
import MainButton from "@/components/common/button";
import { useLocation, useHistory } from "react-router";
import { useFoodFilterCtx } from "@/context/food-filter";

type propTypes = {
  filterList: FilterListModel[];
  onFilter?: () => void;
  onReset?: () => void;
};

const SearchInput: React.FC<propTypes> = ({
  filterList,
  onFilter,
  onReset,
}) => {
  const router = useHistory();
  const location = useLocation();
  const { setValue: setFilterValue } = useFoodFilterCtx();

  const [searchInput, setSearchInput] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<{
    [key: string]: string[];
  }>({ health_conditions: [] });

  const handleSelectFilter = ({
    key,
    value,
  }: {
    key: string;
    value: string;
  }) => {
    const newSelectedFilter = { ...selectedFilter };
    newSelectedFilter[key] = [...(newSelectedFilter[key] || [])];

    if (newSelectedFilter[key].includes(value)) {
      newSelectedFilter[key] = newSelectedFilter[key].filter(
        (item) => item !== value
      );
    } else {
      newSelectedFilter[key].push(value);
    }

    setSelectedFilter(newSelectedFilter);
    setFilterValue(newSelectedFilter);
  };

  const handleSearchQuery = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("query", searchInput);
    router.push({
      pathname: location.pathname,
      search: `?${searchParams.toString()}`,
    });
  };

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchQuery();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleResetFilter = () => {
    setSelectedFilter({ health_conditions: [] });
    setFilterValue({});
    setOpenFilter(false);
    onReset?.();
  };

  return (
    <div className="relative">
      <div className="relative">
        <CustomInput
          icon="/icons/search.svg"
          iconClass="text-[20px] text-black/[0.42] pr-2.5"
          inputClass="!pr-[48px]"
          placeholder="Search..."
          value={searchInput}
          onChange={handleChange}
          onKeyDown={handleSearch}
          disabled={openFilter}
        />{" "}
        <div className={`absolute w-[40px] h-[40px] rounded-full -translate-y-1/2 top-1/2 right-[6px] flex items-center justify-center bg-primary_color ${openFilter ? 'contrast-200' : ''}`}>
          <IonIcon
            icon="/icons/filter.svg"
            className={`text-[18px] text-white_color`}
            onClick={() => {
              setOpenFilter(!openFilter);
            }}
          />
        </div>
      </div>
      {openFilter && (
        <div className="px-4 bg-white text-black rounded-[8px] absolute w-full z-10  overflow-y-scroll">
          <div className=" relative">
            <div className="h-[40vh] overflow-y-scroll pt-6">
              {filterList.map((item) => {
                return (
                  <div key={uuid()} className="mb-6">
                    <div className="font-heading font-bold mb-2">
                      {item.label}
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {item.items.map((list) => {
                        return (
                          <CustomCheckbox
                            label={list.label}
                            checked={
                              selectedFilter[item.key]?.includes(list.key) ||
                              false
                            }
                            onChange={() => {
                              handleSelectFilter({
                                key: item.key,
                                value: list.key,
                              });
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-4 flex-col py-6">
              <MainButton
                color="ORANGE"
                onClick={() => {
                  setOpenFilter(false);
                  handleSearchQuery();
                  onFilter?.();
                }}
              >
                Apply Filter
              </MainButton>
              <MainButton
                color="ORANGE_OUTLINE"
                onClick={() => {
                  handleResetFilter();
                }}
              >
                Clear Filter
              </MainButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
