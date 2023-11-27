import React, { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { StarFilledIcon, StarIcon } from "@/components/icons";
import { OrderApi, OrderProps } from "@/lib/api/order.api";
import { useMutation } from "@tanstack/react-query";
import { RateApi } from "@/lib/api/rate.api";
import { ShowError } from "@/utils/show-error";
import { useOnClickOutside } from "usehooks-ts";

export interface RateModalProps {
  order: OrderProps;
  setOrder: Dispatch<SetStateAction<OrderProps | null>>;
}

const RateModal: FC<RateModalProps> = ({ order, setOrder }) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const { mutateAsync: rateOrderFunc } = useMutation({
    mutationFn: RateApi.rateOrder,
  });
  const [comment, setComment] = useState<string>("");
  const rateOrder = () => {
    rateOrderFunc({
      data: {
        orderId: order.id,
        comment,
        tags: [],
        rate: rating,
      },
    })
      .then((res) => {})
      .catch((err) => ShowError(err))
      .finally(() => {
        setOrder(null);
      });
  };
  const modalRef = useRef<null | HTMLDivElement>(null);
  useOnClickOutside(modalRef, () => setOrder(null));
  return (
    <div
      className={
        "fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-[500]"
      }
    >
      <div className={"bg-white px-9 py-8 w-[500px]"} ref={modalRef}>
        <h2 className={"text-24 font-semibold leading-[44px] text-center mb-6"}>
          Sifarişi qiymətləndirin
        </h2>

        <div
          className={"py-8 border-y border-y-[#E3E3E3] flex justify-center "}
        >
          {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return (
              <label
                id={"rating"}
                key={star}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(0)}
              >
                <input
                  type="radio"
                  name={"rating"}
                  value={currentRating}
                  className={"hidden"}
                  onClick={() => setRating(currentRating)}
                />
                {currentRating <= (hover || rating) ? (
                  <StarFilledIcon />
                ) : (
                  <StarIcon />
                )}
              </label>
            );
          })}
        </div>
        <div>
          <h4 className={"my-6 font-medium"}>Rəy bildirin</h4>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={10}
            className={
              "w-full placeholder:text-[#A8A8A8] px-4 py-3 border rounded-[4px] resize-none h-24 outline-none"
            }
            placeholder={"Buraya yazın"}
          ></textarea>
        </div>
        <button
          onClick={rateOrder}
          className={
            "bg-primary text-white w-full font-medium py-3 h-12 rounded-[2px] mt-6 trans hover:ring-4 hover:ring-primary hover:ring-opacity-70 outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-70"
          }
        >
          Hazırdır
        </button>
      </div>
    </div>
  );
};

export default RateModal;
