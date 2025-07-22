import { IonIcon } from "@ionic/react";
import CustomInput from "../input";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { FilterListModel } from "@/models/filter-list";
import CustomCheckbox from "@/components/common/checkbox";
import MainButton from "@/components/common/button";
import { useLocation, useHistory } from "react-router";

type propTypes = {
  filterList: FilterListModel[];
};

const SearchInput: React.FC<propTypes> = ({ filterList }) => {
  const router = useHistory();
  const location = useLocation();

  const [searchInput, setSearchInput] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<{
    [parent: string]: string[];
  }>({ health_condition: [] });

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
  };

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("query", searchInput);
      router.push({
        pathname: location.pathname,
        search: `?${searchParams.toString()}`,
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="relative">
      <div className="relative">
        <CustomInput
          icon="/icons/search.svg"
          iconClass="text-[24px] text-black/40 pr-3"
          placeholder="Search..."
          onChange={handleChange}
          onKeyDown={handleSearch}
        />{" "}
        <div className="absolute translate-y-[-50%] top-[50%] right-[20px] flex items-center bg-white">
          <IonIcon
            icon="/icons/filter.svg"
            className={`text-[18px] ${
              openFilter ? "text-black" : "text-black/40"
            }`}
            onClick={() => {
              setOpenFilter(!openFilter);
            }}
          />
        </div>
      </div>
      {openFilter && (
        <div className="px-4 py-6 bg-white text-black rounded-[8px] absolute w-full z-10">
          {filterList.map((item) => {
            return (
              <div key={uuid()} className="mb-6">
                <div className="font-heading font-bold mb-2">{item.label}</div>
                <div className="flex flex-wrap gap-4">
                  {item.items.map((list) => {
                    return (
                      <CustomCheckbox
                        label={list.label}
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
          <div className="flex flex-wrap gap-4 flex-col">
            <MainButton color="ORANGE">Apply Filter</MainButton>
            <MainButton
              color="ORANGE_OUTLINE"
              onClick={() => {
                setSelectedFilter({ health_condition: [] });
              }}
            >
              Clear Filter
            </MainButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
