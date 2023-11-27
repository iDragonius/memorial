import React, { FC, useContext } from "react";
import { BranchProps } from "@/lib/api/branch.api";
import {
  BranchClockIcon,
  BranchEmailIcon,
  BranchLocationIcon,
  BranchPhoneIcon,
} from "@/components/icons/branch-info";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { BranchContext } from "@/components/ui/providers/BranchProvider";

export interface BranchInfoProps {
  data: BranchProps;
}

const BranchInfo: FC<BranchInfoProps> = ({ data }) => {
  const branchInfoData = [
    {
      id: 1,
      value: data.address,
      icon: (
        <div
          className={
            "w-6 h-6 flex items-center justify-center bg-[#5DAAA075] rounded-full"
          }
        >
          <BranchLocationIcon />
        </div>
      ),
    },
    {
      id: 2,
      value: data.phone,
      icon: (
        <div
          className={
            "w-6 h-6 flex items-center justify-center bg-[#5DAAA075] rounded-full"
          }
        >
          <BranchPhoneIcon />
        </div>
      ),
    },
    {
      id: 3,
      value: "08:30 - 17:00",
      icon: (
        <div
          className={
            "w-6 h-6 flex items-center justify-center bg-[#5DAAA075] rounded-full"
          }
        >
          <BranchClockIcon />
        </div>
      ),
    },
    {
      id: 4,
      value: data.email,
      icon: (
        <div
          className={
            "w-6 h-6 flex items-center justify-center bg-[#5DAAA075] rounded-full"
          }
        >
          <BranchEmailIcon />
        </div>
      ),
    },
  ];

  const { push, pathname } = useRouter();
  const { setSelectedBranch } = useContext(BranchContext);
  return (
    <div>
      <div className={"flex flex-col gap-6 mt-10"}>
        {branchInfoData.map((info) => (
          <div key={info.id} className={"flex gap-2.5 items-center"}>
            {info.icon}
            <p className={"text-14 sm:text-18"}>{info.value}</p>
          </div>
        ))}
      </div>
      <div className={"flex gap-3 mt-10 flex-wrap"}>
        {data.catalogTypes.map((type) => (
          <button
            key={type.id}
            className={
              "min-w-max trans text-[#00404D] py-2.5 px-4 font-medium rounded-[8px] bg-white hover:bg-bgSecondary hover:text-white"
            }
            style={{
              boxShadow: "0px 0px 2px 0px #858585",
            }}
            onClick={() => {
              setSelectedBranch(data);
              localStorage.setItem("branch", JSON.stringify(data));
              push({
                pathname: "/branch",
                query: {
                  branch: data.id,
                  catalog: type.id,
                },
              });
            }}
          >
            {" "}
            {type.locales[0].name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BranchInfo;
