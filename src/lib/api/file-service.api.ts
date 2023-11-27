import api from "@/lib/api/index";
import { ResponseProps } from "@/shared/types/response.type";

export interface UploadFileResponse extends ResponseProps {
  data: {
    id: string;
  };
}
export const FileServiceApi = {
  async uploadFile(file: File) {
    const data = new FormData();
    data.append("file", file);

    return await api.post<UploadFileResponse>(
      `v1/admin/file-service/upload`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  },
  async getFile(id: string) {
    return;
  },
};
