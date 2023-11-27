import api from "@/lib/api/index";
import { Routes } from "@/lib/api/routes";
import { ResponseProps } from "@/shared/types/response.type";
export interface CertificateProps {
  id: string;
  name: string;
  file: {
    id: string;
  };
  photo: {
    id: string;
  };
}
export interface GetCertificatesResponse extends ResponseProps {
  data: CertificateProps[];
}
export const CertificateApi = {
  async getCertificates() {
    return await api.get<GetCertificatesResponse>(`/v1${Routes.CERTIFICATE}`);
  },
};
