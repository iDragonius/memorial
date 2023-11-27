import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { BranchSearchIcon } from "@/components/icons";
import { useDebounce, useOnClickOutside } from "usehooks-ts";
import { BranchItemApi, BranchItemProps } from "@/lib/api/branch-item.api";
import SearchBox from "@/components/ui/search-box";
import { BranchContext } from "@/components/ui/providers/BranchProvider";

export interface SearchProps {}

const Search: FC<SearchProps> = () => {
  const [searchedData, setSearchedData] = useState<BranchItemProps[]>([]);

  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);
  const { selectedBranch } = useContext(BranchContext);

  useEffect(() => {
    if (value.length < 3) {
      setSearchedData([]);
      return;
    }
    BranchItemApi.searchBranchItems({
      params: {
        search: value,
        branchId: selectedBranch?.id,
      },
    }).then((res) => {
      if (res.data.success) {
        setSearchedData(res.data.data.items);
      }
    });
  }, [debouncedValue]);
  const searchBoxRef = useRef<null | HTMLDivElement>(null);
  useOnClickOutside(searchBoxRef, () => {
    setSearchedData([]);
  });
  return (
    <div className={"relative"} ref={searchBoxRef}>
      <div className={"relative"}>
        <BranchSearchIcon className={"absolute top-3 left-3"} />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={
            "py-3 px-4 pl-10  h-12 text-[#6E6E6E] placeholder:text-[#6E6E6E]  border border-inputBorder w-full outline-none trans hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-70 rounded-[2px]"
          }
          placeholder={"Search"}
        />
      </div>
      {!!searchedData.length && <SearchBox data={searchedData} />}
    </div>
  );
};

export default Search;
