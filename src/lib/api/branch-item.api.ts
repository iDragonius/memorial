import api from "@/lib/api/index";
import { Routes } from "@/lib/api/routes";
import { ResponseProps } from "@/shared/types/response.type";
import { LocaleProps, LocaleTypes } from "@/shared/types/locale.types";
import { PaginationProps } from "@/shared/types/pagination.types";
import { BranchProps } from "@/lib/api/branch.api";
import { Simulate } from "react-dom/test-utils";
import reset = Simulate.reset;
function insertAt(array: any[], index: number, ...elementsArray: any[]) {
  array.splice(index, 0, ...elementsArray);
}
export interface ChildCatalogProps {
  id: string;
  locales: LocaleProps[];
  position: number;
  slug: string | null;
}
export interface ParentCatalogProps {
  id: string;
  locales: LocaleProps[];
  position: number;
  slug: string | null;
  children: ChildCatalogProps[];
}
export interface GetBranchItemCatalogsResponse extends ResponseProps {
  data: ParentCatalogProps[];
}
export type ItemTypes = "SERVICE" | "DOCTOR";
export interface BranchItemDetailsProps {
  code: string;
  maxPreparationProcessInHour: number;
  minPreparationProcessInHour: number;
}
export interface InformationProps {
  id: string;
  locales: {
    locale: LocaleTypes;
    ckEditorData: string;
    label: string;
  }[];
}
export interface BranchItemProps {
  createdAt: string;
  id: string;
  price: number;
  promotedPrice: number;
  type: ItemTypes;
  updatedAt: string;
  details: BranchItemDetailsProps;
  item: {
    details: {
      catalog: {
        locales: LocaleProps[];
      };
      genders: string[];
      experienceInYear: number;
      information: InformationProps[];
      locales: LocaleProps[];
      photo: {
        id: string;
      };
    };
  };
  branch: BranchProps;
}
export interface GetBranchItemsProps extends ResponseProps {
  data: {
    total: number;
    perPage: number;
    items: BranchItemProps[];
  };
}
export interface SearchFilterQueryProps extends PaginationProps {
  search: string;
  branchId?: string;
}
export interface SearchBranchItemsResponse extends ResponseProps {
  data: {
    items: BranchItemProps[];
  };
}
export const BranchItemApi = {
  async getBranchItemCatalogs({
    branchId,
    catalogTypeId,
  }: {
    branchId: string;
    catalogTypeId: string;
  }) {
    return await api.get<GetBranchItemCatalogsResponse>(
      `/v1${Routes["BRANCH-ITEM"]}/catalog/${branchId}/${catalogTypeId}`,
    );
  },
  async getBranchItems({
    page = 1,
    perPage = 15,
    catalogId,
    branchId,
  }: {
    page?: number;
    perPage?: number;
    catalogId: string;
    branchId: string;
  }) {
    const response = await api.get<GetBranchItemsProps>(
      `/v1${Routes["BRANCH-ITEM"]}?branchId=${branchId}&catalogId=${catalogId}&page=${page}&perPage=${perPage}`,
    );
    const newData = JSON.parse(
      JSON.stringify(response.data.data.items),
    ) as BranchItemProps[];
    newData.map((branchItem) => {
      const informations = branchItem.item.details.information;
      const informationTemp: InformationProps[] = [];
      informations.map((information, i) => {
        if (information.locales[0].label === "Təsvir") {
          informationTemp[0] = information;
        } else if (information.locales[0].label === "Analizə hazırlıq") {
          informationTemp[1] = information;
        } else if (information.locales[0].label === "Biomaterial") {
          informationTemp[2] = information;
        } else if (
          information.locales[0].label === "Nəticənin interpritasiyası"
        ) {
          informationTemp[3] = information;
        } else if (information.locales[0].label === "Referans dəyərlər") {
          informationTemp[4] = information;
        } else {
          informationTemp.push(information);
        }
      });
      branchItem.item.details.information = informationTemp.filter((el) => el);
    });
    response.data.data.items = newData;
    return response;
  },
  async searchBranchItems({ params }: { params: SearchFilterQueryProps }) {
    const response = await api.get<SearchBranchItemsResponse>(
      `/v1${Routes["BRANCH-ITEM"]}/filter/search`,
      {
        params,
      },
    );
    const newData = JSON.parse(
      JSON.stringify(response.data.data.items),
    ) as BranchItemProps[];
    newData.map((branchItem) => {
      const informations = branchItem.item.details.information;
      const informationTemp: InformationProps[] = [];
      informations.map((information, i) => {
        if (information.locales[0].label === "Təsvir") {
          informationTemp[0] = information;
        } else if (information.locales[0].label === "Analizə hazırlıq") {
          informationTemp[1] = information;
        } else if (information.locales[0].label === "Biomaterial") {
          informationTemp[2] = information;
        } else if (
          information.locales[0].label === "Nəticənin interpritasiyası"
        ) {
          informationTemp[3] = information;
        } else if (information.locales[0].label === "Referans dəyərlər") {
          informationTemp[4] = information;
        } else {
          informationTemp.push(information);
        }
      });
      console.log(informationTemp);
      branchItem.item.details.information = informationTemp;
    });
    response.data.data.items = newData;
    return response;
  },
};
