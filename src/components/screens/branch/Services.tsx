import React, { FC, useContext } from "react";
import { BranchContext } from "@/components/ui/providers/BranchProvider";
import clsx from "clsx";
import { useRouter } from "next/router";
import { CatalogTypeProps } from "@/lib/api/catalog.api";

export interface ServicesProps {}

const Services: FC<ServicesProps> = () => {
  const { query, push, pathname } = useRouter();
  const { selectedBranch } = useContext(BranchContext);
  const changeCatalog = (data: CatalogTypeProps) => {
    if (data.id === query.catalog) return;
    push({
      pathname,
      query: {
        ...query,
        catalog: data.id,
        parentCategory: null,
        childCategory: null,
      },
    });
  };
  return (
    <div className={"flex items-center gap-3 mb-5 overflow-x-auto"}>
      {selectedBranch?.catalogTypes.map((catalog, i) => (
        <div
          key={catalog?.id || i}
          onClick={() => changeCatalog(catalog)}
          className={clsx(
            "  rounded-[8px] cursor-pointer min-w-max",
            query.catalog === catalog?.id
              ? "bg-bgSecondary text-white py-4 px-6  sm:text-[22px] h-11 sm:h-[52px] flex items-center font-medium"
              : "py-[10px] px-4 text-14 sm:text-16 font-medium text-secondary border border-inputBorder h-11 flex items-center bg-white",
          )}
        >
          {catalog?.locales[0].name}
        </div>
      ))}
    </div>
  );
};

export default Services;
