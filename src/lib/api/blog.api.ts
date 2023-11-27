import api from "@/lib/api/index";
import { Routes } from "@/lib/api/routes";
import { ResponseProps } from "@/shared/types/response.type";
import { PaginationProps } from "@/shared/types/pagination.types";
export interface SocialNetworkProps {
  icon: {
    id: string;
  };
  name: string;
}

export interface BlogProps {
  id: string;
  ckEditorData: string;
  name: string;
  shortDescription: string;
  socialNetwork: SocialNetworkProps[];
  updatedAt: string;
}
export interface GetBlogsResponse extends ResponseProps {
  data: BlogProps[];
}

export interface GetBlogResponse extends ResponseProps {}
export const BlogApi = {
  async getBlogs({ params }: { params: PaginationProps }) {
    return await api.get<GetBlogsResponse>(`/v1${Routes.BLOG}`, { params });
  },
  async getBlog(id: string) {
    return await api.get<GetBlogResponse>(`/v1${Routes.BLOG}/${id}`);
  },
};
