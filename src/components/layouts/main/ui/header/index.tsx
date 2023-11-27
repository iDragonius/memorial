import React, { FC, useState } from "react";
import { Logo } from "@/components/icons";
import Link from "next/link";
import SearchAndBranch from "@/components/layouts/main/ui/header/search-and-branch";
import HeaderActions from "@/components/layouts/main/ui/header/actions";
import BasketPreview from "@/components/layouts/main/ui/header/basket-preview";

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const [basketPreviewIsOpen, setBasketPreviewOpen] = useState<boolean>(false);
  return (
    <>
      <div className={"sticky top-0 h-[100px] bg-white z-[500] "}>
        <div className={"box flex justify-between items-center"}>
          <Link href={"/"} className={""}>
            <Logo />
          </Link>
          <div className={"max-mb:hidden"}>
            <SearchAndBranch />
          </div>
          <HeaderActions setBasketPreviewOpen={setBasketPreviewOpen} />
        </div>
      </div>

      <div
        className={
          "mb:hidden bg-[#FAFAFA] flex items-center justify-center p-4 w-full"
        }
      >
        <SearchAndBranch />
      </div>
      {basketPreviewIsOpen && (
        <BasketPreview closePreview={() => setBasketPreviewOpen(false)} />
      )}
    </>
  );
};

export default Header;
