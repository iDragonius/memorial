import React, { FC } from "react";
import Head from "next/head";
import { CustomPage } from "@/shared/types/layout.types";
import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";
import Back from "@/components/screens/profile/Back";
import { ProfileBackIcon } from "@/components/icons/profile";
import Title from "@/components/screens/profile/Back";
import ProfileLayout from "@/components/layouts/profile";

export interface LanguagePageProps {}
export const Locales: Record<string, string> = {
  az: "Azərbaycan dili",
  en: "English",
  ru: "Русский язык",
};
const LanguagePage: CustomPage<LanguagePageProps> = () => {
  const { locales, locale, asPath } = useRouter();
  return (
    <ProfileLayout>
      <Head>
        <title>Dil seçimi</title>
      </Head>
      <main
        className={"bg-white nb:border border-[#E3E3E3] w-full py-6 nb:px-8 "}
      >
        <Title label={"Dil seçimi"} />

        <div className={"mt-6 flex flex-col"}>
          {locales?.map((lc) => (
            <Link
              key={lc}
              href={"/profile/language"}
              locale={lc}
              className={clsx(
                " py-6 border-b border-b-[#E3E3E3]",
                locale === lc
                  ? "text-[#088AA7] text-18 font-semibold"
                  : "text-[#747474] text-18 font-medium",
              )}
            >
              {Locales[lc]}
            </Link>
          ))}
        </div>
      </main>
    </ProfileLayout>
  );
};
export default LanguagePage;
