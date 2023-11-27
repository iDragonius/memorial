import React, { FC, useContext } from "react";
import { BranchContext } from "@/components/ui/providers/BranchProvider";
import branchImage from "@/assets/clinic.jpg";
import Image from "next/image";
import Link from "next/link";
export interface BranchesProps {}

const Branches: FC<BranchesProps> = () => {
  const { branchData } = useContext(BranchContext);
  return (
    <div className={"box"}>
      <div className={"min-[1680px]:mx-[140px] mb-[80px]"}>
        <div className={"nb:bg-[#E8F5FF] py-14 nb:px-12 rounded-[16px]"}>
          <h2
            className={
              "text-24 sm:text-32 mb:text-40 text-secondary font-semibold  mb-3 sm:mb-6 mb:mb-10"
            }
          >
            Filiallarımız
          </h2>
          <div
            className={
              "grid grid-cols-2  min-[900px]:grid-cols-3 min-[1200px]:grid-cols-4 gap-6 relative"
            }
          >
            {branchData?.map((branch) => (
              <div
                className={
                  "relative rounded-[16px] h-[160px] sm:h-[260px] group w-full trans"
                }
                key={branch.id}
              >
                <Image
                  src={branchImage}
                  alt={"branch"}
                  className={"rounded-[16px] w-full h-[160px] sm:h-[260px] "}
                />
                <div className={"absolute bottom-0 trans w-full "}>
                  <p
                    className={
                      "text-white  text-16 sm:text-24 font-bold px-5 py-6"
                    }
                  >
                    {branch.branchLocale[0].name}
                  </p>
                  <Link
                    href={{
                      pathname: "/branch-info",
                      query: {
                        branch: branch.id,
                      },
                    }}
                    className={
                      "hidden   group-hover:flex group-hover:opacity-100 justify-between bg-white w-full trans  py-1 px-1 sm:px-4 sm:py-3  items-center min-w-full   rounded-b-[15px]"
                    }
                  >
                    <p className={"w-full max-sm:text-12"}>{branch.address}</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="33"
                      viewBox="0 0 32 33"
                      fill="none"
                    >
                      <path
                        d="M32 16.5C32 25.3366 24.8366 32.5 16 32.5C7.16344 32.5 0 25.3366 0 16.5C0 7.66344 7.16344 0.5 16 0.5C24.8366 0.5 32 7.66344 32 16.5Z"
                        fill="#099B87"
                      />
                      <path
                        d="M16.2923 22.223L15.3251 21.2727L19.1263 17.4715H10.862V16.1139H19.1263L15.3251 12.3127L16.2923 11.3624L21.7226 16.7927L16.2923 22.223Z"
                        fill="white"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branches;
