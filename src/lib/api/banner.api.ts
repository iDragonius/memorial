import api from "@/lib/api/index";
import { Routes } from "@/lib/api/routes";
import { ResponseProps } from "@/shared/types/response.type";
export interface BannerProps {
  photo: {
    id: string;
  };
  name: string;
  description: string;
  isActive: boolean;
  id: string;
}
export interface GetBannersResponse extends ResponseProps {
  data: BannerProps[];
}
export const BannerApi = {
  async getBanners() {
    return await api.get<GetBannersResponse>(`/v1${Routes.BANNER}`);
  },
};
