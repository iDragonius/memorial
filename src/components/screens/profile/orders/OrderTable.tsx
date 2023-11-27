import React, { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { OrderApi, OrderProps } from "@/lib/api/order.api";
import { NoOrderIcon } from "@/components/icons";
import Link from "next/link";
import { OrderStatusTypes } from "@/shared/types/order-status.types";
import Menu from "@/components/ui/menu";
import { useOnClickOutside } from "usehooks-ts";
import RateModal from "@/components/ui/rate/RateModal";
import { useMutation } from "@tanstack/react-query";
import { ShowError } from "@/utils/show-error";
import toast from "react-hot-toast";
import OrderDetailsModal from "@/components/ui/order-details/OrderDetailsModal";

export interface OrderTableProps {
  data: OrderProps[];
}

const OrderTable: FC<OrderTableProps> = ({ data }) => {
  const [rating, setRating] = useState<OrderProps | null>(null);
  const [viewOrder, setViewOrder] = useState<null | OrderProps>(null);
  return (
    <>
      {viewOrder && (
        <OrderDetailsModal data={viewOrder} setOrder={setViewOrder} />
      )}
      {rating && <RateModal order={rating} setOrder={setRating} />}
      {!!data?.length ? (
        <table className={"  table-fixed border-collapse mt-6 text-12 w-full"}>
          <OrderTableHeader />
          <tbody className={"bg-white"}>
            <>
              {data.map((order) => (
                <OrderTableRow
                  order={order}
                  key={order.id}
                  setRating={setRating}
                  setViewOrder={setViewOrder}
                />
              ))}
            </>
          </tbody>
        </table>
      ) : (
        <div
          className={
            "flex flex-col items-center justify-center my-10 w-full h-[400px]"
          }
        >
          <NoOrderIcon />
          <p className={"text-[#505050] text-18 font-medium mt-5"}>
            Hal-hazırda heç bir sifarişiniz yoxdur.
          </p>
          <Link
            className={
              "h-14 mt-6 bg-primary text-white flex items-center p-6 rounded-[4px] trans hover:ring-4 hover:ring-primary hover:ring-opacity-70 outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-70"
            }
            href={{
              pathname: "/branch",
            }}
          >
            Xidmətlərə bax
          </Link>
        </div>
      )}
    </>
  );
};

const OrderTableHeader = () => {
  return (
    <thead className={""}>
      <tr className={"h-[72px] bg-[#F4F4F4] "}>
        <th className={"border border-[#DADADA] px-3"}>ID</th>
        <th className={"border border-[#DADADA] px-3"}>Pasiyent</th>
        <th className={"border border-[#DADADA] px-3"}>Məkan / Adres</th>
        <th className={"border border-[#DADADA] px-3"}>Məbləğ / Ödəniş növü</th>
        <th className={"border border-[#DADADA] px-3"}>Status</th>
        <th className={"border border-[#DADADA] px-3"}>Action</th>
      </tr>
    </thead>
  );
};
const OrderTableRow = ({
  order,
  setRating,
  setViewOrder,
}: {
  order: OrderProps;
  setRating: Dispatch<SetStateAction<OrderProps | null>>;
  setViewOrder: Dispatch<SetStateAction<OrderProps | null>>;
}) => {
  const [menuIsOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<null | HTMLTableDataCellElement>(null);
  useOnClickOutside(menuRef, () => setMenuOpen(false));
  const { mutateAsync: repayOrderFunc } = useMutation({
    mutationFn: OrderApi.repayOrder,
  });
  const repayOrder = (id: string) => {
    repayOrderFunc(id)
      .then((res) => {
        if (res.data.success) {
          toast.success("Siz indi ödəniş səhifəsinə yönəldiləcəksiniz!");
          window.location.assign(res.data.data.redirectUrl);
        }
      })
      .catch((err) => ShowError(err));
  };
  const OrderStatus = (status: OrderStatusTypes) => {
    if (status === "READY") {
      return <span className={"text-[#099B87]"}>Tamamlanıb</span>;
    } else if (status === "PENDING") {
      return <span>Təsdiq gözləyir</span>;
    } else if (status === "WAITING_PAYMENT") {
      return <span>Ödəniş gözlənilir</span>;
    } else if (status === "PROCESSING") {
      return <span className={"text-[#4282F0]"}>İcra edilir</span>;
    } else if (status === "PROCESSING_EXPIRE") {
      return <span className={"text-[#4282F0]"}>İcra tamamlanıb</span>;
    }
  };
  return (
    <tr
      className={"min-h-[72px]  trans hover:bg-gray-100 cursor-pointer"}
      onClick={() => setViewOrder(order)}
    >
      <td
        className={"px-3 text-center py-4   "}
        style={{
          boxShadow: `0px 0px 0px 1px #DADADA`,
        }}
      >
        {order.shortId}
      </td>
      <td
        className={"px-3 text-center py-4   "}
        style={{
          boxShadow: `0px 0px 0px 1px #DADADA`,
        }}
      >
        {order.members[0].name + " " + order.members[0].surname}
      </td>
      <td
        className={"px-3 text-center py-4   "}
        style={{
          boxShadow: `0px 0px 0px 1px #DADADA`,
        }}
      >
        <p> Hospital</p>
        <p className={"truncate w-full text-[#747474] mt-1"}>
          {order.branch.branchLocale[0].name}
        </p>
      </td>
      <td
        className={"px-3 text-center py-4   "}
        style={{
          boxShadow: `0px 0px 0px 1px #DADADA`,
        }}
      >
        <p>{order.totalPromotedPrice / 100 + " AZN"}</p>
        <p className={"w-full text-[#747474] mt-1"}>
          {order.paymentType === "CASH" ? "Nağd" : "Kart"}
        </p>
      </td>
      <td
        style={{
          boxShadow: `0px 0px 0px 1px #DADADA`,
        }}
        className={"px-3 text-center py-4   "}
      >
        {OrderStatus(order.orderStatus)}
      </td>
      <td
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpen((prevState) => !prevState);
        }}
        style={{
          boxShadow: `0px 0px 0px 1px #DADADA`,
          minHeight: "inherit",
        }}
        className={
          "px-3 text-center py-4  relative  flex items-center justify-center  "
        }
        ref={menuRef}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
        >
          <path
            d="M2.19092 8.00033C2.19092 7.73662 2.26912 7.47883 2.41563 7.25957C2.56213 7.0403 2.77037 6.8694 3.01401 6.76849C3.25764 6.66757 3.52573 6.64117 3.78437 6.69261C4.04301 6.74406 4.28059 6.87105 4.46706 7.05752C4.65353 7.24399 4.78052 7.48156 4.83197 7.74021C4.88341 7.99885 4.85701 8.26694 4.75609 8.51057C4.65517 8.75421 4.48428 8.96244 4.26501 9.10895C4.04575 9.25546 3.78796 9.33366 3.52425 9.33366C3.17063 9.33366 2.83149 9.19318 2.58144 8.94313C2.33139 8.69309 2.19092 8.35395 2.19092 8.00033ZM8.85758 9.33366C9.12129 9.33366 9.37908 9.25546 9.59835 9.10895C9.81761 8.96244 9.98851 8.75421 10.0894 8.51057C10.1903 8.26694 10.2167 7.99885 10.1653 7.74021C10.1139 7.48156 9.98686 7.24399 9.80039 7.05752C9.61392 6.87105 9.37635 6.74406 9.11771 6.69261C8.85906 6.64117 8.59098 6.66757 8.34734 6.76849C8.10371 6.8694 7.89547 7.0403 7.74896 7.25957C7.60245 7.47883 7.52425 7.73662 7.52425 8.00033C7.52425 8.35395 7.66473 8.69309 7.91478 8.94313C8.16482 9.19318 8.50396 9.33366 8.85758 9.33366ZM14.1909 6.66699C13.9272 6.66699 13.6694 6.74519 13.4502 6.8917C13.2309 7.03821 13.06 7.24645 12.9591 7.49008C12.8582 7.73372 12.8318 8.00181 12.8832 8.26045C12.9347 8.51909 13.0616 8.75666 13.2481 8.94313C13.4346 9.1296 13.6722 9.25659 13.9308 9.30804C14.1894 9.35949 14.4575 9.33308 14.7012 9.23217C14.9448 9.13125 15.153 8.96035 15.2995 8.74109C15.4461 8.52182 15.5243 8.26403 15.5243 8.00033C15.5243 7.6467 15.3838 7.30757 15.1337 7.05752C14.8837 6.80747 14.5445 6.66699 14.1909 6.66699Z"
            fill="#747474"
          />
        </svg>
        {menuIsOpen && (
          <Menu>
            {!order.rate && order.orderStatus === "READY" && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setRating(order);
                }}
                className={
                  "flex items-center gap-3 p-4 trans hover:bg-gray-100 cursor-pointer"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M1.53714 9.48831C1.48486 9.67476 1.48783 9.87238 1.5457 10.0572C1.60357 10.242 1.71385 10.406 1.86314 10.5293L6.66814 14.4923L5.15314 21.2823C5.10887 21.4802 5.1258 21.6868 5.20168 21.8749C5.27756 22.0629 5.40881 22.2234 5.57803 22.3352C5.74724 22.4469 5.94642 22.5045 6.14914 22.5004C6.35187 22.4964 6.54857 22.4308 6.71314 22.3123L12.0001 18.5093L17.2871 22.3093C17.4517 22.4278 17.6484 22.4934 17.8511 22.4974C18.0539 22.5015 18.253 22.4439 18.4223 22.3322C18.5915 22.2204 18.7227 22.0599 18.7986 21.8719C18.8745 21.6838 18.8914 21.4772 18.8471 21.2793L17.3321 14.4893L22.1371 10.5263C22.2865 10.4031 22.3969 10.2392 22.4549 10.0545C22.5129 9.86981 22.5161 9.67223 22.464 9.48577C22.4119 9.2993 22.3068 9.13197 22.1614 9.00408C22.0161 8.87619 21.8367 8.79325 21.6451 8.76531L15.8281 7.91631L12.9001 2.05331C12.8077 1.89834 12.6767 1.77001 12.5198 1.68089C12.3629 1.59177 12.1856 1.54492 12.0051 1.54492C11.8247 1.54492 11.6474 1.59177 11.4905 1.68089C11.3336 1.77001 11.2025 1.89834 11.1101 2.05331L8.17214 7.91931L2.35514 8.76831C2.16377 8.79636 1.98464 8.87931 1.83945 9.0071C1.69427 9.13489 1.58926 9.30205 1.53714 9.48831ZM8.97814 9.82331C9.13757 9.80007 9.28902 9.73865 9.41961 9.64428C9.55019 9.54991 9.65604 9.42539 9.72814 9.28131L12.0001 4.73631L14.2721 9.28131C14.3442 9.42539 14.4501 9.54991 14.5807 9.64428C14.7113 9.73865 14.8627 9.80007 15.0221 9.82331L19.1221 10.4233L15.5861 13.3403C15.4439 13.4578 15.3369 13.6124 15.2771 13.787C15.2173 13.9615 15.2069 14.1492 15.2471 14.3293L16.3231 19.1553L12.5841 16.4653C12.414 16.3429 12.2097 16.2771 12.0001 16.2771C11.7906 16.2771 11.5863 16.3429 11.4161 16.4653L7.67714 19.1553L8.75314 14.3293C8.79338 14.1492 8.78301 13.9615 8.72318 13.787C8.66335 13.6124 8.55639 13.4578 8.41414 13.3403L4.87614 10.4213L8.97814 9.82331Z"
                    fill="#747474"
                  />
                </svg>
                <p className={"text-14 font-medium min-w-max  "}>
                  Qiymətləndir
                </p>
              </div>
            )}
            {order.orderStatus === "WAITING_PAYMENT" && (
              <div
                onClick={() => repayOrder(order.id)}
                className={
                  "flex items-center gap-3 p-4 trans hover:bg-gray-100 cursor-pointer"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4.00001 11.9998C4.00001 12.265 3.89466 12.5194 3.70712 12.7069C3.51958 12.8945 3.26523 12.9998 3.00001 12.9998C2.7348 12.9998 2.48044 12.8945 2.29291 12.7069C2.10537 12.5194 2.00001 12.265 2.00001 11.9998C1.99685 10.1155 2.52706 8.26868 3.52937 6.67299C4.53168 5.07731 5.96514 3.79789 7.66402 2.98265C9.3629 2.16742 11.2578 1.84965 13.1297 2.0661C15.0016 2.28255 16.774 3.02438 18.242 4.20581V2.75781C18.242 2.4926 18.3474 2.23824 18.5349 2.05071C18.7224 1.86317 18.9768 1.75781 19.242 1.75781C19.5072 1.75781 19.7616 1.86317 19.9491 2.05071C20.1367 2.23824 20.242 2.4926 20.242 2.75781V6.75781C20.242 7.02303 20.1367 7.27738 19.9491 7.46492C19.7616 7.65246 19.5072 7.75781 19.242 7.75781H15.242C14.9768 7.75781 14.7224 7.65246 14.5349 7.46492C14.3474 7.27738 14.242 7.02303 14.242 6.75781C14.242 6.4926 14.3474 6.23824 14.5349 6.05071C14.7224 5.86317 14.9768 5.75781 15.242 5.75781H16.985C15.8101 4.81472 14.3924 4.22322 12.8956 4.05162C11.3987 3.88003 9.88393 4.13535 8.52607 4.78809C7.1682 5.44082 6.02267 6.46436 5.22179 7.74047C4.42091 9.01658 3.99734 10.4932 4.00001 11.9998ZM21 10.9998C20.7348 10.9998 20.4804 11.1052 20.2929 11.2927C20.1054 11.4802 20 11.7346 20 11.9998C20.0027 13.5064 19.5791 14.983 18.7782 16.2592C17.9774 17.5353 16.8318 18.5588 15.474 19.2115C14.1161 19.8643 12.6013 20.1196 11.1045 19.948C9.60767 19.7764 8.18994 19.1849 7.01501 18.2418H8.75701C9.02223 18.2418 9.27658 18.1365 9.46412 17.9489C9.65166 17.7614 9.75701 17.507 9.75701 17.2418C9.75701 16.9766 9.65166 16.7222 9.46412 16.5347C9.27658 16.3472 9.02223 16.2418 8.75701 16.2418H4.75701C4.4918 16.2418 4.23744 16.3472 4.04991 16.5347C3.86237 16.7222 3.75701 16.9766 3.75701 17.2418V21.2418C3.75701 21.507 3.86237 21.7614 4.04991 21.9489C4.23744 22.1365 4.4918 22.2418 4.75701 22.2418C5.02223 22.2418 5.27658 22.1365 5.46412 21.9489C5.65166 21.7614 5.75701 21.507 5.75701 21.2418V19.7938C7.22512 20.9751 8.99757 21.7169 10.8695 21.9333C12.7414 22.1497 14.6363 21.8319 16.3352 21.0167C18.0341 20.2015 19.4677 18.9221 20.4701 17.3265C21.4725 15.7309 22.0029 13.8842 22 11.9998C22 11.7346 21.8947 11.4802 21.7071 11.2927C21.5196 11.1052 21.2652 10.9998 21 10.9998Z"
                    fill="#747474"
                  />
                </svg>
                <p className={"text-14 font-medium min-w-max  "}>Yenidən ödə</p>
              </div>
            )}
          </Menu>
        )}
      </td>
    </tr>
  );
};

export default OrderTable;
