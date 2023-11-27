import React, { Dispatch, FC, SetStateAction } from "react";
import { BranchProps } from "@/lib/api/branch.api";
import clsx from "clsx";
import { useRouter } from "next/router";

export interface BranchesProps {
  branches: BranchProps[] | null;
  selectedBranch: BranchProps | null;
  setSelectedBranch: Dispatch<SetStateAction<BranchProps | null>>;
}

const Branches: FC<BranchesProps> = ({
  branches,
  setSelectedBranch,
  selectedBranch,
}) => {
  const { push, pathname } = useRouter();
  return (
    <div
      className={
        "flex bg-white rounded-t-[4px] w-full overflow-x-auto border-b border-b-[#DADADA]"
      }
    >
      {branches?.map((branch) => (
        <div
          key={branch.id}
          onClick={() => {
            if (selectedBranch?.id === branch.id) return;
            push({
              pathname,
              query: {
                branch: branch.id,
              },
            });
          }}
          className={clsx(
            "px-3 py-2 cursor-pointer min-w-max trans hover:text-primary",
            selectedBranch?.id === branch.id
              ? "text-primary border-b-4 border-b-primary font-medium"
              : "text-[#747474] ",
          )}
        >
          {branch.branchLocale[0].name}
        </div>
      ))}
    </div>
  );
};

export default Branches;
