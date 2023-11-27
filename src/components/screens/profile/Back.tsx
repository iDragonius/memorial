import React, { FC } from "react";
import { ProfileBackIcon } from "@/components/icons/profile";
import Link from "next/link";
import { useWindowSize } from "usehooks-ts";

export interface BackProps {
  label: string;
}

const Title: FC<BackProps> = ({ label }) => {
  const { width } = useWindowSize();
  return (
    <>
      {width > 1050 ? (
        <h1
          className={
            "text-24 font-semibold pb-6 border-b border-b-[#E3E3E3] leading-[44px]"
          }
        >
          {label}
        </h1>
      ) : (
        <Link
          href={"/profile"}
          className={
            "flex gap-3 items-center  pb-6 border-b border-b-[#E3E3E3]"
          }
        >
          <ProfileBackIcon />
          <h1 className={"text-24 font-semibold   leading-[44px] "}>{label}</h1>
        </Link>
      )}
    </>
  );
};

export default Title;
