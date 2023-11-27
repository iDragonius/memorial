import React, { Dispatch, FC, SetStateAction, useContext } from "react";
import { UserContext } from "@/components/ui/providers/UserProvider";

import Profile from "@/components/layouts/main/ui/header/actions/Profile";
import Link from "next/link";
import Basket from "@/components/layouts/main/ui/header/actions/Basket";
import { BasketContext } from "@/components/ui/providers/BasketProvider";

export interface HeaderActionsProps {
  setBasketPreviewOpen: Dispatch<SetStateAction<boolean>>;
}

const HeaderActions: FC<HeaderActionsProps> = ({ setBasketPreviewOpen }) => {
  const { userData } = useContext(UserContext);
  const { basketData } = useContext(BasketContext);

  return (
    <div className={"flex items-center gap-4 sm:gap-6 "}>
      {userData && basketData && (
        <Basket setBasketPreviewOpen={setBasketPreviewOpen} />
      )}
      {userData ? (
        <Profile />
      ) : (
        <Link
          href={"/auth/sign-in"}
          className={
            "text-white bg-primary  flex items-center justify-center h-12 px-6 font-medium rounded-[4px] outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-70 hover:ring-2 hover:ring-primary hover:ring-opacity-70 trans"
          }
        >
          Daxil ol
        </Link>
      )}
    </div>
  );
};

export default HeaderActions;
