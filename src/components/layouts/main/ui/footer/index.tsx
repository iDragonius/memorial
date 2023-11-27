import React, { FC } from "react";
import { WhiteLogo } from "@/components/icons";
import Link from "next/link";

export interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <div className={"bg-[#00473E] text-white pt-8"}>
      <div className={"box"}>
        <WhiteLogo className={"block smm:hidden"} />
        <div className={"flex justify-between mb-4 gap-8 flex-wrap"}>
          <div>
            <h3 className={"text-20 font-bold mb-5"}>Company</h3>
            <div className={"flex flex-col gap-3"}>
              <Link href={""}>About us</Link>
              <Link href={""}>Privacy Policy</Link>
            </div>
          </div>

          <div>
            <h3 className={"text-20 font-bold mb-5"}>Resources</h3>
            <div className={"flex flex-col gap-3"}>
              <Link href={"/faq"}>FAQ</Link>
              <Link href={"/vacancy"}>Vakansiyalar</Link>
              <Link href={"/branch-info"}>Filiallar</Link>
            </div>
          </div>
          <div>
            <h3 className={"text-20 font-bold mb-5"}>Servislər</h3>
            <div className={"flex flex-col gap-3"}>
              <Link href={""}>Həkim qəbulu</Link>
              <Link href={""}>Laborator xidmətlər</Link>
              <Link href={""}>Poliklinik xidmətlər</Link>
              <Link href={""}>Checkup xidmətlər</Link>
            </div>
          </div>
          <div>
            <h3 className={"text-20 font-bold mb-5"}>Əlaqə</h3>
            <p>You’ll find your next home, in any style you prefer.</p>
          </div>
        </div>
        <div
          className={
            "flex justify-between items-center smm:flex-row flex-col pb-4 pt-5 smm:pt-0 border-t border-t-white gap-2 smm:border-t-0"
          }
        >
          <div className={"flex items-center gap-5"}>
            <WhiteLogo className={"hidden min-[800px]:block"} />
            <p className={" text-14"}>Site made by Knexel Technologies</p>
          </div>
          <p className={" text-14"}>Copyright 2023, All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
