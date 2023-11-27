import React, { FC } from "react";
import { useRouter } from "next/router";
import {
  ProfileFamilyMemberIcon,
  ProfileInfoIcon,
  ProfileLanguageIcon,
  ProfileOrderIcon,
} from "@/components/icons/profile";
import clsx from "clsx";
import Link from "next/link";

export interface SidebarNavigationProps {}

const SidebarNavigation: FC<SidebarNavigationProps> = () => {
  const { pathname } = useRouter();
  const sidebarData = [
    {
      id: 1,
      label: "Profil",
      url: "/profile/personal-info",

      icon: (
        <ProfileInfoIcon
          className={clsx(
            pathname === "/profile/personal-info"
              ? "fill-[#088AA7]"
              : "fill-[#747474]",
          )}
        />
      ),
    },
    {
      id: 2,
      label: "Sifarişlərim",
      url: "/profile/orders",

      icon: (
        <ProfileOrderIcon
          className={clsx(
            pathname === "/profile/orders"
              ? "fill-[#088AA7]"
              : "fill-[#747474]",
          )}
        />
      ),
    },
    {
      id: 3,
      label: "Ailə üzvlərim",
      url: "/profile/family-members",

      icon: (
        <ProfileFamilyMemberIcon
          className={clsx(
            pathname === "/profile/family-members"
              ? "fill-[#088AA7]"
              : "fill-[#747474]",
          )}
        />
      ),
    },
    {
      id: 4,
      label: "Dil seçimi",
      url: "/profile/language",
      icon: (
        <ProfileLanguageIcon
          className={clsx(
            pathname === "/profile/language"
              ? "fill-[#088AA7]"
              : "fill-[#747474]",
          )}
        />
      ),
    },
  ];
  return (
    <div className={"flex flex-col"}>
      {sidebarData.map((nav) => (
        <Link
          key={nav.id}
          href={nav.url}
          className={"flex items-center py-7 border-b border-b-[#F2F2F2] gap-3"}
        >
          <div
            className={clsx(
              " w-1 h-6 rounded-r-[2px] ",
              pathname === nav.url ? "bg-[#088AA7]" : "",
            )}
          />
          {nav.icon}
          <p
            className={clsx(
              " text-18 font-medium",
              pathname === nav.url ? "text-[#088AA7]" : "text-[#747474]",
            )}
          >
            {nav.label}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default SidebarNavigation;
