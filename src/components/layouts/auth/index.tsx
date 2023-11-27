import React, { FC, ReactNode } from "react";
import { Logo } from "@/components/icons";
import Sidebar from "@/components/layouts/auth/ui/Sidebar";
import AuthContext from "@/components/ui/providers/AuthContext";
import Link from "next/link";

export interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <AuthContext>
      <div
        className={
          "flex  min-[1000px]:flex-row flex-col-reverse justify-between min-h-screen"
        }
      >
        <Sidebar />
        <div className={"w-full flex items-center justify-center "}>
          <div
            className={
              "min-[1000px]:w-[396px] min-[1000px]:p-0 px-8  min-[500px]:px-[65px]   min-[700px]:px-[110px]"
            }
          >
            <Link href={"/"}>
              <Logo className={" min-[1000px]:hidden"} />
            </Link>
            {children}
          </div>
        </div>
      </div>
    </AuthContext>
  );
};

export default AuthLayout;
