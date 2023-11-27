import api from "@/lib/api/index";
import { Routes } from "@/lib/api/routes";
import { ResponseProps } from "@/shared/types/response.type";
import { LocaleProps, LocaleTypes } from "@/shared/types/locale.types";
import { CatalogTypeProps } from "@/lib/api/catalog.api";
import catalog from "@/components/screens/branch/catalog";
export interface BranchLocaleProps {
  name: string;
  description: string;
  isEnabled: boolean;
  locale: LocaleTypes;
}
export interface CatalogTypesProps {
  id: string;
  locales: LocaleProps[];
  slug: string;
}
export interface BranchProps {
  address: string;
  email: string;
  id: string;
  isEnabled: boolean;
  latitude: number;
  longitude: number;
  phone: string;
  branchLocale: BranchLocaleProps[];
  catalogTypes: CatalogTypesProps[];
}

export interface GetBranchesResponse extends ResponseProps {
  data: BranchProps[];
}
export const BranchApi = {
  async getBranches() {
    const response = await api.get<GetBranchesResponse>(`/v1${Routes.BRANCH}`);
    const newData = JSON.parse(
      JSON.stringify(response.data.data),
    ) as BranchProps[];
    newData.map((branch) => {
      const catalogs = branch.catalogTypes;
      const catalogTemp: CatalogTypeProps[] = [];
      catalogs.map((catalog) => {
        if (catalog.slug === "laboratory-catalog") {
          catalogTemp[0] = catalog;
        } else if (catalog.slug === "polyclinic-catalog") {
          catalogTemp[1] = catalog;
        } else if (catalog.slug === "doctor-appointment") {
          catalogTemp[2] = catalog;
        } else if (catalog.slug === "checkup-package") {
          catalogTemp[3] = catalog;
        } else if (catalog.slug === "service-at-home") {
          catalogTemp[4] = catalog;
        }
      });
      branch.catalogTypes = catalogTemp.filter((el) => el);
    });
    response.data.data = newData;
    return response;
  },
  async getBranch(id: string) {
    return await api.get(`/v1${Routes.BRANCH}/${id}`);
  },
};
