import api from "@/lib/api/index";
import { Routes } from "@/lib/api/routes";
import { ResponseProps } from "@/shared/types/response.type";
import { BranchItemProps, ItemTypes } from "@/lib/api/branch-item.api";
import { LocaleProps } from "@/shared/types/locale.types";
export interface CollectionProps {
  id: string;
  type: ItemTypes;
  items: BranchItemProps[];
  locales: LocaleProps[];
}
export interface GetCollectionResponse extends ResponseProps {
  data: CollectionProps[];
}
export const CollectionApi = {
  async getCollections() {
    return await api.get<GetCollectionResponse>(`/v1${Routes.COLLECTION}`);
  },
};
