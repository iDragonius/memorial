import api from "@/lib/api/index";
import { Routes } from "@/lib/api/routes";
import { PaginationProps } from "@/shared/types/pagination.types";
import { ResponseProps } from "@/shared/types/response.type";
export interface VacancyParamsProps extends PaginationProps {
  branchId?: string;
  name?: string;
  description?: string;
  minSalary?: number;
  maxSalary?: number;
  branchName?: string;
  isEnabled?: boolean;
}
export interface GetVacanciesResponse extends ResponseProps {}
export interface GetVacancyResponse extends ResponseProps {}
export interface ApplyToVacancyResponse extends ResponseProps {}
export const VacancyApi = {
  async getVacancies({ params }: { params: VacancyParamsProps }) {
    return await api.get<GetVacanciesResponse>(`/v1${Routes.VACANCY}`, {
      params,
    });
  },
  async getVacancy(id: string) {
    return await api.get<GetVacancyResponse>(`/v1${Routes.VACANCY}`);
  },
  async applyToVacancy({
    data,
  }: {
    data: {
      name: string;
      email: string;
      coverLetter: string;
      fileId: string;
      vacancyId: string;
    };
  }) {
    return await api.post<ApplyToVacancyResponse>(
      `/v1${Routes.VACANCY}/apply`,
      data,
    );
  },
};
