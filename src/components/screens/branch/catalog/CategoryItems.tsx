import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { SelectedCategoryProps } from "@/components/screens/branch/catalog/index";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  BranchItemApi,
  BranchItemProps,
  ItemTypes,
} from "@/lib/api/branch-item.api";
import { useRouter } from "next/router";
import Image from "next/image";
import { Constants } from "@/lib/constants";
import BranchItemModal from "@/components/ui/modals/BranchItemModal";
import { BasketApi } from "@/lib/api/basket.api";
import { UserContext } from "@/components/ui/providers/UserProvider";
import { BasketContext } from "@/components/ui/providers/BasketProvider";
import ButtonLoader from "@/components/ui/loader/ButtonLoader";
import CustomLoader from "@/components/ui/loader/CustomLoader";
import BranchDoctorModal from "@/components/ui/modals/BranchDoctorModal";
import toast from "react-hot-toast";
import ErrorMessages from "@/lib/error-messages";
import { ShowError } from "@/utils/show-error";

export interface CategoryItemsProps {
  selectedCategory: SelectedCategoryProps;
  setSelectedCategory: Dispatch<SetStateAction<SelectedCategoryProps>>;
}
export interface ViewedItemProps {
  type: ItemTypes | null;
  data: BranchItemProps | null;
}
const CategoryItems: FC<CategoryItemsProps> = ({
  setSelectedCategory,
  selectedCategory,
}) => {
  const { query, isReady, push } = useRouter();
  const { userData } = useContext(UserContext);
  const { data: branchItemsData, isLoading } = useQuery({
    queryKey: ["branch-items", query.childCategory, query.parentCategory],
    queryFn: () =>
      BranchItemApi.getBranchItems({
        catalogId: query.childCategory
          ? (query.childCategory as string)
          : (query.parentCategory as string),
        branchId: query.branch as string,
      }),
    enabled: isReady && !!query.parentCategory,
  });

  const [viewedItem, setViewedItem] = useState<ViewedItemProps>({
    type: null,
    data: null,
  });
  const { setBasketData } = useContext(BasketContext);
  const { mutateAsync: addItemToBasketFunc, isPending } = useMutation({
    mutationFn: BasketApi.addItemToBasket,
  });
  const [pendingItem, setPendingItem] = useState<string | null>(null);

  const addToBasket = (data: BranchItemProps) => {
    if (isPending) return;
    if (!userData) {
      push("/auth/sign-in");
      return;
    }
    setPendingItem(data.id);

    addItemToBasketFunc({
      branchId: query.branch as string,
      branchItemId: data.id,
      familyMemberIds: [userData?.id as string],
    })
      .then((res) => {
        if (res.data.success) {
          setBasketData(res.data.data);
          toast.success("Səbətə əlavə olundu!");
        }
      })
      .catch((err) => {
        ShowError(err);
      });
  };

  useEffect(() => {
    if (!isPending) {
      setPendingItem(null);
    }
  }, [isPending]);
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
      <div className={"w-full mx-6 relative"}>
        {isLoading ? (
          <CustomLoader />
        ) : (
          <>
            {branchItemsData?.data.data.items.map((branchItem) => {
              if (branchItem.type === "SERVICE") {
                return (
                  <BranchServiceItem
                    data={branchItem}
                    key={branchItem.id}
                    setViewedItem={setViewedItem}
                    addToBasket={addToBasket}
                    pending={pendingItem}
                  />
                );
              } else if (branchItem.type === "DOCTOR") {
                return (
                  <BranchDoctorItem
                    key={branchItem.id}
                    setViewedItem={setViewedItem}
                    data={branchItem}
                    addToBasket={addToBasket}
                    pending={pendingItem}
                  />
                );
              }
            })}
          </>
        )}
      </div>
    </>
  );
};

