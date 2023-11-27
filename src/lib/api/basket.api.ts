import api from "@/lib/api/index";
import { Routes } from "@/lib/api/routes";
import { ResponseProps } from "@/shared/types/response.type";
import { ItemTypes } from "@/lib/api/branch-item.api";
import { GenderTypes } from "@/shared/types/gender.types";
import { LocaleProps } from "@/shared/types/locale.types";
export interface MemberBasketItemProps {
  id: string;
  promotedPrice: number;
  branchItem: {
    price: number;
    type: ItemTypes;
    id: string;
    item: {
      details: {
        genders: GenderTypes[];
        locales: LocaleProps[];
      };
    };
  };
}
export interface MemberBasketProps {
  name: string;
  surname: string;
  items: MemberBasketItemProps[];
}
export interface BasketProps {
  branch: {
    address: string;
    email: string;
    phone: string;
  };
  members: MemberBasketProps[];
  promotion: number;
  summary: number;
}
export interface GetBasketResponse extends ResponseProps {
  data: BasketProps;
}
export interface AddItemToBasketResponse extends ResponseProps {
  data: BasketProps;
}
export interface AddPromotionResponse extends ResponseProps {
  data: BasketProps;
}
export const BasketApi = {
  async getBasket() {
    return await api.get<GetBasketResponse>(`/v1${Routes.BASKET}`);
  },
  async addItemToBasket({
    branchId,
    branchItemId,
    familyMemberIds,
  }: {
    branchId: string;
    branchItemId: string;
    familyMemberIds: string[];
  }) {
    return await api.post<AddItemToBasketResponse>(`/v1${Routes.BASKET}`, {
      branchId,
      branchItemId,
      familyMemberIds,
    });
  },
  async deleteItemFromBasket(id: string) {
    return await api.delete<ResponseProps>(
      `/v1${Routes.BASKET}/branchItem/${id}`,
    );
  },
  async clearBasket() {
    return await api.delete<ResponseProps>(`/v1${Routes.BASKET}/clear`);
  },
  async addPromotion(promoCode: string) {
    return await api.put<AddPromotionResponse>(
      `/v1${Routes.BASKET}/promotion`,
      {
        promoCode,
      },
    );
  },
};
