import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { HeaderSearchIcon } from "@/components/icons";
import { useDebounce } from "usehooks-ts";
import { BranchItemApi, BranchItemProps } from "@/lib/api/branch-item.api";

export interface SearchProps {
  searchedData: BranchItemProps[];
  setSearchedData: Dispatch<SetStateAction<BranchItemProps[]>>;
}

const Search: FC<SearchProps> = ({ setSearchedData, searchedData }) => {
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);
  useEffect(() => {
    if (value.length < 3) {
      setSearchedData([]);
      return;
    }
    BranchItemApi.searchBranchItems({
      params: {
        search: value,
      },
    }).then((res) => {
      if (res.data.success) {
        setSearchedData(res.data.data.items);
      }
    });
  }, [debouncedValue]);
  const refetchData = () => {
    if (value.length < 3) {
      setSearchedData([]);
      return;
    }
    BranchItemApi.searchBranchItems({
      params: {
        search: value,
      },
    }).then((res) => {
      if (res.data.success) {
        setSearchedData(res.data.data.items);
      }
    });
  };
  return (
    <div className={"relative"}>
      <div className={"relative h-[48px]"}>
        <HeaderSearchIcon className={"absolute left-[10px] top-3"} />
        <input
          value={value}
          onFocus={refetchData}
          onChange={(e) => setValue(e.target.value)}
          className={
            " max-[400px]:w-[300px] max-[520px]:w-[170px] w-[300px] border border-inputBorder h-full pl-10 pr-3 trans hover:border-primary outline-none placeholder:text-[#BEBEBE] text-14 rounded-l-[2px] focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          }
          placeholder={"Search"}
        />
      </div>
    </div>
  );
};

export default Search;