export const BranchServiceItem = ({
  data,
  setViewedItem,
  addToBasket,
  pending,
}: {
  data: BranchItemProps;
  setViewedItem: Dispatch<SetStateAction<ViewedItemProps>>;
  addToBasket: (data: BranchItemProps) => void;
  pending: string | null;
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
        "border-b border-[#EDEDED] py-4 flex justify-between gap-4 cursor-pointer"
      }
    >
      <div>
        <p className={"text-[#8B8B8B] text-14 leading-5 mb-[10px]"}>
          Kodu: {data.details.code}
        </p>
        <h3
          className={
            "text-14 sm:text-16  font-medium leading-6  text-black mb-3"
          }
        >
          {data.item.details.locales[0].name}
        </h3>
        <p className={"flex items-center gap-1"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <g>
              <path
                d="M6 0.5C4.91221 0.5 3.84884 0.822569 2.94437 1.42692C2.0399 2.03126 1.33495 2.89025 0.918665 3.89524C0.502383 4.90023 0.393465 6.0061 0.605683 7.073C0.817902 8.13989 1.34173 9.1199 2.11092 9.88909C2.8801 10.6583 3.86011 11.1821 4.92701 11.3943C5.9939 11.6065 7.09977 11.4976 8.10476 11.0813C9.10976 10.6651 9.96874 9.96011 10.5731 9.05564C11.1774 8.15117 11.5 7.0878 11.5 6C11.4983 4.54184 10.9183 3.14389 9.88719 2.11281C8.85611 1.08174 7.45817 0.50172 6 0.5ZM6 10.5C5.10999 10.5 4.23996 10.2361 3.49994 9.74161C2.75992 9.24715 2.18314 8.54434 1.84254 7.72208C1.50195 6.89981 1.41284 5.99501 1.58647 5.12209C1.7601 4.24918 2.18869 3.44736 2.81802 2.81802C3.44736 2.18868 4.24918 1.7601 5.1221 1.58647C5.99501 1.41283 6.89981 1.50195 7.72208 1.84254C8.54434 2.18314 9.24715 2.75991 9.74162 3.49993C10.2361 4.23996 10.5 5.10998 10.5 6C10.4987 7.19307 10.0241 8.33689 9.18052 9.18052C8.33689 10.0241 7.19307 10.4987 6 10.5ZM9 6C9 6.13261 8.94732 6.25979 8.85356 6.35355C8.75979 6.44732 8.63261 6.5 8.5 6.5H6C5.86739 6.5 5.74022 6.44732 5.64645 6.35355C5.55268 6.25979 5.5 6.13261 5.5 6V3C5.5 2.86739 5.55268 2.74021 5.64645 2.64645C5.74022 2.55268 5.86739 2.5 6 2.5C6.13261 2.5 6.25979 2.55268 6.35356 2.64645C6.44732 2.74021 6.5 2.86739 6.5 3V5.5H8.5C8.63261 5.5 8.75979 5.55268 8.85356 5.64645C8.94732 5.74021 9 5.86739 9 6Z"
                fill="#099B87"
              />
            </g>
            <defs>
              <clipPath id="clip0_576_4417">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span className={"text-primary text-12 leading-[18px]"}>
            Hazırlanma müddəti: {data.details.minPreparationProcessInHour} saat
            - {data.details.maxPreparationProcessInHour} saat
          </span>
        </p>
      </div>
      <div className={" flex flex-col justify-between"}>
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
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            addToBasket(data);
          }}
          className={
            "px-4 py-[10px] text-white bg-primary gap-1 h-10 flex items-center justify-center rounded-[4px] outline-none focus:outline-none trans hover:ring-2 hover:ring-primary hover:ring-opacity-70 mt-4"
          }
        >
          Səbətə
          {pending === data.id && <ButtonLoader />}
        </button>
      </div>
    </div>
  );
};

export const BranchDoctorItem = ({
  data,
  addToBasket,
  pending,
  setViewedItem,
}: {
  data: BranchItemProps;
  addToBasket: (data: BranchItemProps) => void;
  setViewedItem: Dispatch<SetStateAction<ViewedItemProps>>;

  pending: string | null;
}) => {
  return (
    <div
      onClick={() =>
        setViewedItem({
          type: "DOCTOR",
          data,
        })
      }
      className={
        "border-b border-[#EDEDED] py-4 flex justify-between gap-4 cursor-pointer"
      }
    >
      <div className={"flex gap-4"}>
        <Image
          src={Constants.fileApi + data.item.details.photo.id}
          alt={data.id}
          width={120}
          height={120}
        />
        <div>
          <h3 className={"font-bold leading-6  text-black mb-2 "}>
            {data.item.details.locales[0].name}
          </h3>
          <p className={"text-[#8B8B8B] text-14 font-medium leading-5"}>
            {data.item.details.catalog.locales[0].name}
          </p>
        </div>
      </div>
      <div className={" flex flex-col justify-between"}>
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
                "text-[#A8A8A8] text-16 line-through text-right leading-4"
              }
            >
              {data.price / 100} AZN
            </p>
            <p
              className={
                "text-20 font-semibold leading-[18px] text-primary text-right"
              }
            >
              {data.promotedPrice / 100} AZN
            </p>
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            addToBasket(data);
          }}
          className={
            "px-4 py-[10px] text-white bg-primary h-10 gap-1 flex items-center justify-center rounded-[4px] outline-none focus:outline-none trans hover:ring-2 hover:ring-primary hover:ring-opacity-70 mt-4"
          }
        >
          Səbətə
          {pending && <ButtonLoader />}
        </button>
      </div>
    </div>
  );
};
export default CategoryItems;
