import React, { Dispatch, FC, SetStateAction, useContext } from "react";
import { BasketIcon } from "@/components/icons";
import { BasketContext } from "@/components/ui/providers/BasketProvider";

export interface BasketProps {
  setBasketPreviewOpen: Dispatch<SetStateAction<boolean>>;
}

const Basket: FC<BasketProps> = ({ setBasketPreviewOpen }) => {
  const { basketData } = useContext(BasketContext);

  return (
    <div
      onClick={() => setBasketPreviewOpen((prevState) => !prevState)}
      className={
        "p-3  sm:bg-[#F2F2F2] h-12 flex items-center gap-3 cursor-pointer"
      }
    >
      <BasketIcon className={""} />
      <p className={"text-14 font-medium cursor-pointer max-sm:hidden"}>
        {(basketData?.summary || 0) / 100 -
          (basketData?.promotion || 0) / 100 +
          " "}
        AZN
      </p>
    </div>
  );
};

export default Basket;
