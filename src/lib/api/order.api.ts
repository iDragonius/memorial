import api from "@/lib/api/index";
import { Routes } from "@/lib/api/routes";
import { PaymentTypes } from "@/pages/checkout";
import { ResponseProps } from "@/shared/types/response.type";
import { UserFamilyMemberProps } from "@/lib/api/user.api";
import { BranchProps } from "@/lib/api/branch.api";
import { OrderStatusTypes } from "@/shared/types/order-status.types";
import { BranchItemProps } from "@/lib/api/branch-item.api";

export interface CreateOrderResponse extends ResponseProps {
  data: {
    paymentType: PaymentTypes;
    redirectUrl: string;
  };
}
export interface OrderMemberProps {
  id: string;
  items: {
    branchItem: BranchItemProps;
  }[];
  name: string;
  surname: string;
}
export interface RateProps {
  id: string;
  comment: string;
  rate: number;
}
export interface OrderProps {
  id: string;
  maxPreparationProcessInHour: number;
  minPreparationProcessInHour: number;
  orderStatus: OrderStatusTypes;
  shortId: string;
  paymentType: PaymentTypes;
  members: OrderMemberProps[];
  totalPrice: number;
  totalPromotedPrice: number;
  branch: BranchProps;
  rate: null | RateProps;
}
export interface GetUserOrdersResponse extends ResponseProps {
  data: OrderProps[];
}
export interface RepayOrderResponse extends ResponseProps {
  data: {
    redirectUrl: string;
  };
}
export const OrderApi = {
  async createOrder({
    paymentType,
    cardUuid,
  }: {
    paymentType: PaymentTypes;
    cardUuid: string | null;
  }) {
    return await api.post<CreateOrderResponse>(`/v1${Routes.ORDER}`, {
      paymentType,
      cardUuid,
    });
  },
  async getUserOrders() {
    return await api.get<GetUserOrdersResponse>(`/v1${Routes.ORDER}`);
  },
  async repayOrder(id: string) {
    return await api.post<RepayOrderResponse>(`/v1${Routes.ORDER}/${id}/repay`);
  },
};
