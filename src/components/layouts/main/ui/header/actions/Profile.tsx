import React, { FC, useContext, useRef, useState } from "react";
import Image from "next/image";
import { Constants } from "@/lib/constants";
import { UserContext } from "@/components/ui/providers/UserProvider";
import { useOnClickOutside } from "usehooks-ts";
import Link from "next/link";
import { AuthApi } from "@/lib/api/auth.api";
import clsx from "clsx";
import { BasketContext } from "@/components/ui/providers/BasketProvider";

export interface ProfileProps {}

const Profile: FC<ProfileProps> = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [popupIsOpen, setPopupOpen] = useState<boolean>(false);
  const popupRef = useRef<null | HTMLDivElement>(null);
  useOnClickOutside(popupRef, () => setPopupOpen(false));
  const { setBasketData } = useContext(BasketContext);
  const logout = () => {
    AuthApi.logout().then((res) => {
      if (res.data.success) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setUserData(null);
        setBasketData(null);
      }
    });
  };
  return (
    <div className={"relative"} ref={popupRef}>
      <div onClick={() => setPopupOpen((prevState) => !prevState)}>
        {userData?.photo ? (
          <Image
            src={Constants.fileApi + userData?.photo.id}
            alt={userData?.name || ""}
            width={48}
            height={48}
            className={clsx(
              "rounded-full cursor-pointer trans",
              popupIsOpen &&
                "ring-2 ring-primary ring-offset-1 ring-opacity-70",
            )}
          />
        ) : (
          <div
            className={clsx(
              "w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-20 text-gray-500 cursor-pointer",
              popupIsOpen &&
                "ring-2 ring-primary ring-offset-1 ring-opacity-70",
            )}
          >
            {userData?.name[0].toUpperCase() +
              (userData?.surname[0].toUpperCase() as string)}
          </div>
        )}
      </div>
      {popupIsOpen && (
        <div
          className={
            "absolute right-0 bg-white  shadow-lg py-1 flex flex-col w-[150px]  mt-1"
          }
        >
          <Link
            onClick={() => setPopupOpen(false)}
            href={"/profile/personal-info"}
            className={"text-14 px-2 py-1.5 trans hover:bg-gray-100 "}
          >
            Profil
          </Link>
          <Link
            onClick={() => setPopupOpen(false)}
            href={"/profile/orders"}
            className={"text-14 px-2 py-1.5 trans hover:bg-gray-100 my-0.5"}
          >
            Sifarişlər
          </Link>
          <hr />
          <div
            onClick={logout}
            className={
              "text-red-500 px-2 text-14 trans hover:bg-red-100 py-1.5 cursor-pointer my-0.5"
            }
          >
            Çıxış
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
