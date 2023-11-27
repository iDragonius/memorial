import React, { FC, useContext, useRef, useState } from "react";
import { ProfileLogoutIcon } from "@/components/icons/profile";
import { UserContext } from "@/components/ui/providers/UserProvider";
import { useOnClickOutside } from "usehooks-ts";
import { BasketContext } from "@/components/ui/providers/BasketProvider";
import { AuthApi } from "@/lib/api/auth.api";
import { useRouter } from "next/router";

export interface SidebarLogoutProps {}

const SidebarLogout: FC<SidebarLogoutProps> = () => {
  const { setUserData } = useContext(UserContext);
  const { setBasketData } = useContext(BasketContext);
  const { push } = useRouter();
  const logout = () => {
    AuthApi.logout().then((res) => {
      if (res.data.success) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setUserData(null);
        setBasketData(null);
        push("/");
      }
    });
  };
  return (
    <div
      className={
        "group flex items-center gap-3 text-18 font-medium px-4 py-3 cursor-pointer trans hover:text-[#088AA7]"
      }
      onClick={logout}
    >
      <ProfileLogoutIcon
        className={"group-hover:fill-[#088AA7] fill-[#747474]"}
      />
      Çıxış
    </div>
  );
};

export default SidebarLogout;
