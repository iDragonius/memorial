import React, { FC, useState } from "react";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import { FaqApi, FaqProps } from "@/lib/api/faq.api";
import CustomLoader from "@/components/ui/loader/CustomLoader";
import { FaqChevronIcon } from "@/components/icons";
import clsx from "clsx";

export interface FaqPageProps {}

const FaqPage: FC<FaqPageProps> = () => {
  const { data: faqs, isLoading } = useQuery({
    queryKey: ["faqs"],
    queryFn: FaqApi.getFaqs,
  });
  return (
    <>
      <Head>
        <title>FAQ</title>
      </Head>
      <main className={"box"}>
        <h1
          className={
            "flex items-center justify-center  my-6 sm:my-14 text-bgSecondary text-40 font-semibold"
          }
        >
          FAQ
        </h1>
        <div className={"p-5 sm:p-14 bg-[#E8F5FF] rounded-[20px] "}>
          {isLoading ? (
            <CustomLoader />
          ) : (
            <div className={"flex flex-col gap-3 "}>
              {faqs?.data.data.map((faq) => (
                <FaqItem data={faq} key={faq.id} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};
const FaqItem = ({ data }: { data: FaqProps }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className={"bg-white rounded-[8px] px-6"}>
      <div
        onClick={() => setOpen((prevState) => !prevState)}
        className={
          "flex justify-between items-center cursor-pointer py-[18px]   gap-5 "
        }
      >
        <h3 className={"text-18 font-bold break-words w-[90%]"}>
          {data.locales[0].question}
        </h3>
        <div className={"min-w-max min-h-max"}>
          <FaqChevronIcon className={clsx(open ? "" : "-rotate-90")} />
        </div>
      </div>
      {open && (
        <p className={"pb-[18px] text-[#3C3C43D9] text-18 "}>
          {data.locales[0].answer}
        </p>
      )}
    </div>
  );
};
export default FaqPage;
