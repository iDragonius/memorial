import React, { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { OrderMemberProps, OrderProps } from "@/lib/api/order.api";
import { useLockedBody, useOnClickOutside } from "usehooks-ts";
import { OrderStatusTypes } from "@/shared/types/order-status.types";
import { OrderStatusMessages } from "@/lib/constants";
import { ChevronDownIcon } from "@/components/icons";
import clsx from "clsx";

export interface OrderDetailsModalProps {
  data: OrderProps;
  setOrder: Dispatch<SetStateAction<null | OrderProps>>;
}

const OrderDetailsModal: FC<OrderDetailsModalProps> = ({ data, setOrder }) => {
  const modalRef = useRef<null | HTMLDivElement>(null);
  useOnClickOutside(modalRef, () => setOrder(null));
  useLockedBody(true, "root");

  return (
    <div
      className={
        "fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-[500]"
      }
    >
      <div className={"bg-white w-[460px] p-6 rounded-[4px]"} ref={modalRef}>
        <h2 className={"text-24 font-semibold leading-[44px] mb-3"}>
          Sifariş haqqında
        </h2>
        <div className={"flex  gap-2 items-center "}>
          <p className={"text-[#747474] text-14 leading-6"}>
            Sifariş {data.shortId}
          </p>
          <div className={"w-1 h-1 rounded-full bg-primary"} />
          <p className={"text-14 leading-6 text-primary"}>
            {OrderStatusMessages[data.orderStatus]}
          </p>
        </div>
        <div className={"border-t border-t-[#E3E3E3] mt-4"}>
          <h2 className={"mt-3 font-medium"}>Xidmət</h2>
          {data.members.map((member) => (
            <OrderMemberItems data={member} key={member.id} />
          ))}
        </div>
        <div
          className={
            "py-4 border-t border-t-[#E3E3E3] flex flex-col gap-2 mt-2"
          }
        >
          <div className={"flex items-center justify-between"}>
            <p className={"text-[#5E6368] text-14 leading-6"}>Cəmi:</p>
            <p className={"text-[#747474] text-14 leading-6"}>
              {data.totalPrice / 100} AZN
            </p>
          </div>
          <div className={"flex items-center justify-between"}>
            <p className={"text-[#5E6368] text-14 leading-6"}>Endirim:</p>
            <p className={"text-[#747474] text-14 leading-6"}>
              {(data.totalPrice - data.totalPromotedPrice) / 100} AZN
            </p>
          </div>{" "}
          <div className={"flex  items-center justify-between"}>
            <p className={"text-black font-medium leading-6"}>Yekun məbləğ:</p>
            <p className={"text-black font-medium  leading-6"}>
              {data.totalPromotedPrice / 100} AZN
            </p>
          </div>
        </div>
        <div
          className={
            "py-4 border-t border-t-[#E3E3E3] flex flex-col gap-2 mt-2"
          }
        >
          <h3 className={"text-16 font-medium leading-6 mb-5"}>
            Digər Məlumatlar:
          </h3>
          <div className={"flex items-center justify-between"}>
            <p className={"text-[#5E6368] text-14 leading-6"}>Pasiyent:</p>
            <p className={"text-[#747474] text-14 leading-6 font-medium"}>
              {data.members[0].name + " " + data.members[0].surname}
            </p>
          </div>
          <div className={"flex items-center justify-between"}>
            <p className={"text-[#5E6368] text-14 leading-6"}>Filial:</p>
            <p className={"text-[#747474] text-14 leading-6 font-medium"}>
              {data.branch.branchLocale[0].name}
            </p>
          </div>{" "}
          <div className={"flex items-center justify-between"}>
            <p className={"text-[#5E6368] text-14 leading-6"}>Ödəniş növü:</p>
            <p className={"text-[#747474] text-14 leading-6 font-medium"}>
              {data.paymentType === "CASH" ? "Nağd" : "Kart"}
            </p>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};
const OrderMemberItems = ({ data }: { data: OrderMemberProps }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className={" "}>
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
        <div className={" flex flex-col gap-6"}>
          {data.items.map((item) => (
            <div className={"flex justify-between "} key={item.branchItem.id}>
              <p className={"text-14 text-[#5E6368] leading-6"}>
                {item.branchItem.item.details.locales[0].name}
              </p>
              <p className={"text-14 text-[#5E6368] leading-6 font-medium"}>
                {" "}
                {item.branchItem.promotedPrice / 100} AZN
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default OrderDetailsModal;
