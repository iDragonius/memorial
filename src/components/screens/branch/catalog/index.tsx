import React, { FC, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BranchContext } from "@/components/ui/providers/BranchProvider";
import { BranchItemApi, ParentCatalogProps } from "@/lib/api/branch-item.api";
import { useRouter } from "next/router";
import Categories from "@/components/screens/branch/catalog/Categories";
import CategoryItems from "@/components/screens/branch/catalog/CategoryItems";
import CustomLoader from "@/components/ui/loader/CustomLoader";

export interface CatalogProps {}
export interface SelectedCategoryProps {
  parentCategory: string | null;
  childCategory: string | null;
}
const Catalog: FC<CatalogProps> = () => {
  const { selectedBranch } = useContext(BranchContext);

  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategoryProps>({
      parentCategory: null,
      childCategory: null,
    });
  const { query, isReady, push, pathname } = useRouter();
  const { data: branchCatalogsData, isLoading } = useQuery({
    queryKey: ["branch-catalogs", query.catalog, query.branch],
    queryFn: () =>
      BranchItemApi.getBranchItemCatalogs({
        branchId: query.branch as string,
        catalogTypeId: query.catalog as string,
      }),
    enabled: isReady,
  });
  useEffect(() => {
    if (branchCatalogsData) {
      const temp: SelectedCategoryProps = {
        parentCategory: null,
        childCategory: null,
      };
      if (query.parentCategory && query.childCategory) {
        temp.parentCategory = query.parentCategory as string;
        temp.childCategory = query.childCategory as string;
      } else {
        temp.parentCategory = branchCatalogsData.data?.data[0]?.id || null;
        temp.childCategory =
          branchCatalogsData.data?.data[0]?.children[0]?.id || null;
        push({
          pathname,
          query: {
            ...query,
            parentCategory: temp.parentCategory,
            childCategory: temp.childCategory || null,
          },
        });
      }
      setSelectedCategory(temp);
    }
  }, [branchCatalogsData]);
  return (
    <div
      className={
        "mt-5 flex bg-white border-2 border-[#F2F2F2] rounded-[12px] mb-10 relative"
      }
    >
      {isLoading ? (
        <div
          className={
            "flex items-center justify-center  w-full  h-[200px] py-5 rounded-[12px] relative"
          }
        >
          <CustomLoader />
        </div>
      ) : (
        <>
          {!!branchCatalogsData?.data.data.length ? (
            <>
              <Categories
                data={branchCatalogsData?.data.data as ParentCatalogProps[]}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              <CategoryItems
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </>
          ) : (
            <div className={"text-secondary text-20 px-5 py-4 font-medium"}>
              Bu kataloq üzrə heç bir məlumat tapılmadı!
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Catalog;
