import api from "@/lib/api/index";
import { Routes } from "@/lib/api/routes";
import { ResponseProps } from "@/shared/types/response.type";
import { LocaleProps } from "@/shared/types/locale.types";
export interface CatalogTypeProps {
  id: string;
  locales: LocaleProps[];
  slug: string;
}
export interface GetCatalogTypesResponse extends ResponseProps {
  data: CatalogTypeProps[];
}
export const CatalogApi = {
  async getCatalogTypes() {
    const response = await api.get<GetCatalogTypesResponse>(
      `/v1${Routes.CATALOG}/type`,
    );
    const newData = JSON.parse(
      JSON.stringify(response.data.data),
    ) as CatalogTypeProps[];
    const catalogTemp: CatalogTypeProps[] = [];
    newData.map((catalog) => {
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
    response.data.data = catalogTemp;

    return response;
  },
};
