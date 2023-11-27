import React, { FC } from "react";
import {
  Info1Icon,
  Info2Icon,
  Info3Icon,
  Info4Icon,
} from "@/components/icons/home";
import clsx from "clsx";

export interface AboutProps {}

const About: FC<AboutProps> = () => {
  const infoBlocks = [
    {
      icon: <Info1Icon />,
      title: "Daha Təcrübəli",
      description:
        "Hər il müalicə etdiyimiz milyonlarla xəstə bizi ən vacib olanı - sizi müalicə etməyə hazırlayır.",
      textColor: "#000",
      bg: "#5DAAA0",
    },
    {
      icon: <Info2Icon />,
      title: "Düzgün cavablar",
      description:
        "İlk dəfə sizin üçün dəqiq diaqnoz və düzgün plan təqdim etmək üçün mütəxəssislərimizə etibar edin",
      textColor: "#000",
      bg: "#94C19F",
    },
    {
      icon: <Info3Icon />,
      title: "Sən birinci gəl",
      description:
        "İlk dəfə sizin üçün dəqiq diaqnoz və düzgün plan təqdim etmək üçün mütəxəssislərimizə etibar edin.",
      textColor: "#fff",
      bg: "#267B8D",
    },
    {
      icon: <Info4Icon />,
      title: "Təsirli yenilik",
      description:
        "Bütün xəstələrə qulluq, təhsil və araşdırmalarımız sizi sağaltmağa kömək edəcək kəşflər etməyə yönəldilmişdir.",
      textColor: "#fff",
      bg: "#00404D",
    },
  ];
  return (
    <div className={" "}>
      <div className={" mb-[80px] flex max-mb:flex-col"}>
        <div
          className={
            "h-[180px] w-full sm:h-[250px] mb:h-[496px]  bg-[#00404D] px-16 text-center flex items-center justify-center text-white text-40 sm:text-[56px] font-bold  mb:w-[40vw]"
          }
        >
          NİYƏ BİZ?
        </div>
        <div className={"grid grid-cols-2 mb:w-[60vw]"}>
          {infoBlocks.map((info, i) => (
            <div
              key={i}
              className={clsx("w-full sm:h-[248px] p-[26px]")}
              style={{
                backgroundColor: info.bg,
                color: info.textColor,
              }}
            >
              {info.icon}
              <h3
                className={
                  " mt-3 sm:mt-6 text-16 sm:text-24 font-bold mb-3 sm:mb-5 leading-8"
                }
              >
                {info.title}
              </h3>
              <p className={"leading-[18px] max-sm:text-12"}>
                {info.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
