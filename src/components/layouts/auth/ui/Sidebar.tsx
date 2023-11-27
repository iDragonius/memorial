import React, { FC } from "react";
import { WhiteLogo } from "@/components/icons";
import {
  BasketIcon,
  DiscountIcon,
  DocumentIcon,
  PhoneIcon,
} from "@/components/icons/auth";
import Link from "next/link";

export interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {
  const sideBarData = [
    {
      icon: <DiscountIcon />,
      label: "Endirimlərdən yararlanın:",
    },
    {
      icon: <BasketIcon />,
      label: "Öncədən sifariş edin:",
    },
    {
      icon: <DocumentIcon />,
      label: "Sifarişlərin tarixinə baxın:",
    },
  ];
  return (
    <div
      className={
        "bg-primary flex flex-col justify-between min-[700px]:min-w-[500px] min-[1000px]:h-screen px-8  min-[500px]:px-[65px]  min-[700px]:pl-[110px] pb-16 max-[1000px]:pt-8 mt-5 min-[1000px]:mt-0"
      }
    >
      <Link href={"/"} className={"hidden min-[1000px]:block"}>
        <WhiteLogo />
      </Link>

      <div className={"text-white min-[1000px]:w-[290px] w-full"}>
        <h3 className={"text-24 font-semibold"}>Hesabın üstünlükləri:</h3>
        <p className={"min-[1000px]:mb-10 mb-6 mt-[10px] text-14"}>
          İstifadəçi şəxsi kabinetində aşağıdakı xidmətlərdən daha operativ
          istifadə edə biləcək.
        </p>
        <div className={"flex flex-col min-[1000px]:gap-10 gap-4"}>
          {sideBarData.map((sidebarElement, i) => (
            <div
              className={"flex gap-3 items-center text-18 font-medium"}
              key={i}
            >
              {sidebarElement.icon}
              {sidebarElement.label}
            </div>
          ))}
        </div>
      </div>

      <p
        className={
          " items-center gap-4 text-white font-semibold hidden min-[1000px]:flex"
        }
      >
        <PhoneIcon />
        +99412 210 10 50
      </p>
    </div>
  );
};

export default Sidebar;
