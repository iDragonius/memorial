import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { BranchItemProps } from "@/lib/api/branch-item.api";
import BranchItemModal from "@/components/ui/modals/BranchItemModal";
import BranchDoctorModal from "@/components/ui/modals/BranchDoctorModal";
import { ViewedItemProps } from "@/components/screens/branch/catalog/CategoryItems";
import Image from "next/image";
import { Constants } from "@/lib/constants";

export interface SearchBoxProps {
  data: BranchItemProps[];
}

const SearchBox: FC<SearchBoxProps> = ({ data }) => {
  const [viewedItem, setViewedItem] = useState<ViewedItemProps>({
    type: null,
    data: null,
  });

  return (
    <>
      {viewedItem.type === "SERVICE" && viewedItem.data && (
        <BranchItemModal
          data={viewedItem.data}
          close={() => setViewedItem({ type: null, data: null })}
        />
      )}
      {viewedItem.type === "DOCTOR" && viewedItem.data && (
        <BranchDoctorModal
          data={viewedItem.data}
          close={() => setViewedItem({ type: null, data: null })}
        />
      )}
      <div
        className={
          "flex flex-col absolute w-full   bg-white shadow-lg max-h-[300px] overflow-y-auto z-[300]"
        }
      >
        {data.map((branchItem) => {
          if (branchItem.type === "SERVICE") {
            return (
              <BranchServiceItem
                data={branchItem}
                key={branchItem.id}
                setViewedItem={setViewedItem}
              />
            );
          } else if (branchItem.type === "DOCTOR") {
            return (
              <BranchDoctorItem
                data={branchItem}
                key={branchItem.id}
                setViewedItem={setViewedItem}
              />
            );
          }
        })}
      </div>
    </>
  );
};
const BranchServiceItem = ({
  data,
  setViewedItem,
}: {
  data: BranchItemProps;
  setViewedItem: Dispatch<SetStateAction<ViewedItemProps>>;
}) => {
  return (
    <div
      onClick={() =>
        setViewedItem({
          type: "SERVICE",
          data,
        })
      }
      className={
        "flex justify-between  py-3 px-4 border-b cursor-pointer trans hover:bg-gray-100"
      }
    >
      <div>
        <p className={"text-14 text-[#8B8B8B] mb-2.5"}>
          Kodu: {data.details.code}
        </p>
        <h4 className={"font-medium mb-3"}>
          {data.item.details.locales[0].name}
        </h4>
        <p className={"text-primary text-12"}>
          {data.branch.branchLocale[0].name}
        </p>
      </div>
      <div>
        {data.promotedPrice === data.price ? (
          <p
            className={
              "text-20 font-semibold leading-[18px] text-primary text-right"
            }
          >
            {data.price / 100} AZN
          </p>
        ) : (
          <div>
            <p
              className={
                "text-[#A8A8A8] text-14 sm:text-16 line-through text-right leading-4"
              }
            >
              {data.price / 100} AZN
            </p>
            <p
              className={
                "text-16 sm:text-20 font-semibold leading-[18px] text-primary text-right"
              }
            >
              {data.promotedPrice / 100} AZN
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
const BranchDoctorItem = ({
  data,
  setViewedItem,
}: {
  data: BranchItemProps;
  setViewedItem: Dispatch<SetStateAction<ViewedItemProps>>;
}) => {
  return (
    <div
      className={
        "flex justify-between  py-3 px-4 border-b cursor-pointer trans hover:bg-gray-100 "
      }
      onClick={() =>
        setViewedItem({
          type: "DOCTOR",
          data,
        })
      }
    >
      <div className={"flex gap-3 "}>
        <Image
          src={Constants.fileApi + data.item.details.photo.id}
          alt={data.item.details.locales[0].name}
          width={96}
          height={96}
        />
        <div className={"flex flex-col justify-between"}>
          <div>
            <h4 className={"text-16 font-bold mb-2"}>
              {data.item.details.locales[0].name}
            </h4>
            <p className={"text-14 text-[#8B8B8B] "}>
              {data.item.details.catalog.locales[0].name}
            </p>
          </div>
          <p className={"text-primary text-12"}>
            {data.branch.branchLocale[0].name}
          </p>
        </div>
      </div>
      <div>
        {data.promotedPrice === data.price ? (
          <p
            className={
              "text-20 font-semibold leading-[18px] text-primary text-right"
            }
          >
            {data.price / 100} AZN
          </p>
        ) : (
          <div>
            <p
              className={
                "text-[#A8A8A8] text-14 sm:text-16 line-through text-right leading-4"
              }
            >
              {data.price / 100} AZN
            </p>
            <p
              className={
                "text-16 sm:text-20 font-semibold leading-[18px] text-primary text-right"
              }
            >
              {data.promotedPrice / 100} AZN
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchBox;
