import React, { FC, useRef, useState } from "react";
import Search from "@/components/layouts/main/ui/header/search-and-branch/Search";
import BranchSelect from "@/components/layouts/main/ui/header/search-and-branch/BranchSelect";
import { BranchItemProps } from "@/lib/api/branch-item.api";
import SearchBox from "@/components/ui/search-box";
import { useOnClickOutside } from "usehooks-ts";

export interface SearchAndBranchProps {}

const SearchAndBranch: FC<SearchAndBranchProps> = () => {
  const [searchedData, setSearchedData] = useState<BranchItemProps[]>([]);
  const searchBoxRef = useRef<null | HTMLDivElement>(null);
  useOnClickOutside(searchBoxRef, () => {
    setSearchedData([]);
  });
  return (
    <div className={"relative"} ref={searchBoxRef}>
      <div className={"flex min-[400px]:flex-row flex-col-reverse"}>
        <Search searchedData={searchedData} setSearchedData={setSearchedData} />
        <BranchSelect />
      </div>
      {!!searchedData.length && <SearchBox data={searchedData} />}
    </div>
  );
};

export default SearchAndBranch;
