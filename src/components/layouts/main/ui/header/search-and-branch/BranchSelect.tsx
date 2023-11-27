import React, { FC, useContext, useRef, useState } from "react";
import { BranchAddressIcon, BranchDropDownIcon } from "@/components/icons";
import { BranchContext } from "@/components/ui/providers/BranchProvider";
import clsx from "clsx";
import { BranchProps } from "@/lib/api/branch.api";
import { useRouter } from "next/router";
import { useOnClickOutside } from "usehooks-ts";

export interface BranchSelectProps {}

const BranchSelect: FC<BranchSelectProps> = () => {
  const { push, pathname } = useRouter();
  const { selectedBranch, setSelectedBranch, branchData } =
    useContext(BranchContext);
  const [isOpen, setOpen] = useState<boolean>(false);
  const selectRef = useRef<null | HTMLDivElement>(null);
  useOnClickOutside(selectRef, () => setOpen(false));
  const selectBranch = (data: BranchProps) => {
    if (data.id === selectedBranch?.id) {
      setOpen(false);

      return;
    }
    setSelectedBranch(data);
    setOpen(false);
    localStorage.setItem("branch", JSON.stringify(data));
    if (pathname === "/branch") {
      push({
        pathname: `/branch`,
        query: {
          catalog: data.catalogTypes[0].id,
          branch: data.id,
        },
      });
    }
  };
  return (
    <div className={"relative "} ref={selectRef}>
      <div
        onClick={() => {
          setOpen((prevState) => !prevState);
        }}
        className={
          "bg-[#F2F2F2]  max-[400px]:w-[300px]  w-[171px] sm:w-[200px] flex justify-between h-[48px] p-3 cursor-pointer gap-3 items-center "
        }
      >
        <div className={"flex gap-3 items-center"}>
          <BranchAddressIcon />
          <p
            className={
              "text-12 sm:text-14 font-medium text-[#747474]  truncate w-20 sm:w-28"
            }
          >
            {selectedBranch
              ? selectedBranch.branchLocale[0].name
              : "Filialı seçin"}
          </p>
        </div>

        <BranchDropDownIcon />
      </div>

      {isOpen && (
        <div
          className={
            "bg-white absolute w-[230px] max-sm:right-0 shadow-lg z-50 "
          }
        >
          {branchData?.map((branch) => (
            <div
              onClick={(e) => {
                e.preventDefault();
                selectBranch(branch);
              }}
              key={branch.id}
              className={clsx(
                "text-14  trans py-3 pl-6 pr-4 cursor-pointer ",
                selectedBranch?.id === branch.id
                  ? "bg-[#5DAAA0] text-white"
                  : "text-[#768A8E] hover:bg-gray-200",
              )}
            >
              {branch.branchLocale[0].name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BranchSelect;
