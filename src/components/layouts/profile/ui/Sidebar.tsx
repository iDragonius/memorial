import React, { FC } from "react";

import SidebarUserInfo from "@/components/layouts/profile/ui/SidebarUserInfo";
import SidebarNavigation from "@/components/layouts/profile/ui/SidebarNavigation";
import SidebarLogout from "@/components/layouts/profile/ui/SidebarLogout";

export interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {
  return (
    <div className={"sm:min-w-[396px] "}>
      <SidebarUserInfo />
      <div
        className={
          "bg-white rounded-[2px] border border-[#EFEFEF] max-sm:gap-10 sm:h-[calc(100vh-316px)] mb-10 py-6 flex flex-col justify-between"
        }
      >
        <SidebarNavigation />
        <SidebarLogout />
      </div>
    </div>
  );
};

export default Sidebar;
