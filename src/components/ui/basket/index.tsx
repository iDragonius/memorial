import React, { FC, useContext, useState } from "react";
import {
  BasketClearIcon,
  ChevronDownIcon,
  CrossIcon,
  EmptyIcon,
  ServiceDeleteIcon,
} from "@/components/icons";
import { BasketContext } from "@/components/ui/providers/BasketProvider";
import {
  BasketApi,
  MemberBasketItemProps,
  MemberBasketProps,
} from "@/lib/api/basket.api";
import clsx from "clsx";
import { useMutation } from "@tanstack/react-query";
import CustomLoader from "@/components/ui/loader/CustomLoader";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { ShowError } from "@/utils/show-error";

export interface BasketProps {
  isCheckout?: boolean;
  closePreview?: () => void;
}

const Basket: FC<BasketProps> = ({ isCheckout, closePreview }) => {
  const { push, pathname } = useRouter();
  const { basketData, setBasketData, refetch } = useContext(BasketContext);
  const { mutateAsync: clearBasketFunc, isPending: clearPending } = useMutation(
    {
      mutationFn: BasketApi.clearBasket,
    },
  );
  const { mutateAsync: deleteItemFunc, isPending: itemDeletePending } =
    useMutation({
      mutationFn: BasketApi.deleteItemFromBasket,
    });

  const { mutateAsync: addPromotionFunc, isPending: promotionPending } =
    useMutation({
      mutationFn: BasketApi.addPromotion,
    });
  const clearBasket = () => {
    clearBasketFunc().then((res) => {
      if (res.data.success) {
        setBasketData(null);
        toast.success("Səbət uğurla təmizləndi!");
        if (pathname === "/checkout") push("/");
      }
    });
  };
  const deleteItem = (data: MemberBasketProps, item: MemberBasketItemProps) => {
    if (itemDeletePending) return;
    deleteItemFunc(item.id)
      .then((res) => {
        if (res.data.success) {
          toast.success("Xidmət uğurla silindi!");
          refetch();
        }
      })
      .catch((err) => {
        ShowError(err);
      });
  };
  const [promoCode, setPromoCode] = useState<string>("");
  const addPromotion = () => {
    addPromotionFunc(promoCode)
      .then((res) => {
        if (res.data.success) {
          setBasketData(res.data.data);
          setPromoCode("");
          toast.success("Promo kod uğurla əlavə olundu!");
        }
      })
      .catch((err) => {
        ShowError(err);
      });
  };
  const goToCheckout = () => {
    push("/checkout");
    if (closePreview) closePreview();
  };
  return (
    <div
      className={
        "min-w-[400px] bg-white max-sm:w-screen max-sm:h-screen rounded-[12px] border-2 border-[#F2F2F2]  px-5 py-8 relative mb-5 max-sm:overflow-y-auto"
      }
    >
      {clearPending && (
        <div
          className={
            "absolute top-0 left-0 w-full h-full rounded-[12px] bg-primary bg-opacity-20"
          }
        >
          <CustomLoader />
        </div>
      )}
      {promotionPending && (
        <div
          className={
            "absolute top-0 left-0 w-full h-full rounded-[12px] bg-primary bg-opacity-20"
          }
        >
          <CustomLoader />
        </div>
      )}
      <div className={"flex items-center justify-between"}>
        <h2 className={"text-[#3D3D3D] text-[22px] font-semibold leading-6"}>
          Your Basket
        </h2>
        <div className={"flex items-center gap-2"}>
          {basketData && (
            <BasketClearIcon
              onClick={clearBasket}
              className={
                "w-6 h-6 trans rounded-[4px] hover:bg-gray-100 cursor-pointer"
              }
            />
          )}
          {closePreview && (
            <CrossIcon
              onClick={() => closePreview()}
              className={
                "w-6 h-6 trans rounded-[4px] hover:bg-gray-100 cursor-pointer"
              }
            />
          )}
        </div>
      </div>

      {basketData ? (
        <>
          <p
            className={"mt-5 px-3 py-4 border border-inputBorder rounded-[6px]"}
          >
            Məkan: {basketData?.branch.address}
          </p>
          <div className={"max-h-[450px] overflow-y-auto"}>
            {basketData.members.map((member, i) => (
              <BasketMember
                data={member}
                key={i}
                deleteItem={deleteItem}
                itemDeletePending={itemDeletePending}
              />
            ))}
          </div>
          <div className={"mt-4"}>
            <p className={"text-14 mb-1"}>Promo kodun var?</p>
            <div className={"flex items-center h-10 "}>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder={"Promo kod"}
                className={
                  "border border-inputBorder px-2 h-full w-full text-[#5E6368] outline-none"
                }
              />
              <button
                onClick={addPromotion}
                className={"text-white bg-primary px-5 h-full outline-none"}
              >
                Apply
              </button>
            </div>
          </div>
          <div className={"flex flex-col gap-3 text-[#171717] text-18 mt-8"}>
            <div className={"flex items-center justify-between"}>
              <p>Summary</p>
              <p className={"font-medium"}>
                {(basketData?.summary || 0) / 100 + " azn"}
              </p>
            </div>
            <div className={"flex items-center justify-between"}>
              <p>Discount</p>
              <p className={"font-medium"}>
                {(basketData?.promotion || 0) / 100 + " azn"}
              </p>
            </div>
          </div>
          {!isCheckout && (
            <button
              onClick={goToCheckout}
              className={
                "mt-8 flex justify-between  w-full h-14 px-6 items-center bg-primary text-white rounded-[4px] focus:outline-none trans hover:ring-4 hover:ring-primary hover:ring-opacity-70 focus:ring-primary focus:ring-4 focus:ring-opacity-70"
              }
            >
              <p className={"font-semibold"}>Checkout</p>
              <p className={"font-semibold"}>
                {(basketData?.summary || 0) / 100 -
                  (basketData?.promotion || 0) / 100 +
                  " AZN"}
              </p>
            </button>
          )}
        </>
      ) : (
        <div className={"flex items-center justify-center"}>
          <EmptyIcon />
        </div>
      )}
    </div>
  );
};
const BasketMember = ({
  data,
  deleteItem,
  itemDeletePending,
}: {
  data: MemberBasketProps;
  deleteItem: (data: MemberBasketProps, item: MemberBasketItemProps) => void;
  itemDeletePending: boolean;
}) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className={" border-b border-b-[#A8A8A8]"}>
      <div
        className={"flex justify-between items-center cursor-pointer py-5"}
        onClick={() => setOpen((prevState) => !prevState)}
      >
        <p className={"text-18 text-primary font-medium"}>
          {data.name + " " + data.surname}
        </p>
        <ChevronDownIcon className={clsx(open && "rotate-180")} />
      </div>
      {open && (
        <div className={"flex flex-col gap-5 mb-5"}>
          {data.items.map((item) => (
            <div
              key={item.id}
              className={"flex justify-between gap-3 relative group "}
            >
              <div
                className={
                  "hidden group-hover:flex absolute w-full h-full bg-black bg-opacity-30 py-4 -top-1 justify-end  items-center px-3 trans"
                }
              >
                <button
                  className={
                    "flex gap-1 bg-white items-center px-3 hover:ring-2 hover:ring-white hover:ring-opacity-70 trans"
                  }
                  onClick={() => deleteItem(data, item)}
                >
                  <ServiceDeleteIcon /> Sil{" "}
                  {itemDeletePending && (
                    <div
                      className=" inline-block h-3 w-3 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    >
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>
                  )}
                </button>
              </div>
              <div>
                {item.branchItem.type === "DOCTOR" ? (
                  <div>
                    <p className={"text-[#5E6368] text-16 font-medium"}>
                      - Həkim qəbulu
                    </p>
                    <p className={"text-14 text-[#5E6368] ml-2.5"}>
                      {item.branchItem.item.details.locales[0].name}
                    </p>
                  </div>
                ) : (
                  <p className={"text-[#5E6368] text-16 font-medium"}>
                    - {item.branchItem.item.details.locales[0].name}
                  </p>
                )}
              </div>
              <p className={"text-[#5E6368] text-16 font-medium min-w-max"}>
                {item.promotedPrice / 100 + " AZN"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Basket;
