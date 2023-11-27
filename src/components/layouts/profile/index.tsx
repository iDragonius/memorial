import React, { FC, ReactNode } from "react";
import MainLayout from "@/components/layouts/main";
import Sidebar from "@/components/layouts/profile/ui/Sidebar";
import SidebarUserInfo from "@/components/layouts/profile/ui/SidebarUserInfo";
import { useAuth } from "@/hooks/use-auth";

export interface ProfileLayoutProps {
  children: ReactNode;
}

const ProfileLayout: FC<ProfileLayoutProps> = ({ children }) => {
  useAuth();
  return (
    <div className={"mt-10  flex box gap-4"}>
      <div className={"max-[1050px]:hidden"}>
        <Sidebar />
      </div>
      <div className={"w-full"}>
        <div className={"min-[1050px]:hidden"}>
          <SidebarUserInfo />
        </div>
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
