import api from "@/lib/api/index";
import { Routes } from "@/lib/api/routes";
import { ResponseProps } from "@/shared/types/response.type";

export interface RateOrderResponse extends ResponseProps {}
export const RateApi = {
  async rateOrder({
    data,
  }: {
    data: {
      rate: number;
      orderId: string;
      comment: string;
      tags: string[];
    };
  }) {
    return await api.post<RateOrderResponse>(`/v1${Routes.RATE}`, data);
  },
};
