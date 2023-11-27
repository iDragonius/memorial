import React, { FC, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { CatalogApi, CatalogTypeProps } from "@/lib/api/catalog.api";
import labImage from "@/assets/services/lab.png";
import polImage from "@/assets/services/poliklinik.png";
import checkupImage from "@/assets/services/cekup.jpg";
import homeServiceImage from "@/assets/services/evde xidmet.png";
import doctorImage from "@/assets/services/hekim qebul.jpg";
import Image, { StaticImageData } from "next/image";
import { BranchContext } from "@/components/ui/providers/BranchProvider";
import { useRouter } from "next/router";
export interface ServicesProps {}

const Services: FC<ServicesProps> = () => {
  const { selectedBranch, setBranchSelectOpen } = useContext(BranchContext);

  const { data: catalogTypes, isLoading } = useQuery({
    queryKey: ["catalog-types"],
    queryFn: CatalogApi.getCatalogTypes,
  });
  const { push } = useRouter();
  const getCatalogImageByType = (type: string) => {
    switch (type) {
      case "laboratory-catalog":
        return labImage;
      case "polyclinic-catalog":
        return polImage;

      case "doctor-appointment":
        return doctorImage;

      case "checkup-package":
        return checkupImage;

      case "service-at-home":
        return homeServiceImage;
    }
  };
  const selectServiceType = (data: CatalogTypeProps) => {
    if (!selectedBranch) {
      setBranchSelectOpen(true);
      return;
    }
    push({
      pathname: "/branch",
      query: { catalog: data.id, branch: selectedBranch.id },
    });
  };
  return (
    <div className={"box mb-20 mt-16"}>
      <div className={"min-[1680px]:mx-[140px]"}>
        <h2
          className={
            "text-secondary font-semibold mb-6 sm:mb-10 text-24 sm:text-32 mb:text-40"
          }
        >
          Xidmətlər
        </h2>

        <div className={"flex  flex-col mb:flex-row    gap-5"}>
          {selectedBranch ? (
            <>
              {selectedBranch.catalogTypes.map((service) => (
                <div
                  onClick={() => selectServiceType(service)}
                  className={
                    "  w-full flex mb:flex-col text-[#004D5E]  justify-between  text-24 leading-8  bg-white p-6 border-2 border-[#EAEAEA] rounded-[24px] trans group hover:border-primary cursor-pointer"
                  }
                  key={service?.id}
                >
                  <p
                    className={
                      "mb:h-[64px] mb:mb-4 group-hover:text-primary max-mb:flex max-mb:items-center "
                    }
                  >
                    {service?.locales[0].name}
                  </p>

                  <Image
                    src={
                      getCatalogImageByType(service?.slug) as StaticImageData
                    }
                    alt={service?.slug}
                    width={100}
                    height={100}
                    className={
                      "float-right self-end h-8 w-8 sm:w-12 sm:h-12  mb:w-[100px] mb:h-[100px]"
                    }
                  />
                </div>
              ))}
            </>
          ) : (
            <>
              {catalogTypes?.data.data.map((service) => (
                <div
                  onClick={() => selectServiceType(service)}
                  className={
                    "  w-full flex mb:flex-col text-[#004D5E]  justify-between  text-24 leading-8  bg-white p-6 border-2 border-[#EAEAEA] rounded-[24px] trans group hover:border-primary cursor-pointer"
                  }
                  key={service.id}
                >
                  <p
                    className={
                      "mb:h-[64px] mb:mb-4 group-hover:text-primary max-mb:flex max-mb:items-center "
                    }
                  >
                    {service.locales[0].name}
                  </p>

                  <Image
                    src={getCatalogImageByType(service.slug) as StaticImageData}
                    alt={service.slug}
                    width={100}
                    height={100}
                    className={
                      "float-right self-end h-8 w-8 sm:w-12 sm:h-12  mb:w-[100px] mb:h-[100px]"
                    }
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
