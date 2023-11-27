import api from "@/lib/api/index";
import { Routes } from "@/lib/api/routes";
import { ResponseProps } from "@/shared/types/response.type";
import { LocaleTypes } from "@/shared/types/locale.types";

export interface FaqProps {
  id: string;
  locales: {
    locale: LocaleTypes;
    answer: string;
    question: string;
  }[];
}
export interface GetFaqsResponse extends ResponseProps {
  data: FaqProps[];
}
export const FaqApi = {
  async getFaqs() {
    return await api.get<GetFaqsResponse>(`/v1${Routes.FAQ}`);
  },
};
