import React, { FC } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { CertificateApi } from "@/lib/api/certificate.api";
import Image from "next/image";
import { Constants } from "@/lib/constants";
import Link from "next/link";

export interface CertificatesProps {}

const Certificates: FC<CertificatesProps> = () => {
  const { data: certificates } = useQuery({
    queryKey: ["certificate"],
    queryFn: CertificateApi.getCertificates,
  });
  return (
    <div className={"box"}>
      <div className={"min-[1680px]:mx-[140px] mb-[80px]"}>
        <h2
          className={
            "text-24 sm:text-32 mb:text-40 text-secondary font-semibold  mb-3 sm:mb-6 mb:mb-10"
          }
        >
          Keyfiyyətə nəzarət
        </h2>
        <div
          className={"flex justify-between gap-5 bg-white py-3 rounded-[16px] "}
        >
          {certificates?.data.data.map((certificate) => (
            <Link
              href={Constants.fileApi + certificate.file.id}
              target={"_blank"}
              key={certificate.id}
            >
              <Image
                src={Constants.fileApi + certificate.photo.id}
                alt={certificate.name}
                width={300}
                height={180}
                className={"h-[180px] w-full object-contain"}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
