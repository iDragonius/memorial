import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ParentCatalogProps } from "@/lib/api/branch-item.api";
import { BranchDropDownIcon } from "@/components/icons";
import clsx from "clsx";
import { SelectedCategoryProps } from "@/components/screens/branch/catalog/index";
import { useRouter } from "next/router";

export interface CategoriesProps {
  data: ParentCatalogProps[];
  selectedCategory: SelectedCategoryProps;
  setSelectedCategory: Dispatch<SetStateAction<SelectedCategoryProps>>;
}

const Categories: FC<CategoriesProps> = ({
  data,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div
      className={
        "max-[900px]:hidden w-[208px] rounded-l-[12px] border-r border-r-[#EDEDED] "
      }
    >
      {data?.map((parentCategory) => (
        <ParentCategoryItem
          data={parentCategory}
          key={parentCategory.id}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      ))}
    </div>
  );
};

const ParentCategoryItem = ({
  data,
  selectedCategory,
  setSelectedCategory,
}: {
  data: ParentCatalogProps;
  selectedCategory: SelectedCategoryProps;
  setSelectedCategory: Dispatch<SetStateAction<SelectedCategoryProps>>;
}) => {
  const { push, query, pathname } = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const changeCategory = (parentId: string, childId: string | null) => {
    if (
      parentId === selectedCategory.parentCategory &&
      childId === selectedCategory.childCategory
    ) {
      return;
    }
    setSelectedCategory({
      parentCategory: parentId,
      childCategory: childId,
    });

    push({
      pathname,
      query: {
        ...query,
        parentCategory: parentId,
        childCategory: childId,
      },
    });
  };
  useEffect(() => {
    if (
      selectedCategory.childCategory &&
      selectedCategory.parentCategory === data.id
    ) {
      setOpen(true);
    }
  }, [selectedCategory]);
  return (
    <div className={""}>
      {!!data.children.length ? (
        <div className={""}>
          <div
            onClick={() => setOpen((prevState) => !prevState)}
            className={clsx(
              "flex justify-between items-center  py-3 px-4 text-18 font-medium leading-6 trans cursor-pointer ",
              selectedCategory.parentCategory === data.id
                ? "bg-[#9FDFD6] text-bgSecondary"
                : "text-[#82998B] hover:bg-gray-100 ",
              !open && "border-b border-[#EDEDED]",
            )}
          >
            <span className={"w-[150px]"}>{data.locales[0].name}</span>
            <BranchDropDownIcon
              className={clsx(open ? "rotate-180" : "min-w-max")}
            />
          </div>
          {open && (
            <div>
              {data.children.map((childCategory) => (
                <div
                  key={childCategory.id}
                  onClick={() => changeCategory(data.id, childCategory.id)}
                  className={clsx(
                    "px-4 py-2 text-14 cursor-pointer text-bgSecondary trans",
                    selectedCategory.childCategory === childCategory.id
                      ? "bg-[#EBFFFC] "
                      : "hover:bg-gray-100",
                  )}
                >
                  {childCategory.locales[0].name}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={() => changeCategory(data.id, null)}
          className={clsx(
            "py-3 px-4 text-18 font-medium leading-6 cursor-pointer trans border-b border-[#EDEDED]",
            selectedCategory.parentCategory === data.id
              ? "bg-[#9FDFD6] text-bgSecondary"
              : "text-[#82998B] hover:bg-gray-100",
          )}
        >
          {data.locales[0].name}
        </div>
      )}
    </div>
  );
};

export default Categories;
